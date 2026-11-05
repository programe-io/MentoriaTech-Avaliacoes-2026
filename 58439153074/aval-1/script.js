// MODO ESCURO
document.getElementById("tema").onclick = function() {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        this.innerHTML = "☀️ Modo claro";
    } else {
        this.innerHTML = "🌙 Modo escuro";
    }
};

// MOSTRAR INFORMAÇÕES
function mostrar(botao) {
    let texto = botao.nextElementSibling;

    if (texto.style.display === "block") {
        texto.style.display = "none";
        botao.innerHTML = "Saiba mais";
    } else {
        texto.style.display = "block";
        botao.innerHTML = "Mostrar menos";
    }
}

// PESQUISAR INSTITUIÇÕES
document.getElementById("pesquisa").addEventListener("input", function() {
    let busca = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nome = card.querySelector("h3").textContent.toLowerCase();

        card.style.display = nome.includes(busca) ? "block" : "none";
    });
});

// CURIOSIDADES ALEATÓRIAS
function novaCuriosidade() {
    let curiosidades = [
        "A Polícia Federal foi criada em 1944.",
        "A PRF atua nas rodovias federais brasileiras.",
        "A Polícia Civil exerce funções de polícia judiciária.",
        "A Polícia Militar realiza o policiamento ostensivo."
    ];

    let numero = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").innerHTML =
        curiosidades[numero];
}