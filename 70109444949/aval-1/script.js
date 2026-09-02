// Array global para armazenar as tarefas simulando o banco de dados
let tasks = [];
let nextId = 1;

// Mapeamento de prioridades para exibição de texto
const priorityLabels = {
    1: "1 (Alta)",
    2: "2 (Média)",
    3: "3 (Baixa)"
};

// Seleção de elementos do DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPriorityInput = document.getElementById('task-priority');
const taskListTable = document.getElementById('task-list');

// Função para renderizar/listar as tarefas na tabela
function renderTasks() {
    taskListTable.innerHTML = '';

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        if (task.completed) {
            tr.classList.add('completed');
        }

        tr.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${priorityLabels[task.priority]}</td>
            <td>${task.completed ? 'Concluída' : 'Pendente'}</td>
            <td>
                <button class="btn-done" onclick="toggleTaskStatus(${task.id})">
                    ${task.completed ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn-priority" onclick="changeTaskPriority(${task.id})">
                    Alterar Prioridade
                </button>
            </td>
        `;
        taskListTable.appendChild(tr);
    });
}

// 1. Cadastrar uma nova tarefa (com validações)
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = taskTitleInput.value.trim();
    const priority = parseInt(taskPriorityInput.value);

    // Validação: O título deve ter no mínimo 5 caracteres
    if (title.length < 5) {
        alert("Erro: O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação: A prioridade deve ser entre 1 e 3
    if (priority < 1 || priority > 3 || isNaN(priority)) {
        alert("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return;
    }

    // Criação do objeto tarefa
    const newTask = {
        id: nextId++,
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();

    // Limpa o formulário
    taskForm.reset();
});

// 2. Marcar uma tarefa como concluída/pendente
function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// 3. Alterar a prioridade de uma tarefa
function changeTaskPriority(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newPriorityInput = prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa", task.priority);
    
    // Se o usuário cancelar o prompt
    if (newPriorityInput === null) return;

    const newPriority = parseInt(newPriorityInput);

    // Validação da nova prioridade
    if (newPriority >= 1 && newPriority <= 3) {
        task.priority = newPriority;
        renderTasks();
    } else {
        alert("Validação Inválida! Escolha apenas valores entre 1 e 3.");
    }
}
