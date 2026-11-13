
// =====================================================
// AVALIAÇÃO 2 - GERENCIADOR DE TAREFAS
// Tema: Organização de Estudos
// Ambiente: Programiz (JavaScript)
// =====================================================

// Lista que armazena as atividades
let listaDeTarefas = [];

// Gerador de código independente
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
// Ela retorna o array de tarefas
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
    throw new Error("Essa atividade já foi finalizada");
  }

  tarefa.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// Reaproveita a validação dos dados
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Consultando a lista inicialmente
console.log(listarTarefas());

// Cadastrando tarefas de organização dos estudos
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Revisar conteúdo", 2);
cadastrarTarefa("Organizar cadernos", 3);

console.log(listarTarefas());

// Concluindo a tarefa de código 1
concluirTarefa(1);
console.log(listarTarefas());

// Alterando a prioridade da tarefa de código 2
alterarPrioridade(2, 1);
console.log(listarTarefas());

// -----------------------------------------------------
// TESTES DE ERRO
// Retire o comentário de uma linha por vez para testar
// -----------------------------------------------------

// cadastrarTarefa("Ler", 2);                  // título muito curto
// cadastrarTarefa("Estudar programação", 5);  // prioridade inválida
// concluirTarefa(1);                          // tarefa já concluída
// concluirTarefa(10);                         // código inexistente
// alterarPrioridade(10, 2);                   // código inexistente
// alterarPrioridade(2, 4);                    // prioridade inválida
