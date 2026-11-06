// =====================================================
// AVALIAÇÃO 2 - GERENCIADOR DE TAREFAS EM JAVASCRIPT
// Tema: Tarefas da Escola
// Ambiente de execução: Programiz (JavaScript)
// =====================================================

// Variável que guarda todas as tarefas
let listaDeTarefas = [];

// Gerador de códigos para as tarefas
let ultimoCodigo = 0;

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 8) {
    throw new Error("O título precisa ter pelo menos oito caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser 1, 2 ou 3");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigoTarefa) {
  const tarefaEncontrada = listaDeTarefas.find(
    (tarefa) => tarefa.codigo === codigoTarefa
  );

  if (!tarefaEncontrada) {
    throw new Error("Não encontramos essa tarefa na lista");
  }

  return tarefaEncontrada;
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UMA NOVA TAREFA
// -----------------------------------------------------
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo = ultimoCodigo + 1;

  let novaTarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  listaDeTarefas.push(novaTarefa);
}

// -----------------------------------------------------
// FUNÇÃO PARA LISTAR TODAS AS TAREFAS
// -----------------------------------------------------
function listarTarefas() {
  console.log(listaDeTarefas);
}

// -----------------------------------------------------
// FUNÇÃO PARA CONCLUIR UMA TAREFA
// -----------------------------------------------------
function concluirTarefa(codigoTarefa) {
  const tarefa = buscarTarefa(codigoTarefa);

  tarefa.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// -----------------------------------------------------
function alterarPrioridade(codigoTarefa, novaPrioridade) {
  validarDadosDaTarefa("Tarefa escolar", novaPrioridade);

  const tarefa = buscarTarefa(codigoTarefa);

  tarefa.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Listando tarefas antes de cadastrar
listarTarefas();

// Cadastrando tarefas escolares
cadastrarTarefa("Estudar para prova", 1);
listarTarefas();

cadastrarTarefa("Fazer trabalho escolar", 2);
listarTarefas();

cadastrarTarefa("Organizar material escolar", 3);
listarTarefas();

// Alterando a prioridade da tarefa de código 2
alterarPrioridade(2, 1);
listarTarefas();

// Concluindo a tarefa de código 1
concluirTarefa(1);
listarTarefas();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// Cada uma interrompe o programa com uma mensagem de erro.
// -----------------------------------------------------

// cadastrarTarefa("Prova", 1);                  // título muito curto
// cadastrarTarefa("Estudar matemática", 5);     // prioridade inválida
// alterarPrioridade(2, 8);                      // prioridade inválida
// concluirTarefa(10);                           // tarefa não encontrada
// alterarPrioridade(15, 2);                     // tarefa não encontrada
