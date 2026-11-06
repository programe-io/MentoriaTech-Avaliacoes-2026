// ===== Lógica do projeto (conforme a aula) =====

const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  geradorDeCodigo++;
  const tarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true, // true = em execução | false = concluída
  };
  tarefas.push(tarefa);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

// Evolução: exclusão (o gerador de código independente evita códigos repetidos)
function excluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  tarefas.splice(tarefas.indexOf(tarefa), 1);
}

// ===== Salvamento no navegador =====

const CHAVE = "gerenciador-de-tarefas";
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify({ tarefas, geradorDeCodigo })); } catch (e) {}
}
function carregar() {
  try {
    const d = JSON.parse(localStorage.getItem(CHAVE));
    if (d && Array.isArray(d.tarefas)) {
      tarefas.push(...d.tarefas);
      geradorDeCodigo = Number(d.geradorDeCodigo) || 0;
    }
  } catch (e) {}
}

// ===== Interface =====

const $ = (id) => document.getElementById(id);
let filtro = "todas";
let prioNova = 2;
let confirmando = null; // código da tarefa aguardando confirmação de exclusão
let tToast;

function aviso(texto, erro) {
  const t = $("toast");
  t.textContent = texto;
  t.className = "show" + (erro ? " erro-t" : "");
  clearTimeout(tToast);
  tToast = setTimeout(() => (t.className = ""), 2200);
}

function executar(acao, sucesso) {
  try {
    acao();
    if (sucesso) aviso(sucesso);
    salvar();
    return true;
  } catch (e) {
    aviso(e.message, true);
    return false;
  } finally {
    renderizar();
  }
}

const rotulo = { 1: "Alta", 2: "Média", 3: "Baixa" };

function renderizar() {
  const todas = listarTarefas();
  const concl = todas.filter((t) => !t.status).length;
  const pct = todas.length ? Math.round((concl / todas.length) * 100) : 0;

  $("sTotal").textContent = todas.length;
  $("sAndamento").textContent = todas.length - concl;
  $("sConcluidas").textContent = concl;
  $("sPct").textContent = pct + "%";
  $("sBarra").style.width = pct + "%";

  const termo = $("busca").value.trim().toLowerCase();
  let vis = todas.filter((t) =>
    (filtro === "todas" || (filtro === "andamento" ? t.status : !t.status)) &&
    t.titulo.toLowerCase().includes(termo)
  );
  const o = $("ordem").value;
  vis = [...vis].sort((a, b) =>
    o === "prioridade" ? a.prioridade - b.prioridade || a.codigo - b.codigo
    : o === "recentes" ? b.codigo - a.codigo
    : a.codigo - b.codigo
  );

  const ul = $("lista");
  ul.innerHTML = "";

  if (!vis.length) {
    const li = document.createElement("li");
    li.className = "vazio";
    const em = document.createElement("span");
    em.className = "emoji";
    em.textContent = todas.length ? "🔍" : "📝";
    li.append(em, todas.length ? "Nenhuma tarefa encontrada." : "Nenhuma tarefa ainda. Cadastre a primeira acima!");
    ul.appendChild(li);
    return;
  }

  for (const t of vis) {
    const li = document.createElement("li");
    li.className = "tarefa p" + t.prioridade + (t.status ? "" : " concluida");

    const check = document.createElement("button");
    check.className = "check";
    check.textContent = t.status ? "" : "✓";
    check.title = t.status ? "Marcar como concluída" : "Tarefa concluída";
    check.onclick = () => executar(() => concluirTarefa(t.codigo), "Tarefa concluída! 🎉");

    const corpo = document.createElement("div");
    corpo.className = "corpo";
    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = t.titulo;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = "#" + t.codigo + " · Prioridade " + t.prioridade + " (" + rotulo[t.prioridade] + ") · " + (t.status ? "Em execução" : "Concluída");
    corpo.append(nome, meta);

    const acoes = document.createElement("div");
    acoes.className = "acoes";
    const seg = document.createElement("div");
    seg.className = "seg mini";
    [1, 2, 3].forEach((p) => {
      const b = document.createElement("button");
      b.innerHTML = '<i class="dot d' + p + '"></i>' + p;
      b.title = "Prioridade " + p + " (" + rotulo[p] + ")";
      if (p === t.prioridade) b.className = "on";
      b.onclick = () => { if (p !== t.prioridade) executar(() => alterarPrioridade(t.codigo, p), "Prioridade alterada."); };
      seg.appendChild(b);
    });

    const del = document.createElement("button");
    const aguardando = confirmando === t.codigo;
    del.className = "del" + (aguardando ? " conf" : "");
    del.textContent = aguardando ? "Confirmar?" : "Excluir";
    del.onclick = () => {
      if (!aguardando) {
        confirmando = t.codigo;
        renderizar();
        setTimeout(() => { if (confirmando === t.codigo) { confirmando = null; renderizar(); } }, 3000);
      } else {
        confirmando = null;
        executar(() => excluirTarefa(t.codigo), "Tarefa excluída.");
      }
    };

    acoes.append(seg, del);
    li.append(check, corpo, acoes);
    ul.appendChild(li);
  }
}

// Eventos
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const el = $("titulo");
  try {
    cadastrarTarefa(el.value.trim(), prioNova);
    $("erro").textContent = "";
    el.value = "";
    $("cont").textContent = "0 / mín. 5";
    salvar();
    aviso("Tarefa cadastrada!");
  } catch (err) {
    $("erro").textContent = err.message;
  }
  renderizar();
  el.focus();
});

$("titulo").addEventListener("input", (e) => {
  const n = e.target.value.trim().length;
  $("cont").textContent = n + " / mín. 5";
  if (n >= 5) $("erro").textContent = "";
});

$("segNova").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  prioNova = Number(b.dataset.p);
  [...$("segNova").children].forEach((x) => x.classList.toggle("on", x === b));
});

$("chips").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  filtro = b.dataset.f;
  [...$("chips").children].forEach((x) => x.classList.toggle("on", x === b));
  renderizar();
});

$("busca").addEventListener("input", renderizar);
$("ordem").addEventListener("change", renderizar);

$("tema").addEventListener("click", () => {
  const r = document.documentElement;
  const escuro = r.dataset.theme === "dark" ||
    (!r.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme = escuro ? "light" : "dark";
});

// ===== Cor do tema =====

const CHAVE_COR = "gerenciador-cor";
const CORES = [
  ["Índigo", "#5b5bf0"], ["Azul", "#2f80ed"], ["Verde", "#14a05a"], ["Teal", "#0d9488"],
  ["Roxo", "#9333ea"], ["Rosa", "#e5489a"], ["Laranja", "#f2711c"],
];

function aplicarCor(cor, guardar) {
  const r = document.documentElement;
  r.style.setProperty("--primary", cor);
  r.style.setProperty("--primary-soft", "color-mix(in srgb, " + cor + " 16%, var(--card))");
  document.querySelectorAll(".cor").forEach((b) => b.classList.toggle("on", b.dataset.cor === cor));
  $("corLivre").value = cor;
  if (guardar) { try { localStorage.setItem(CHAVE_COR, cor); } catch (e) {} }
}

CORES.forEach(([nome, cor]) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "cor";
  b.dataset.cor = cor;
  b.style.setProperty("--c", cor);
  b.title = nome;
  b.setAttribute("aria-label", nome);
  b.onclick = () => aplicarCor(cor, true);
  $("cores").appendChild(b);
});

$("corLivre").addEventListener("input", (e) => aplicarCor(e.target.value, true));

let corSalva = "#5b5bf0";
try { corSalva = localStorage.getItem(CHAVE_COR) || corSalva; } catch (e) {}
aplicarCor(corSalva, false);

carregar();
renderizar();