let tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {

    const tarefaBuscada = tarefas.find(t => t.codigo === codigo);
    
    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado.");
    }
    
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    geradorDeCodigo++; 

    let novaTarefa = {
        codigo: geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true 
    };

    tarefas.push(novaTarefa);
    console.log(`Tarefa "${titulo}" cadastrada com sucesso!`);
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo); 

    if (tarefa.status === false) {
        throw new Error("A tarefa já estava como concluída.");
    }
    
    tarefa.status = false;
    console.log(`Tarefa "${tarefa.titulo}" concluída com sucesso!`);
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo); 

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
    console.log(`Prioridade da tarefa "${tarefa.titulo}" alterada para ${novaPrioridade}.`);
}

console.log("--- CADASTRANDO TAREFAS ---");
cadastrarTarefa("Cadastrar clientes", 1);
cadastrarTarefa("Limpar o banco de dados", 3);

console.log("\n--- LISTA INICIAL ---");
console.log(listarTarefas());

console.log("\n--- CONCLUINDO TAREFA (Código 1) ---");
concluirTarefa(1);
console.log(listarTarefas()); 

console.log("\n--- ALTERANDO PRIORIDADE (Código 1 para prioridade 2) ---");
alterarPrioridade(1, 2);
console.log(listarTarefas()); 