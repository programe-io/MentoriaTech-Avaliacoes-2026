let tarefas = [];
let gerador = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length <5) {
        throw new Error('O titulo deve ter no mínimo 5 caracteres');
    
  }
 if(prioridade <1 || prioridade >3) {
    throw new Error('Informe uma prioridade entre 1 e 3');

  }
}
function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);

  let tarefa = {
   'codigo': ++geradorCodigo,
   'título': titulo,
   'prioridade': prioridade,
   'status': true
  };

  tarefas.push(tarefa);

}

function listarTarefas() {
  return tarefas;
}

// Implementação incluida para completar o código
function buscarTarefa(codigo) {
  let tarefa = tarefas.find(t=> t.codigo === codigo);

if (!tarefa) {
  throw new Error('Tarefa não encontrada');

}

return tarefa;

}

function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error('Tarefa já estava como concluída');

  }

  tarefa.status = false;

}

function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);


  validarDadosTarefa(tarefa,titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// Tarefas
 cadastrarTarefa('Cadastrar Clientes', 1);
 console.log(listarTarefas());


 alterarPrioridade(1, 2);
 console.log(listarTarefas());
 