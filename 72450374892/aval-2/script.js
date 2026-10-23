/**
 * PROJETO: Gerenciador de Tarefas
 * ARQUIVO: app.js
 * DESCRIÇÃO: Concentra a coleção de dados, validações e operações centrais.
 */

// ============================================================================
// 3 e 7. ESTADO CENTRAL DA APLICAÇÃO
// ============================================================================
const tarefas = [];
let proximoCodigo = 1; 

// ============================================================================
// 4 e 5. FUNÇÕES DE VALIDAÇÃO
// ============================================================================
/**
 * Valida se os dados cumprem os requisitos do sistema.
 * @param {string} titulo - O nome da tarefa.
 * @param {number} prioridade - Valor numérico entre 1 e 3.
 */
function validarDadosTarefa(titulo, prioridade) {
    // Validação do título (mínimo de 5 caracteres)
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("O título da tarefa deve possuir no mínimo 5 caracteres.");
    }

    // Validação da prioridade (entre 1 e 3)
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 (Alta) e 3 (Baixa).");
    }
}

// ============================================================================
// 9. FUNÇÃO DE BUSCA (REUTILIZÁVEL)
// ============================================================================
/**
 * Localiza um objeto de tarefa dentro do array principal através do ID.
 * @param {number} codigo - Código único gerado pelo sistema.
 * @returns {Object} O objeto completo da tarefa encontrada.
 */
function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.codigo === codigo);
    
    // Tratamento usando negação lógica
    if (!tarefaEncontrada) {
        throw new Error(`Código de identificação #${codigo} não foi encontrado.`);
    }
    
    return tarefaEncontrada;
}

// ============================================================================
// 6. CADASTRO E MODELAGEM
// ============================================================================
/**
 * Cadastra uma nova tarefa no sistema após validação.
 * @param {string} titulo - Título descritivo.
 * @param {number|string} prioridade - Nível de prioridade (1 a 3).
 * @returns {Object} O objeto da tarefa que acabou de ser criada.
 */
function cadastrarTarefa(titulo, prioridade) {
    const prioridadeInteira = parseInt(prioridade);

    // Executa a validação antes de montar o objeto
    validarDadosTarefa(titulo, prioridadeInteira);

    // Modelagem do objeto
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridadeInteira,
        status: true // true = Em execução, false = Concluída
    };

    // Incremento do gerador automático de códigos
    proximoCodigo++;

    // Inserção no array central
    tarefas.push(novaTarefa);
    
    return novaTarefa;
}

// ============================================================================
// 8. LISTAGEM DAS TAREFAS
// ============================================================================
/**
 * Retorna a coleção completa de tarefas.
 * @returns {Array} Array contendo todos os objetos de tarefas.
 */
function listarTarefas() {
    return tarefas;
}

// ============================================================================
// 10. CONCLUSÃO DE UMA TAREFA
// ============================================================================
/**
 * Modifica o status de uma tarefa ativa para concluída.
 * @param {number} codigo - Código da tarefa a concluir.
 * @returns {Object} O objeto modificado.
 */
function concluirTarefa(codigo) {
    // Reaproveita a função de busca integrada
    const tarefa = buscarTarefa(codigo);

    // Validação de conclusão duplicada
    if (tarefa.status === false) {
        throw new Error(`A tarefa #${codigo} já se encontra concluída.`);
    }

    // Altera o status para falso (Concluída)
    tarefa.status = false;
    return tarefa;
}

// ============================================================================
// 11. ALTERAÇÃO DA PRIORIDADE
// ============================================================================
/**
 * Altera o nível de urgência de uma tarefa existente.
 * @param {number} codigo - Código da tarefa.
 * @param {number|string} novaPrioridade - Nova prioridade (1 a 3).
 * @returns {Object} O objeto modificado.
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const prioridadeInteira = parseInt(novaPrioridade);
    
    // Reaproveita a função de busca
    const tarefa = buscarTarefa(codigo);

    // Reaproveita a função de validação existente (usando o título atual da tarefa)
    validarDadosTarefa(tarefa.titulo, prioridadeInteira);

    // Aplica a alteração
    tarefa.prioridade = prioridadeInteira;
    return tarefa;
}
