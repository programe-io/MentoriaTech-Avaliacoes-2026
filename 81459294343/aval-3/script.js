
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.match(/\d+/)?.[0] || 0
    );

    const jaCurtiu = botao.classList.toggle("curtido");

    quantidade += jaCurtiu ? 1 : -1;

    likes.textContent = "❤️ " + quantidade + " curtidas";

    botao.textContent = jaCurtiu ? "♥" : "♡";
    botao.style.color = jaCurtiu ? "#e1306c" : "#262626";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + texto.trim();
        novoComentario.style.padding = "10px";

        comentarios.appendChild(novoComentario);
    }
}

function mostrarFormulario() {
    const formulario = document.getElementById("formulario");
    formulario.scrollIntoView({ behavior: "smooth" });
}

function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !imagem || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            alert("Use um endereço de imagem HTTP ou HTTPS.");
            return;
        }
    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    cabecalho.appendChild(nome);

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;
    foto.alt = "Imagem da publicação";
    foto.onerror = () => foto.remove();

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡";
    botaoCurtir.onclick = () => curtir(botaoCurtir);

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬";
    botaoComentar.onclick = () => comentar(botaoComentar);

    acoes.append(botaoCurtir, botaoComentar);

    const curtidas = document.createElement("p");
    curtidas.className = "likes";
    curtidas.textContent = "❤️ 0 curtidas";

    const descricao = document.createElement("p");
    const autor = document.createElement("strong");
    autor.textContent = usuario + " ";
    descricao.append(autor, document.createTextNode(legenda));

    const areaComentarios = document.createElement("div");
    areaComentarios.className = "comentarios";

    post.append(
        cabecalho,
        foto,
        acoes,
        curtidas,
        descricao,
        areaComentarios
    );

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";
}
