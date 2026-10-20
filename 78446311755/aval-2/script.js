
const pesquisa = document.getElementById("pesquisa");
const carros = document.querySelectorAll(".carro");
const mensagem = document.getElementById("mensagem");

// Pesquisar carros pelo nome
pesquisa.addEventListener("input", function () {
    const termo = pesquisa.value.toLowerCase();
    let encontrados = 0;

    carros.forEach(function (carro) {
        const nome = carro.querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(termo)) {
            carro.style.display = "";
            encontrados++;
        } else {
            carro.style.display = "none";
        }
    });

    if (encontrados === 0) {
        mensagem.textContent = "Nenhum carro encontrado.";
    } else {
        mensagem.textContent = "";
    }
});

// Mostrar detalhes do carro selecionado
function verDetalhes(nome) {
    const informacoes = {
        "Ford Mustang":
            "Esportivo conhecido pelo design marcante e pela tradição.",
        "Chevrolet Camaro":
            "Esportivo com visual moderno e diferentes versões.",
        "Porsche 911":
            "Modelo esportivo reconhecido pelo desempenho e design."
    };

    alert(
        nome + "\n\n" +
        informacoes[nome] +
        "\n\nConsulte uma concessionária para preços e versões."
    );
}
