class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextCode = 1;
    }

    // Método para cadastrar nova tarefa com validações
    addTask(title, priority) {
        const trimmedTitle = title ? title.trim() : '';
        const parsedPriority = parseInt(priority, 10);

        // Validação do título: mínimo de 5 caracteres[cite: 1]
        if (trimmedTitle.length < 5) {
            throw new Error('O título deve ter no mínimo 5 caracteres.');
        }

        // Validação da prioridade: valor entre 1 (alta) e 3 (baixa)[cite: 1]
        if (isNaN(parsedPriority) || parsedPriority < 1 || parsedPriority > 3) {
            throw new Error('A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).');
        }

        const newTask = {
            codigo: this.nextCode++,
            titulo: trimmedTitle,
            prioridade: parsedPriority,
            concluida: false
        };

        this.tasks.push(newTask);
        return newTask;
    }

    // Método para listar todas as tarefas cadastradas[cite: 1]
    getTasks() {
        return this.tasks;
    }

    // Método para marcar uma tarefa como concluída ou pendente[cite: 1]
    toggleTaskStatus(code) {
        const task = this.tasks.find(t => t.codigo === code);
        if (task) {
            task.concluida = !task.concluida;
            return true;
        }
        return false;
    }

    // Método para alterar a prioridade de uma tarefa[cite: 1]
    updateTaskPriority(code, newPriority) {
        const parsedPriority = parseInt(newPriority, 10);
        if (isNaN(parsedPriority) || parsedPriority < 1 || parsedPriority > 3) {
            throw new Error('A nova prioridade deve ser entre 1 e 3.');
        }

        const task = this.tasks.find(t => t.codigo === code);
        if (task) {
            task.prioridade = parsedPriority;
            return true;
        }
        return false;
    }
}

// --- Exemplo de Integração com a Interface (DOM) ---

const manager = new TaskManager();

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('taskList');

function updateUI() {
    taskList.innerHTML = '';
    const allTasks = manager.getTasks();

    if (allTasks.length === 0) {
        taskList.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhuma tarefa registada.</td></tr>';
        return;
    }

    allTasks.forEach(task => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>#${task.codigo}</td>
            <td style="${task.concluida ? 'text-decoration: line-through; color: #888;' : ''}">${task.titulo}</td>
            <td>
                <select onchange="handlePriorityChange(${task.codigo}, this.value)">
                    <option value="1" ${task.prioridade === 1 ? 'selected' : ''}>1 (Alta)</option>
                    <option value="2" ${task.prioridade === 2 ? 'selected' : ''}>2 (Média)</option>
                    <option value="3" ${task.prioridade === 3 ? 'selected' : ''}>3 (Baixa)</option>
                </select>
            </td>
            <td>${task.concluida ? 'Concluída' : 'Pendente'}</td>
            <td>
                <button type="button" onclick="handleToggleStatus(${task.codigo})">
                    ${task.concluida ? 'Desfazer' : 'Concluir'}
                </button>
            </td>
        `;
        taskList.appendChild(tr);
    });
}

// Evento de submissão do formulário
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            manager.addTask(titleInput.value, priorityInput.value);
            titleInput.value = '';
            priorityInput.value = '';
            updateUI();
        } catch (error) {
            alert(error.message);
        }
    });
}

// Funções globais auxiliares para os eventos do HTML gerado dinamicamente
window.handleToggleStatus = function(code) {
    manager.toggleTaskStatus(code);
    updateUI();
};

window.handlePriorityChange = function(code, newPriority) {
    try {
        manager.updateTaskPriority(code, newPriority);
        updateUI();
    } catch (error) {
        alert(error.message);
    }
};

// Renderização inicial
updateUI();