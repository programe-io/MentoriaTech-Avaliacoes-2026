// Variáveis globais inferidas a partir do código da imagem
let tarefas = [];
let geradorCodigo = 0;

// 1. Validação dos dados (corrigida a condição da linha 7)
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

// 2. Busca uma tarefa pelo código
function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

// 3. Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true // true = ativa/pendente | false = concluída
    };

    tarefas.push(tarefa);
    return tarefa;
}

// --- FUNÇÕES COMPLEMENTARES ---

// 4. Lista todas as tarefas (com opção de filtrar por status)
function listarTarefas(apenasAtivas = false) {
    if (apenasAtivas) {
        return tarefas.filter(t => t.status === true);
    }
    return tarefas;
}

// 5. Atualiza o título e a prioridade de uma tarefa existente
function editarTarefa(codigoTarefa, novoTitulo, novaPrioridade) {
    const tarefa = buscarTarefa(codigoTarefa);
    validarDadosTarefa(novoTitulo, novaPrioridade);

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;
    return tarefa;
}

// 6. Altera o status da tarefa (ex: marcar como concluída)
function concluirTarefa(codigoTarefa) {
    const tarefa = buscarTarefa(codigoTarefa);
    tarefa.status = false;
    return tarefa;
}

// 7. Remove uma tarefa da lista
function excluirTarefa(codigoTarefa) {
    const indice = tarefas.findIndex(t => t.codigo === codigoTarefa);

    if (indice === -1) {
        throw new Error('Código de tarefa não encontrado');
    }

    const tarefaRemovida = tarefas.splice(indice, 1);
    return tarefaRemovida[0];
}

// --- EXEMPLO DE USO ---
try {
    cadastrarTarefa('Estudar JavaScript', 1);
    cadastrarTarefa('Fazer exercícios físicos', 2);
    
    console.log('Tarefas cadastradas:', listarTarefas());
    
    editarTarefa(1, 'Estudar JavaScript Avançado', 1);
    concluirTarefa(2);
    
    console.log('Após edição e conclusão:', listarTarefas());
    
    excluirTarefa(2);
    console.log('Após exclusão:', listarTarefas());
} catch (erro) {
    console.error('Erro:', erro.message);
}