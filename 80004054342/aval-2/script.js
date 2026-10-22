
let publicacoes = [];
let proximoId = 1;

function publicar() {
    const nomeInput = document.getElementById("nome");
    const textoInput = document.getElementById("texto");

    const nome = nomeInput.value.trim();
    const texto = textoInput.value.trim();

    if (nome === "" || texto === "") {
        alert("Digite seu nome e escreva uma publicação!");
        return;
    }

    publicacoes.unshift({
        id: proximoId++,
        nome: nome,
        texto: texto,
        curtidas: 0
    });

    nomeInput.value = "";
    textoInput.value = "";

    mostrarFeed();
}

function curtir(id) {
    const post = publicacoes.find(p => p.id === id);

    if (post) {
        post.curtidas++;
        mostrarFeed();
    }
}

function excluir(id) {
    publicacoes = publicacoes.filter(p => p.id !== id);
    mostrarFeed();
}

function mostrarFeed() {
    const feed = document.getElementById("feed");

    feed.replaceChildren();

    if (publicacoes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma publicação ainda. Seja o primeiro!";
        feed.appendChild(aviso);
        return;
    }

    publicacoes.forEach(post => {
        const cartao = document.createElement("article");
        cartao.className = "post";

        const nome = document.createElement("h3");
        nome.textContent = post.nome;

        const texto = document.createElement("p");
        texto.textContent = post.texto;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoCurtir = document.createElement("button");
        botaoCurtir.className = "curtir";
        botaoCurtir.textContent = `♥ Curtir (${post.curtidas})`;
        botaoCurtir.onclick = () => curtir(post.id);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluir(post.id);

        acoes.append(botaoCurtir, botaoExcluir);
        cartao.append(nome, texto, acoes);
        feed.appendChild(cartao);
    });
}

mostrarFeed();
