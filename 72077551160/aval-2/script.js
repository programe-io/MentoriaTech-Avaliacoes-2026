
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
// O título deve ter no mínimo 8 caracteres
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 8) {
    throw new Error("O título precisa ter pelo menos oito caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Escolha uma prioridade entre 1 e 3");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigo) {
  const tarefa = listaDeTarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Não existe tarefa com esse código");
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
// Ela retorna o array de tarefas cadastradas
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
    throw new Error("Essa tarefa já foi finalizada");
  }

  tarefa.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// Reaproveita a validação usando o título cadastrado
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
console.log(listarTarefas());

// Cadastrando tarefas escolares
cadastrarTarefa("Estudar matematica", 1);
cadastrarTarefa("Fazer trabalho", 2);
cadastrarTarefa("Revisar portugues", 3);

console.log(listarTarefas());

// Concluindo a tarefa de código 1
concluirTarefa(1);

console.log(listarTarefas());

// Alterando a prioridade da tarefa de código 2
alterarPrioridade(2, 1);

console.log(listarTarefas());

// -----------------------------------------------------
// TESTES DE ERRO
// -----------------------------------------------------

// cadastrarTarefa("Ler", 2); 
// Título com menos de oito caracteres

// cadastrarTarefa("Estudar historia", 5);
// Prioridade fora do intervalo permitido

// concluirTarefa(1);
// Tarefa já finalizada

// concluirTarefa(10);
// Código inexistente

// alterarPrioridade(10, 2);
// Código inexistente

// alterarPrioridade(2, 4);
// Prioridade inválida
