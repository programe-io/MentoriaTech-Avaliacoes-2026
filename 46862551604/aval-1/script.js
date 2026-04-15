const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Carregar tarefas salvas ao abrir a página
document.addEventListener('DOMContentLoaded', getTodos);

// Função para adicionar tarefa ao clicar no botão
addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTodoElement(input.value);
        saveLocalTodo(input.value);
        input.value = "";
    }
});

// Adicionar tarefa ao apertar "Enter"
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Função que cria o visual da tarefa na tela
function createTodoElement(text) {
    const li = document.createElement('li');

    li.innerHTML = `
        <span class="todo-text">${text}</span>
        <button class="delete-btn">Excluir</button>
    `;

    // Clique no texto para marcar como concluído
    li.querySelector('.todo-text').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Clique no botão para remover
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTodo(text);
    });

    todoList.appendChild(li);
}

// SALVAR NO NAVEGADOR (LocalStorage)
function saveLocalTodo(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// BUSCAR DO NAVEGADOR
function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

// REMOVER DO NAVEGADOR
function removeLocalTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todoText);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}