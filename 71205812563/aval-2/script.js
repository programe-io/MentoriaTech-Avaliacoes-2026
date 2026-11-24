
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gerenciador de Tarefas</title>
<style>
* { box-sizing: border-box; }

body {
  font-family: Arial, sans-serif;
  background: #101827;
  color: white;
  display: flex;
  justify-content: center;
  padding: 40px 15px;
}

.container {
  width: 100%;
  max-width: 600px;
  background: #1e293b;
  padding: 25px;
  border-radius: 16px;
}

h1 { text-align: center; color: #38bdf8; }

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  min-width: 0;
  padding: 13px;
  border-radius: 8px;
  border: none;
  outline: none;
}

button {
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.add { background: #38bdf8; color: #082f49; }

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters button {
  background: #334155;
  color: white;
}

.filters button.active {
  background: #0284c7;
}

.task {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #334155;
  padding: 13px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.task span {
  flex: 1;
  overflow-wrap: anywhere;
}

.task.done span {
  text-decoration: line-through;
  color: #94a3b8;
}

.delete {
  background: #ef4444;
  color: white;
}

.stats {
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 14px;
  margin-top: 20px;
}
</style>
</head>
<body>

<div class="container">
  <h1>📝 Minhas Tarefas</h1>

  <form class="form" id="taskForm">
    <input id="taskInput" placeholder="Digite uma tarefa..." required>
    <button class="add" type="submit">Adicionar</button>
  </form>

  <div class="filters">
    <button class="active" data-filter="all">Todas</button>
    <button data-filter="pending">Pendentes</button>
    <button data-filter="done">Concluídas</button>
  </div>

  <div id="taskList"></div>

  <div class="stats">
    <span id="total">Total: 0</span>
    <span id="completed">Concluídas: 0</span>
  </div>
</div>

<script>
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "pending") return !task.done;
    if (currentFilter === "done") return task.done;
    return true;
  });

  filtered.forEach(task => {
    const div = document.createElement("div");
    div.className = "task" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.name;

    const button = document.createElement("button");
    button.className = "delete";
    button.textContent = "Excluir";
    button.addEventListener("click", () => deleteTask(task.id));

    div.append(checkbox, span, button);
    list.appendChild(div);
  });

  document.getElementById("total").textContent =
    "Total: " + tasks.length;

  document.getElementById("completed").textContent =
    "Concluídas: " + tasks.filter(t => t.done).length;
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = input.value.trim();
  if (!name) return;

  tasks.push({
    id: Date.now() + Math.random(),
    name,
    done: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
});

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? {...task, done: !task.done} : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    document.querySelectorAll(".filters button")
      .forEach(b => b.classList.remove("active"));

    button.classList.add("active");
    renderTasks();
  });
});

renderTasks();
</script>

</body>
</html>
