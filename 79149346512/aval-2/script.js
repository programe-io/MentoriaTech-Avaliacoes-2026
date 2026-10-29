// Seleção dos elementos do DOM
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    // Valida se o campo não está vazio
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    // Cria o elemento da lista (li)
    const li = document.createElement('li');
    li.textContent = taskText;

    // Cria o botão de deletar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'delete-btn';

    // Adiciona o evento de clique para remover a tarefa
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    // Junta o botão ao item da lista, e o item à lista principal
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Limpa o campo de entrada e foca nele novamente
    taskInput.value = '';
    taskInput.focus();
}

// Ouvintes de eventos (Listeners)
addBtn.addEventListener('click', addTask);

// Permite adicionar a tarefa também pressionando a tecla "Enter"
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
