
const publicacoes = document.getElementById("publicacoes");

// PUBLICAR POSTAGEM

function publicarPost() {

    const texto = document.getElementById("textoPost");
    const arquivo = document.getElementById("imagemPost");

    const conteudo = texto.value.trim();

    if (conteudo === "" && arquivo.files.length === 0) {
        alert("Escreva algo ou escolha uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const data = new Date().toLocaleString("pt-BR");

    post.innerHTML = `
        <div class="usuario">
            <img src="https://i.pravatar.cc/150?img=12" alt="Perfil">
            <div>
                <h3>João Silva</h3>
                <span>${data}</span>
            </div>
        </div>

        <p></p>

        <div class="acoes">
            <button class="curtir" onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="mostrarComentarios(this)">
                💬 Comentar
            </button>
        </div>

        <div class="comentarios">
            <input type="text" placeholder="Escreva um comentário...">
            <button onclick="comentar(this)">Enviar</button>
            <div class="lista-comentarios"></div>
        </div>
    `;

    // Inserir texto com segurança
    post.querySelector("p").textContent = conteudo;

    // Adicionar imagem, se houver
    if (arquivo.files.length > 0) {

        const imagem = document.createElement("img");

        imagem.className = "foto-post";
        imagem.alt = "Imagem da publicação";
        imagem.src = URL.createObjectURL(arquivo.files[0]);

        post.insertBefore(
            imagem,
            post.querySelector(".acoes")
        );
    }

    publicacoes.prepend(post);

    texto.value = "";
    arquivo.value = "";

}


// CURTIR PUBLICAÇÃO

function curtir(botao) {

    const quantidade = botao.querySelector("span");

    let numero = Number(quantidade.textContent);

    if (botao.classList.contains("ativo")) {

        numero--;

        botao.classList.remove("ativo");

    } else {

        numero++;

        botao.classList.add("ativo");

    }

    quantidade.textContent = numero;

}


// MOSTRAR COMENTÁRIOS

function mostrarComentarios(botao) {

    const post = botao.closest(".post");

    const area = post.querySelector(".comentarios");

    if (area.style.display === "block") {
        area.style.display = "none";
    } else {
        area.style.display = "block";
    }

}


// ADICIONAR COMENTÁRIO

function comentar(botao) {

    const area = botao.closest(".comentarios");

    const campo = area.querySelector("input");

    const lista = area.querySelector(".lista-comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "João Silva: " + texto;

    lista.appendChild(comentario);

    campo.value = "";

}


// PESQUISAR PUBLICAÇÕES

document.getElementById("pesquisa").addEventListener("input", function() {

    const termo = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(termo)
            ? "block"
            : "none";

    });

});


// MODO CLARO E ESCURO

document.getElementById("tema").addEventListener("click", function() {

    document.body.classList.toggle("dark");

    this.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

});
