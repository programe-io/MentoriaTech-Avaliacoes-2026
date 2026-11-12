function adicionar() {

    const campo = document.getElementById("produto");

    const nome = campo.value.trim();

    if (nome === "") {
        alert("Digite um produto!");
        return;
    }

    // Criar elemento
    const div = document.createElement("div");

    div.className = "produto";

    // Criar texto
    const texto = document.createElement("span");

    texto.textContent = nome;

    // Criar botão
    const botao = document.createElement("button");

    botao.textContent = "Remover";
    botao.className = "remover";

    // Remover elemento
    botao.onclick = function() {
        div.remove();
    };

    // Adicionar elementos
    div.appendChild(texto);
    div.appendChild(botao);

    document.getElementById("lista").appendChild(div);

    campo.value = "";
}