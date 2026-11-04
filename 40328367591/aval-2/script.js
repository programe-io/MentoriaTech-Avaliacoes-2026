// ===== Armazenamento =====
// Array central que guarda todos os objetos de tarefa.
const tarefas = [];

// Gerador de código independente do tamanho do array:
// sempre avança, então nunca repete um código, mesmo se tarefas forem removidas.
let ultimoCodigo = 0;

// ===== Funções do sistema =====

// Valida título (mínimo de 5 caracteres) e prioridade (entre 1 e 3).
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

// Cria e adiciona uma nova tarefa. Código e status são definidos aqui, não pelo usuário.
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo++;

  const tarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
  return tarefa;
}

// Retorna as tarefas cadastradas (retornar não é o mesmo que exibir).
function listarTarefas() {
  return tarefas;
}

// Localiza uma tarefa pelo código usando find.
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código " + codigo + " não encontrado.");
  }
  return tarefa;
}

// Marca uma tarefa como concluída (status passa de true para false).
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
  return tarefa;
}

// Altera a prioridade reaproveitando a validação existente.
// O título da própria tarefa é repassado, pois já foi validado antes.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// ===== Interface =====
const formulario = document.getElementById("formulario-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const elMensagem = document.getElementById("mensagem");
const elLista = document.getElementById("lista-tarefas");
const elVazio = document.getElementById("vazio");
const elResumo = document.getElementById("resumo");

const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

function mostrarMensagem(texto, tipo) {
  elMensagem.textContent = texto;
  elMensagem.className = "mensagem " + tipo;
  elMensagem.hidden = false;
}

function limparMensagem() {
  elMensagem.hidden = true;
  elMensagem.textContent = "";
}

// Executa uma ação do sistema e mostra na tela o erro, se houver.
function executar(acao, mensagemSucesso) {
  try {
    acao();
    if (mensagemSucesso) {
      mostrarMensagem(mensagemSucesso, "sucesso");
    } else {
      limparMensagem();
    }
    return true;
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
    return false;
  } finally {
    renderizar();
  }
}

function criarItem(tarefa) {
  const li = document.createElement("li");
  li.className = "tarefa p" + tarefa.prioridade + (tarefa.status ? "" : " concluida");

  const info = document.createElement("div");
  info.className = "tarefa-info";

  const titulo = document.createElement("p");
  titulo.className = "tarefa-titulo";
  titulo.textContent = tarefa.titulo;

  const meta = document.createElement("p");
  meta.className = "tarefa-meta";
  meta.textContent = "Código " + tarefa.codigo + " • Prioridade " +
    tarefa.prioridade + " (" + NOMES_PRIORIDADE[tarefa.prioridade] + ")";

  info.append(titulo, meta);

  const selo = document.createElement("span");
  selo.className = "selo " + (tarefa.status ? "em-execucao" : "finalizada");
  selo.textContent = tarefa.status ? "Em execução" : "Concluída";

  const acoes = document.createElement("div");
  acoes.className = "tarefa-acoes";

  const seletor = document.createElement("select");
  seletor.setAttribute("aria-label", "Alterar prioridade da tarefa " + tarefa.codigo);
  [1, 2, 3].forEach((p) => {
    const opcao = document.createElement("option");
    opcao.value = p;
    opcao.textContent = p + " – " + NOMES_PRIORIDADE[p];
    opcao.selected = p === tarefa.prioridade;
    seletor.append(opcao);
  });
  seletor.addEventListener("change", () => {
    executar(
      () => alterarPrioridade(tarefa.codigo, Number(seletor.value)),
      "Prioridade da tarefa " + tarefa.codigo + " alterada."
    );
  });

  const botaoConcluir = document.createElement("button");
  botaoConcluir.type = "button";
  botaoConcluir.className = "botao";
  botaoConcluir.textContent = "Concluir";
  botaoConcluir.disabled = !tarefa.status;
  botaoConcluir.addEventListener("click", () => {
    executar(
      () => concluirTarefa(tarefa.codigo),
      "Tarefa " + tarefa.codigo + " concluída."
    );
  });

  acoes.append(seletor, botaoConcluir);
  li.append(info, selo, acoes);
  return li;
}

function renderizar() {
  const lista = listarTarefas();

  elLista.replaceChildren(...lista.map(criarItem));
  elVazio.hidden = lista.length > 0;

  const emExecucao = lista.filter((t) => t.status).length;
  elResumo.textContent = lista.length === 0
    ? ""
    : lista.length + " cadastrada(s), " + emExecucao + " em execução.";
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = campoTitulo.value.trim();
  const prioridade = Number(campoPrioridade.value);

  const ok = executar(
    () => cadastrarTarefa(titulo, prioridade),
    "Tarefa cadastrada."
  );

  if (ok) {
    campoTitulo.value = "";
    campoPrioridade.value = "2";
  }
  campoTitulo.focus();
});

renderizar();