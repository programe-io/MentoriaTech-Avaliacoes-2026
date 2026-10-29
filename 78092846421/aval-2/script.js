function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e sua mensagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const etiqueta = document.createElement("span");
    etiqueta.className = "categoria";
    etiqueta.textContent = categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.innerHTML = '♡ Apoiar <span>0</span>';

    botao.addEventListener("click", function () {
        curtir(botao);
    });

    post.append(etiqueta, titulo, texto, botao);

    document.getElementById("publicacoes").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.classList.contains("ativo")) {
        total--;
        botao.classList.remove("ativo");
        botao.innerHTML = `♡ Apoiar <span>${total}</span>`;
    } else {
        total++;
        botao.classList.add("ativo");
        botao.innerHTML = `♥ Apoiando <span>${total}</span>`;
    }
}