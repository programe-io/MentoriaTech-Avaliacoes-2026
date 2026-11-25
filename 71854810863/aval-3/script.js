
const feed = document.getElementById("feed");

// Curtidas
feed.addEventListener("click", function(event) {
    if (event.target.classList.contains("curtir")) {
        const botao = event.target;
        const contador = botao.parentElement.querySelector(".contador");

        let curtidas = Number(contador.dataset.total || 0);

        if (botao.dataset.curtido === "sim") {
            curtidas--;
            botao.dataset.curtido = "nao";
            botao.textContent = "❤️ Curtir";
        } else {
            curtidas++;
            botao.dataset.curtido = "sim";
            botao.textContent = "💗 Curtido";
        }

        contador.dataset.total = curtidas;
        contador.textContent = curtidas + " curtidas";
    }

    // Comentários
    if (event.target.classList.contains("comentar")) {
        const post = event.target.closest(".post");
        const campo = post.querySelector(".comentario");
        const lista = post.querySelector(".comentarios");

        if (campo.value.trim() !== "") {
            const comentario = document.createElement("p");
            comentario.textContent = "💬 " + campo.value;
            lista.appendChild(comentario);
            campo.value = "";
        }
    }
});

// Criar publicação
document.getElementById("publicar").addEventListener("click", function() {
    const usuario = document.getElementById("usuario").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !legenda) {
        alert("Preencha seu nome e sua legenda!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "👤 " + usuario;

    const texto = document.createElement("p");
    texto.textContent = legenda;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "❤️ Curtir";

    const contador = document.createElement("span");
    contador.className = "contador";
    contador.textContent = "0 curtidas";
    contador.dataset.total = "0";

    acoes.append(botao, contador);
    post.append(titulo, texto, acoes);

    feed.prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("legenda").value = "";

    alert("Publicação criada! 📸");
});
