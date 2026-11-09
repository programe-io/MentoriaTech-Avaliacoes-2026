
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !texto || !imagem) {
        alert("Preencha todos os campos!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const perfil = document.createElement("div");
    perfil.className = "perfil";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=33";
    avatar.alt = "Foto do perfil";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    perfil.append(avatar, titulo);

    const descricao = document.createElement("p");
    descricao.textContent = texto;

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;
    foto.alt = "Imagem da publicação";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(perfil, descricao, foto, curtirBtn,
        campo, comentarBtn, comentarios);

    const feed = document.getElementById("feed");
    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    contador.textContent = Number(contador.textContent) + 1;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector("input");
    const comentarios = post.querySelector(".comentarios");

    if (!campo.value.trim()) {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + campo.value;

    comentarios.appendChild(comentario);
    campo.value = "";
}
