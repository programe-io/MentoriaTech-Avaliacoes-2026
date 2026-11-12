let tarefas=[]
let geradorCodigo=0;
function validarDadosTarefa(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('informe uma prioridade entre 1 e 3';
         }
}
function buscarTarefas(codigoTarefa){
    const tarefaBuscada=tarefa.find(t=>t.codigo===codigoTarefa);
    if(!tarefaBuscada){
        throw new Error('Codigo de tarefa nao encontrado');
    }
    return tarefaBuscada;
    }
    function cadastrarTarefa(titulo,prioridade){
        validarDadosTarefa(titulo,prioridade);
        let tarefa={
            'codigo':++geradorCodigo,
            'titulo':titulo,
            'prioridade':prioridade,
            'status':true
        }
        tarefas.push(tarefa);
    }
    function listrarTarefas(){
        return tarefas;
    }
    function concluirTarefa(codigo){
        let tarefa=buscarTarefa(codigo);
        if(tarefa.status===false){
            throw new Error('Tarefa ja estava como concluida');
               }
               tarefa.status=false;
    }
    function alterarPrioridade(codigo,novaPrioridade){
        let tarefa=buscarTarefa(codigo);
        validarDadosTarefas(tarefa.titulo,novaPrioridade);
        tarefa.prioridade=novaPrioridade
    }
cadastrarTarefa('Cadastrar Clientes',1);
console.log(listrarTarefas());
alterarPrioridade(1,2);
console.log(listarTarefas());