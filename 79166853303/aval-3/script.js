
function curtir(botao) {
    const post = botao.closest(".post");
    const total = botao.querySelector("span");

    let numero = Number(total.textContent);

    if (botao.dataset.curtido === "true") {
        numero--;
        botao.dataset.curtido = "false";
        botao.style.color = "#333";
    } else {
        numero++;
        botao.dataset.curtido = "true";
        botao.style.color = "#00aaff";
    }

    total.textContent = numero;
}

function comentar(botao) {
    const texto = prompt("Digite seu comentário:");

    if (!texto || !texto.trim()) return;

    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;

    area.appendChild(comentario);
}

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const exclusivo = document.getElementById("exclusivo").checked;

    if (!nome || !legenda) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=47";

    const usuario = document.createElement("strong");
    usuario.textContent = nome + " ✔";

    cabecalho.append(avatar, usuario);
    post.appendChild(cabecalho);

    if (exclusivo) {
        const bloqueio = document.createElement("div");
        bloqueio.className = "bloqueado";
        bloqueio.innerHTML = `
            <span>🔒</span>
            <h3>Conteúdo exclusivo</h3>
            <p>Assine para desbloquear esta publicação.</p>
            <button onclick="assinar()">Desbloquear</button>
        `;
        post.appendChild(bloqueio);
    } else {
        if (imagem) {
            try {
                const url = new URL(imagem);

                if (!["https:", "http:"].includes(url.protocol)) {
                    throw new Error("URL inválida");
                }

                const foto = document.createElement("img");
                foto.src = url.href;
                foto.className = "foto-post";
                foto.alt = "Publicação";
                post.appendChild(foto);
            } catch {
                alert("Link de imagem inválido.");
                return;
            }
        }

        const texto = document.createElement("p");
        texto.className = "legenda-post";
        texto.textContent = legenda;
        post.appendChild(texto);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const like = document.createElement("button");
        like.innerHTML = '♡ <span>0</span>';
        like.onclick = function() {
            curtir(this);
        };

        const comentario = document.createElement("button");
        comentario.textContent = "💬 Comentar";
        comentario.onclick = function() {
            comentar(this);
        };

        acoes.append(like, comentario);
        post.appendChild(acoes);

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";
        post.appendChild(comentarios);
    }

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("exclusivo").checked = false;
}

function seguir(botao) {
    const seguidores = document.getElementById("seguidores");

    if (botao.dataset.seguindo === "true") {
        botao.textContent = "Seguir";
        botao.dataset.seguindo = "false";
    } else {
        botao.textContent = "Seguindo";
        botao.dataset.seguindo = "true";
    }
}

function assinar() {
    alert("Área de assinatura demonstrativa. Integre um sistema de pagamentos para receber assinaturas reais.");
}

function abrirCriacao() {
    document.getElementById("criar").scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarLogin() {
    alert("Área de login demonstrativa. É necessário criar um sistema de autenticação.");
}
