const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

function verificarListaVazia() {
    if (taskList.children.length === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
    }
}

function adicionarTarefa() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, digite uma tarefa válida.");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;
    
    span.addEventListener("click", function() {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.addEventListener("click", function() {
        li.remove();
        verificarListaVazia();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
    verificarListaVazia();
}

addButton.addEventListener("click", adicionarTarefa);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

verificarListaVazia();