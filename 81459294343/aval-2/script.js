
function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
    botao.textContent = "💗 Curtido! " + curtidas;
}

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "🐷 " + nome;

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    const botao = document.createElement("button");
    botao.innerHTML = '💗 Curtir <span>0</span>';
    botao.onclick = function() {
        curtir(botao);
    };

    post.appendChild(titulo);
    post.appendChild(mensagem);
    post.appendChild(botao);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
}
