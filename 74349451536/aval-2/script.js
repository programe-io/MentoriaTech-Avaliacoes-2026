// --- SISTEMA DE GERENCIAMENTO DE TAREFAS ---

// Array para armazenar a lista de tarefas cadastradas
let tarefas = [];
let proximoCodigo = 1;

// Referências dos elementos DOM
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskListElement = document.getElementById('taskList');
const messageArea = document.getElementById('messageArea');

// Evento ao submeter o formulário (Cadastrar Tarefa)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = taskTitleInput.value.trim();
    const prioridade = parseInt(taskPrioritySelect.value);

    // Executa a validação das regras de negócio
    if (cadastrarTarefa(titulo, prioridade)) {
        taskTitleInput.value = '';
        taskPrioritySelect.value = '2';
        exibirMensagem('Tarefa cadastrada com sucesso!', 'success');
        renderizarTarefas();
    }
});

/**
 * Função para cadastrar uma nova tarefa no sistema
 * Regra 1: O título deve ter no mínimo 5 caracteres
 * Regra 2: A prioridade deve ser entre 1 e 3
 */
function cadastrarTarefa(titulo, prioridade) {
    // Validação do Título
    if (titulo.length < 5) {
        exibirMensagem('Erro: O título deve ter no mínimo 5 caracteres.', 'error');
        return false;
    }

    // Validação da Prioridade
    if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
        exibirMensagem('Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).', 'error');
        return false;
    }

    // Objeto da nova tarefa
    const novaTarefa = {
        codigo: proximoCodigo++, // Identificador único
        titulo: titulo,           // Título validado
        prioridade: prioridade,   // Prioridade validada
        concluida: false          // Status inicial de conclusão
    };

    tarefas.push(novaTarefa);
    return true;
}

/**
 * Marcar uma tarefa como concluída
 */
function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.concluida = true;
        renderizarTarefas();
        exibirMensagem(`Tarefa #${codigo} marcada como concluída!`, 'success');
    }
}

/**
 * Alterar a prioridade de uma tarefa cadastrada
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const prioridadeNum = parseInt(novaPrioridade);
    
    // Validação da nova prioridade
    if (prioridadeNum >= 1 && prioridadeNum <= 3) {
        const tarefa = tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.prioridade = prioridadeNum;
            renderizarTarefas();
            exibirMensagem(`Prioridade da tarefa #${codigo} alterada para ${prioridadeNum}.`, 'success');
        }
    } else {
        exibirMensagem('Erro: Prioridade inválida.', 'error');
    }
}

/**
 * Listar/Renderizar as tarefas cadastradas no DOM
 */
function renderizarTarefas() {
    taskListElement.innerHTML = '';

    if (tarefas.length === 0) {
        taskListElement.innerHTML = '<li style="text-align: center; color: #94a3b8;">Nenhuma tarefa cadastrada até o momento.</li>';
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `task-item ${tarefa.concluida ? 'completed' : ''}`;

        // Mapeamento dos nomes de prioridade
        const prioridadesTexto = { 1: 'Alta', 2: 'Média', 3: 'Baixa' };

        li.innerHTML = `
            <div class="task-info">
                <div>
                    <strong>#${tarefa.codigo}</strong> - 
                    <span class="task-title-text">${e(tarefa.titulo)}</span>
                </div>
                <div>
                    <span class="badge badge-priority-${tarefa.prioridade}">
                        Prioridade: ${prioridadesTexto[tarefa.prioridade]} (${tarefa.prioridade})
                    </span>
                    <small>| Status: ${tarefa.concluida ? ' Concluída' : ' Pendente'}</small>
                </div>
            </div>
            <div class="task-actions">
                ${!tarefa.concluida ? `
                    <button class="btn btn-complete" onclick="marcarComoConcluida(${tarefa.codigo})">
                        Concluir
                    </button>
                ` : ''}
                
                <select class="select-priority-edit" onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
                    <option value="" disabled selected>Alterar Prioridade</option>
                    <option value="1">1 - Alta</option>
                    <option value="2">2 - Média</option>
                    <option value="3">3 - Baixa</option>
                </select>
            </div>
        `;

        taskListElement.appendChild(li);
    });
}

// Exibir alertas na tela
function exibirMensagem(texto, tipo) {
    messageArea.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 4000);
}

// Função auxiliar para evitar XSS
function e(texto) {
    return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inicializa a renderização da lista vazia
renderizarTarefas();