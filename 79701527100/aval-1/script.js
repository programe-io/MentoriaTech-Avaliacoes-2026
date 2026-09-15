// Rolagem suave para uma seção

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// Mostrar detalhes do veículo

function mostrarDetalhes(veiculo) {

    const informacoes = {

        "Nissan Skyline GT-R":
            "Esportivo japonês lendário, conhecido pelo desempenho e pela possibilidade de preparação.",

        "Ferrari 488 GTB":
            "Superesportivo italiano equipado com motor V8 biturbo e foco em alto desempenho.",

        "Porsche 911 Turbo":
            "Esportivo premium conhecido pela engenharia, desempenho e tecnologia.",

        "BMW M4 Competition":
            "Cupê esportivo da divisão M da BMW, desenvolvido para oferecer desempenho e dirigibilidade.",

        "Kawasaki Ninja ZX-10R":
            "Superbike de alta performance com tecnologia derivada das pistas.",

        "BMW S 1000 RR":
            "Superbike premium com alto desempenho, eletrônica avançada e design esportivo."
    };

    alert(
        "🚘 JONNATAS VAQUEIRO\n\n" +
        veiculo +
        "\n\n" +
        informacoes[veiculo] +
        "\n\nEntre em contato para consultar disponibilidade."
    );
}


// Botão de contato

function contato() {

    alert(
        "🏁 JONNATAS VAQUEIRO\n\n" +
        "Obrigado pelo interesse!\n\n" +
        "Entre em contato com a concessionária para consultar veículos, preços e disponibilidade."
    );

}


// Efeito simples no cabeçalho durante a rolagem

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.style.boxShadow = "0 5px 30px rgba(0, 110, 255, 0.25)";
    } else {
        header.style.boxShadow = "none";
    }

});


// Mensagem no console

console.log(
    "🏁 Jonnatas Vaqueiro — Carros & Motos carregado com sucesso!"
);