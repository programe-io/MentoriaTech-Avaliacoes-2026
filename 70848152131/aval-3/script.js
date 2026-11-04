// Inicializar a lista de tarefas a partir do localStorage (ou array vazio)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Elementos do DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPrioritySelect = document.getElementById('task-priority');
const taskListContainer = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');
const titleError = document.getElementById('title-error');

// Guardar alterações no LocalStorage e renderizar
function updateAppData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 1. Cadastrar uma nova tarefa (com validações)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = taskTitleInput.value.trim();
    const priority = parseInt(taskPrioritySelect.value);
    
    // Regra de validação: Título com mínimo de 5 caracteres
    if (title.length < 5) {
        titleError.textContent = "O título deve ter no mínimo 5 caracteres.";
        return;
    } else {
        titleError.textContent = "";
    }

    // Regra de validação: Prioridade entre 1 e 3
    if (priority < 1 || priority > 3 || isNaN(priority)) {
        alert("Prioridade inválida! Escolha um valor entre 1 e 3.");
        return;
    }

    // Criar o objeto da tarefa
    const newTask = {
        code: 'TK-' + Math.floor(1000 + Math.random() * 9000), // Gera código único (ex: TK-4829)
        title: title,
        priority: priority,
        completed: false
    };

    // Adicionar ao array e atualizar a interface
    tasks.push(newTask);
    updateAppData();

    // Limpar formulário
    taskForm.reset();
});

// 2. Listar as tarefas cadastradas
function renderTasks() {
    taskListContainer.innerHTML = '';

    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        if (task.completed) tr.classList.add('completed-row');

        // Tradução visual das prioridades
        const priorityLabels = { 1: '1 - Alta', 2: '2 - Média', 3: '3 - Baixa' };

        tr.innerHTML = `
            <td><strong>${task.code}</strong></td>
            <td>${task.title}</td>
            <td>
                <!-- 4. Alterar a prioridade de uma tarefa -->
                <select class="select-priority-table" onchange="changePriority('${task.code}', this.value)" ${task.completed ? 'disabled' : ''}>
                    <option value="1" ${task.priority === 1 ? 'selected' : ''}>1 - Alta</option>
                    <option value="2" ${task.priority === 2 ? 'selected' : ''}>2 - Média</option>
                    <option value="3" ${task.priority === 3 ? 'selected' : ''}>3 - Baixa</option>
                </select>
            </td>
            <td>
                <span class="badge ${task.completed ? 'badge-success' : 'badge-pending'}">
                    ${task.completed ? 'Concluída' : 'Pendente'}
                </span>
            </td>
            <td>
                <!-- 3. Marcar uma tarefa como concluída -->
                <button class="btn-action" onclick="toggleComplete('${task.code}')" ${task.completed ? 'disabled' : ''}>
                    ${task.completed ? '✓' : 'Concluir'}
                </button>
            </td>
        `;
        taskListContainer.appendChild(tr);
    });
}

// 3. Função para marcar tarefa como concluída
function toggleComplete(code) {
    const taskIndex = tasks.findIndex(task => task.code === code);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        updateAppData();
    }
}

// 4. Função para alterar a prioridade de uma tarefa
function changePriority(code, newPriority) {
    const priorityInt = parseInt(newPriority);
    
    // Validação extra por segurança
    if (priorityInt >= 1 && priorityInt <= 3) {
        const taskIndex = tasks.findIndex(task => task.code === code);
        if (taskIndex !== -1) {
            tasks[taskIndex].priority = priorityInt;
            updateAppData();
        }
    }
}

// Renderização inicial ao carregar a página
renderTasks();
