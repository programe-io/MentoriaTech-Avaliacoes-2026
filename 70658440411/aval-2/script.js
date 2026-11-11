
// Array que guardará na memória todas as tarefas
let tarefas = [];
let geradorCodigo = 0;

// 1. Validação dos dados
function validarDadosTarefa(titulo, prioridade) {
  if (!titulo || titulo.trim().length < 5) {
    throw new Error('O título deve ter no mínimo 5 caracteres');
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error('Informe uma prioridade entre 1 e 3');
  }
}

// 2. Busca por código
function buscarTarefa(codigoTarefa) {
  const tarefaBuscada = tarefas.find(
    t => t.codigo === codigoTarefa
  );

  if (!tarefaBuscada) {
    throw new Error('Código de tarefa não encontrado');
  }

  return tarefaBuscada;
}

// 3. Cadastro de nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);

  let tarefa = {
    codigo: ++geradorCodigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(tarefa);

  console.log('Tarefa cadastrada com sucesso!');
  return tarefa;
}

// 4. Listagem de todas as tarefas
function listarTarefas() {
  console.log('===== LISTA DE TAREFAS =====');
  console.log(tarefas);
  return tarefas;
}

// 5. Atualização de tarefa existente
function atualizarTarefa(
  codigoTarefa,
  novoTitulo,
  novaPrioridade,
  concluida = false
) {
  const tarefa = buscarTarefa(codigoTarefa);

  validarDadosTarefa(novoTitulo, novaPrioridade);

  tarefa.titulo = novoTitulo;
  tarefa.prioridade = novaPrioridade;
  tarefa.concluida = concluida;

  console.log('Tarefa atualizada com sucesso!');
  return tarefa;
}

// 6. Exclusão de tarefa
function removerTarefa(codigoTarefa) {
  const indice = tarefas.findIndex(
    t => t.codigo === codigoTarefa
  );

  if (indice === -1) {
    throw new Error('Código de tarefa não encontrado');
  }

  tarefas.splice(indice, 1);

  console.log('Tarefa removida com sucesso!');
}

// ==================================
// EXECUÇÃO DO PROGRAMA
// ==================================

// Cadastrar tarefas
cadastrarTarefa('Estudar JavaScript', 1);
cadastrarTarefa('Fazer atividade', 2);
cadastrarTarefa('Organizar o quarto', 3);

// Listar tarefas
listarTarefas();

// Buscar uma tarefa
console.log('===== BUSCAR TAREFA =====');
console.log(buscarTarefa(1));

// Atualizar uma tarefa
console.log('===== ATUALIZAR TAREFA =====');
atualizarTarefa(1, 'Estudar programação', 1, true);

// Listar novamente
listarTarefas();

// Remover uma tarefa
console.log('===== REMOVER TAREFA =====');
removerTarefa(2);

// Mostrar lista final
listarTarefas();
