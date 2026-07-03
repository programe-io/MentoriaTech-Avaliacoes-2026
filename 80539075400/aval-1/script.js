// Mensagem de boas-vindas
window.addEventListener("load", () => {
    alert("🚗 Bem-vindo ao Auto & Moto Blog!");
});

// Botões "Leia Mais"
const botoes = document.querySelectorAll(".btn-leia");

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const titulo = botao.parentElement.querySelector("h2").textContent;

        alert(`Você abriu o artigo: ${titulo}`);
    });
});

// Pesquisa de artigos
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

if (pesquisa) {
    pesquisa.addEventListener("keyup", () => {
        const texto = pesquisa.value.toLowerCase();

        cards.forEach((card) => {
            const titulo = card.querySelector("h2").textContent.toLowerCase();

            if (titulo.includes(texto)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Botão voltar ao topo
const voltarTopo = document.getElementById("topo");

if (voltarTopo) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            voltarTopo.style.display = "block";
        } else {
            voltarTopo.style.display = "none";
        }
    });

    voltarTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}