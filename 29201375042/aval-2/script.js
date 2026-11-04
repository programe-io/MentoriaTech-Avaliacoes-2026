
function publicar() {

    const texto = document.getElementById("texto");
    const feed = document.getElementById("feed");

    if (texto.value.trim() === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <h3>Você</h3>
        <p>${escaparHTML(texto.value)}</p>
        <button onclick="curtir(this)">
            ❤️ Curtir <span>0</span>
        </button>
    `;

    feed.prepend(post);

    texto.value = "";
}

function curtir(botao) {

    const contador = botao.querySelector("span");

    contador.textContent = Number(contador.textContent) + 1;

}

function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}
