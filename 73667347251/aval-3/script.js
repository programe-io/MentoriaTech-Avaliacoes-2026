function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.classList.contains("liked")) {
        total--;
        botao.classList.remove("liked");
        botao.firstChild.textContent = "♡ ";
    } else {
        total++;
        botao.classList.add("liked");
        botao.firstChild.textContent = "♥ ";
    }

    contador.textContent = total;
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário registrado nesta demonstração!");
    }
}

function criarPost() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !legenda) {
        alert("Preencha seu usuário e o texto da publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "user";

    const avatar = document.createElement("div");
    avatar.className = "mini-avatar blue";
    avatar.textContent = nome.charAt(0).toUpperCase();

    const identificacao = document.createElement("div");
    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = "@" + nome.replace(/^@/, "");

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    identificacao.append(nomeUsuario, horario);
    usuario.append(avatar, identificacao);

    post.appendChild(usuario);

    if (imagem) {
        const foto = document.createElement("img");
        foto.src = imagem;
        foto.alt = "Imagem da publicação";
        foto.className = "post-image";
        foto.style.width = "100%";
        foto.style.objectFit = "cover";

        foto.onerror = function() {
            foto.remove();
            alert("Não foi possível carregar a imagem.");
        };

        post.appendChild(foto);
    }

    const texto = document.createElement("p");
    texto.textContent = legenda;
    post.appendChild(texto);

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.className = "like";
    like.innerHTML = '♡ <span>0</span>';
    like.onclick = function() {
        curtir(like);
    };

    const comment = document.createElement("button");
    comment.textContent = "COMENTAR";
    comment.onclick = comentar;

    actions.append(like, comment);
    post.appendChild(actions);

    document.getElementById("publicacoes").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";

    alert("Publicação criada com sucesso!");
}

function irParaPerfil() {
    document.getElementById("perfil").scrollIntoView({
        behavior: "smooth"
    });
}

function irParaInicio() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function irParaStories() {
    document.querySelector(".stories").scrollIntoView({
        behavior: "smooth"
    });
}

function irParaPublicar() {
    document.getElementById("criar").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(function(post) {
        post.style.display = post.textContent.toLowerCase().includes(busca)
            ? "block"
            : "none";
    });
});