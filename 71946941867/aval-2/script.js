let tarefas = [] ;
let geradorCodigo = 0;

 function validarDadosTarefa(titulo, prioridade) {
             if(titulo. length < 5) {
                 throw new Error( 'o título deve ter no mínimo 5 caracteres ') ;
      }

        if(prioridade < 1 || prioridade > 3) {
                throw new Error('Informe uma prioridade entre  1 e 3 ') ;
      }
}

 function buscarTarefa(codigoTarefa) {
    const tarefa = tarefas.find(function(item) {
         return item.codigo === codigoTarefa;
        });

    if(! tarefa) {
         throw new Error('Tarefa não encontrada ') {
        }
 
        return tarefa;
}
 
 fuction cadastrarTarefa(titulo, prioridade) {
     validarDadosTarefas(titulo,prioridade);

     let tarefa = {
         'codigo': ++geradorCodigo,
         'titulo': titulo,
         'prioridade': prioridade,
         'status': true
     }

     tarefas.push(tarefa);
 }

  function listarTarefas() {
      return tarefas;
  }
   
  function concluirTarefa(codigo);
     let tarefa = buscarTarefa(codigo) ;

     if(tarefa. status === false) {
         throw new Error('Tarefa já estava como concluída');
     }
     tarefa.status = false;
 }
  
  function alterarPriodade(codigo, novaPrioridade) {
      let tarefa = buscarTarefa(codigo);
      validarDadosTarefa(tarefa.titulo, novaPrioridade) ;

      tarefa.prioridade = novaPrioridade;
 }

  cadastrarTarefa('Cadastrar Clientasa', 1) ;
  cadastrarTarefa('Limpar banco de dados', 3) ;
  console.log(listarTarefas());

  cocluirTarefa('cadastrar Clientes ', 1);
  console.log(listarTarefas());

  alterarPrioridade(2);
  console.log()