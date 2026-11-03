let tarefas = [] ;
let geradorCodigo = 0;

 function validarDadosTarefas(titulo , prioridade)  {               
    if(titulo. length < 5 ) { 
       throw new Error('o título deve ter no mínimo 5 caracteres'
    } 

    if(prioridade < 1 || prioridade > 3 ) {
        throw new Error('informe uma prioridade entre 1 e 3');
    } 
 }

  function buscarTarefa(codigoTarefa) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigoTarefa;
    })
  
    if(!tarefa){ 
       throw new Error('Tarefa não encontrada');
    }

    return tarefa;
 }

 function cadastrarTarefa( titulo, prioridade){
validarDadosTarefas(titulo,prioridade);

   let tarefa ={
    'codigo':++geradorCodigo,
    'titulo': titulo,
    'prioridade': prioridade ,
    'status':true
   }

   tarefas.push(tarefa);
 }
 
 function listarTarefa(codigo){
    return tarefas ;
 }

 function conculuirTarefas( codigo){
    let tarefa = buscarTarefa(codigo) ;

    if (tarefa.status=== false){
        throw new Error('Tarefa já estava como concluída');
    }
    tarefas.status = false;
  }

 function alterarPrioridade( codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade ;
 }

 cadastrarTarefa('Cadastrar Clientes', 1);
 cadastrarTarefa('Limpar banco de dados', 3 );
 console.log (listarTarefa());

 conculuirTarefas(2);
 console.log(listarTarefas());

 alterarPrioridade(1, 2) ;
 console.log(listarTarefas());
 