
const textoPost = document.getElementById("textoPost");
const imagemPost = document.getElementById("imagemPost");
const previewImagem = document.getElementById("previewImagem");
const btnPublicar = document.getElementById("btnPublicar");
const feed = document.getElementById("feed");

let imagemSelecionada = "";

// Pré-visualização da imagem
imagemPost.addEventListener("change", function () {
    const arquivo = this.files[0];

    if (arquivo) {
        if (!arquivo.type.startsWith("image/")) {
            alert("Selecione um arquivo de imagem válido.");
            this.value = "";
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function (evento) {
            imagemSelecionada = evento.target.result;
            previewImagem.src = imagemSelecionada;
            previewImagem.style.display = "block";
        };

        leitor.readAsDataURL(arquivo);
    }
});

// Criar publicação
btnPublicar.addEventListener("click", function () {
    const texto = textoPost.value.trim();

    if (!texto && !imagemSelecionada) {
        alert("Digite um texto ou selecione uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const data = new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    const imagemHTML = imagemSelecionada
        ? `<img class="post-imagem" src="${imagemSelecionada}" alt="Imagem publicada">`
        : "";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12" alt="Meu perfil">
            <div>
                <h3>Meu Perfil</h3>
                <small>${data}</small>
            </div>
        </div>

        <p></p>

        ${imagemHTML}

        <div class="post-acoes">
            <button class="curtir">❤️ Curtir <span>0</span></button>
            <button class="comentar">💬 Comentar</button>
            <button class="compartilhar">🔗 Compartilhar</button>
        </div>
    `;

    post.querySelector(".post-header + p").textContent = texto;

    feed.insertBefore(post, feed.children[1]);

    textoPost.value = "";
    imagemPost.value = "";
    imagemSelecionada = "";
    previewImagem.src = "";
    previewImagem.style.display = "none";

    alert("Publicação realizada com sucesso!");
});

// Ações dos posts
feed.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button");

    if (!botao) return;

    const post = botao.closest(".post");

    if (botao.classList.contains("curtir")) {
        const contador = botao.querySelector("span");
        let quantidade = Number(contador.textContent);

        if (botao.classList.toggle("liked")) {
            quantidade++;
        } else {
            quantidade--;
        }

        contador.textContent = quantidade;
    }

    if (botao.classList.contains("comentar")) {
        let area = post.querySelector(".area-comentarios");

        if (!area) {
            area = document.createElement("div");
            area.className = "area-comentarios";

            area.innerHTML = `
                <input class="comentario-input"
                    type="text"
                    placeholder="Escreva um comentário...">

                <button class="enviar-comentario">
                    Enviar
                </button>

                <div class="lista-comentarios"></div>
            `;

            post.appendChild(area);
        } else {
            area.querySelector(".comentario-input").focus();
        }
    }

    if (botao.classList.contains("enviar-comentario")) {
        const input = post.querySelector(".comentario-input");
        const lista = post.querySelector(".lista-comentarios");
        const comentario = input.value.trim();

        if (!comentario) return;

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "Você: " + comentario;

        lista.appendChild(novoComentario);
        input.value = "";
    }

    if (botao.classList.contains("compartilhar")) {
        const texto = post.querySelector("p")?.textContent || "Confira esta publicação!";

        if (navigator.share) {
            navigator.share({
                title: "MiniFeed",
                text: texto
            }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(texto)
                .then(() => alert("Texto copiado para compartilhar!"))
                .catch(() => alert("Não foi possível copiar o texto."));
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    }
});
