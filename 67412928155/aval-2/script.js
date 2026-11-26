// Gerenciador de Estado do Sistema (Simulando Banco de Dados com LocalStorage)
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('tasks_system')) || [];
    },
    set(tasks) {
        localStorage.setItem('tasks_system', JSON.stringify(tasks));
    }
};

// Objeto Controlador do Sistema de Tarefas
const TaskSystem = {
    tasks: Storage.get(),

    // 1. Cadastrar uma nova tarefa com validações requisitadas
    create(title, priority) {
        // Regra de Validação 1: Mínimo 5 caracteres
        if (!title || title.trim().length < 5) {
            throw new Error("O título da tarefa deve ter no mínimo 5 caracteres.");
        }

        // Regra de Validação 2: Prioridade entre 1 e 3
        const pValue = parseInt(priority);
        if (isNaN(pValue) || pValue < 1 || pValue > 3) {
            throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        }

        // Gerar código incremental limpo baseado no timestamp
        const code = `TK-${Math.floor(Date.now() % 100000)}`;

        const newTask = {
            code: code,
            title: title.trim(),
            priority: pValue,
            completed: false
        };

        this.tasks.push(newTask);
        this.saveAndRefresh();
    },

    // 2. Marcar tarefa como concluída
    toggleStatus(code) {
        const task = this.tasks.find(t => t.code === code);
        if (task) {
            task.completed = !task.completed;
            this.saveAndRefresh();
        }
    },

    // 3. Alterar a prioridade de uma tarefa dinamicamente
    changePriority(code, newPriority) {
        const pValue = parseInt(newPriority);
        if (pValue >= 1 && pValue <= 3) {
            const task = this.tasks.find(t => t.code === code);
            if (task) {
                task.priority = pValue;
                this.saveAndRefresh();
            }
        }
    },

    // Persistência e Atualização de Tela
    saveAndRefresh() {
        Storage.set(this.tasks);
        DOM.renderList(this.tasks);
    }
};

// Manipulação do DOM (Interface Gráfica)
const DOM = {
    listContainer: document.getElementById('taskList'),
    form: document.getElementById('taskForm'),
    titleInput: document.getElementById('taskTitle'),
    priorityInput: document.getElementById('taskPriority'),
    titleError: document.getElementById('titleError'),

    init() {
        // Ouvinte do formulário de cadastro
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.titleError.textContent = "";

            try {
                TaskSystem.create(this.titleInput.value, this.priorityInput.value);
                this.form.reset(); // Limpa os campos
            } catch (error) {
                this.titleError.textContent = error.message;
            }
        });

        // Renderização inicial
        this.renderList(TaskSystem.tasks);
    },

    renderList(tasks) {
        this.listContainer.innerHTML = "";

        if (tasks.length === 0) {
            this.listContainer.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-light);">
                        Nenhuma tarefa cadastrada.
                    </td>
                </tr>
            `;
            return;
        }

        tasks.forEach(task => {
            const tr = document.createElement('tr');
            if (task.completed) tr.classList.add('task-done-row');

            // Mapeamento visual das prioridades
            const priorityLabels = { 1: 'Alta', 2: 'Média', 3: 'Baixa' };

            tr.innerHTML = `
                <td><strong>${task.code}</strong></td>
                <td>${task.title}</td>
                <td>
                    <!-- Select embutido para permitir alterar a prioridade diretamente na linha -->
                    <select onchange="TaskSystem.changePriority('${task.code}', this.value)" class="badge badge-p${task.priority}" style="border:none; width:auto; padding:2px;">
                        <option value="1" ${task.priority === 1 ? 'selected' : ''}>1 - Alta</option>
                        <option value="2" ${task.priority === 2 ? 'selected' : ''}>2 - Média</option>
                        <option value="3" ${task.priority === 3 ? 'selected' : ''}>3 - Baixa</option>
                    </select>
                </td>
                <td>
                    <span class="badge ${task.completed ? 'badge-completed' : 'badge-pending'}">
                        ${task.completed ? 'Concluída' : 'Pendente'}
                    </span>
                </td>
                <td>
                    <button onclick="TaskSystem.toggleStatus('${task.code}')" class="btn-action btn-success">
                        ${task.completed ? 'Reabrir' : 'Concluir'}
                    </button>
                </td>
            `;

            this.listContainer.appendChild(tr);
        });
    }
};

// Inicializa a aplicação ao carregar o arquivo
DOM.init();
