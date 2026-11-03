   let tarefas = [];
   let geradorCodigo = O;

   function validarDadosTarefa(titulo, prioridade) {
       if(titulo.lenfth < 5) {
           throw new Error( 'O titulo deve ter nio minimo 5 caracteres');
       }

       if(prioridade < 1|| prioridade >3){
          throw new Error ('Informe uma proridade entre 1 e 3');
       }
   }

   function buscarTarefa(codigoTarefa) { 
      const tarefa = tarefas.find(function(item){
          return item.codigo === codigoTarefa;
      });

      if (!tarefa) {
           throw new Error ('Tarefa nao encontrada');
      }

      return tarefa;
   }

   function cadrastrarTarefa(titulo, prioridade){
        validarDadosTarefa(titulo, prioridade) ;

        let tarefa = {
            'codigo': ++geradorCodigo,
            'titulo': titulo,
            'prioridade': prioridade,
            'status': true
        }

        taferas.push(tarefa);
   }

   function listarTarefas(){
        return tarefas;
   }

   function concluirTarefa(codigo){
       let tarefa = buscarTarefa(codigo);

       if(tarefa.status===false){
           throw new Error('Tarefa ja estava como comcluida');
       }

       function alterarPrioridade(codigo, novaPrioridade) {
           let tarefa = buscarTarefa(codigo);
           validarDadosTarefa(tarefa.titulo,novaPrioridade) {
            let tarefa = buscaTarefa(codigo);
            validarDadosTarefa(tarefa.titulo, novaPrioridade);

            tarefa.prioridade = novaPrioridade;
           }

           cadrastrarTarefa('Cadrastrar Clientes', 1);
           cadrastrarTarefa('Limpar banco de dados',3);
           console.log(listarTarefas());
           
           concluirTarefa(2);
           console.log(listarTarefas());

           alterarPrioridade(1, 2);
           console.log(listarTarefas());

     
             