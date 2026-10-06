let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error('O titulo deve ter no minimo 5 caracteres');
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error('Informe uma prioridade entre 1 e 3');
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);

  let tarefa = {
    codigo: ++geradorCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  tarefas.push(tarefa);
}

function buscarTarefa(codigoTarefa) {
  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

  if (!tarefaBuscada) {
    throw new Error('Codigo de tarefa nao encontrado');
  }

  return tarefaBuscada;
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);
  tarefa.status = false;
}

cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);

console.log(listarTarefas());

concluirTarefa(2);

console.log(listarTarefas());