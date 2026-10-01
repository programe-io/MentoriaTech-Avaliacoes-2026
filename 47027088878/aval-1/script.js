const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");


function atualizarContador() {

    count.textContent = taskList.children.length;

}


function adicionarTarefa() {

    const texto = input.value.trim();


    if (texto === "") {

        alert("Digite uma tarefa!");

        return;
    }


    const li = document.createElement("li");


    const span = document.createElement("span");

    span.textContent = texto;


    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Excluir";

    deleteBtn.classList.add("delete");


    // Marcar tarefa como concluída
    span.addEventListener("click", () => {

        li.classList.toggle("concluida");

    });


    // Excluir tarefa
    deleteBtn.addEventListener("click", () => {

        li.remove();

        atualizarContador();

    });


    li.appendChild(span);

    li.appendChild(deleteBtn);


    taskList.appendChild(li);


    input.value = "";

    input.focus();


    atualizarContador();

}


// Botão adicionar
addBtn.addEventListener("click", adicionarTarefa);


// Adicionar pressionando Enter
input.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        adicionarTarefa();

    }

});