// ================================================
// ESTADO DA APLICAÇÃO
// ================================================
let tarefas = [];
let geradorCodigo = 0; // Gerador de código independente

// ================================================
// FUNÇÕES DE VALIDAÇÃO E BUSCA
// ================================================

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.trim().length < 5) {
    throw new Error("O título da tarefa deve ter, no mínimo, 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((item) => item.codigo === codigo);
  if (!tarefa) {
    throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
  }
  return tarefa;
}

// ================================================
// FUNÇÕES DE OPERAÇÃO DAS TAREFAS
// ================================================

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorCodigo += 1; // Incrementa o gerador de código sequencial

  const novaTarefa = {
    codigo: geradorCodigo,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true // true = Em execução, false = Concluída
  };

  tarefas.push(novaTarefa);
  renderizarTabela();
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false; // Altera o status para concluída
  renderizarTabela();
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  
  // Reutiliza a validação reutilizando o título atual da tarefa
  validarDadosDaTarefa(tarefa.titulo, Number(novaPrioridade));

  tarefa.prioridade = Number(novaPrioridade);
  renderizarTabela();
}

// ================================================
// MANIPULAÇÃO DO DOM / INTERFACE
// ================================================

function exibirMensagem(texto, ehErro = false) {
  const elMensagem = document.getElementById("mensagem");
  elMensagem.textContent = texto;
  elMensagem.className = `mensagem ${ehErro ? 'erro' : 'sucesso'}`;
  
  setTimeout(() => {
    elMensagem.className = "mensagem hidden";
  }, 4000);
}

function renderizarTabela() {
  const tbody = document.getElementById("tabela-tarefas");
  tbody.innerHTML = "";

  const lista = listarTarefas();

  if (lista.length === 0) {
    tbody.innerHTML = `
      <tr id="linha-vazia">
        <td colspan="4" class="text-center">Nenhuma tarefa cadastrada.</td>
      </tr>`;
    return;
  }

  const rotulosPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

  lista.forEach((tarefa) => {
    const tr = document.createElement("tr");

    const badgePrioridade = `<span class="badge badge-prio-${tarefa.prioridade}">${rotulosPrioridade[tarefa.prioridade]}</span>`;
    const textoStatus = tarefa.status 
      ? `<span class="status-execucao">Em execução</span>` 
      : `<span class="status-concluida">Concluída</span>`;

    tr.innerHTML = `
      <td>${tarefa.codigo}</td>
      <td class="${!tarefa.status ? 'status-concluida' : ''}">${tarefa.titulo}</td>
      <td>${badgePrioridade}</td>
      <td>${textoStatus}</td>
    `;

    tbody.appendChild(tr);
  });
}

// ================================================
// EVENTOS DOS FORMULÁRIOS
// ================================================

// Form: Cadastrar Tarefa
document.getElementById("form-cadastrar").addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("cad-titulo").value;
  const prioridade = Number(document.getElementById("cad-prioridade").value);

  try {
    cadastrarTarefa(titulo, prioridade);
    exibirMensagem("Tarefa cadastrada com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});

// Form: Concluir Tarefa
document.getElementById("form-concluir").addEventListener("submit", (e) => {
  e.preventDefault();
  const codigo = Number(document.getElementById("conc-codigo").value);

  try {
    concluirTarefa(codigo);
    exibirMensagem("Tarefa concluída com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});

// Form: Alterar Prioridade
document.getElementById("form-prioridade").addEventListener("submit", (e) => {
  e.preventDefault();
  const codigo = Number(document.getElementById("prio-codigo").value);
  const novaPrioridade = Number(document.getElementById("prio-nova").value);

  try {
    alterarPrioridade(codigo, novaPrioridade);
    exibirMensagem("Prioridade alterada com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});