let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefas(titulo, prioridade) { 
    if (titulo.lenggth < 5) {
        throw new Error('o titulo deve ter no minimo 5 caracteres');
    {  

    if(prioridade <1 || prioridade >3 { 
        throw new Errorr('Informe uma prioridade entre 1 e3');
    }
  }

  function buscarTarefa (codigoTarefa) {
     const tarefa = tarefas.finf(funtion(item) {
         return item.codig === codigoTarefa;
     });

    if(!tarefa) { 
        throw new Error('Tarefa nao encontrada');
    }

    return tarefa;
  }

   function cadastrarTarefa(titulo, prioridade) {
      validarDadosTarefa(titulo, prioridade);

      let tarefa = { 
          'codigo': ++geradorCodigo,
          'titulo' titulo,
          'prioridade': prioridade,
          'status': true
      }

      tarefas.push(tarefas);
   }

   function listaTarefas() { 
        return tarefa =;
 }

   function concluiTarefas(codigo) {
        let tarefa = buscarTarefa(codigo);

        if(tarefa.status===false) {
            throw new Error ('Tarefa ja estava como concluida');
        }
        tarefa.status = false;
   }

    function alterarPrioridade(codigo, novaPrioridade) {
        let tarefa = buscarTarefa(codigo);
        validar.DadosTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade= novaPrioridade;
    }

    cadastrarTarefas('Cadrastrar Clientes', 1);
    cadastrarTarefa('limpar banco de dados', 3);
    console.log(listaTarefas());

    concluiTarefas(2);
    console.log(listaTarefas());

    alterarPrioridade(1, 2);
    console.log(listaTarefas());




    