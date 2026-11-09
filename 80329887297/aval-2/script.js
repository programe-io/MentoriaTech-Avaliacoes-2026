document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas salvas ao iniciar a página
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => renderTask(task.text, task.completed));

    // Evento de clique para adicionar tarefa
    addBtn.addEventListener('click', addTask);

    // Evento de teclado (Enter) para adicionar tarefa
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        renderTask(taskText, false);
        saveTasksToLocalStorage(taskText, false);

        taskInput.value = '';
        taskInput.focus();
    }

    function renderTask(text, isCompleted) {
        const li = document.createElement('li');
        if (isCompleted) li.classList.add('completed');

        // Texto da tarefa clicável para marcar como concluída
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.style.cursor = 'pointer';
        textSpan.style.flex = '1';
        textSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
            updateLocalStorage();
        });

        // Botão de excluir tarefa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita marcar como concluído ao clicar no botão
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasksToLocalStorage(text, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});