
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes-count");

    let curtidas = Number(contador.dataset.likes || 0);

    if (botao.classList.contains("liked")) {
        curtidas--;
        botao.classList.remove("liked");
        botao.innerHTML = "♡ Curtir";
    } else {
        curtidas++;
        botao.classList.add("liked");
        botao.innerHTML = "💜 Curtido";
    }

    contador.dataset.likes = curtidas;
    contador.textContent = curtidas >= 1000
        ? (curtidas / 1000).toFixed(1) + " mil"
        : curtidas;
}

function publicar() {
    const campo = document.getElementById("novaPublicacao");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar! 💜");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "A";

    const usuario = document.createElement("div");
    const nome = document.createElement("h4");
    nome.textContent = "ARMY Community 💜";

    const data = document.createElement("small");
    data.textContent = "Agora mesmo";

    usuario.append(nome, data);
    cabecalho.append(avatar, usuario);

    const mensagem = document.createElement("p");
    mensagem.className = "post-text";
    mensagem.textContent = texto;

    const estatisticas = document.createElement("div");
    estatisticas.className = "post-stats";
    estatisticas.innerHTML =
        '<span>💜 <span class="likes-count" data-likes="0">0</span> curtidas</span>' +
        '<span>0 comentários</span>';

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡ Curtir";
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "↗ Compartilhar";
    compartilharBtn.onclick = compartilhar;

    acoes.append(curtirBtn, comentarBtn, compartilharBtn);

    const comentarios = document.createElement("div");
    comentarios.className = "comment-area";

    post.append(
        cabecalho,
        mensagem,
        estatisticas,
        acoes,
        comentarios
    );

    document.getElementById("publicacoes")
        .prepend(post);

    campo.value = "";

    alert("Sua publicação foi criada com sucesso! 💜");
}

function comentar(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comment-area");

    if (area.querySelector("input")) {
        area.querySelector("input").focus();
        return;
    }

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    campo.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            adicionarComentario(this, post);
        }
    });

    area.appendChild(campo);
    campo.focus();
}

function adicionarComentario(campo, post) {
    const texto = campo.value.trim();

    if (texto === "") return;

    const comentario = document.createElement("div");
    comentario.className = "comment";

    const nome = document.createElement("strong");
    nome.textContent = "ARMY: ";

    comentario.append(nome, document.createTextNode(texto));

    const area = post.querySelector(".comment-area");
    area.appendChild(comentario);

    campo.value = "";
    campo.remove();

    const contador = post.querySelector(".post-stats span:last-child");
    let quantidade = Number(contador.dataset.count || 0);

    quantidade++;
    contador.dataset.count = quantidade;
    contador.textContent = quantidade + " comentários";
}

function compartilhar() {
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "BTS Universe 💜",
            text: "Confira este mini feed sobre o BTS!",
            url: url
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => alert("Link copiado! 💜"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

// Inicializar contadores de curtidas
document.querySelectorAll(".likes-count").forEach(contador => {
    if (!contador.dataset.likes) {
        const valor = contador.textContent.trim();

        let numero = parseFloat(valor);

        if (valor.includes("mil")) {
            numero *= 1000;
        }

        contador.dataset.likes = Math.round(numero);
    }
});
