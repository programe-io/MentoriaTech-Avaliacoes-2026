
function curtir(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.style.color = "#d84c85";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.style.color = "red";
    }

    contador.textContent = quantidade;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    const texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim() !== "") {
        const comentario = document.createElement("p");
        comentario.textContent = "💗 Você: " + texto;

        area.appendChild(comentario);
    }
}

function publicar() {
    const legenda = document.getElementById("legenda");
    const imagem = document.getElementById("imagem");

    if (!legenda.value.trim() || !imagem.value.trim()) {
        alert("Preencha a legenda e o link da imagem!");
        return;
    }

    let url;

    try {
        url = new URL(imagem.value);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Link inválido");
        }
    } catch {
        alert("Digite um link de imagem válido!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const fotoPerfil = document.createElement("img");
    fotoPerfil.src = "https://i.pravatar.cc/100?img=47";
    fotoPerfil.alt = "Perfil de Vânia";

    const nome = document.createElement("strong");
    nome.textContent = "Vânia";

    usuario.append(fotoPerfil, nome);

    const texto = document.createElement("p");
    texto.textContent = legenda.value;

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = url.href;
    foto.alt = "Publicação";

    const acoes = document.createElement("div");
    acoes.className = "acoes";
    acoes.innerHTML = `
        <button onclick="curtir(this)">♡ <span>0</span></button>
        <button onclick="comentar(this)">💬</button>
    `;

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(usuario, texto, foto, acoes, comentarios);

    document.getElementById("postagens").prepend(post);

    legenda.value = "";
    imagem.value = "";

    atualizarTotal();
}

function atualizarTotal() {
    const total = document.querySelectorAll("#postagens .post").length;

    document.getElementById("totalPosts").textContent = total;
}

atualizarTotal();
