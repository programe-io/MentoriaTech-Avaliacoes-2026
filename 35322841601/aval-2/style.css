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

        // Criar o item da lista (li)
        const li = document.createElement('li');
        
        // Criar o texto da tarefa
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        // Alternar estado de concluído ao clicar no texto
        textSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Criar o botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita marcar como concluída ao excluir
            li.remove();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Limpar o campo de entrada
        taskInput.value = '';
        taskInput.focus();
    }

    // Evento de clique no botão
    addBtn.addEventListener('click', addTask);

    // Evento de apertar Enter no teclado
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
