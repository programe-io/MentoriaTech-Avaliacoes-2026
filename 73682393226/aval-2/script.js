
// =====================================================
// AVALIAÇÃO 2 - GERENCIADOR DE TAREFAS ESCOLARES
// Ambiente de execução: Programiz (JavaScript)
// =====================================================

// Lista que guarda todas as tarefas cadastradas
let listaDeTarefas = [];

// Gerador de código independente (começa em zero)
let ultimoCodigo = 0;

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// Prioridade: 1 = mais alta, 3 = mais baixa
// O título deve possuir no mínimo 8 caracteres
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {

  if (titulo.length < 8) {
    throw new Error("O título precisa ter pelo menos 8 caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigo) {

  const tarefa = listaDeTarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Não existe tarefa cadastrada com esse código.");
  }

  return tarefa;
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UMA NOVA TAREFA
// O código e o status são definidos pelo algoritmo
// -----------------------------------------------------
function cadastrarTarefa(titulo, prioridade) {

  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo = ultimoCodigo + 1;

  let novaTarefaEscolar = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução | false = concluída
  };

  listaDeTarefas.push(novaTarefaEscolar);
}

// -----------------------------------------------------
// FUNÇÃO PARA LISTAR AS TAREFAS
// Ela RETORNA o array. Quem mostra na tela é o console.log
// -----------------------------------------------------
function listarTarefas() {

  return listaDeTarefas;
}

// -----------------------------------------------------
// FUNÇÃO PARA CONCLUIR UMA TAREFA
// -----------------------------------------------------
function concluirTarefa(codigo) {

  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já foi finalizada.");
  }

  tarefa.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// Reaproveita a validação, usando o título já cadastrado
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {

  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

console.log("===== GERENCIADOR DE TAREFAS ESCOLARES =====");

// Lista vazia no início
console.log(listarTarefas());

// Cadastrando três tarefas escolares
cadastrarTarefa("Estudar para matemática", 1);
cadastrarTarefa("Fazer trabalho de história", 2);
cadastrarTarefa("Revisar conteúdo de biologia", 3);

console.log(listarTarefas());

// Concluindo a tarefa de código 1
// O status passa de true para false
concluirTarefa(1);

console.log(listarTarefas());

// Alterando a prioridade da tarefa de código 2
alterarPrioridade(2, 1);

console.log(listarTarefas());

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// Cada uma interrompe o programa com uma mensagem de erro.
// -----------------------------------------------------

// cadastrarTarefa("Ler", 2);                     // título muito curto
// cadastrarTarefa("Estudar lógica", 5);           // prioridade inválida
// concluirTarefa(1);                              // tarefa já concluída
// concluirTarefa(10);                             // código não encontrado
// alterarPrioridade(10, 2);                       // código não encontrado
// alterarPrioridade(2, 4);                        // prioridade inválida
