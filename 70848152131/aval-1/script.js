// 1. Selecionar os elementos do HTML que vamos manipular
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Função responsável por adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    // Validação para não aceitar texto em branco
    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    // Criar o elemento da lista (li)
    const li = document.createElement('li');
    li.textContent = taskText;

    // Criar o botão de apagar que fica ao lado da tarefa
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.classList.add('delete-btn');
    
    // Configurar o botão para remover a tarefa correspondente quando clicado
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    // Juntar o botão à tarefa e a tarefa à lista principal
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Limpar o campo de texto para a próxima tarefa
    taskInput.value = "";
    taskInput.focus();
}

// 3. Associar o evento de clique no botão "Adicionar" à nossa função
addBtn.addEventListener('click', addTask);

// 4. Permitir adicionar a tarefa também ao carregar na tecla "Enter"
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
