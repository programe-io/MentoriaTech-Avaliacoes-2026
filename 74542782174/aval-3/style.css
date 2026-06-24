const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

function updateCounter() {
    taskCount.textContent =
        `${tasks.length} tarefa${tasks.length !== 1 ? "s" : ""}`;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => renderTask(task));
        updateCounter();
    }
}

function renderTask(task) {
    const li = document.createElement("li");
    li.classList.add("task");

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>

        <div class="actions">
            <button class="complete-btn">✓</button>
            <button class="delete-btn">✕</button>
        </div>
    `;

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        li.classList.toggle("completed");

        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();

        tasks = tasks.filter(t => t.id !== task.id);

        updateCounter();
        saveTasks();
    });

    taskList.appendChild(li);
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        alert("Digite uma tarefa.");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);

    renderTask(task);

    updateCounter();
    saveTasks();

    taskInput.value = "";
    taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clearBtn.addEventListener("click", () => {
    if (confirm("Deseja remover todas as tarefas?")) {
        tasks = [];
        taskList.innerHTML = "";

        updateCounter();
        saveTasks();
    }
});

loadTasks();