const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert("Digite algo!");
        return;
    }

    // Criar o elemento da tarefa
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="remover(this)" style="color:red; border:none; background:none; cursor:pointer;">Remover</button>
    `;

    // Adicionar na lista
    taskList.appendChild(li);

    // Limpar input
    taskInput.value = '';
});

// Função para remover tarefa
function remover(button) {
    const item = button.parentElement;
    item.remove();
}

// Função de filtro (simulada)
function filtrar(categoria) {
    alert("Filtrando por: " + categoria);
}