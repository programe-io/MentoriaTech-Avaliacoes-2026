class GerenciadorDeTarefas {
    constructor() {
        // Carrega as tarefas salvas ou inicia um array vazio
        this.tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        // Define o próximo código com base no maior ID existente ou 1
        this.proximoCodigo = this.tarefas.length > 0 ? Math.max(...this.tarefas.map(t => t.code)) + 1 : 1;
    }

    _salvar() {
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }

    cadastrarTarefa(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) {
            return { sucesso: false, mensagem: "O título deve ter no mínimo 5 caracteres." };
        }

        const prioridadeNum = parseInt(prioridade);
        if (isNaN(prioridadeNum) || prioridadeNum < 1 || prioridadeNum > 3) {
            return { sucesso: false, mensagem: "A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };
        }

        const novaTarefa = {
            code: this.proximoCodigo++,
            title: titulo.trim(),
            priority: prioridadeNum,
            completed: false
        };

        this.tarefas.push(novaTarefa);
        this._salvar();
        return { sucesso: true, mensagem: "Tarefa cadastrada com sucesso!" };
    }

    marcarComoConcluida(code) {
        const tarefa = this.tarefas.find(t => t.code === code);
        if (tarefa) {
            tarefa.completed = !tarefa.completed;
            this._salvar();
            return true;
        }
        return false;
    }

    alterarPrioridade(code, novaPrioridade) {
        const tarefa = this.tarefas.find(t => t.code === code);
        if (tarefa) {
            tarefa.priority = parseInt(novaPrioridade);
            this._salvar();
            return true;
        }
        return false;
    }
}

// Instância do Gerenciador
const gerenciador = new GerenciadorDeTarefas();

// Elementos do DOM
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskPrioritySelect = document.getElementById('taskPriority');
const formAlert = document.getElementById('formAlert');
const taskListElement = document.getElementById('taskList');

// Função para exibir alertas na tela
function showAlert(mensagem, tipo) {
    formAlert.textContent = mensagem;
    formAlert.className = `alert ${tipo}`;
    formAlert.style.display = 'block';
    setTimeout(() => {
        formAlert.style.display = 'none';
    }, 3000);
}

// Função para renderizar as tarefas na interface
function renderizarTarefas() {
    taskListElement.innerHTML = '';

    if (gerenciador.tarefas.length === 0) {
        taskListElement.innerHTML = `<li class="empty-state">Nenhuma tarefa cadastrada.</li>`;
        return;
    }

    gerenciador.tarefas.forEach(t => {
        const li = document.createElement('li');
        li.className = `task-item ${t.completed ? 'completed' : ''}`;

        const textosPrioridade = { 1: 'Alta', 2: 'Média', 3: 'Baixa' };

        li.innerHTML = `
            <div class="task-header">
                <span class="task-title">[#${t.code}] ${t.title}</span>
                <span class="badge priority-${t.priority}">${textosPrioridade[t.priority]}</span>
            </div>
            <div class="task-footer">
                <span>Status: <strong>${t.completed ? 'Concluída' : 'Pendente'}</strong></span>
                <div class="task-actions">
                    <button class="btn-action" onclick="alternarStatus(${t.code})">
                        ${t.completed ? 'Desfazer' : 'Concluir'}
                    </button>
                    <button class="btn-action" onclick="mudarPrioridadePrompt(${t.code})">
                        Mudar Prioridade
                    </button>
                </div>
            </div>
        `;
        taskListElement.appendChild(li);
    });
}

// Evento de envio do formulário
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = taskTitleInput.value;
    const prioridade = taskPrioritySelect.value;

    const resultado = gerenciador.cadastrarTarefa(titulo, prioridade);

    if (resultado.sucesso) {
        showAlert(resultado.mensagem, 'success');
        taskTitleInput.value = '';
        taskPrioritySelect.value = '2';
        renderizarTarefas();
    } else {
        showAlert(resultado.mensagem, 'error');
    }
});

// Funções globais para manipulação de ações na lista
window.alternarStatus = function(code) {
    gerenciador.marcarComoConcluida(code);
    renderizarTarefas();
}

window.mudarPrioridadePrompt = function(code) {
    const novaP = prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):");
    if (novaP !== null) {
        const num = parseInt(novaP);
        if (num >= 1 && num <= 3) {
            gerenciador.alterarPrioridade(code, num);
            renderizarTarefas();
        } else {
            alert("Valor inválido! Deve ser entre 1 e 3.");
        }
    }
}

// Renderização inicial
renderizarTarefas();