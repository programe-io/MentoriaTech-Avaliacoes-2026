
function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        curtidas--;
        botao.classList.remove("curtido");
    } else {
        curtidas++;
        botao.classList.add("curtido");
    }

    contador.textContent = curtidas;
}

function comentar(botao) {
    const area = botao.parentElement;

    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "💬 " + texto;

    lista.appendChild(comentario);

    input.value = "";
}

function criarPost() {
    const nome = document.getElementById("nome").value.trim();
    const fotoPerfil = document.getElementById("fotoPerfil").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");

    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("img");
    avatar.src = fotoPerfil || "https://i.pravatar.cc/100?img=5";
    avatar.alt = "Foto de perfil";

    avatar.onerror = function() {
        this.src = "https://i.pravatar.cc/100?img=5";
    };

    const dados = document.createElement("div");

    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = nome;

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    dados.append(nomeUsuario, horario);
    usuario.append(avatar, dados);

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.append(usuario, mensagem);

    if (imagem) {
        const foto = document.createElement("img");

        foto.className = "foto-post";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        foto.onerror = function() {
            this.remove();
        };

        post.appendChild(foto);
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    acoes.appendChild(botaoCurtir);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const inputComentario = document.createElement("input");
    inputComentario.placeholder = "Escreva um comentário...";

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "Enviar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    comentarios.append(
        inputComentario,
        botaoComentar,
        lista
    );

    post.append(acoes, comentarios);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("fotoPerfil").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}
