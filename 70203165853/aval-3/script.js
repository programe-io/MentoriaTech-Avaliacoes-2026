function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    const ul = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Excluir</button>
    `;

    ul.appendChild(li);
    input.value = '';
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
}