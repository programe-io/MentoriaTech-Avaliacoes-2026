// Seletores dos Elementos
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// Lista inicial de tarefas para demonstração
let tasks = [
    { text: 'Revisar conceitos de JavaScript', completed: false },
    { text: 'Praticar exercícios de matemática', completed: true }
];

// Função para atualizar a interface
function renderTasks() {
    taskList.innerHTML = '';
    let pendingCount = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) pendingCount++;

        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleTask(${index})">
                    <i class="fa-solid ${task.completed ? 'fa-rotate-left' : 'fa-check'}"></i>
                </button>
                <button class="btn-delete" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.textContent = pendingCount;
}

// Adicionar nova tarefa
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

// Permitir adicionar pressionando "Enter"
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Alternar status da tarefa (concluída / pendente)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Deletar tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Inicializar a lista ao carregar a página
renderTasks();