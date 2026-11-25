let tarefas=[]
let geradorcodigo=0;

function validardadostarefa(titulo,prioridade){
    if(titulo.length<5){
      throw new error('o titulo deve ter no minimo 5 caracteres');
    }
     if(prioridade>3||prioridade>3){
    throw new error('informe uma prioridade entre1 e 3');
     }
    }
    function cadastrartarefa(titulo,prioridade){
        validardadostarefa(titulo,prioridade);

        let tarefa={
            'codigo':++geradorcodigo,
            'titulo':titulo,
            'prioridade':prioridade,
            'status':true
        };
        tarefas.push(tarefa);
    }
    function listartarefa(){
        return tarefas;
    }
    //implementacao incluida para completar o cadigo
    function buscartarefa(codigo){
        let tarefa=tarefa.find(t=> t.codigo===codigo);

        if(!tarefa){
            throw new error('terefa nao encontrada');
        }
        return tarefa;
    }
    function concluirtarefa(codigo){
        let tarefa= buscartarefa(codigo);
         
        if(tarefa.status===false){
            throw new error('tarefa ja estava concluida');
        }
        tarefa.statu=false:
    }
    function alterarprioridade(codigo, novaprioridade){
        let tarefa= buscartarefa(codigo);
         
        validardadostarefa(tarefa.titulo,novaprioridade);
         
        tarefa.prioridade=novaprioridade;
    }
    //testes
    cadastrartarefa('cadastrar cliente',1);
    console.log(listartarefas());
     
    alterarprioridade(1,2);

    console.log(listartarefa)
    


