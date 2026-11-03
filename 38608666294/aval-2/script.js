// Gerenciador de Tarefas

// Coleção central do projeto
const tarefas = [];

// Gerador de código independente do tamanho do array (evita códigos duplicados)
let geradorDeCodigo = 0;

// Valida título e prioridade. Interrompe com erro se algum dado for inválido.
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

// Localiza uma tarefa pelo código
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((tarefa) => tarefa.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }

  return tarefa;
}

// Cria e adiciona uma nova tarefa
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
  return tarefa;
}

// Retorna as tarefas cadastradas (retornar não é o mesmo que exibir)
function listarTarefas() {
  return tarefas;
}

// Marca uma tarefa como concluída
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

// Altera a prioridade de uma tarefa existente
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reaproveita a validação usando o título já cadastrado
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// Permite usar o arquivo no Node (testes) sem atrapalhar o navegador
if (typeof module !== "undefined") {
  module.exports = {
    validarDadosDaTarefa,
    buscarTarefa,
    cadastrarTarefa,
    listarTarefas,
    concluirTarefa,
    alterarPrioridade,
  };
}