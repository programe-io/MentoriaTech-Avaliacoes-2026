
// Lista de postagens
let postagens = [];

// Função para adicionar postagem
function adicionarPost() {

    let titulo = document.getElementById("titulo").value;
    let conteudo = document.getElementById("conteudo").value;

    if (titulo === "" || conteudo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let postagem = {
        titulo: titulo,
        conteudo: conteudo
    };

    postagens.push(postagem);

    mostrarPosts();

    document.getElementById("titulo").value = "";
    document.getElementById("conteudo").value = "";
}

// Função para mostrar postagens
function mostrarPosts() {

    let area = document.getElementById("posts");

    area.innerHTML = "";

    postagens.forEach(function(post, indice) {

        let artigo = document.createElement("article");

        let titulo = document.createElement("h3");
        titulo.textContent = post.titulo;

        let texto = document.createElement("p");
        texto.textContent = post.conteudo;

        let botao = document.createElement("button");
        botao.textContent = "Excluir";

        botao.onclick = function() {
            postagens.splice(indice, 1);
            mostrarPosts();
        };

        artigo.appendChild(titulo);
        artigo.appendChild(texto);
        artigo.appendChild(botao);

        area.appendChild(artigo);

    });
}
