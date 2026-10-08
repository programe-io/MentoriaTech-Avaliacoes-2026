// Array principal para armazenar os objetos de tarefas
let tasks = [];
let nextId = 1;

// Função para exibir mensagens de feedback dinâmicas
function showFeedback(message, type = 'success') {
    const container = document.getElementById('feedback-container');
    const msgElement = document.getElementById('feedback-message');
    const iconElement = document.getElementById('feedback-icon');

    msgElement.textContent = message;
    
    // Remove classes anteriores
    container.className = "mb-6 p-4 rounded-xl text-sm transition-all duration-300 flex items-center space-x-3";
    
    if (type === 'success') {
        container.classList.add('bg-emerald-950/60', 'border', 'border-emerald-700/50', 'text-emerald-200');
        iconElement.className = "fa-solid fa-circle-check text-emerald-400 text-lg";
    } else {
        container.classList.add('bg-rose-950/60', 'border', 'border-rose-700/50', 'text-rose-200');
        iconElement.className = "fa-solid fa-triangle-exclamation text-rose-400 text-lg";
    }

    container.classList.remove('hidden');

    // Ocultar após 4 segundos
    setTimeout(() => {
        container.classList.add('hidden');
    }, 4000);
}

// Função de Cadastro acionada pelo evento 'onsubmit' do formulário
function handleCadastrar(event) {
    event.preventDefault();

    const titleInput = document.getElementById('task-title');
    const prioritySelect = document.getElementById('task-priority');

    const title = titleInput.value.trim();
    const priority = parseInt(prioritySelect.value);

    // Validação: Mínimo de 5 caracteres
    if (title.length < 5) {
        showFeedback("O título da tarefa deve conter pelo menos 5 caracteres.", "error");
        titleInput.focus();
        return;
    }

    // Criando o objeto da nova tarefa
    const newTask = {
        id: nextId++,
        title: title,
        priority: priority,
        completed: false // Status inicial: Pendente / Em execução
    };

    // Utilizando o método push para inserir no array
    tasks.push(newTask);

    // Limpar o formulário e resetar foco
    titleInput.value = '';
    prioritySelect.value = '2';
    titleInput.focus();

    // Atualizar interface
    renderTasks();
    updateStats();

    showFeedback(`Tarefa #${newTask.id} cadastrada com sucesso!`, "success");
}

// Função para alternar o status de conclusão da tarefa
function toggleTaskStatus(id) {
    // Utilizando o método find para localizar o objeto pelo ID
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
        
        const statusText = task.completed ? "concluída" : "reaberta";
        showFeedback(`Tarefa #${task.id} marcada como ${statusText}.`, "success");
    }
}

// Função para remover uma tarefa
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
    showFeedback(`Tarefa #${id} removida com sucesso.`, "success");
}

// Função para atualizar as estatísticas do cabeçalho
function updateStats() {
    const total = tasks.length;
    const concluidas = tasks.filter(t => t.completed).length;
    const pendentes = total - concluidas;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-pendentes').textContent = pendentes;
    document.getElementById('stat-concluidas').textContent = concluidas;
}

// Função para renderizar as tarefas no container HTML
function renderTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 bg-slate-900/20 rounded-xl border border-dashed border-slate-700/60 text-slate-500">
                <i class="fa-solid fa-clipboard-list text-3xl mb-2 text-slate-600"></i>
                <p class="text-sm">Nenhuma tarefa cadastrada ainda.</p>
                <p class="text-xs text-slate-600 mt-1">Preencha o formulário ao lado para começar.</p>
            </div>
        `;
        return;
    }

    // Ordenar tarefas: pendentes primeiro, depois por prioridade
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return a.priority - b.priority;
    });

    sortedTasks.forEach(task => {
        // Rótulos de prioridade
        let priorityBadge = '';
        if (task.priority === 1) {
            priorityBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">Alta</span>`;
        } else if (task.priority === 2) {
            priorityBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Média</span>`;
        } else {
            priorityBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">Baixa</span>`;
        }

        const taskCard = document.createElement('div');
        taskCard.className = `p-4 rounded-xl border transition-all flex items-center justify-between ${
            task.completed 
                ? 'bg-slate-900/20 border-slate-800 text-slate-500' 
                : 'bg-slate-900/50 border-slate-700/60 text-slate-200 shadow-sm'
        }`;

        taskCard.innerHTML = `
            <div class="flex items-center space-x-3 overflow-hidden">
                <button onclick="toggleTaskStatus(${task.id})" 
                    class="w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                        task.completed 
                            ? 'bg-emerald-600 border-emerald-500 text-white' 
                            : 'border-slate-600 hover:border-indigo-500 bg-slate-800'
                    }">
                    ${task.completed ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
                </button>
                <div class="overflow-hidden">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-mono text-slate-500">#${task.id}</span>
                        ${priorityBadge}
                    </div>
                    <p class="text-sm font-medium truncate mt-0.5 ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}">
                        ${escapeHtml(task.title)}
                    </p>
                </div>
            </div>
            <div class="flex items-center space-x-2 ml-2">
                <button onclick="deleteTask(${task.id})" 
                    class="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" title="Excluir tarefa">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </div>
        `;

        container.appendChild(taskCard);
    });
}

// Função auxiliar de segurança para escapar caracteres HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Inicializa a renderização vazia ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateStats();
});