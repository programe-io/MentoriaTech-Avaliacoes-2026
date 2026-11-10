/*array que vai guardar o conjunto de todas as tarefas*/
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {

    if(titulo.length < 5){
        throw new Error("O titulo deve ter no minimo 5 caracteres");
    }


    if(prioridade < 1 || prioridade > 3){
        throw new Error('informe uma prioridade entre 1 e 3');
    }
}
    function buscarTarefa(codigoTarefa){
        const tarefaBuscada = tarefa.find(codigo === codigoTarefa);
    
        if(!tarefaBuscada){
            throw new Error ('codigo de tarefa não encontrado');
        }

        return tarefaBuscada;
    }

    function cadastrarTarefa(titulo, prioridade){
        validarDadosTarefa(titulo, prioridade);


        let tarefa = {
            'codigo': ++geradorCodigo,
            'titulo': titulo,
            'prioridade': prioridade,
            'status': true,
        }

        tarefas.push(tarefa);
    }

    function listarTarefas(){
        return tarefas;
    }

    function concluirTarefa(codigo) {
        let tarefa = buscarTarefa(codigo);

        if(tarefa.status === false){
            throw new Error ('Tarefa ja estava concluida'); 
        }
        tarefa.status = false;
    }

    function alterarPropriedade(codigo, novaPrioridade){
         let tarefa = buscarTarefa(codigo);
         validarDadosTarefa(tarefa,titulo, novaprioridade);
         
         tarefa.prioridade = novaPrioridade;

    }

    cadastrarTarefa('Cadastrar clientes', 1);
    console.log(listarTarefas());

    alterarPropriedade(1,2);

    console.log(listarTarefas());

    
