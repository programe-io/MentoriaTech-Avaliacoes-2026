function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (input.value === "") {
        alert("Digite algo!");
        return;
    }

    // 1. Criar o item da lista (li)
    const li = document.createElement('li');
    
    // 2. Definir o conteúdo do item
    li.innerHTML = `
        <span onclick="toggleTask(this)">${input.value}</span>
        <span class="delete-btn" onclick="removeTask(this)">[X]</span>
    `;

    // 3. Adicionar o item na lista (ul)
    taskList.appendChild(li);

    // 4. Limpar o campo de texto
    input.value = "";
}

// Função para marcar como concluída
function toggleTask(element) {
    element.classList.toggle('completed');
}

// Função para remover a tarefa
function removeTask(element) {
    element.parentElement.remove();
}