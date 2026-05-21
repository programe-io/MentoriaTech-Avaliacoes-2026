/**
 * ==========================================================================
 * GERENCIADOR DE TAREFAS (TO-DO LIST)
 * Demonstração prática de JavaScript Vanilla (Puro) moderno.
 * ==========================================================================
 */

// 1. MAPEAMENTO DE ELEMENTOS DO DOM (Interface)
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// 2. ESTADO DA APLICAÇÃO (Dados na memória)
// Busca tarefas já salvas no navegador ou inicia um array vazio se não houver nenhuma
let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];

// 3. FUNÇÕES PRINCIPAIS

/**
 * Renderiza as tarefas na tela com base no array 'tasks'
 */
function renderTasks() {
    // Limpa a lista atual para evitar duplicados
    taskList.innerHTML = '';

    // Se não houver tarefas, exibe uma mensagem amigável
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-msg">Nenhuma tarefa por aqui ainda! 🎉</li>';
        return;
    }

    // Percorre o array de tarefas e cria o HTML de cada uma
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        // Cria a estrutura interna do item da lista
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(li);
    });

    // Sincroniza os dados atuais com o armazenamento local do navegador
    saveToLocalStorage();
}

/**
 * Adiciona uma nova tarefa ao array
 */
function addTask() {
    const taskText = taskInput.value.trim(); // .trim() remove espaços inúteis antes/depois

    // Validação simples: não aceita texto vazio
    if (taskText === '') {
        alert('Por favor, digite alguma tarefa antes de adicionar!');
        return;
    }

    // Cria o objeto da nova tarefa e adiciona ao array
    tasks.push({
        text: taskText,
        completed: false
    });

    // Limpa o campo de entrada e foca nele novamente
    taskInput.value = '';
    taskInput.focus();

    // Atualiza a tela
    renderTasks();
}

/**
 * Alterna o status da tarefa entre Concluída e Pendente
 * @param {number} index - Posição da tarefa no array
 */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

/**
 * Remove uma tarefa do array
 * @param {number} index - Posição da tarefa no array
 */
function deleteTask(index) {
    // Remove 1 elemento a partir da posição index
    tasks.splice(index, 1);
    renderTasks();
}

/**
 * Salva o estado atual do array no LocalStorage do navegador
 */
function saveToLocalStorage() {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
}

// 4. ESCUTA DE EVENTOS (Event Listeners)

// Executa a ação ao clicar no botão "Adicionar"
addTaskBtn.addEventListener('click', addTask);

// Executa a ação também ao apertar a tecla "Enter" dentro do campo de texto
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 5. INICIALIZAÇÃO
// Renderiza as tarefas assim que a página termina de carregar
document.addEventListener('DOMContentLoaded', renderTasks);