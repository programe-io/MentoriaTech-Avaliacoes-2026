// Armazenamento em memória (Array)
const listaTarefas = [];
let proximoId = 1;

// --- FUNÇÃO DE VALIDAÇÃO ---
function validarTarefa(titulo) {
    if (!titulo || titulo.trim().length < 5) {
        alert("[ERRO]: O título da tarefa deve ter pelo menos 5 caracteres.");
        return false;
    }
    return true;
}

// --- BUSCA COM FIND ---
function buscarTarefaPorCodigo(codigo) {
    return listaTarefas.find(t => t.codigo === codigo.toUpperCase().trim());
}

// --- RENDERIZAÇÃO DA TABELA ---
function listarTarefas() {
    const tabelaBody = document.getElementById("tabela-tarefas");
    tabelaBody.innerHTML = ""; // Limpa antes de reconstruir

    if (listaTarefas.length === 0) {
        tabelaBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8;">Nenhuma tarefa pendente.</td></tr>`;
        return;
    }

    listaTarefas.forEach(tarefa => {
        const linha = document.createElement("tr");

        // Define a classe CSS da prioridade
        let classePrioridade = "badge-baixa";
        if (tarefa.prioridade === "MÉDIA") classePrioridade = "badge-media";
        if (tarefa.prioridade === "ALTA") classePrioridade = "badge-alta";

        linha.innerHTML = `
            <td><strong>${tarefa.codigo}</strong></td>
            <td class="${tarefa.concluida ? 'status-concluida' : ''}">${tarefa.titulo}</td>
            <td><span class="badge ${classePrioridade}">${tarefa.prioridade}</span></td>
            <td class="${tarefa.concluida ? 'status-concluida' : 'status-pendente'}">
                ${tarefa.concluida ? "✅ Concluída" : "⏳ Pendente"}
            </td>
            <td>
                ${!tarefa.concluida ? `<button class="btn btn-acao" onclick="concluirTarefa('\${tarefa.codigo}')">Concluir</button>` : '---'}
            </td>
        `;
        tabelaBody.appendChild(linha);
    });
}

// --- OPERAÇÕES ---
function cadastrarTarefa(titulo, prioridade) {
    if (!validarTarefa(titulo)) return;

    const codigo = `TASK-${String(proximoId++).padStart(4, '0')}`;
    listaTarefas.push({
        codigo,
        titulo: titulo.trim(),
        prioridade,
        concluida: false
    });

    listarTarefas();
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefaPorCodigo(codigo);
    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

function alterarPrioridadeTarefa(codigo, novaPrioridade) {
    const tarefa = buscarTarefaPorCodigo(codigo);
    if (!tarefa) {
        alert("[ERRO]: Código de tarefa não encontrado.");
        return;
    }
    
    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// --- CAPTURA DE EVENTOS (LISTENERS) ---
document.getElementById("form-cadastro").addEventListener("submit", function(e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;
    
    cadastrarTarefa(titulo, prioridade);
    this.reset();
});

document.getElementById("form-prioridade").addEventListener("submit", function(e) {
    e.preventDefault();
    const codigo = document.getElementById("cod-tarefa").value;
    const novaPrioridade = document.getElementById("nova-prioridade").value;
    
    alterarPrioridadeTarefa(codigo, novaPrioridade);
    this.reset();
});

// Massa de testes inicial automática
cadastrarTarefa("Revisar documentação técnica do sistema", "ALTA");
cadastrarTarefa("Configurar ambiente de homologação", "MÉDIA");
