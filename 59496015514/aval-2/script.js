
// =====================================================
// AVALIAÇÃO 2 - PROJETO GERENCIADOR DE TAREFAS
// Tema: Tarefas da Escola
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
    throw new Error("O título precisa ter pelo menos 8 caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Escolha uma prioridade entre 1 e 3");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigo) {
  const tarefaEncontrada = listaDeTarefas.find((t) => t.codigo === codigo);

  if (!tarefaEncontrada) {
    throw new Error("Não encontramos uma tarefa com esse código");
  }

  return tarefaEncontrada;
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UMA NOVA TAREFA
// O código e o status são definidos pelo algoritmo
// -----------------------------------------------------
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo = ultimoCodigo + 1;

  let novaTarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução | false = concluída
  };

  listaDeTarefas.push(novaTarefa);
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
  const tarefaEncontrada = buscarTarefa(codigo);

  if (tarefaEncontrada.status === false) {
    throw new Error("Essa tarefa já foi finalizada");
  }

  tarefaEncontrada.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// Reaproveita a validação, usando o título já cadastrado
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefaEncontrada = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefaEncontrada.titulo, novaPrioridade);

  tarefaEncontrada.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
console.log(listarTarefas());

// Cadastrando tarefas escolares
cadastrarTarefa("Estudar matemática", 1);
cadastrarTarefa("Fazer trabalho", 2);
cadastrarTarefa("Organizar cadernos", 3);

console.log(listarTarefas());

// Concluindo a tarefa de código 1
// Status passa de true para false
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

// cadastrarTarefa("Ler", 2);                  // título muito curto
// cadastrarTarefa("Estudar lógica", 5);       // prioridade fora de 1 a 3
// concluirTarefa(1);                          // tarefa já concluída
// concluirTarefa(10);                         // código não encontrado
// alterarPrioridade(10, 2);                   // código não encontrado
// alterarPrioridade(2, 4);                    // prioridade inválida
