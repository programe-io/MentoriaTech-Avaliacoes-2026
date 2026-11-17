
let seguindo = false;
let totalSeguidores = 1250;

// SEGUIR PERFIL

function seguir() {
    const botao = document.getElementById("seguirBtn");
    const seguidores = document.getElementById("seguidores");

    seguindo = !seguindo;

    totalSeguidores += seguindo ? 1 : -1;

    botao.textContent = seguindo ? "Seguindo" : "Seguir";
    botao.style.background = seguindo ? "#777" : "#0095f6";

    seguidores.textContent = totalSeguidores.toLocaleString("pt-BR");
}

// CURTIR PUBLICAÇÃO

function curtir(botao) {
    let numero = Number(
        botao.textContent.match(/\d+/)?.[0] || 0
    );

    const curtido = botao.dataset.curtido === "true";

    numero += curtido ? -1 : 1;

    botao.dataset.curtido = curtido ? "false" : "true";
    botao.textContent = (curtido ? "♡ " : "♥ ") + numero;
    botao.style.color = curtido ? "white" : "#ff5b79";
}

// COMENTAR

function comentar() {
    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        alert("Comentário adicionado: " + texto.trim());
    }
}

// PUBLICAR FOTO

function publicar() {
    const legenda = document.getElementById("legenda").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!foto.startsWith("https://") &&
        !foto.startsWith("http://")) {
        alert("Digite um link de imagem válido!");
        return;
    }

    const galeria = document.getElementById("galeria");

    const post = document.createElement("div");
    post.className = "post";

    const imagem = document.createElement("img");
    imagem.src = foto;
    imagem.alt = "Nova publicação";

    imagem.onerror = function() {
        alert("Não foi possível carregar essa imagem.");
        post.remove();
    };

    const detalhes = document.createElement("div");
    detalhes.className = "legenda-post";

    const texto = document.createElement("p");
    texto.textContent = legenda;

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ 0";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = comentar;

    detalhes.append(texto, botaoCurtir, botaoComentar);
    post.append(imagem, detalhes);

    galeria.prepend(post);

    document.getElementById("postsCount").textContent =
        galeria.children.length;

    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";

    alert("Sua publicação foi criada!");
}
