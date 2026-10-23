
function publicarPost() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const lista = document.getElementById("listaPosts");

    const post = document.createElement("article");
    post.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = "⚽";

    const identificacao = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Torcedor";

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = "Nova publicação";

    identificacao.appendChild(nome);
    identificacao.appendChild(categoria);

    topo.appendChild(avatar);
    topo.appendChild(identificacao);

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "♡ Curtir (0)";
    botao.onclick = function () {
        curtirPost(botao);
    };

    post.appendChild(topo);
    post.appendChild(paragrafo);
    post.appendChild(botao);

    lista.prepend(post);

    campo.value = "";
}

function curtirPost(botao) {
    let curtidas = Number(
        botao.textContent.match(/\d+/)[0]
    );

    curtidas++;

    botao.textContent = "♥ Curtir (" + curtidas + ")";
}
