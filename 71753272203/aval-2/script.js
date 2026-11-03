let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if(titulo.length < 5) {
        throw new Error ('o titulo deve ter no minimo 5 caracteres');
    {
     
     if(prioridade < 1 || prioridade > 3) {
         throw new Error ('Informe uma prioridade entre 1 e 3');
    {
 } 

 funcion buscarTarefa (codigoTarefa) {
    const tarefa = tarefas.find (function(item) {
        retun item.codigo === codigoTarefa;
    });

    if(!tarefa) {
        throw new Error('tarefa não encontrada');
    }

    return tarefa;
 }

 function cadastrarTarefa(titulo, prioridade){
      validarDadosTarefa(titulo, prioridade);         

      let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
      }

      tarefas.push(tarefa);
 }

 function listarTarefas(){
     return tarefas;
 }

 function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status === false){
        throw new Error('tarefa já estva concluida');
    }
    tarefa.status = false;
 }

 function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade){

    tarefa.prioridade = novaPrioridade
 } 

 cadastrartarefa('Cadastrar Clientes',1);  
 casdatrarTarefa('Limpar banco de dados',3);
 console.log(listarTarefas());

 concluirTarefa(2);
 console.log(listarTarefas());

 alterarPrioridades(1, 2);
 console.log(listarTarefaa());

 cadastrarTarefa('Limpar banco de dados', 3);
 console.log(listarTarefas());

concluirTarefa(2);
console.log(ListarTarefas());

alterarPrioridade(1, 2);
console.log(ListarTarefas());

excluirTarefa(2);
console.log(listarTarefas());