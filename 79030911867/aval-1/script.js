
const pesquisa = document.getElementById("pesquisa");
const listaPosts = document.getElementById("listaPosts");
const formulario = document.getElementById("formPost");

// PESQUISAR PUBLICAÇÕES

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    const posts = listaPosts.querySelectorAll(".post");

    posts.forEach(function(post) {
        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(texto)
            ? "block"
            : "none";
    });
});

// LER MAIS

function lerMais(botao) {
    const textoExtra = botao.nextElementSibling;

    textoExtra.classList.toggle("escondido");

    if (textoExtra.classList.contains("escondido")) {
        botao.textContent = "Ler mais";
    } else {
        botao.textContent = "Ler menos";
    }
}

// ADICIONAR PUBLICAÇÃO

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (titulo === "" || descricao === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    const imagem = document.createElement("div");
    imagem.className = "imagem azul";
    imagem.textContent = "NOVA PUBLICAÇÃO";

    const texto = document.createElement("div");
    texto.className = "texto";

    const categoria = document.createElement("small");
    categoria.textContent = "Nova postagem";

    const tituloPost = document.createElement("h3");
    tituloPost.textContent = titulo;

    const descricaoPost = document.createElement("p");
    descricaoPost.textContent = descricao;

    texto.appendChild(categoria);
    texto.appendChild(tituloPost);
    texto.appendChild(descricaoPost);

    post.appendChild(imagem);
    post.appendChild(texto);

    listaPosts.prepend(post);

    formulario.reset();

    pesquisa.value = "";

    alert("Publicação adicionada com sucesso!");
});
