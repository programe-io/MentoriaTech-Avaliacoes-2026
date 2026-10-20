// Estrutura para armazenar as tarefas
let tasks = [];
let nextCode = 1;

// Elementos do DOM
const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const titleError = document.getElementById('titleError');
const priorityError = document.getElementById('priorityError');
const taskList = document.getElementById('taskList');

// Regras de validação
function validateForm(title, priority) {
    let isValid = true;

    // Validação do título: mínimo 5 caracteres[cite: 1]
    if (!title || title.trim().length < 5) {
        titleError.style.display = 'block';
        isValid = false;
    } else {
        titleError.style.display = 'none';
    }

    // Validação da prioridade: valor entre 1 (alta) e 3 (baixa)[cite: 1]
    const prioVal = parseInt(priority, 10);
    if (isNaN(prioVal) || prioVal < 1 || prioVal > 3) {
        priorityError.style.display = 'block';
        isValid = false;
    } else {
        priorityError.style.display = 'none';
    }

    return isValid;
}

// Função para Cadastrar Nova Tarefa[cite: 1]
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = titleInput.value;
    const priority = priorityInput.value;

    if (validateForm(title, priority)) {
        const newTask = {
            codigo: nextCode++,
            titulo: title.trim(),
            prioridade: parseInt(priority, 10),
            concluida: false
        };

        tasks.push(newTask);
        
        // Resetar formulário
        titleInput.value = '';
        priorityInput.value = '';

        // Atualizar listagem
        renderTasks();
    }
});

// Função para Alterar a Prioridade da Tarefa[cite: 1]
function changePriority(code, newPriority) {
    const task = tasks.find(t => t.codigo === code);
    if (task) {
        task.prioridade = parseInt(newPriority, 10);
        renderTasks();
    }
}

// Função para Marcar Tarefa como Concluída/Pendente[cite: 1]
function toggleStatus(code) {
    const task = tasks.find(t => t.codigo === code);
    if (task) {
        task.concluida = !task.concluida;
        renderTasks();
    }
}

// Função para Listar as Tarefas Cadastradas[cite: 1]
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #718096;">Nenhuma tarefa cadastrada.</td></tr>';
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>#${task.codigo}</td>
            <td class="${task.concluida ? 'status-completed' : ''}">${task.titulo}</td>
            <td>
                <select class="select-prio" onchange="changePriority(${task.codigo}, this.value)">
                    <option value="1" ${task.prioridade === 1 ? 'selected' : ''}>1 (Alta)</option>
                    <option value="2" ${task.prioridade === 2 ? 'selected' : ''}>2 (Média)</option>
                    <option value="3" ${task.prioridade === 3 ? 'selected' : ''}>3 (Baixa)</option>
                </select>
            </td>
            <td>
                <span class="badge ${task.concluida ? 'prio-3' : 'prio-1'}">
                    ${task.concluida ? 'Concluída' : 'Pendente'}
                </span>
            </td>
            <td>
                <button class="btn-action btn-toggle" onclick="toggleStatus(${task.codigo})">
                    ${task.concluida ? 'Refazer' : 'Concluir'}
                </button>
            </td>
        `;

        taskList.appendChild(row);
    });
}

// Renderização inicial
renderTasks();