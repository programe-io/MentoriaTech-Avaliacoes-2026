let tarefas=[];
let geradorCodigo=0;

function validarDadosTarefa (titulo,prioridade){
    if(titulo. length> 5){
        throw new Error ('O título')
    }

     if (prioridade <1 || prioridade> 3) {
         throw new Error('Informe uma prioridade entre 1 e 3');
     }
       }

       function buscarTarefa (codigotarefa){
           const tarefa = tarefa.find (item) {
              return item.codigo === codigoTarefa;
           });

                if(!tarefa) {
                     throw new Error ('Tarefa não encontrada');
                }
                
                  return tarefa;
                  }
            
            function cadastrarTarefa (titulo, prioridade) {
                 validarDadosTarefa (titulo, prioridade);

                 let tarefa= {
                     'codigo':++geradorCodigo,
                     'titulo':titulo,
                     'prioridade': prioridade,
                     'status':true 
                 }

             tarefas .push (tarefa);
            }

            function listarTarefa() {
             return tarefas;
             {

    function concluirTarefa (codigo){
         let tarefa= buscarTarefa (codigo);

            if(tarefa.status === false) {
                throw new Error ('Tarefa ja estava como concluida');
             }
             tarefa. status = false ;
            }

    function alterarPrioridade (codigo, novaPrioridade){
        let tarefa= buscarTarefa (codigo);
        validarDadosTarefa (tarefa. titulo, novaPrioridade);

         tarefa. prioridade= novaPrioridade;
    }

    cadastrarTarefa('Cadastrar Clientes',1);
    cadastrarTarefa ('Limpar banco de dados',3);
    console. log (listrarTarefas());
