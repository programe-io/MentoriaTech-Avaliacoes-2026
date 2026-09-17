// ==========================================
//  SISTEMA DE GERENCIAMENTO DE TAREFAS
//  Cada tarefa: { codigo, titulo, prioridade, concluida }
//  prioridade: 1 = Alta | 2 = Média | 3 = Baixa
// ==========================================

let tarefas = [];
let filtroAtual = "todas";

// ---------- ELEMENTOS ----------
const form          = document.getElementById("form-tarefa");
const campoCodigo   = document.getElementById("codigo");
const campoTitulo   = document.getElementById("titulo");
const campoPrior    = document.getElementById("prioridade");
const corpoTabela   = document.getElementById("corpo-tabela");
const mensagem      = document.getElementById("mensagem");
const filtro        = document.getElementById("filtro");
const totalTarefas  = document.getElementById("total-tarefas");
const totalPend     = document.getElementById("total-pendentes");
const totalConcl    = document.getElementById("total-concluidas");

// ---------- AUXILIARES ----------
function mostrarMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
  setTimeout(() => {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
  }, 3000);
}

function buscarTarefa(codigo) {
  return tarefas.find(t => t.codigo === codigo);
}

function nomePrioridade(p) {
  return p === 1 ? "Alta" : p === 2 ? "Média" : "Baixa";
}

// ==========================================
//  1. CADASTRAR TAREFA
//  VALIDAÇÕES:
//   - título com no mínimo 5 caracteres
//   - prioridade entre 1 e 3
// ==========================================
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const codigo = campoCodigo.value.trim();
  const titulo = campoTitulo.value.trim();
  const prior  = parseInt(campoPrior.value);

  // Validação: código obrigatório
  if (!codigo) {
    return mostrarMensagem("Informe um código!", "erro");
  }

  // ⚠️ REGRA: título com no mínimo 5 caracteres
  if (titulo.length < 5) {
    return mostrarMensagem(
      "O título deve ter no mínimo 5 caracteres!",
      "erro"
    );
  }

  // ⚠️ REGRA: prioridade entre 1 e 3
  if (isNaN(prior) || prior < 1 || prior > 3) {
    return mostrarMensagem(
      "A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa)!",
      "erro"
    );
  }

  if (buscarTarefa(codigo)) {
    return mostrarMensagem("Já existe uma tarefa com esse código!", "erro");
  }

  tarefas.push({
    codigo,
    titulo,
    prioridade: prior,
    concluida: false,
  });

  form.reset();
  campoCodigo.focus();
  listarTarefas();
  mostrarMensagem("✅ Tarefa cadastrada com sucesso!");
});

// ==========================================
//  2. LISTAR TAREFAS
// ==========================================
function listarTarefas() {
  // Aplica filtro
  let lista = tarefas;
  if (filtroAtual === "pendentes") {
    lista = tarefas.filter(t => !t.concluida);
  } else if (filtroAtual === "concluidas") {
    lista = tarefas.filter(t => t.concluida);
  }

  // Ordena por prioridade (1 primeiro) e depois por código
  lista = [...lista].sort((a, b) => {
    if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade;
    return a.codigo.localeCompare(b.codigo);
  });

  corpoTabela.innerHTML = "";

  if (lista.length === 0) {
    corpoTabela.innerHTML =
      `<tr><td colspan="5" class="vazio">Nenhuma tarefa encontrada.</td></tr>`;
  } else {
    lista.forEach((t) => {
      const linha = document.createElement("tr");
      if (t.concluida) linha.classList.add("concluida");

      linha.innerHTML = `
        <td>${t.codigo}</td>
        <td>${t.titulo}</td>
        <td><span class="badge p${t.prioridade}">${nomePrioridade(t.prioridade)}</span></td>
        <td>
          <span class="status ${t.concluida ? "ok" : "pend"}">
            ${t.concluida ? "✔ Concluída" : "⏳ Pendente"}
          </span>
        </td>
        <td class="acoes">
          <button
            class="btn-concluir ${t.concluida ? "desativado" : ""}"
            onclick="concluirTarefa('${t.codigo}')"
            ${t.concluida ? "disabled" : ""}
          >
            ${t.concluida ? "✔ Concluída" : "✔ Concluir"}
          </button>
          <button class="btn-editar" onclick="alterarPrioridade('${t.codigo}')">
            🎯 Prioridade
          </button>
          <button class="btn-remover" onclick="removerTarefa('${t.codigo}')">
            🗑️
          </button>
        </td>
      `;
      corpoTabela.appendChild(linha);
    });
  }

  atualizarResumo();
}

function atualizarResumo() {
  const concluidas = tarefas.filter(t => t.concluida).length;
  totalTarefas.textContent = tarefas.length;
  totalPend.textContent    = tarefas.length - concluidas;
  totalConcl.textContent   = concluidas;
}

// ==========================================
//  3. MARCAR TAREFA COMO CONCLUÍDA
// ==========================================
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa || tarefa.concluida) return;

  tarefa.concluida = true;
  listarTarefas();
  mostrarMensagem(`✔ Tarefa "${tarefa.titulo}" concluída!`);
}

// ==========================================
//  4. ALTERAR PRIORIDADE
//  VALIDAÇÃO: precisa ser 1, 2 ou 3
// ==========================================
function alterarPrioridade(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa) return;

  const entrada = prompt(
    `Tarefa: ${tarefa.titulo}\n` +
    `Prioridade atual: ${tarefa.prioridade} - ${nomePrioridade(tarefa.prioridade)}\n\n` +
    `Digite a NOVA prioridade:\n` +
    `1 = Alta | 2 = Média | 3 = Baixa`,
    tarefa.prioridade
  );

  if (entrada === null) return; // cancelou

  const novaPrior = parseInt(entrada);

  // ⚠️ REGRA: prioridade entre 1 e 3
  if (isNaN(novaPrior) || novaPrior < 1 || novaPrior > 3) {
    return mostrarMensagem(
      "Prioridade inválida! Digite 1, 2 ou 3.",
      "erro"
    );
  }

  tarefa.prioridade = novaPrior;
  listarTarefas();
  mostrarMensagem(`🎯 Prioridade de "${tarefa.titulo}" alterada para ${nomePrioridade(novaPrior)}!`);
}

// ==========================================
//  EXTRA: REMOVER TAREFA
// ==========================================
function removerTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa) return;
  if (!confirm(`Remover a tarefa "${tarefa.titulo}"?`)) return;

  tarefas = tarefas.filter(t => t.codigo !== codigo);
  listarTarefas();
  mostrarMensagem("🗑️ Tarefa removida.");
}

// ---------- FILTRO ----------
filtro.addEventListener("change", (e) => {
  filtroAtual = e.target.value;
  listarTarefas();
});

// ---------- INICIALIZAÇÃO ----------
listarTarefas();