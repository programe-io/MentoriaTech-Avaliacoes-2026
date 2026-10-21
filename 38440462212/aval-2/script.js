
let tarefas = [];
let geradorCodigo = 0;


function validarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título da tarefa deve ter pelo menos 5 caracteres.");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

function buscarTarefa(codigo) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigo);

    if (!tarefaBuscada) {
        throw new Error("Codigo de tarefa não encontrado.");
    }
    return tarefaBuscada;
}


function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);

    let tarefa = {
        "codigo": ++geradorCodigo,
        "titulo": titulo,
        "prioridade": prioridade,
        "status": true
    };

    tarefas.push(tarefa);
}


function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já concluída.");
    }

    tarefa.status = false;
}


function alterarTarefa(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}


//.................................................
cadastrarTarefa("Cadastrar Clientes", 1);
console.log(listarTarefas());

alterarTarefa(1, 2);

console.log(listarTarefas());
