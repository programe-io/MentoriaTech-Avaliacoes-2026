function publicar() {
    const mensagem = document.getElementById("mensagem");
    const publicacoes = document.getElementById("publicacoes");

    if (mensagem.value.trim() === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <h3>Você</h3>
        <p></p>
        <button onclick="curtir(this)">👍 Curtir</button>
        <span>0 curtidas</span>
    `;

    post.querySelector("p").textContent = mensagem.value;

    publicacoes.prepend(post);

    mensagem.value = "";
}

function curtir(botao) {
    const contador = botao.nextElementSibling;

    let curtidas = Number(contador.dataset.curtidas || 0);

    curtidas++;

    contador.dataset.curtidas = curtidas;
    contador.textContent = curtidas + " curtidas";
}