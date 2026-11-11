// ===== Dados =====
let tarefas = [];
let proximoNumero = 1;
const CHAVE = "gerenciador-tarefas";

const NOMES_PRIORIDADE = { 1: "1 - Alta", 2: "2 - Média", 3: "3 - Baixa" };

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo) {
      tarefas = salvo.tarefas;
      proximoNumero = salvo.proximoNumero;
    }
  } catch (e) {
    tarefas = [];
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ tarefas, proximoNumero }));
  } catch (e) {}
}

// ===== Validações =====
function tituloValido(titulo) {
  return typeof titulo === "string" && titulo.trim().length >= 5;
}

function prioridadeValida(prioridade) {
  return Number.isInteger(prioridade) && prioridade >= 1 && prioridade <= 3;
}

function buscarPorCodigo(codigo) {
  return tarefas.find(t => t.codigo === codigo);
}

// ===== Funções do sistema =====

// 1) Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  if (!tituloValido(titulo))
    return { ok: false, texto: "O título deve ter no mínimo 5 caracteres." };
  if (!prioridadeValida(prioridade))
    return { ok: false, texto: "A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };

  const codigo = "T" + String(proximoNumero++).padStart(3, "0");
  tarefas.push({ codigo, titulo: titulo.trim(), prioridade, concluida: false });
  salvar();
  return { ok: true, texto: "Tarefa " + codigo + " cadastrada." };
}

// 2) Listar as tarefas cadastradas
function listarTarefas() {
  const corpo = document.getElementById("lista");
  corpo.innerHTML = "";

  if (tarefas.length === 0) {
    corpo.innerHTML = '<tr><td colspan="5" class="vazio">Nenhuma tarefa cadastrada. Use o formulário acima para começar.</td></tr>';
  }

  tarefas.forEach(t => {
    const tr = document.createElement("tr");
    if (t.concluida) tr.className = "feita";

    tr.innerHTML = `
      <td></td>
      <td class="titulo"></td>
      <td>
        <select class="p${t.prioridade}" data-codigo="${t.codigo}" aria-label="Prioridade da tarefa ${t.codigo}">
          ${[1, 2, 3].map(n => `<option value="${n}" ${n === t.prioridade ? "selected" : ""}>${NOMES_PRIORIDADE[n]}</option>`).join("")}
        </select>
      </td>
      <td class="status ${t.concluida ? "concluida" : "pendente"}">${t.concluida ? "Concluída" : "Pendente"}</td>
      <td class="acoes">
        <button class="sec" data-codigo="${t.codigo}" ${t.concluida ? "disabled" : ""}>Marcar como concluída</button>
      </td>`;

    // textContent evita injeção de HTML no que o usuário digitou
    tr.children[0].textContent = t.codigo;
    tr.children[1].textContent = t.titulo;
    corpo.appendChild(tr);
  });

  const feitas = tarefas.filter(t => t.concluida).length;
  document.getElementById("total").textContent = tarefas.length;
  document.getElementById("concluidas").textContent = feitas;
  document.getElementById("pendentes").textContent = tarefas.length - feitas;
}

// 3) Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
  const t = buscarPorCodigo(codigo);
  if (!t) return { ok: false, texto: "Tarefa não encontrada." };
  if (t.concluida) return { ok: false, texto: "A tarefa " + codigo + " já está concluída." };

  t.concluida = true;
  salvar();
  return { ok: true, texto: "Tarefa " + codigo + " marcada como concluída." };
}

// 4) Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
  const t = buscarPorCodigo(codigo);
  if (!t) return { ok: false, texto: "Tarefa não encontrada." };
  if (!prioridadeValida(novaPrioridade))
    return { ok: false, texto: "A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };

  t.prioridade = novaPrioridade;
  salvar();
  return { ok: true, texto: "Prioridade de " + codigo + " alterada para " + NOMES_PRIORIDADE[novaPrioridade] + "." };
}

// ===== Interface =====
function mostrar(r) {
  const el = document.getElementById("msg");
  el.textContent = r.texto;
  el.className = "msg " + (r.ok ? "ok" : "erro");
}

document.getElementById("formTarefa").addEventListener("submit", e => {
  e.preventDefault();
  const r = cadastrarTarefa(
    document.getElementById("titulo").value,
    parseInt(document.getElementById("prioridade").value, 10)
  );
  mostrar(r);
  if (r.ok) {
    document.getElementById("titulo").value = "";
    document.getElementById("titulo").focus();
    listarTarefas();
  }
});

document.getElementById("lista").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const r = concluirTarefa(b.dataset.codigo);
  mostrar(r);
  listarTarefas();
});

document.getElementById("lista").addEventListener("change", e => {
  const s = e.target.closest("select");
  if (!s) return;
  const r = alterarPrioridade(s.dataset.codigo, parseInt(s.value, 10));
  mostrar(r);
  listarTarefas();
});

// ===== Início =====
carregar();
listarTarefas();