
let tasks = [];
let filter = "todas";

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");

function render() {
    list.innerHTML = "";

    let shown = tasks.filter(task =>
        filter === "todas" ||
        (filter === "pendentes" && !task.done) ||
        (filter === "concluidas" && task.done)
    );

    shown.forEach(task => {
        const li = document.createElement("li");

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = task.done;

        check.addEventListener("change", () => {
            task.done = check.checked;
            render();
        });

        const text = document.createElement("span");
        text.textContent =
            task.title + " - Prioridade: " + task.priority;

        if (task.done) {
            text.classList.add("done");
        }

        const del = document.createElement("button");
        del.textContent = "Excluir";

        del.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            render();
        });

        li.append(check, text, del);
        list.appendChild(li);
    });

    counter.textContent = tasks.length + " tarefa(s)";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = input.value.trim();

    if (title.length < 3) {
        alert("Digite pelo menos 3 caracteres!");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        priority: priority.value,
        done: false
    });

    input.value = "";
    render();
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        filter = button.dataset.filter;
        render();
    });
});

render();
