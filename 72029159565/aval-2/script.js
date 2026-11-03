let tarefas = [];
// let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error ('Informe uma prioridade entre 1 e 3 ');
    }

    if(prioriade < 1|| prioridade > 3) {
        throw new Error('Informe uma prioriedade entre 1 e 3') ;
    }
}

    function buscarTarefa (codigoTarefa) {
        const tarefa = tarefas.find(function (item) {
            return item.codigo === codigoTarefa;
        });
        
        if(!tarefa) {
            throw new Error ( 'Tarefa nao encontrada') ;
        }
        
        return tarefa;
    }

    function cadastrarTarefa(titulo, prioridade){
        validarDadosTarefa(titulo, prioridade) ;

        let tarefa = {
            'codigo' : ++geradourCodigo,
            'titulo' : titulo,
            'prioridade' : prioridade,
            'status' : true 
        }

        tarefas.push(tarefa) ;
    }

    function listarTarefas() {
        return tarefas;
    }

    function concluirTarefa(codigo) {
        let tarefa = buscarTarefa (codigo) ;

        if(tarefa.status === false) {
            throw new Error ('Tarefa ja estava como concluida');
            }
            tarefa.status = false;
    }
    
    function alterarPrioridade(codigo, novaPrioridade) {
        let tarefa.status = false;
        validarDadosTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;
    }

    cadastrarTarefa('Cadastrar Clientes', 1);
    cadastrarTarefa('Limpar banco de dados', 3);
    console.long (listarTarefas());

    concluirTarefa(2);
    console.long(listarTarefas());

    alterarPrioridade(1, 2);
    console.long(listarTarefas());




    