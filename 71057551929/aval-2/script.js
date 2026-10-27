let tarefas = [];
let geradorcodigo = 0;

function validardadostarefa(titulo, prioridade) {
  if (titulo.length < 5) {
     throw new Error('o titulo deve ter no mínimo 5 caracteres');
  }

  if (prioridade < 1 || prioridade > 3) {
     throw new Error('informe uma prioridade entre 1 e 3');
  }
}

function cadastrartarefa(titulo,prioridade) {
  validardadostarefa(titulo,prioridade);

  let tarefa ={
     'codigo':++geradorcodigo,
     'titulo':titulo,
     'prioridade':prioridade,
     'status':true
  }

  tarefas.push(tarefa);
}

function listartarefas() {
  return tarefas;
}

// implementação incluída para completar o código
function buscartarefa(codigo) {
  let tarefa =tarefas.find(t => t.codigo ===codigo);

  if (!tarefa) {
     throw new Error('tarefa não encontrada');
  }

  return tarefa;
}

function concluirtarefa(codigo) {
    let tarefa =buscartarefa(codigo);

    if (tarefa.status ===false) {
        throw new Error('tarefa já estava como concluída');
    }

    tarefa.status =false;
}

function alterarprioridade(codigo, novaprioridade) {
  let tarefa =buscartarefa(codigo);

  validardadostarefa(tarefa.titulo, novaprioridade);

  tarefa.prioridade = novaprioridade;
}

// testes
cadastrartarefa('cadastrar,clientes', 1);
console.log(listartarefas());

alterarprioridade(1,2);

console.log(listartarefas());