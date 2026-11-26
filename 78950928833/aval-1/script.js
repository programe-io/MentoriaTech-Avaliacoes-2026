
const pesquisa = document.getElementById("pesquisa");
const carros = document.querySelectorAll(".card");
const mensagem = document.getElementById("sem-resultados");

pesquisa.addEventListener("input", function () {
    const texto = pesquisa.value.toLowerCase();
    let encontrados = 0;

    carros.forEach(function (carro) {
        const nome = carro.dataset.nome.toLowerCase();

        if (nome.includes(texto)) {
            carro.style.display = "block";
            encontrados++;
        } else {
            carro.style.display = "none";
        }
    });

    mensagem.style.display = encontrados === 0 ? "block" : "none";
});

// Botão de contato pelo WhatsApp
function contato(nomeCarro) {
    // Troque pelo número da sua loja
    const telefone = "5586999999999";

    const texto = `Olá! Tenho interesse no ${nomeCarro}. 
    Gostaria de receber mais informações.`;

    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

    window.open(link, "_blank");
}
