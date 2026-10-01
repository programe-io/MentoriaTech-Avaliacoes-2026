function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const lista = document.getElementById("listaTarefas");

    const tarefa = document.createElement("li");
    tarefa.textContent = texto;

    tarefa.addEventListener("click", function () {
        tarefa.classList.toggle("concluida");
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("excluir");

    botaoExcluir.addEventListener("click", function (evento) {
        evento.stopPropagation();
        tarefa.remove();
    });

    tarefa.appendChild(botaoExcluir);
    lista.appendChild(tarefa);

    input.value = "";
    input.focus();
}