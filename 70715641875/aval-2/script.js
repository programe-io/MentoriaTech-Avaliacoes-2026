vvconst taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// Adicionar tarefa
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Digite uma tarefa!");
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
}


// Salvar tarefas
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Mostrar tarefas
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );
    }


    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.classList.add("empty");

        emptyMessage.textContent =
            "Nenhuma tarefa encontrada.";

        taskList.appendChild(emptyMessage);

    } else {

        filteredTasks.forEach(task => {

            const li = document.createElement("li");

            li.classList.add("task");

            if (task.completed) {
                li.classList.add("completed");
            }


            // Checkbox
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked = task.completed;


            checkbox.addEventListener(
                "change",
                () => toggleTask(task.id)
            );


            // Texto
            const span = document.createElement("span");

            span.classList.add("task-text");

            span.textContent = task.text;


            // Botão excluir
            const deleteButton =
                document.createElement("button");

            deleteButton.classList.add("delete-btn");

            deleteButton.textContent = "🗑️";

            deleteButton.title = "Excluir tarefa";


            deleteButton.addEventListener(
                "click",
                () => deleteTask(task.id)
            );


            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);

            taskList.appendChild(li);

        });
    }

    updateCounter();
}


// Concluir/desmarcar tarefa
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


// Excluir tarefa
function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();
}


// Atualizar contador
function updateCounter() {

    const pendingTasks =
        tasks.filter(task => !task.completed).length;

    if (pendingTasks === 1) {

        taskCounter.textContent =
            "1 tarefa pendente";

    } else {

        taskCounter.textContent =
            `${pendingTasks} tarefas pendentes`;
    }
}


// Limpar tarefas concluídas
function clearCompleted() {

    tasks = tasks.filter(
        task => !task.completed
    );

    saveTasks();

    renderTasks();
}


// Filtros
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        renderTasks();
    });

});


// Eventos
addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            addTask();
        }

    }
);

clearCompletedBtn.addEventListener(
    "click",
    clearCompleted
);


// Inicializar
renderTasks();
