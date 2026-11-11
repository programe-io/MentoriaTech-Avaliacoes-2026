
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
    if(titulo.length < 5){
        throw new Error('O título deve ter no mínimo 5 caracteres.');
    }
    if(prioridade < 1 || prioridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3.');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado.');
    }
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);
    
    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true 
    };
    
    tarefas.push(tarefa);
    console.log(`> Tarefa "${titulo}" cadastrada com sucesso!`);
}

function listarTarefas(){
    return tarefas;
}


function exibirTarefasFormatadas(){
    if (tarefas.length === 0) {
        console.log("\nNenhuma tarefa cadastrada.");
        return;
    }
    
    console.log("\n--- LISTA DE TAREFAS ---");
    tarefas.forEach(t => {
        let statusTexto = t.status ? "Pendente" : "Concluída";
        console.log(`[ID: ${t.codigo}] ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${statusTexto}`);
    });
    console.log("------------------------\n");
}

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);
    
    if (!tarefa.status) {
        throw new Error('Esta tarefa já estava como concluída.');
    }
    
    tarefa.status = false;
    console.log(`> Tarefa ID ${codigo} marcada como concluída!`);
}

function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    
    if(novaPrioridade < 1 || novaPrioridade > 3){
        throw new Error('Informe uma prioridade válida entre 1 e 3.');
    }
    
    tarefa.prioridade = novaPrioridade;
    console.log(`> Prioridade da tarefa ID ${codigo} alterada para ${novaPrioridade}.`);
}

function removerTarefa(codigo){
    let index = tarefas.findIndex(t => t.codigo === codigo);
    if(index === -1){
        throw new Error('Código de tarefa não encontrado para remoção.');
    }
    let removida = tarefas.splice(index, 1);
    console.log(`> Tarefa "${removida[0].titulo}" removida com sucesso!`);
}

function filtrarPorStatus(statusDesejado){
    return tarefas.filter(t => t.status === statusDesejado);
}


cadastrarTarefa('Estudar JavaScript', 3);
cadastrarTarefa('Fazer compras no mercado', 2);
cadastrarTarefa('Pagar contas de consumo', 1);

exibirTarefasFormatadas();

alterarPrioridade(1, 1);

concluirTarefa(2);

exibirTarefasFormatadas();