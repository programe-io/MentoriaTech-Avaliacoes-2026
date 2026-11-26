
// AVALIAÇÃO 2 - PROJETO GERENCIADOR DE TAREFAS EM JAVASCRIPT
// Tema: Organização da rotina de estudos
// Ambiente de execução: Programiz

// Lista que guarda todas as atividades cadastradas
let atividades = [];

// Gerador de código independente (começa em zero)
let ultimoCodigo = 0;

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// Prioridade: 1 = mais alta, 3 = mais baixa
// -----------------------------------------------------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 4) {
    throw new Error("O título precisa ter pelo menos quatro caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Escolha uma prioridade de 1 até 3");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// -----------------------------------------------------
function buscarTarefa(codigo) {
  const atividade = atividades.find((t) => t.codigo === codigo);

  if (!atividade) {
    throw new Error("Não foi encontrada uma tarefa com esse código");
  }

  return atividade;
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

  atividades.push(novaTarefa);
}

// -----------------------------------------------------
// FUNÇÃO PARA LISTAR AS TAREFAS
// Ela RETORNA o array. Quem mostra na tela é o console.log
// -----------------------------------------------------
function listarTarefas() {
  return atividades;
}

// -----------------------------------------------------
// FUNÇÃO PARA CONCLUIR UMA TAREFA
// -----------------------------------------------------
function concluirTarefa(codigo) {
  const atividade = buscarTarefa(codigo);

  if (atividade.status === false) {
    throw new Error("Essa atividade já foi finalizada");
  }

  atividade.status = false;
}

// -----------------------------------------------------
// FUNÇÃO PARA ALTERAR A PRIORIDADE DE UMA TAREFA
// Reaproveita a validação, usando o título já cadastrado
// -----------------------------------------------------
function alterarPrioridade(codigo, novaPrioridade) {
  const atividade = buscarTarefa(codigo);

  validarDadosDaTarefa(atividade.titulo, novaPrioridade);

  atividade.prioridade = novaPrioridade;
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
console.log(listarTarefas());

// Cadastrando atividades da rotina de estudos
cadastrarTarefa("Estudar HTML", 1);
cadastrarTarefa("Fazer tarefa", 2);
cadastrarTarefa("Revisar JavaScript", 1);
console.log(listarTarefas());

// Concluindo a atividade de código 1
concluirTarefa(1);
console.log(listarTarefas());

// Alterando a prioridade da atividade de código 2
alterarPrioridade(2, 1);
console.log(listarTarefas());

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// -----------------------------------------------------
// cadastrarTarefa("Ler", 2);                    // título muito curto
// cadastrarTarefa("Estudar lógica", 5);         // prioridade inválida
// concluirTarefa(1);                            // tarefa já concluída
// concluirTarefa(10);                           // código não encontrado
// alterarPrioridade(10, 2);                     // código não encontrado
// alterarPrioridade(2, 4);                      // prioridade inválida
