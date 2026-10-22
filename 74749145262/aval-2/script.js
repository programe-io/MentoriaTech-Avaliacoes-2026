// ==========================================
// Gerenciador de Tarefas - Projeto de Revisão
// ==========================================

// 1. Array central que armazena as tarefas
const tarefas = [];

// 2. Gerador automático de códigos (independente do tamanho do array)
let geradorCodigo = 0;

// ==========================================
// FUNÇÕES DO SISTEMA
// ==========================================

/**
 * Valida título e prioridade de uma tarefa.
 * Lança erro se os dados forem inválidos.
 */
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }

  return true;
}

/**
 * Cadastra uma nova tarefa no array.
 */
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorCodigo += 1;

  const novaTarefa = {
    codigo: geradorCodigo,
    titulo: titulo,
    prioridade: Number(prioridade),
    status: true // true = em execução | false = concluída
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Retorna o array com todas as tarefas cadastradas.
 */
function listarTarefas() {
  return tarefas;
}

/**
 * Busca uma tarefa pelo código usando o método find.
 * Lança erro se não encontrar.
 */
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find(
    (tarefa) => tarefa.codigo === Number(codigo)
  );

  if (!tarefaEncontrada) {
    throw new Error(`Código ${codigo} não encontrado.`);
  }

  return tarefaEncontrada;
}

/**
 * Conclui uma tarefa pelo código.
 * Impede conclusão duplicada.
 */
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já estava concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

/**
 * Altera a prioridade de uma tarefa existente.
 * Reutiliza a função de validação.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reutiliza a validação passando o título já existente da tarefa
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = Number(novaPrioridade);
  return tarefa;
}

// ==========================================
// INTEGRAÇÃO COM A INTERFACE (DOM)
// ==========================================

const inputTitulo = document.getElementById("inputTitulo");
const inputPrioridade = document.getElementById("inputPrioridade");
const btnCadastrar = document.getElementById("btnCadastrar");
const msgCadastro = document.getElementById("msgCadastro");

const btnListar = document.getElementById("btnListar");
const listaTarefas = document.getElementById("listaTarefas");

const inputCodigoConcluir = document.getElementById("inputCodigoConcluir");
const btnConcluir = document.getElementById("btnConcluir");
const msgConcluir = document.getElementById("msgConcluir");

const inputCodigoPrioridade = document.getElementById("inputCodigoPrioridade");
const inputNovaPrioridade = document.getElementById("inputNovaPrioridade");
const btnAlterarPrioridade = document.getElementById("btnAlterarPrioridade");
const msgPrioridade = document.getElementById("msgPrioridade");

// Função auxiliar para exibir mensagens
function exibirMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
}

// --- Cadastrar ---
btnCadastrar.addEventListener("click", () => {
  const titulo = inputTitulo.value.trim();
  const prioridade = Number(inputPrioridade.value);

  try {
    const tarefa = cadastrarTarefa(titulo, prioridade);
    exibirMensagem(
      msgCadastro,
      `Tarefa "${tarefa.titulo}" cadastrada com código ${tarefa.codigo}.`,
      "sucesso"
    );
    inputTitulo.value = "";
    inputPrioridade.value = "";
  } catch (erro) {
    exibirMensagem(msgCadastro, erro.message, "erro");
  }
});

// --- Listar ---
btnListar.addEventListener("click", () => {
  const todas = listarTarefas();
  listaTarefas.innerHTML = "";

  if (todas.length === 0) {
    listaTarefas.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>";
    return;
  }

  todas.forEach((tarefa) => {
    const li = document.createElement("li");
    if (!tarefa.status) li.classList.add("concluida");

    li.innerHTML = `
      <span><strong>#${tarefa.codigo}</strong> - ${tarefa.titulo}</span>
      <span>
        <span class="badge prioridade-${tarefa.prioridade}">P${tarefa.prioridade}</span>
        <span class="status ${tarefa.status ? "" : "concluida"}">
          ${tarefa.status ? "Em execução" : "Concluída"}
        </span>
      </span>
    `;
    listaTarefas.appendChild(li);
  });
});

// --- Concluir ---
btnConcluir.addEventListener("click", () => {
  const codigo = inputCodigoConcluir.value;

  try {
    const tarefa = concluirTarefa(codigo);
    exibirMensagem(
      msgConcluir,
      `Tarefa "${tarefa.titulo}" concluída com sucesso!`,
      "sucesso"
    );
    inputCodigoConcluir.value = "";
  } catch (erro) {
    exibirMensagem(msgConcluir, erro.message, "erro");
  }
});

// --- Alterar Prioridade ---
btnAlterarPrioridade.addEventListener("click", () => {
  const codigo = inputCodigoPrioridade.value;
  const novaPrioridade = Number(inputNovaPrioridade.value);

  try {
    const tarefa = alterarPrioridade(codigo, novaPrioridade);
    exibirMensagem(
      msgPrioridade,
      `Prioridade da tarefa "${tarefa.titulo}" alterada para ${tarefa.prioridade}.`,
      "sucesso"
    );
    inputCodigoPrioridade.value = "";
    inputNovaPrioridade.value = "";
  } catch (erro) {
    exibirMensagem(msgPrioridade, erro.message, "erro");
  }
});