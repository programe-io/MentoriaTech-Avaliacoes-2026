
const pesquisa = document.getElementById("pesquisa");
const listaPosts = document.getElementById("listaPosts");
const formulario = document.getElementById("formPost");

// PESQUISAR ARTIGOS

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    const posts = listaPosts.querySelectorAll(".post");

    posts.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(texto)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});

// LER MAIS

function lerMais(botao) {

    const textoExtra = botao.nextElementSibling;

    textoExtra.classList.toggle("escondido");

    if (textoExtra.classList.contains("escondido")) {
        botao.textContent = "Ler artigo →";
    } else {
        botao.textContent = "Ler menos ↑";
    }

}

// ADICIONAR PUBLICAÇÃO

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();

    const autor = document.getElementById("autor").value.trim();

    const descricao = document.getElementById("descricao").value.trim();

    if (!titulo || !autor || !descricao) {

        alert("Preencha todos os campos!");

        return;

    }

    // Criar publicação

    const post = document.createElement("article");

    post.className = "post";

    // Imagem ilustrativa

    const imagem = document.createElement("div");

    imagem.className = "imagem imagem-azul";

    imagem.textContent = "NOVA PUBLICAÇÃO";

    // Conteúdo

    const texto = document.createElement("div");

    texto.className = "texto";

    const informacoes = document.createElement("div");

    informacoes.className = "informacoes";

    const data = document.createElement("span");

    data.textContent = new Date().toLocaleDateString("pt-BR");

    const nomeAutor = document.createElement("span");

    nomeAutor.textContent = "Por: " + autor;

    const tituloPost = document.createElement("h3");

    tituloPost.textContent = titulo;

    const descricaoPost = document.createElement("p");

    descricaoPost.textContent = descricao;

    // Organizar elementos

    informacoes.appendChild(data);

    informacoes.appendChild(nomeAutor);

    texto.appendChild(informacoes);

    texto.appendChild(tituloPost);

    texto.appendChild(descricaoPost);

    post.appendChild(imagem);

    post.appendChild(texto);

    // Adicionar no início da lista

    listaPosts.prepend(post);

    // Limpar formulário

    formulario.reset();

    pesquisa.value = "";

    // Mostrar mensagem

    alert("Publicação adicionada com sucesso!");

});
