// Inicializa a lista de tarefas buscando do localStorage ou cria um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Elementos do DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPrioritySelect = document.getElementById('task-priority');
const titleError = document.getElementById('title-error');
const tasksTableBody = document.getElementById('tasks-table-body');

// Função para salvar as tarefas no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 1. CADASTRAR TAREFA
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = taskTitleInput.value.trim();
    const priority = parseInt(taskPrioritySelect.value);
    
    // Regra de Validação: Título deve ter no mínimo 5 caracteres
    if (title.length < 5) {
        titleError.textContent = "O título deve ter no mínimo 5 caracteres.";
        return;
    } else {
        titleError.textContent = "";
    }

    // Regra de Validação: Prioridade entre 1 e 3
    if (priority < 1 || priority > 3) {
        alert("Prioridade inválida.");
        return;
    }

    // Criação do objeto da nova tarefa
    const newTask = {
        code: Date.now(), // Gera um código único baseado no timestamp atual
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
    
    // Limpa o formulário
    taskForm.reset();
});

// 2. LISTAR TAREFAS
function renderTasks() {
    tasksTableBody.innerHTML = '';

    if (tasks.length === 0) {
        tasksTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">Nenhuma tarefa cadastrada.</td></tr>`;
        return;
    }

    tasks.forEach(task => {
        const tr = document.createElement('tr');

        // Define as opções do select de prioridade inline
        const priorityOptions = [1, 2, 3].map(p => 
            `<option value="${p}" ${task.priority === p ? 'selected' : ''}>${p}</option>`
        ).join('');

        tr.innerHTML = `
            <td>#${task.code}</td>
            <td style="${task.completed ? 'text-decoration: line-through; color: #94a3b8;' : ''}">${task.title}</td>
            <td>
                <select class="select-priority-inline" onchange="changePriority(${task.code}, this.value)">
                    ${priorityOptions}
                </select>
            </td>
            <td>
                <span class="status-badge ${task.completed ? 'concluida' : 'pendente'}">
                    ${task.completed ? 'Concluída' : 'Pendente'}
                </span>
            </td>
            <td>
                <button class="btn-action btn-done" onclick="completeTask(${task.code})" ${task.completed ? 'disabled' : ''}>
                    ${task.completed ? '✓' : 'Concluir'}
                </button>
            </td>
        `;
        
        tasksTableBody.appendChild(tr);
    });
}

// 3. MARCAR TAREFA COMO CONCLUÍDA
function completeTask(code) {
    const taskIndex = tasks.findIndex(task => task.code === code);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        saveToLocalStorage();
        renderTasks();
    }
}

// 4. ALTERAR A PRIORIDADE DE UMA TAREFA
function changePriority(code, newPriority) {
    const priorityValue = parseInt(newPriority);
    
    // Regra de Validação inline
    if (priorityValue >= 1 && priorityValue <= 3) {
        const taskIndex = tasks.findIndex(task => task.code === code);
        if (taskIndex !== -1) {
            tasks[taskIndex].priority = priorityValue;
            saveToLocalStorage();
            renderTasks();
        }
    } else {
        alert("Prioridade inválida.");
        renderTasks(); // Recarrega para resetar o select visualmente
    }
}

// Renderiza a lista ao carregar a página pela primeira vez
renderTasks();
