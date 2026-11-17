
// Função para curtir notícias
function curtir(botao) {
    const contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);

    quantidade++;

    contador.textContent = quantidade;
}

// Função para pesquisar notícias
function pesquisarNoticias() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const noticias = document.querySelectorAll(".noticia");

    noticias.forEach(noticia => {
        const texto = noticia.textContent.toLowerCase();

        noticia.style.display = texto.includes(pesquisa)
            ? "flex"
            : "none";
    });
}

// Função para adicionar notícias
function adicionarNoticia() {
    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const imagem = document.getElementById("imagem").value;
    const descricao = document.getElementById("descricao").value;

    if (!titulo || !categoria || !descricao) {
        alert("Preencha o título, categoria e descrição!");
        return;
    }

    const feed = document.getElementById("feed");

    const noticia = document.createElement("article");

    noticia.className = "noticia";

    const img = document.createElement("img");
    img.src = imagem || "https://placehold.co/600x400?text=Noticia";
    img.alt = titulo;

    const info = document.createElement("div");
    info.className = "noticia-info";

    const categoriaElemento = document.createElement("span");
    categoriaElemento.className = "categoria";
    categoriaElemento.textContent = categoria;

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = descricao;

    const data = document.createElement("small");
    data.textContent = new Date().toLocaleDateString("pt-BR");

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "❤️ Curtir ";

    const contador = document.createElement("span");
    contador.textContent = "0";

    botao.appendChild(contador);
    botao.onclick = function() {
        curtir(botao);
    };

    info.append(
        categoriaElemento,
        tituloElemento,
        descricaoElemento,
        data,
        botao
    );

    noticia.append(img, info);

    feed.prepend(noticia);

    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";

    alert("Notícia publicada com sucesso!");
}
