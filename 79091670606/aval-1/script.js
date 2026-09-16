const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa antes de adicionar.");
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    taskInput.focus();

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach(function (task) {
        const listItem = document.createElement("li");
        listItem.classList.add("task");

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(text);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const pendingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    if (pendingTasks === 1) {
        taskCount.textContent = "1 tarefa pendente";
    } else {
        taskCount.textContent = pendingTasks + " tarefas pendentes";
    }
}

clearButton.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    renderTasks();
});

renderTasks();