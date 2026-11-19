
const formulario = document.getElementById("form-publicacao");

const listaPostagens = document.getElementById("lista-postagens");

const campoNome = document.getElementById("nome");
const campoTexto = document.getElementById("texto");
const campoImagem = document.getElementById("imagem");

// CRIAR PUBLICAÇÃO
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();
    const texto = campoTexto.value.trim();
    const arquivo = campoImagem.files[0];

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    function adicionarPostagem(imagemUrl) {

        const postagem = document.createElement("article");

        postagem.classList.add("postagem");

        const data = new Date().toLocaleDateString("pt-BR");

        const titulo = document.createElement("h3");
        titulo.textContent = nome + " 💗";

        const dataPostagem = document.createElement("span");
        dataPostagem.classList.add("data");
        dataPostagem.textContent = data;

        const conteudo = document.createElement("p");
        conteudo.textContent = texto;

        postagem.appendChild(titulo);
        postagem.appendChild(dataPostagem);
        postagem.appendChild(conteudo);

        if (imagemUrl) {
            const imagem = document.createElement("img");
            imagem.src = imagemUrl;
            imagem.alt = "Imagem da publicação";
            postagem.appendChild(imagem);
        }

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        acoes.innerHTML = `
            <button class="curtir">
                ❤️ Curtir <span>0</span>
            </button>

            <button class="comentar">
                💬 Comentar
            </button>

            <button class="compartilhar">
                🔄 Compartilhar
            </button>

            <button class="excluir">
                🗑️ Excluir
            </button>
        `;

        postagem.appendChild(acoes);

        listaPostagens.prepend(postagem);

        formulario.reset();

        campoNome.value = "Isabelly";

        alert("Publicação realizada com sucesso! 💗");
    }

    if (arquivo) {

        if (!arquivo.type.startsWith("image/")) {
            alert("Escolha uma imagem válida!");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function() {
            adicionarPostagem(leitor.result);
        };

        leitor.readAsDataURL(arquivo);

    } else {

        adicionarPostagem(null);

    }

});

// AÇÕES DAS PUBLICAÇÕES
listaPostagens.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const postagem = botao.closest(".postagem");

    // CURTIR
    if (botao.classList.contains("curtir")) {

        const contador = botao.querySelector("span");

        contador.textContent =
            Number(contador.textContent) + 1;

    }

    // COMENTAR
    if (botao.classList.contains("comentar")) {

        const comentario = prompt("Escreva seu comentário 💗");

        if (comentario && comentario.trim()) {

            const novoComentario = document.createElement("p");

            novoComentario.classList.add("comentario");

            novoComentario.textContent = "💬 " + comentario;

            postagem.appendChild(novoComentario);

        }

    }

    // COMPARTILHAR
    if (botao.classList.contains("compartilhar")) {

        const texto = postagem.querySelector("p").textContent;

        if (navigator.share) {

            navigator.share({
                title: "Mini Feed da Isabelly 💗",
                text: texto
            }).catch(() => {});

        } else if (navigator.clipboard) {

            navigator.clipboard.writeText(texto)
                .then(() => alert("Publicação copiada! 💗"))
                .catch(() => alert("Não foi possível copiar."));

        } else {

            alert("Compartilhamento não disponível.");

        }

    }

    // EXCLUIR
    if (botao.classList.contains("excluir")) {

        const confirmar = confirm(
            "Deseja excluir esta publicação? 🐱"
        );

        if (confirmar) {
            postagem.remove();
        }

    }

});
