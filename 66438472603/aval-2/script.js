
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao CodeWorld!");
});

// Função do botão começar
function comecar() {
    alert("🚀 Vamos aprender programação!");

    document.getElementById("linguagens")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// Informações sobre as linguagens
function mostrarInfo(linguagem) {

    const informacoes = {
        HTML: "HTML é utilizado para criar a estrutura das páginas web.",
        
        CSS: "CSS é utilizado para estilizar sites com cores, fontes e animações.",
        
        JavaScript: "JavaScript permite criar sites interativos e dinâmicos."
    };

    alert(informacoes[linguagem]);
}

// Efeito de clique nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        card.style.borderColor = "#9b5cff";

        setTimeout(function() {
            card.style.borderColor = "#00e5ff";
        }, 500);
    });
});

// Mensagem no console
console.log("CodeWorld iniciado com sucesso!");
