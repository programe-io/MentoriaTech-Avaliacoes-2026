
// Lista de publicações
let publicacoes = [];

// Criar publicação
function publicar() {

    let nome = document.getElementById("nome").value.trim();

    let mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let post = {
        nome: nome,
        mensagem: mensagem,
        curtidas: 0
    };

    publicacoes.unshift(post);

    mostrarFeed();

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}

// Mostrar publicações
function mostrarFeed() {

    let feed = document.getElementById("feed");

    feed.innerHTML = "";

    publicacoes.forEach(function(post, indice) {

        let artigo = document.createElement("article");

        let usuario = document.createElement("h3");
        usuario.textContent = "👤 " + post.nome;

        let texto = document.createElement("p");
        texto.textContent = post.mensagem;

        let curtidas = document.createElement("p");
        curtidas.textContent = "❤️ " + post.curtidas + " curtidas";

        // Botão curtir
        let botaoCurtir = document.createElement("button");

        botaoCurtir.textContent = "Curtir ❤️";

        botaoCurtir.onclick = function() {
            post.curtidas++;
            mostrarFeed();
        };

        // Botão excluir
        let botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.onclick = function() {
            publicacoes.splice(indice, 1);
            mostrarFeed();
        };

        artigo.appendChild(usuario);
        artigo.appendChild(texto);
        artigo.appendChild(curtidas);
        artigo.appendChild(botaoCurtir);
        artigo.appendChild(botaoExcluir);

        artigo.style.border = "1px solid #ccc";
        artigo.style.padding = "15px";
        artigo.style.marginBottom = "15px";

        feed.appendChild(artigo);

    });
}
