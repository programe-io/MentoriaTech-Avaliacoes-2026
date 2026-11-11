// Array que armazena todas as tarefas do sistema
let tarefas = [];

// --- FUNÇÕES DA SUA IMAGEM ---

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }
    
    tarefa.status = false; // Note que no seu código original, 'false' indica concluída
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// --- CONTINUAÇÃO DO PROJETO ---

/**
 * Cria e adiciona uma nova tarefa ao gerenciador
 * @param {number|string} codigo - Identificador único da tarefa
 * @param {string} titulo - Nome ou descrição da tarefa
 * @param {string} prioridade - Nível de prioridade (ex: 'baixa', 'media', 'alta')
 */
function adicionarTarefa(codigo, titulo, prioridade) {
    // Valida os dados antes de inserir
    validarDadosTarefa(titulo, prioridade);

    // Verifica se já existe uma tarefa com o mesmo código
    const tarefaExistente = tarefas.find(t => t.codigo === codigo);
    if (tarefaExistente) {
        throw new Error('Já existe uma tarefa cadastrada com este código.');
    }

    // Cria o novo objeto de tarefa
    let novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true // true = pendente / ativa
    };

    tarefas.push(novaTarefa);
    return novaTarefa;
}

/**
 * Remove uma tarefa do array através do código
 * @param {number|string} codigo 
 */
function removerTarefa(codigo) {
    let tarefa = buscarTarefa(codigo); // Garante que a tarefa existe
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    return `Tarefa ${codigo} removida com sucesso.`;
}

// --- FUNÇÕES AUXILIARES E DE VALIDAÇÃO (Chamadas no seu código) ---

/**
 * Busca uma tarefa específica pelo código
 * @param {number|string} codigo 
 */
function buscarTarefa(codigo) {
    let tarefaEncontrada = tarefas.find(t => t.codigo === codigo);
    
    if (!tarefaEncontrada) {
        throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
    }
    
    return tarefaEncontrada;
}

/**
 * Valida as regras de negócio para título e prioridade
 * @param {string} titulo 
 * @param {string} prioridade 
 */
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        throw new Error("O título da tarefa não pode estar vazio.");
    }

    const prioridadesValidas = ['baixa', 'media', 'alta'];
    if (!prioridadesValidas.includes(prioridade.toLowerCase())) {
        throw new Error("Prioridade inválida. Use apenas: 'baixa', 'media' ou 'alta'.");
    }
}
