
// SISTEMA DE CURTIDAS
function curtir(botao) {
    const contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        contador.textContent = numero - 1;
        botao.classList.remove("curtido");
        botao.innerHTML = "♡ <span>" + contador.textContent + "</span>";
    } else {
        contador.textContent = numero + 1;
        botao.classList.add("curtido");
        botao.innerHTML = "♥ <span>" + contador.textContent + "</span>";
    }
}

// SISTEMA DE COMENTÁRIOS
function comentar(botao) {
    const texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim() !== "") {
        const area = botao.closest(".post")
            .querySelector(".comentarios");

        const comentario = document.createElement("p");
        comentario.textContent = "💗 " + texto;

        area.appendChild(comentario);
    }
}

// SALVAR PUBLICAÇÃO
function salvar(botao) {
    botao.classList.toggle("salvo");

    if (botao.classList.contains("salvo")) {
        botao.textContent = "🔖 Salvo!";
    } else {
        botao.textContent = "🔖 Salvar";
    }
}

// CRIAR PUBLICAÇÃO
function publicarPost() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "post-usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🌸";

    const dados = document.createElement("div");

    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = nome;

    const horario = document.createElement("small");
    horario.textContent = "@dorameiro · agora";

    dados.append(nomeUsuario, horario);
    usuario.append(avatar, dados);

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    post.append(usuario, texto);

    // Adicionar imagem se existir
    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol !== "https:" && url.protocol !== "http:") {
                throw new Error("Link inválido");
            }

            const foto = document.createElement("img");
            foto.className = "poster";
            foto.src = url.href;
            foto.alt = "Imagem da publicação";

            foto.onerror = function() {
                foto.remove();
                alert("Não foi possível carregar essa imagem.");
            };

            post.appendChild(foto);
        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    // Botões
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const like = document.createElement("button");
    like.className = "curtir";
    like.innerHTML = '♡ <span>0</span>';
    like.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const salvarBtn = document.createElement("button");
    salvarBtn.textContent = "🔖 Salvar";
    salvarBtn.onclick = function() {
        salvar(this);
    };

    acoes.append(like, comentarBtn, salvarBtn);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(acoes, comentarios);

    document.getElementById("lista-posts").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("imagem").value = "";

    alert("Sua publicação foi criada com sucesso! 💗");
}

// SISTEMA DE PESQUISA
function pesquisarPosts() {
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(pesquisa)
            ? "block"
            : "none";
    });
}
