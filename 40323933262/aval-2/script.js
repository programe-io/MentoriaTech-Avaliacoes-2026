// ===== Lógica do gerenciador de tarefas =====

const tarefas = [];
let geradorDeCodigo = 0; // independente do tamanho do array: nunca repete códigos

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }
  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código " + codigo + " não encontrado.");
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
    status: true, // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
  return tarefa;
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

// ===== Interface =====

const form = document.getElementById("form-cadastro");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaEl = document.getElementById("lista");
const vazioEl = document.getElementById("vazio");
const mensagemEl = document.getElementById("mensagem");

const NOMES_PRIORIDADE = { 1: "1 – Alta", 2: "2 – Média", 3: "3 – Baixa" };

function mostrarMensagem(texto, sucesso) {
  mensagemEl.textContent = texto;
  mensagemEl.classList.toggle("sucesso", Boolean(sucesso));
  mensagemEl.hidden = false;
}

function limparMensagem() {
  mensagemEl.hidden = true;
  mensagemEl.textContent = "";
}

// Executa uma ação e mostra o erro (se houver) na tela
function executar(acao, mensagemOk) {
  try {
    acao();
    if (mensagemOk) mostrarMensagem(mensagemOk, true);
    else limparMensagem();
    return true;
  } catch (erro) {
    mostrarMensagem(erro.message, false);
    return false;
  } finally {
    renderizar();
  }
}

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function renderizar() {
  const dados = listarTarefas();
  listaEl.replaceChildren();
  vazioEl.hidden = dados.length > 0;

  dados.forEach((tarefa) => {
    const item = criarElemento("li", "tarefa" + (tarefa.status ? "" : " concluida"));

    item.append(
      criarElemento("span", "tarefa-codigo", "#" + tarefa.codigo),
      criarElemento("span", "tarefa-titulo", tarefa.titulo)
    );

    const acoes = criarElemento("div", "tarefa-acoes");

    const seletor = criarElemento("select");
    seletor.setAttribute("aria-label", "Prioridade da tarefa " + tarefa.codigo);
    [1, 2, 3].forEach((p) => {
      const op = criarElemento("option", "", NOMES_PRIORIDADE[p]);
      op.value = String(p);
      op.selected = p === tarefa.prioridade;
      seletor.append(op);
    });
    seletor.addEventListener("change", () => {
      executar(
        () => alterarPrioridade(tarefa.codigo, Number(seletor.value)),
        "Prioridade da tarefa " + tarefa.codigo + " alterada."
      );
    });

    const botao = criarElemento("button", "botao", tarefa.status ? "Concluir" : "Concluída");
    botao.type = "button";
    botao.disabled = !tarefa.status;
    botao.addEventListener("click", () => {
      executar(
        () => concluirTarefa(tarefa.codigo),
        "Tarefa " + tarefa.codigo + " concluída."
      );
    });

    const status = criarElemento("span", "status", tarefa.status ? "Em execução" : "Concluída");

    acoes.append(seletor, botao, status);
    item.append(acoes);
    listaEl.append(item);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = campoTitulo.value.trim();
  const prioridade = Number(campoPrioridade.value);

  const cadastrou = executar(
    () => cadastrarTarefa(titulo, prioridade),
    "Tarefa cadastrada."
  );

  if (cadastrou) {
    campoTitulo.value = "";
    campoTitulo.focus();
  }
});

renderizar();