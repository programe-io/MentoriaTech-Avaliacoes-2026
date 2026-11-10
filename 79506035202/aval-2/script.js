
function publicarPost() {
    const texto = document.getElementById("textoPost");
    const arquivo = document.getElementById("imagemPost");
    const lista = document.getElementById("listaPosts");

    const conteudo = texto.value.trim();

    if (!conteudo) {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const nome = "Você";
    const inicial = "V";

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">${inicial}</div>
            <div>
                <h3>${nome}</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        <div class="acoes">
            <button onclick="curtir(this)">
                ♡ Curtir <span>0</span>
            </button>
            <button onclick="comentar()">
                💬 Comentar
            </button>
            <button onclick="compartilhar()">
                ↗ Compartilhar
            </button>
        </div>
    `;

    post.querySelector("p").textContent = conteudo;

    if (arquivo.files.length > 0) {
        const imagem = document.createElement("img");

        imagem.src = URL.createObjectURL(arquivo.files[0]);
        imagem.className = "post-img";
        imagem.alt = "Imagem da publicação";

        post.insertBefore(imagem, post.querySelector(".acoes"));
    }

    lista.prepend(post);

    texto.value = "";
    arquivo.value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        curtidas--;
        botao.classList.remove("curtido");
        botao.innerHTML = `♡ Curtir <span>${curtidas}</span>`;
    } else {
        curtidas++;
        botao.classList.add("curtido");
        botao.innerHTML = `♥ Curtido <span>${curtidas}</span>`;
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim()) {
        alert("Comentário enviado: " + comentario);
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: "Confira esta publicação no MiniFeed!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}
