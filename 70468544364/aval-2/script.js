// Lista principal e contador automático de códigos
const tarefas = [];
let geradorCodigo = 0;

// Função auxiliar chamada dentro de cadastrarTarefa (vista na imagem)
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === '') {
        throw new Error('O título da tarefa é obrigatório');
    }
    const prioridadesValidas = ['baixa', 'media', 'alta'];
    if (!prioridadesValidas.includes(prioridade.toLowerCase())) {
        throw new Error('Prioridade inválida. Use: baixa, media ou alta');
    }
}

// 1. Buscar tarefa pelo código (idêntica à imagem)
function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

// 2. Cadastrar nova tarefa (idêntica à imagem)
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true // true = ativa/pendente, false = concluída
    };

    tarefas.push(tarefa);
}

// 3. Listar todas as tarefas (continuação da parte inferior da imagem)
function listarTarefas() {
    return tarefas;
}

// 4. Atualizar título e prioridade de uma tarefa existente
function atualizarTarefa(codigoTarefa, novoTitulo, novaPrioridade) {
    validarDadosTarefa(novoTitulo, novaPrioridade);
    const tarefa = buscarTarefa(codigoTarefa);

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;
}

// 5. Alterar o status da tarefa (concluir ou reabrir)
function alterarStatusTarefa(codigoTarefa, novoStatus) {
    if (typeof novoStatus !== 'boolean') {
        throw new Error('O status deve ser verdadeiro (true) ou falso (false)');
    }
    const tarefa = buscarTarefa(codigoTarefa);
    tarefa.status = novoStatus;
}

// 6. Remover tarefa da lista
function removerTarefa(codigoTarefa) {
    const indice = tarefas.findIndex(t => t.codigo === codigoTarefa);

    if (indice === -1) {
        throw new Error('Código de tarefa não encontrado');
    }
    tarefas.splice(indice, 1);
}

// --------------------------------------------------
// Exemplo de uso e testes
// --------------------------------------------------
try {
    cadastrarTarefa('Estudar JavaScript', 'alta');
    cadastrarTarefa('Fazer exercícios da aula', 'media');

    console.log('Tarefas cadastradas:', listarTarefas());

    alterarStatusTarefa(1, false); // Marca a tarefa 1 como concluída
    atualizarTarefa(2, 'Revisar projetos', 'alta');

    console.log('Tarefa 1 atualizada:', buscarTarefa(1));

    removerTarefa(2);
    console.log('Lista após remoção:', listarTarefas());
} catch (erro) {
    console.error('Erro:', erro.message);
}