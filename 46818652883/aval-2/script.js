
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".actions span");

    let curtidas = Number(contador.dataset.likes || 0);

    if (botao.classList.contains("liked")) {
        curtidas--;
        botao.classList.remove("liked");
        botao.innerHTML = "♡";
    } else {
        curtidas++;
        botao.classList.add("liked");
        botao.innerHTML = "♥";
    }

    contador.dataset.likes = curtidas;
    contador.textContent = "♡ " + curtidas.toLocaleString("pt-BR") + " curtidas";
}

function criarPost() {
    const campo = document.getElementById("postText");
    const texto = campo.value.trim();

    if (!texto) {
        alert("Escreva alguma coisa antes de publicar! 💗");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <div class="mini-avatar">A</div>
            <div>
                <h4>ARMY Community <span>✦</span></h4>
                <small>Agora mesmo</small>
            </div>
            <button class="dots">•••</button>
        </div>

        <p class="description"></p>

        <div class="actions">
            <button onclick="curtir(this)">♡</button>
            <button onclick="comentarios(this)">♧</button>
            <button onclick="alert('Compartilhe o amor pelo BTS! 💗')">↗</button>
            <span>♡ 0 curtidas</span>
        </div>

        <div class="comment-box"></div>
    `;

    post.querySelector(".description").textContent = texto;
    post.querySelector(".actions span").dataset.likes = "0";

    document.getElementById("posts").prepend(post);

    campo.value = "";
}

function comentarios(botao) {
    const post = botao.closest(".post");
    const caixa = post.querySelector(".comment-box");

    if (caixa.querySelector("input")) {
        caixa.querySelector("input").focus();
        return;
    }

    const input = document.createElement("input");
    input.placeholder = "Escreva seu comentário...";

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const texto = this.value.trim();

            if (!texto) return;

            const comentario = document.createElement("div");
            comentario.className = "comment";

            const nome = document.createElement("strong");
            nome.textContent = "ARMY: ";

            comentario.append(nome, document.createTextNode(texto));

            caixa.appendChild(comentario);

            this.value = "";
            this.remove();
        }
    });

    caixa.appendChild(input);
    input.focus();
}

// Permitir publicar com Enter
document.getElementById("postText")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            criarPost();
        }
    });
