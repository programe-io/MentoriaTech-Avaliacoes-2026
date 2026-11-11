// Sistema de gerenciamento de tarefas
// Cada tarefa tem: codigo, titulo, prioridade (1 = alta, 3 = baixa) e concluida.

const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };
const CHAVE_STORAGE = "tarefas-rosa";

// ---------- Persistência (com plano B) ----------
// 1) localStorage; 2) window.name (sobrevive a recarregar em prévias isoladas);
// 3) só memória. Cada tentativa fica dentro de try/catch porque em prévias
// "sandbox" o acesso ao armazenamento pode lançar SecurityError.

let modoStorage = "memoria";

function lerArmazenado() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_STORAGE);
    modoStorage = "localStorage";
    return bruto ? JSON.parse(bruto) : [];
  } catch (e) { /* tenta o próximo */ }

  try {
    if (window.name && window.name.startsWith(CHAVE_STORAGE + ":")) {
      modoStorage = "window.name";
      return JSON.parse(window.name.slice(CHAVE_STORAGE.length + 1));
    }
    modoStorage = "window.name";
  } catch (e) { /* segue em memória */ }

  return [];
}

function gravarArmazenado(dados) {
  const texto = JSON.stringify(dados);
  if (modoStorage === "localStorage") {
    try {
      window.localStorage.setItem(CHAVE_STORAGE, texto);
      return;
    } catch (e) { /* cai para o próximo */ }
  }
  try {
    window.name = CHAVE_STORAGE + ":" + texto;
    modoStorage = "window.name";
  } catch (e) {
    modoStorage = "memoria";
  }
}

let tarefas = lerArmazenado();
let proximoCodigo = tarefas.reduce((max, t) => Math.max(max, t.codigo), 0) + 1;

// ---------- Validações ----------

function validarTitulo(titulo) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
}

function validarPrioridade(prioridade) {
  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) throw new Error(`Tarefa ${codigo} não encontrada.`);
  return tarefa;
}

// ---------- Funcionalidades ----------

function cadastrarTarefa(titulo, prioridade) {
  validarTitulo(titulo);
  validarPrioridade(prioridade);
  const tarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade,
    concluida: false,
  };
  tarefas.push(tarefa);
  gravarArmazenado(tarefas);
  return tarefa;
}

function concluirTarefa(codigo) {
  buscarTarefa(codigo).concluida = true;
  gravarArmazenado(tarefas);
}

function alterarPrioridade(codigo, novaPrioridade) {
  validarPrioridade(novaPrioridade);
  buscarTarefa(codigo).prioridade = novaPrioridade;
  gravarArmazenado(tarefas);
}

// ---------- Interface ----------

const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const contador = document.getElementById("contador");
const avisoStorage = document.getElementById("aviso-storage");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

function atualizarAviso() {
  avisoStorage.textContent =
    modoStorage === "memoria"
      ? "Aviso: este ambiente bloqueia o armazenamento, então as tarefas somem ao recarregar. Abra o index.html direto no navegador para salvar."
      : "";
}

function listarTarefas() {
  lista.innerHTML = "";
  contador.textContent = tarefas.length;
  vazio.classList.toggle("oculto", tarefas.length > 0);

  tarefas.forEach((t) => {
    const li = document.createElement("li");
    li.className = `tarefa prioridade-${t.prioridade}${t.concluida ? " concluida" : ""}`;

    const info = document.createElement("div");
    info.className = "info";

    const titulo = document.createElement("div");
    titulo.className = "titulo";
    titulo.textContent = t.titulo; // textContent evita injeção de HTML

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `Código ${t.codigo} • Prioridade ${t.prioridade} (${NOMES_PRIORIDADE[t.prioridade]}) • ${
      t.concluida ? "Concluída" : "Pendente"
    }`;

    info.append(titulo, meta);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Alterar prioridade");
    [1, 2, 3].forEach((p) => {
      const op = document.createElement("option");
      op.value = p;
      op.textContent = `${p} - ${NOMES_PRIORIDADE[p]}`;
      op.selected = p === t.prioridade;
      select.appendChild(op);
    });
    select.addEventListener("change", () => {
      try {
        alterarPrioridade(t.codigo, Number(select.value));
        mostrarMensagem(`Prioridade da tarefa ${t.codigo} alterada.`, "sucesso");
      } catch (erro) {
        mostrarMensagem(erro.message, "erro");
      }
      listarTarefas();
    });

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-concluir";
    btn.textContent = t.concluida ? "Concluída ✓" : "Concluir";
    btn.disabled = t.concluida;
    btn.addEventListener("click", () => {
      try {
        concluirTarefa(t.codigo);
        mostrarMensagem(`Tarefa ${t.codigo} concluída!`, "sucesso");
      } catch (erro) {
        mostrarMensagem(erro.message, "erro");
      }
      listarTarefas();
    });

    acoes.append(select, btn);
    li.append(info, acoes);
    lista.appendChild(li);
  });

  atualizarAviso();
}

// Sem <form>: prévias isoladas bloqueiam o envio de formulários.
function aoCadastrar() {
  try {
    cadastrarTarefa(campoTitulo.value, Number(campoPrioridade.value));
    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    campoTitulo.value = "";
    campoPrioridade.value = "2";
    listarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

btnCadastrar.addEventListener("click", aoCadastrar);
campoTitulo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    aoCadastrar();
  }
});

listarTarefas();