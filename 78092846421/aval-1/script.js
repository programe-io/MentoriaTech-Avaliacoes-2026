function adicionarTarefa() {
    const campo = document.getElementById("tarefa");
    const lista = document.getElementById("lista-tarefas");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    const item = document.createElement("li");
    const textoTarefa = document.createElement("span");
    const concluir = document.createElement("input");
    const remover = document.createElement("button");

    concluir.type = "checkbox";
    concluir.setAttribute("aria-label", "Concluir tarefa");

    textoTarefa.textContent = " " + texto + " ";

    concluir.addEventListener("change", function () {
        textoTarefa.style.textDecoration =
            concluir.checked ? "line-through" : "none";
    });

    remover.textContent = "Excluir";
    remover.style.marginLeft = "10px";

    remover.addEventListener("click", function () {
        item.remove();
    });

    item.appendChild(concluir);
    item.appendChild(textoTarefa);
    item.appendChild(remover);

    lista.appendChild(item);

    campo.value = "";
    campo.focus();
}