// =====================================================
// AVALIAÇÃO 2 - GERENCIADOR DE TAREFAS EM JAVASCRIPT
// Tema: Tarefas Escolares
// Ambiente de execução: Programiz (JavaScript)
// =====================================================

// Lista que guarda todas as tarefas cadastradas
let listaDeTarefas = [];

// Gerador de código independente (começa em zero)
let ultimoCodigo = 0;

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// Prioridade: 1 = mais alta, 3 = mais baixa
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 8) {
    throw new Error("O título precisa ter pelo menos 8 caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Escolha uma prioridade entre 1 e 3.");
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

  let tarefaCriada = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução | false = concluída
  };

  listaDeTarefas.push(tarefaCriada);
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
    throw new Error("Esta tarefa já foi finalizada anteriormente.");
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

// Exibindo a lista inicialmente vazia
console.log(listarTarefas());

// Cadastrando tarefas escolares
cadastrarTarefa("Revisar conteúdo de JavaScript", 1);
cadastrarTarefa("Organizar material escolar", 2);
cadastrarTarefa("Entregar trabalho de história", 3);

console.log(listarTarefas());

// Concluindo a tarefa de código 1 (status passa de true para false)
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

// cadastrarTarefa("Ler", 2);                         // título muito curto
// cadastrarTarefa("Estudar lógica de programação", 5); // prioridade inválida
// concluirTarefa(1);                                 // tarefa já concluída
// concluirTarefa(10);                                // código não encontrado
// alterarPrioridade(10, 2);                          // código não encontrado
// alterarPrioridade(2, 4);                           // prioridade inválida