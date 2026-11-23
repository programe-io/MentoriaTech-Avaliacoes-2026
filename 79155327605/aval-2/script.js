
function curtir(botao) {
    let contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);
    contador.textContent = quantidade + 1;
}

function publicarNoticia() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").value;

    if (titulo.trim() === "" || descricao.trim() === "") {
        alert("Preencha o título e a descrição!");
        return;
    }

    const noticias = document.getElementById("noticias");

    const novaNoticia = document.createElement("article");
    novaNoticia.className = "noticia";

    const img = document.createElement("img");
    img.src = imagem.trim() || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800";
    img.alt = "Imagem da notícia";

    img.onerror = function() {
        this.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800";
    };

    const conteudo = document.createElement("div");
    conteudo.className = "conteudo";

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = "Nova publicação";

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = descricao;

    const botao = document.createElement("button");
    botao.innerHTML = '❤️ Curtir <span>0</span>';
    botao.onclick = function() {
        curtir(this);
    };

    conteudo.appendChild(categoria);
    conteudo.appendChild(tituloElemento);
    conteudo.appendChild(descricaoElemento);
    conteudo.appendChild(botao);

    novaNoticia.appendChild(img);
    novaNoticia.appendChild(conteudo);

    noticias.prepend(novaNoticia);

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";

    alert("Notícia publicada com sucesso!");
}
