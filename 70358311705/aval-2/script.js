// =====================================================
// AVALIAÇÃO 2 - PROJETO GERENCIADOR DE TAREFAS EM JAVASCRIPT
// Tema: Tarefas da Escola
// Ambiente de execução: Programiz (JavaScript)
// =====================================================

// Lista que guarda todas as tarefas cadastradas
let listaDeTarefas = [];

// Gerador de código independente (começa em zero)
let ultimoCodigo = 0;

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 8 || prioridade < 1 || prioridade > 3) {
    throw new Error("Título ou prioridade inválidos. Confira os dados!");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigo) {
  const tarefaEncontrada = listaDeTarefas.find(
    (tarefa) => tarefa.codigo === codigo
  );

  return tarefaEncontrada;
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UMA NOVA TAREFA
// -----------------------------------------------------
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  // Gera um código único para cada tarefa
  ultimoCodigo = ultimoCodigo + 1;

  let tarefaCadastrada = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  listaDeTarefas.push(tarefaCadastrada);
}

// -----------------------------------------------------
// FUNÇÃO PARA LISTAR TODAS AS TAREFAS
// -----------------------------------------------------
function listarTarefas() {
  console.log(listaDeTarefas);
}

// -----------------------------------------------------
// FUNÇÃO PARA CONCLUIR UMA TAREFA
// status false significa tarefa concluída
// -----------------------------------------------------
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa) {
    tarefa.status = false;
  } else {
    throw new Error("Não encontramos uma tarefa com esse código!");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa) {
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
  } else {
    throw new Error("Não foi possível localizar essa tarefa!");
  }
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
listarTarefas();

// Cadastrando tarefas da escola
cadastrarTarefa("Estudar para a prova", 1);
listarTarefas();

cadastrarTarefa("Fazer atividade de JavaScript", 2);
listarTarefas();

cadastrarTarefa("Organizar material escolar", 3);
listarTarefas();

// Concluindo a tarefa de código 2
concluirTarefa(2);
listarTarefas();

// Alterando a prioridade da tarefa de código 3
alterarPrioridade(3, 1);
listarTarefas();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// -----------------------------------------------------

// cadastrarTarefa("Prova", 1);              // título muito curto
// cadastrarTarefa("Estudar matemática", 5); // prioridade inválida
// concluirTarefa(10);                       // tarefa não encontrada
// alterarPrioridade(10, 2);                 // tarefa não encontrada
// alterarPrioridade(1, 5);                  // prioridade inválida