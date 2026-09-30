document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Função para adicionar tarefa
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        // Criar elemento da lista
        const li = document.createElement('li');
        
        // Criar texto da tarefa
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        // Evento para marcar como concluída ao clicar no texto
        textSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Criar botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Limpar o campo de entrada
        taskInput.value = '';
        taskInput.focus();
    }

    // Adicionar pelo botão
    addBtn.addEventListener('click', addTask);

    // Adicionar pressionando Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
