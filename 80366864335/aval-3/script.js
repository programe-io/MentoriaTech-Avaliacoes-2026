
function curtir(botao) {
    const icone = botao.querySelector("i");
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.total || 0);

    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        icone.className = "fa-regular fa-heart";
        quantidade--;
    } else {
        botao.classList.add("curtido");
        icone.className = "fa-solid fa-heart";
        quantidade++;
    }

    likes.dataset.total = quantidade;
    likes.textContent = quantidade + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    post.querySelector(".comment-box input").focus();
}

function enviarComentario(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comment-box input");
    const comentarios = post.querySelector(".comentarios");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    const p = document.createElement("p");
    p.textContent = input.value;

    comentarios.appendChild(p);
    input.value = "";
}

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const foto = document.getElementById("foto").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !foto || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    let url;

    try {
        url = new URL(foto);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
        }
    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    const imagem = document.createElement("img");
    imagem.className = "post-image";
    imagem.src = url.href;
    imagem.alt = "Publicação";

    imagem.onerror = () => {
        alert("Não foi possível carregar a imagem.");
        post.remove();
    };

    const legendaTexto = document.createElement("p");
    legendaTexto.textContent = legenda;

    const botoes = document.createElement("div");
    botoes.className = "actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    curtirBtn.onclick = () => curtir(curtirBtn);

    const comentarBtn = document.createElement("button");
    comentarBtn.innerHTML = '<i class="fa-regular fa-comment"></i>';
    comentarBtn.onclick = () => comentar(comentarBtn);

    botoes.append(curtirBtn, comentarBtn);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const caixa = document.createElement("div");
    caixa.className = "comment-box";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.onclick = () => enviarComentario(enviar);

    caixa.append(input, enviar);
    header.append(nome);

    post.append(
        header, imagem, botoes,
        likes, legendaTexto, comentarios, caixa
    );

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("legenda").value = "";

    fecharModal();
}
