const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Salvar no localStorage e atualizar a tela
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
\}

// Adicionar tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    \};

    tasks.push(newTask);
    taskInput.value = '';
    saveAndRender();
\});

// Alternar estado da tarefa (Concluída/Pendente)
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed \};
        \}
        return task;
    \});
    saveAndRender();
\}

// Deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
\}

// Filtrar tarefas
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        renderTasks();
    \});
\});

// Renderizar na tela
function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    \});

    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
    \} else {
        emptyState.style.display = 'none';
    \}

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-info">
                <input type="checkbox" \${task.completed ? 'checked' : ''\} onchange="toggleTask(\${task.id\})">
                <span>\${escapeHtml(task.text)\}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(\${task.id\})">Excluir</button>
        `;

        taskList.appendChild(li);
    \});
\}

// Segurança básica contra XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    \};
    return text.replace(/[&<>"']/g, m => map[m]);
\}

// Executar carregamento inicial
renderTasks();$0