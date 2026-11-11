document.addEventListener('DOMContentLoaded', () => {
    
    // Tenta carregar dados salvos do localStorage ou cria um array vazio
    let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [
        { id: 1, title: "Desenhar protótipo", desc: "Criar telas no Figma", priority: "Alta", status: "todo" },
        { id: 2, title: "Configurar Servidor", desc: "Instalar ambiente Node.js", priority: "Média", status: "progress" },
        { id: 3, title: "Configuração Git", desc: "Configurar chaves SSH", priority: "Baixa", status: "done" }
    ];

    // Mapeamento dos contêineres de colunas
    const containers = {
        todo: document.getElementById('tasks-todo'),
        progress: document.getElementById('tasks-progress'),
        done: document.getElementById('tasks-done')
    };

    // Mapeamento dos contadores de tarefas
    const counters = {
        todo: document.getElementById('count-todo'),
        progress: document.getElementById('count-progress'),
        done: document.getElementById('count-done')
    };

    // Salva o estado atual no armazenamento do navegador
    function saveToStorage() {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    }

    // Renderiza todas as tarefas nas suas respectivas colunas
    function renderBoard() {
        // Limpa todas as colunas antes de renderizar
        Object.values(containers).forEach(container => container.innerHTML = '');
        
        // Contadores auxiliares
        const counts = { todo: 0, progress: 0, done: 0 };

        tasks.forEach(task => {
            counts[task.status]++;
            
            const card = document.createElement('div');
            card.className = 'task-card';
            
            // Define os botões de movimentação baseado no status atual
            let moveButtonsHTML = '';
            if (task.status === 'todo') {
                moveButtonsHTML = `<button onclick="moveTask(${task.id}, 'progress')">Iniciar <i class="fa-solid fa-arrow-right"></i></button>`;
            } else if (task.status === 'progress') {
                moveButtonsHTML = `
                    <button onclick="moveTask(${task.id}, 'todo')"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
                    <button onclick="moveTask(${task.id}, 'done')">Concluir <i class="fa-solid fa-arrow-right"></i></button>
                `;
            } else if (task.status === 'done') {
                moveButtonsHTML = `<button onclick="moveTask(${task.id}, 'progress')"><i class="fa-solid fa-arrow-left"></i> Reabrir</button>`;
            }

            card.innerHTML = `
                <div class="task-card-header">
                    <h3>${task.title}</h3>
                    <span class="priority-tag priority-${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p>${task.desc || 'Sem descrição.'}</p>
                <div class="task-card-footer">
                    <div class="move-buttons">
                        ${moveButtonsHTML}
                    </div>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            
            containers[task.status].appendChild(card);
        });

        // Atualiza os cabeçalhos das colunas com as quantidades
        Object.keys(counters).forEach(status => {
            counters[status].innerText = counts[status];
        });
    }

    // Altera o status de uma tarefa e atualiza o quadro
    window.moveTask = function(id, newStatus) {
        tasks = tasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
        saveToStorage();
        renderBoard();
    };

    // Remove uma tarefa definitivamente
    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveToStorage();
        renderBoard();
    };

    // GERENCIAMENTO DO MODAL
    const modal = document.getElementById('task-modal');
    const btnNewTask = document.getElementById('btn-new-task');
    const btnCloseModal = document.getElementById('close-modal-btn');
    const btnCancelModal = document.getElementById('cancel-modal-btn');
    const taskForm = document.getElementById('task-form');

    const toggleModal = () => modal.classList.toggle('active');

    btnNewTask.addEventListener('click', toggleModal);
    btnCloseModal.addEventListener('click', toggleModal);
    btnCancelModal.addEventListener('click', toggleModal);

    // SUBMIT DO FORMULÁRIO DE NOVA TAREFA
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newTask = {
            id: Date.now(),
            title: document.getElementById('task-title').value,
            desc: document.getElementById('task-desc').value,
            priority: document.getElementById('task-priority').value,
            status: 'todo' // Toda tarefa nova entra na lista de "A Fazer"
        };

        tasks.push(newTask);
        saveToStorage();
        renderBoard();
        
        taskForm.reset();
        toggleModal();
    });

    // Executa a primeira renderização do quadro na tela
    renderBoard();
});
