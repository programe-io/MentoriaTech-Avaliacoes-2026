// Função para adicionar uma notícia
function adicionarNoticia() {

    let titulo = document.getElementById("titulo").value;

    let descricao = document.getElementById("descricao").value;

    if (titulo === "" || descricao === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Criar o card
    let card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <span>Nova notícia</span>
    `;

    // Adicionar na página
    document.getElementById("noticias").prepend(card);

    // Limpar campos
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";

    alert("Notícia adicionada com sucesso!");
}


// Função para pesquisar notícias
function pesquisar() {

    let termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    let encontrados = 0;

    cards.forEach(function(card) {

        let texto = card.innerText.toLowerCase();

        if (texto.includes(termo)) {
            card.style.display = "block";
            encontrados++;
        } else {
            card.style.display = "none";
        }

    });

    if (encontrados === 0) {
        alert("Nenhuma notícia encontrada!");
    }
}