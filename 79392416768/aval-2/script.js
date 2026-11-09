
function publicar() {
    const texto = document.getElementById("textoPost").value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <h3>Você</h3>
        <p></p>
        <button onclick="curtir(this)">❤️ Curtir</button>
        <span>0 curtidas</span>
    `;

    // Insere o texto como conteúdo, evitando interpretar HTML digitado.
    post.querySelector("p").textContent = texto;

    feed.insertBefore(post, feed.children[1]);

    document.getElementById("textoPost").value = "";
}

function curtir(botao) {
    const contador = botao.nextElementSibling;
    let curtidas = parseInt(contador.textContent) || 0;

    if (botao.dataset.curtido === "sim") {
        curtidas--;
        botao.dataset.curtido = "nao";
        botao.textContent = "❤️ Curtir";
    } else {
        curtidas++;
        botao.dataset.curtido = "sim";
        botao.textContent = "💜 Curtido";
    }

    contador.textContent = curtidas + " curtidas";
}
