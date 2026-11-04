// ===== Dados =====
// Array central que guarda todos os objetos de tarefa
const tarefas = [];

// Gerador de código independente do tamanho do array (começa em 0)
let ultimoCodigo = 0;

// ===== Funções do projeto =====

// Valida título (mínimo 5 caracteres) e prioridade (entre 1 e 3)
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

// Localiza uma tarefa pelo código usando find
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Tarefa com o código " + codigo + " não encontrada.");
  }
  return tarefa;
}

// Cria e adiciona uma nova tarefa (código e status definidos aqui)
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  ultimoCodigo++;
  const tarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true, // true = em execução, false = concluída
  };
  tarefas.push(tarefa);
  return tarefa;
}

// Retorna as tarefas cadastradas
function listarTarefas() {
  return tarefas;
}

// Marca a tarefa como concluída (status passa de true para false)
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
  return tarefa;
}

// Altera a prioridade reutilizando a validação existente
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// ===== Interface =====
const form = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");

const nomesPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

function avisar(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// Executa uma ação e mostra o erro (gerado com throw) na tela
function executar(acao, textoOk) {
  try {
    acao();
    avisar(textoOk, "ok");
  } catch (erro) {
    avisar(erro.message, "erro");
  }
  renderizar();
}

function renderizar() {
  const todas = listarTarefas();
  const emExecucao = todas.filter((t) => t.status).length;
  resumo.textContent = todas.length
    ? emExecucao + " em execução de " + todas.length + " cadastradas"
    : "Nenhuma tarefa cadastrada ainda";

  lista.innerHTML = "";
  if (todas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Cadastre a primeira tarefa no formulário acima.";
    lista.appendChild(vazio);
    return;
  }

  // Percorre o array com repetição para montar cada item
  for (const t of todas) {
    const item = document.createElement("li");
    item.className = "tarefa" + (t.status ? "" : " concluida");
    item.dataset.prioridade = t.prioridade;

    const codigo = document.createElement("span");
    codigo.className = "codigo";
    codigo.textContent = "#" + t.codigo;

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = t.titulo;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent =
      "Prioridade " + t.prioridade + " (" + nomesPrioridade[t.prioridade] + ") · " +
      (t.status ? "Em execução" : "Concluída");

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Alterar prioridade da tarefa " + t.codigo);
    for (const p of [1, 2, 3]) {
      const op = document.createElement("option");
      op.value = p;
      op.textContent = p + " – " + nomesPrioridade[p];
      op.selected = p === t.prioridade;
      select.appendChild(op);
    }
    select.addEventListener("change", () =>
      executar(
        () => alterarPrioridade(t.codigo, Number(select.value)),
        "Prioridade da tarefa " + t.codigo + " alterada."
      )
    );

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Concluir";
    botao.disabled = !t.status;
    botao.addEventListener("click", () =>
      executar(() => concluirTarefa(t.codigo), "Tarefa " + t.codigo + " concluída.")
    );

    acoes.append(select, botao);
    item.append(codigo, titulo, status, acoes);
    lista.appendChild(item);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  executar(() => {
    cadastrarTarefa(campoTitulo.value.trim(), Number(campoPrioridade.value));
    campoTitulo.value = "";
    campoTitulo.focus();
  }, "Tarefa cadastrada.");
});

renderizar();
