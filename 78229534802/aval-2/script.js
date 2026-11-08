document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Carregar tarefas salvas no localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Salvar no localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Renderizar a lista na tela
    const renderTodos = () => {
        todoList.innerHTML = '';

        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'pending') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '<li style="text-align:center; color:#999; padding: 10px;">Nenhuma tarefa encontrada.</li>';
            return;
        }

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="actions">
                    <button class="action-btn complete-btn" data-id="${todo.id}">
                        ${todo.completed ? 'Desfazer' : 'Concluir'}
                    </button>
                    <button class="action-btn delete-btn" data-id="${todo.id}">Excluir</button>
                </div>
            `;

            // Evento para alternar status clicando no texto ou no botão de concluir
            li.querySelector('.todo-text').addEventListener('click', () => toggleTodo(todo.id));
            li.querySelector('.complete-btn').addEventListener('click', () => toggleTodo(todo.id));
            
            // Evento para deletar
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));

            todoList.appendChild(li);
        });
    };

    // Adicionar nova tarefa
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();

        if (taskText !== '') {
            const newTodo = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            todos.push(newTodo);
            saveToLocalStorage();
            renderTodos();
            todoInput.value = '';
        }
    });

    // Alternar status de conclusão
    const toggleTodo = (id) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveToLocalStorage();
        renderTodos();
    };

    // Deletar tarefa
    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        saveToLocalStorage();
        renderTodos();
    };

    // Gerenciar cliques nos botões de filtro
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderTodos();
        });
    });

    // Inicializar app
    renderTodos();
});
