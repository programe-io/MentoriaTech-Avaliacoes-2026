
const posts = document.getElementById("posts");

// PUBLICAR
function publicar() {
    const campo = document.getElementById("texto");
    const texto = campo.value.trim();

    if (!texto) {
        alert("Escreva alguma coisa, ARMY! 💜");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">💜</div>
            <div>
                <h3>Meu perfil ARMY</h3>
                <small>@army_user · agora</small>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button onclick="curtir(this)">
                🤍 <span>0</span>
            </button>
            <button onclick="focarComentario(this)">
                💬 Comentar
            </button>
            <button onclick="compartilhar(this)">
                ↗ Compartilhar
            </button>
        </div>

        <div class="comments">
            <div class="comment-list"></div>
            <div class="comment-input">
                <input placeholder="Escreva um comentário...">
                <button onclick="comentar(this)">Enviar</button>
            </div>
        </div>
    `;

    post.querySelector(".post-text").textContent = texto;

    posts.prepend(post);
    campo.value = "";
}

// CURTIR E DESCURTIR
function curtir(botao) {
    const numero = botao.querySelector("span");
    let total = Number(numero.textContent.replace("k", "")) || 0;

    if (botao.classList.contains("liked")) {
        total--;
        botao.classList.remove("liked");
        botao.innerHTML = `🤍 <span>${total}</span>`;
    } else {
        total++;
        botao.classList.add("liked");
        botao.innerHTML = `💜 <span>${total}</span>`;
    }
}

// FOCAR COMENTÁRIO
function focarComentario(botao) {
    const input = botao.closest(".post")
        .querySelector(".comment-input input");

    input.focus();
}

// COMENTAR
function comentar(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comment-input input");
    const lista = post.querySelector(".comment-list");

    const texto = input.value.trim();

    if (!texto) return;

    const comentario = document.createElement("p");
    comentario.textContent = "💜 ARMY: " + texto;

    lista.appendChild(comentario);
    input.value = "";
}

// COMPARTILHAR
function compartilhar(botao) {
    const texto = "Confira esse post do BTS no ARMY SPACE! 💜";

    if (navigator.share) {
        navigator.share({
            title: "ARMY SPACE",
            text: texto
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Texto copiado! 💜"))
            .catch(() => alert(texto));
    } else {
        alert(texto);
    }
}

// PESQUISAR PUBLICAÇÕES
document.getElementById("pesquisa")
    .addEventListener("input", function() {

        const pesquisa = this.value.toLowerCase();

        document.querySelectorAll(".post").forEach(post => {
            const conteudo = post.textContent.toLowerCase();

            post.style.display = conteudo.includes(pesquisa)
                ? "block"
                : "none";
        });
    });
