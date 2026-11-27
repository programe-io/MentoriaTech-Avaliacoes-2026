
function publicar() {
    const texto = document.getElementById("textoPost");
    const arquivo = document.getElementById("imagemPost");

    if (texto.value.trim() === "" && !arquivo.files[0]) {
        alert("Escreva alguma coisa ou escolha uma foto!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    let imagemHTML = "";

    if (arquivo.files[0]) {
        const imagemURL = URL.createObjectURL(arquivo.files[0]);
        imagemHTML = `<img class="foto-post" src="${imagemURL}" alt="Foto publicada">`;
    }

    const conteudo = document.createElement("p");
    conteudo.textContent = texto.value;

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">V</div>
            <div>
                <strong>Vinicius Silva</strong>
                <small>@vinicius · agora</small>
            </div>
            <span class="mais">•••</span>
        </div>
    `;

    post.appendChild(conteudo);
    post.insertAdjacentHTML("beforeend", imagemHTML);

    post.insertAdjacentHTML("beforeend", `
        <div class="estatisticas">
            <span>❤️ <b>0</b> curtidas</span>
            <span>0 comentários</span>
        </div>

        <div class="botoes-post">
            <button onclick="curtir(this)">♡ Curtir</button>
            <button onclick="comentar(this)">💬 Comentar</button>
            <button onclick="compartilhar()">↗ Compartilhar</button>
        </div>
        <div class="comentarios"></div>
    `);

    document.getElementById("publicacoes").prepend(post);

    texto.value = "";
    arquivo.value = "";
}

function curtir(botao) {
    const post = botao.closest(".post");
    const numero = post.querySelector(".estatisticas b");

    let total = Number(numero.textContent);

    if (botao.classList.contains("curtido")) {
        total--;
        botao.classList.remove("curtido");
        botao.innerHTML = "♡ Curtir";
    } else {
        total++;
        botao.classList.add("curtido");
        botao.innerHTML = "❤️ Curtido";
    }

    numero.textContent = total;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const novo = document.createElement("div");
        novo.className = "comentario";

        const nome = document.createElement("strong");
        nome.textContent = "Você: ";

        novo.appendChild(nome);
        novo.appendChild(document.createTextNode(comentario));

        area.appendChild(novo);

        const contador = post.querySelector(".estatisticas span:last-child");
        const total = area.querySelectorAll(".comentario").length;
        contador.textContent = total + " comentários";
    }
}

function compartilhar() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado!"));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(busca)
            ? "block"
            : "none";
    });
});
