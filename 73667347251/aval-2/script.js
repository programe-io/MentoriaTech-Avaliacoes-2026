function curtir(botao) {
    const numero = botao.querySelector("span");
    let total = Number(numero.textContent);

    if (botao.classList.contains("curtido")) {
        total--;
        botao.classList.remove("curtido");
        botao.innerHTML = `♡ <span>${total}</span>`;
    } else {
        total++;
        botao.classList.add("curtido");
        botao.innerHTML = `♥ <span>${total}</span>`;
    }
}

function mostrarComentarios(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    comentarios.classList.toggle("aberto");
}

function comentar(botao) {
    const area = botao.closest(".comentarios");
    const input = area.querySelector("input");
    const lista = area.querySelector(".comentario-lista");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Escreva um comentário primeiro!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "👾 Você: " + texto;

    lista.appendChild(comentario);
    input.value = "";
}

function publicarPost() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-autor">
            <div class="foto-post">👾</div>
            <div>
                <h3>Player One</h3>
                <span>@playerone · agora</span>
            </div>
            <span class="categoria">COMUNIDADE</span>
        </div>

        <p class="post-texto"></p>

        <div class="post-acoes">
            <button onclick="curtir(this)">♡ <span>0</span></button>
            <button onclick="mostrarComentarios(this)">💬 Comentar</button>
            <button onclick="compartilhar(this)">↗ Compartilhar</button>
        </div>

        <div class="comentarios">
            <div class="comentario-lista"></div>
            <div class="novo-comentario">
                <input type="text" placeholder="Escreva um comentário...">
                <button onclick="comentar(this)">Enviar</button>
            </div>
        </div>
    `;

    post.querySelector(".post-texto").textContent = texto;

    const lista = document.getElementById("listaPosts");
    lista.prepend(post);

    campo.value = "";
    alert("Sua publicação foi adicionada!");
}

function compartilhar(botao) {
    const post = botao.closest(".post");
    const texto = post.querySelector(".post-texto").textContent;

    if (navigator.share) {
        navigator.share({
            title: "GAMEVERSE",
            text: texto
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Texto copiado!"));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}