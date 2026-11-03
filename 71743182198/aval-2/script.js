let tarefas = [];
let geradorCodigo = ();

function validarDadosTarefa (titulo, prioridade) {
    if (titulo.lenght < 5) {
        throw  new Error('o título deve uma prioridade > 3) {
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error ('Informe uma prioridade entre 1 e 3');
    }
    }

    function buscarTarefa(codigoTarefa) {
const tarefa = tarefas.find(function(item){
    return item.codigo === codigoTarefa;
});
if(!tarefa) {
throw new Error ('Tarefa não encontrada');
}
return tarefa;
}

function cadastrarTarefa (titulo, prioridade){
    validarDadosTarefa(titulo,prioridade);
    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true 
          };
          tarefas.push (tarefa);
           }

           function listarTarefas(codigo) {
            return tarefas;
           }

           function concluirTarefa (codigo) {
            let tarefa = buscarTarefa (codigo);
            if (tarefa.status === false) {
                throw new Error ('Tarefa já estava como concluída');
            }
            tarefa.status = false;
           }

           function alterarPrioridade (codigo, novaPrioridade) {
            let tarefa = buscarTarefa (codigo);
            validarDadosTarefa (tarefa.titulo, novaPrioridade);
            tarefa.prioridade = novaPrioridade;
           }

           function excluirTarefa(codigo) {
            let indice = tarefas.findIndex (function(item) {
                return item.codigo === codigo;
            });
            if (indice === -1) {
                throw new Error ('Tarefa não encontrada');
             }
             tarefas.splice(indice, 1);
             console.log('Tarefa excluída com sucesso!');
           }
           cadastrarTarefa ('Cadastrar Clientes',1);