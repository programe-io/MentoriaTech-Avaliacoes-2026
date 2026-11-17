
// Função para demonstrar interesse em um veículo
function comprar(carro) {
    alert("Você demonstrou interesse no " + carro +
    "! Entre em contato com nossa loja.");
}

// Sistema de pesquisa de veículos
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {

    let texto = pesquisa.value.toLowerCase();

    let carros = document.querySelectorAll(".card");

    carros.forEach(function(carro) {

        let nome = carro.dataset.nome.toLowerCase();

        if (nome.includes(texto)) {
            carro.style.display = "block";
        } else {
            carro.style.display = "none";
        }

    });

});
