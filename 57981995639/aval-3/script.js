// ========================================
// ELEMENTOS DO HTML
// ========================================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

const clearCompletedButton =
    document.getElementById("clearCompleted");

const clearAllButton =
    document.getElementById("clearAll");

const filterButtons =
    document.querySelectorAll(".filter");


// ========================================
// DADOS
// ========================================

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

let currentFilter = "all";


// ========================================
// SALVAR TAREFAS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ========================================
// ADICIONAR TAREFA
// ========================================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    taskInput.focus();
});


// ========================================
// RENDERIZAR TAREFAS
// ========================================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Filtrar tarefas
    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }


    // Criar elementos
    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener(
            "change",
            function() {

                toggleTask(task.id);

            }
        );


        // Texto
        const span =
            document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Botão excluir
        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-task";

        deleteButton.innerHTML = "×";

        deleteButton.title =
            "Excluir tarefa";


        deleteButton.addEventListener(
            "click",
            function() {

                deleteTask(task.id);

            }
        );


        // Montar tarefa
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();

    updateEmptyMessage();
}


// ========================================
// CONCLUIR TAREFA
// ========================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

    renderTasks();
}


// ========================================
// EXCLUIR TAREFA
// ========================================

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();
}


// ========================================
// CONTADOR
// ========================================

function updateCounter() {

    const pendingTasks =
        tasks.filter(
            task => !task.completed
        ).length;

    taskCount.textContent = pendingTasks;
}


// ========================================
// MENSAGEM DE LISTA VAZIA
// ========================================

function updateEmptyMessage() {

    if (taskList.children.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }
}


// ========================================
// FILTROS
// ========================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            renderTasks();

        }
    );

});


// ========================================
// LIMPAR TAREFAS CONCLUÍDAS
// ========================================

clearCompletedButton.addEventListener(
    "click",
    function() {

        tasks = tasks.filter(
            task => !task.completed
        );

        saveTasks();

        renderTasks();

    }
);


// ========================================
// EXCLUIR TODAS
// ========================================

clearAllButton.addEventListener(
    "click",
    function() {

        if (tasks.length === 0) {
            return;
        }

        const confirmation =
            confirm(
                "Deseja realmente excluir todas as tarefas?"
            );

        if (!confirmation) {
            return;
        }

        tasks = [];

        saveTasks();

        renderTasks();

    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

renderTasks();
