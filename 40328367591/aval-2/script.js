// ===== Armazenamento =====
const tarefas = [];

// Gerador de código independente do tamanho do array (nunca repete códigos).
let ultimoCodigo = 0;

// ===== Funções do sistema =====
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

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

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código " + codigo + " não encontrado.");
  }
  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
  return tarefa;
}

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
const campoFiltro = document.getElementById("filtro");
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
  for (const p of [1, 2, 3]) {
    const opcao = document.createElement("option");
    opcao.value = p;
    opcao.textContent = p + " – " + NOMES_PRIORIDADE[p];
    opcao.selected = p === tarefa.prioridade;
    seletor.append(opcao);
  }
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

// Listagem com estrutura de repetição (evolução sugerida na aula).
function renderizar() {
  const todas = listarTarefas();
  const filtro = campoFiltro.value;

  elLista.replaceChildren();

  let exibidas = 0;
  for (const tarefa of todas) {
    if (filtro === "execucao" && !tarefa.status) continue;
    if (filtro === "concluidas" && tarefa.status) continue;
    elLista.append(criarItem(tarefa));
    exibidas++;
  }

  if (exibidas === 0) {
    elVazio.textContent = todas.length === 0
      ? "Nenhuma tarefa cadastrada. Preencha o formulário acima para adicionar a primeira."
      : "Nenhuma tarefa neste filtro.";
  }
  elVazio.hidden = exibidas > 0;

  const emExecucao = todas.filter((t) => t.status).length;
  elResumo.textContent = todas.length === 0
    ? ""
    : todas.length + " cadastrada(s), " + emExecucao + " em execução.";
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = campoTitulo.value.trim();
  const prioridade = Number(campoPrioridade.value);

  const ok = executar(() => cadastrarTarefa(titulo, prioridade), "Tarefa cadastrada.");

  if (ok) {
    campoTitulo.value = "";
    campoPrioridade.value = "2";
  }
  campoTitulo.focus();
});

campoFiltro.addEventListener("change", renderizar);

renderizar();