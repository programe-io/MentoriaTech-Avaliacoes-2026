// Pesquisa de veículos
const pesquisa = document.getElementById("pesquisa");
const carros = document.querySelectorAll(".car-card");

pesquisa.addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    carros.forEach(carro => {
        const nome = carro.dataset.nome;

        carro.style.display = nome.includes(termo)
            ? "block"
            : "none";
    });
});

// Botão de interesse
function comprar(nome) {
    alert("Você demonstrou interesse no veículo " + nome + "!");
}

// WhatsApp
function contato() {
    const telefone = "5500000000000";

    const mensagem = encodeURIComponent(
        "Olá! Gostaria de conhecer os veículos da AutoLux."
    );

    window.open(
        "https://wa.me/" + telefone + "?text=" + mensagem,
        "_blank"
    );
}