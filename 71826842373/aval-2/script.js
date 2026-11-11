let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
        throw new Error('O título da tarefa é obrigatório e deve ser um texto válido.');
    }

    const prioridadesValidas = ['baixa', 'media', 'alta'];
    if (!prioridadesValidas.includes(prioridade.toLowerCase())) {
        throw new Error('Prioridade inválida. Escolha entre: baixa, media ou alta.');
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function atualizarTarefa(codigoTarefa, novoTitulo, novaPrioridade) {
    const tarefa = buscarTarefa(codigoTarefa);
    validarDadosTarefa(novoTitulo, novaPrioridade);

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;
    return tarefa;
}

function alterarStatusTarefa(codigoTarefa) {
    const tarefa = buscarTarefa(codigoTarefa);
    tarefa.status = !tarefa.status;
    return tarefa;
}

function excluirTarefa(codigoTarefa) {
    buscarTarefa(codigoTarefa);
    
    const indice = tarefas.findIndex(t => t.codigo === codigoTarefa);
    tarefas.splice(indice, 1);
}

// ==========================================
// EXEMPLO DE USO E TESTES
// ==========================================
try {
    cadastrarTarefa('Estudar JavaScript', 'alta');
    cadastrarTarefa('Fazer exercícios', 'media');
    
    console.log('Lista inicial:', listarTarefas());

    atualizarTarefa(1, 'Estudar Funções em JS', 'alta');
    alterarStatusTarefa(2);
    
    console.log('Após atualizações:', listarTarefas());

    excluirTarefa(1);
    console.log('Após exclusão:', listarTarefas());

} catch (erro) {
    console.error('Erro na operação:', erro.message);
}
