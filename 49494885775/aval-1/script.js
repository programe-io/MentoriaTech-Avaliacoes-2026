function adicionarTarefa() {
    const campo = document.getElementById("tarefa");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const lista = document.getElementById("lista");
    const item = document.createElement("li");
    const nome = document.createElement("span");

    nome.textContent = texto;
    nome.style.cursor = "pointer";

    // Concluir ou reabrir tarefa
    nome.onclick = function () {
        nome.classList.toggle("concluida");
    };

    // Criar botão de exclusão
    const botao = document.createElement("button");
    botao.textContent = "Excluir";

    botao.onclick = function () {
        item.remove();
    };

    item.appendChild(nome);
    item.appendChild(document.createTextNode(" "));
    item.appendChild(botao);

    lista.appendChild(item);

    campo.value = "";
    campo.focus();
}