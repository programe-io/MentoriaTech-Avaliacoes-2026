const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const taskList = document.getElementById('task-list');
const countTotal = document.getElementById('count-total');
const countCompleted = document.getElementById('count-completed');

// Carregar tarefas salvas no localStorage ou iniciar array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';
                
                    let completedCount = 0;

                        tasks.forEach((task, index) => {
                                if (task.completed) completedCount++;

                                        const li = document.createElement('li');
                                                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                                                        
                                                                li.innerHTML = `
                                                                            <div class="task-info">
                                                                                            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                                                                                                            <span class="task-text">${escapeHtml(task.text)}</span>
                                                                                                                            <span class="task-badge">${task.category}</span>
                                                                                                                                        </div>
                                                                                                                                                    <div class="task-actions">
                                                                                                                                                                    <button class="btn-delete" onclick="deleteTask(${index})">X</button>
                                                                                                                                                                                </div>
                                                                                                                                                                                        `;
                                                                                                                                                                                                
                                                                                                                                                                                                        taskList.appendChild(li);
                                                                                                                                                                                                            });

                                                                                                                                                                                                                countTotal.textContent = tasks.length;
                                                                                                                                                                                                                    countCompleted.textContent = completedCount;
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                    function addTask(e) {
                                                                                                                                                                                                                        e.preventDefault();
                                                                                                                                                                                                                            const text = taskInput.value.trim();
                                                                                                                                                                                                                                if (!text) return;

                                                                                                                                                                                                                                    tasks.push({
                                                                                                                                                                                                                                            text: text,
                                                                                                                                                                                                                                                    category: taskCategory.value,
                                                                                                                                                                                                                                                            completed: false
                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                    taskInput.value = '';
                                                                                                                                                                                                                                                                        saveAndRender();
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        function toggleTask(index) {
                                                                                                                                                                                                                                                                            tasks[index].completed = !tasks[index].completed;
                                                                                                                                                                                                                                                                                saveAndRender();
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                function deleteTask(index) {
                                                                                                                                                                                                                                                                                    tasks.splice(index, 1);
                                                                                                                                                                                                                                                                                        saveAndRender();
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                        // Segurança básica contra XSS ao inserir texto do usuário
                                                                                                                                                                                                                                                                                        function escapeHtml(text) {
                                                                                                                                                                                                                                                                                            const map = {
                                                                                                                                                                                                                                                                                                    '&': '&amp;',
                                                                                                                                                                                                                                                                                                            '<': '&lt;',
                                                                                                                                                                                                                                                                                                                    '>': '&gt;',
                                                                                                                                                                                                                                                                                                                            '"': '&quot;',
                                                                                                                                                                                                                                                                                                                                    "'": '&#039;'
                                                                                                                                                                                                                                                                                                                                        };
                                                                                                                                                                                                                                                                                                                                            return text.replace(/[&<>"']/g, m => map[m]);
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                            taskForm.addEventListener('submit', addTask);

                                                                                                                                                                                                                                                                                                                                            // Executar renderização inicial ao carregar a página
                                                                                                                                                                                                                                                                                                                                            renderTasks();