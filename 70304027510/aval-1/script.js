// Mensagem do botão principal
function mostrarMensagem() {
    alert("Bem-vindo ao BlockWorld! Explore Minecraft e filmes.");
}


// Botões da área Minecraft
function verConteudo(conteudo) {

    alert(
        "Você selecionou: " +
        conteudo +
        "\n\nEm breve teremos mais informações sobre este conteúdo!"
    );
}


// Detalhes dos filmes
function detalhesFilme(filme) {

    alert(
        "Filme selecionado: " +
        filme +
        "\n\nAqui você poderá adicionar informações como gênero, ano, duração e sinopse."
    );
}


// Sistema de busca de filmes
function buscarFilmes() {

    let campo = document.getElementById("campoBusca");

    let pesquisa = campo.value.toLowerCase();

    let filmes = document.querySelectorAll(".filme-card");

    filmes.forEach(function(filme) {

        let nome = filme.getAttribute("data-nome").toLowerCase();

        if (nome.includes(pesquisa)) {
            filme.style.display = "block";
        } else {
            filme.style.display = "none";
        }

    });
}