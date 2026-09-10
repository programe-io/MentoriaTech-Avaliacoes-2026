let tarefas = [];
let geradorCodigo = 0;

function validarDadosTerefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O titulo deve ter no mínimo 5 caracteres");
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
    if (!tarefaBuscada) {
        throw new Error("Codigo de tarefa nao encontrado");
    }
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTerefa(titulo, prioridade);
    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };
    tarefas.push(tarefa);
}

function listarTarefa() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);
    if (tarefa.status === false) {
        throw new Error("Tarefa ja estava como comcluída");
    }
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTerefa(tarefa.titulo, novaPrioridade);
    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa("Cadastrar Clientes", 1);
console.log(listarTarefa());
alterarPrioridade(1, 2);
console.log(listarTarefa());
