
function curtir(botao) {
    let numero = Number(botao.textContent.match(/\d+/)[0]);
    numero++;
    botao.textContent = "💗 Curtir " + numero;
}

function postar() {
    let texto = document.getElementById("texto");
    let feed = document.getElementById("feed");

    if (texto.value.trim() === "") {
        alert("Escreva algo primeiro! 💕");
        return;
    }

    let post = document.createElement("article");
    post.innerHTML = `
        <h3>Yasmim Costa 💗</h3>
        <p></p>
        <button onclick="curtir(this)">💗 Curtir 0</button>
    `;

    post.querySelector("p").textContent = texto.value;
    feed.prepend(post);
    texto.value = "";
}
