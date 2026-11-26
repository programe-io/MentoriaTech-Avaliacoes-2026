
// FUNÇÃO DE COMPRA PELO WHATSAPP
function comprar(moto) {
    let telefone = "5586999999999";

    let mensagem = "Olá! Tenho interesse na moto " + moto;

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");
}


// FUNÇÃO DE PESQUISAR MOTOS
function pesquisarMoto() {
    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        let nome = card
            .getAttribute("data-nome")
            .toLowerCase();

        if (nome.includes(pesquisa)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo à MotoCenter!");
});


// BOTÃO PARA VOLTAR AO TOPO
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// MOSTRAR QUANTIDADE DE MOTOS
function contarMotos() {
    let motos = document.querySelectorAll(".card");

    console.log("Quantidade de motos cadastradas: " + motos.length);
}

contarMotos();
