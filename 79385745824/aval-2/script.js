
// ==============================
// FREE FIRE NEWS - JAVASCRIPT
// ==============================

// FUNÇÃO LER MAIS
function ler(titulo) {
    alert(
        "🔥 FREE FIRE NEWS\n\n" +
        "Você selecionou: " + titulo +
        "\n\nEm breve teremos o artigo completo!"
    );
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("🔥 Free Fire News carregado!");
});

// EFEITO NOS CARDS
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {

    card.addEventListener("mouseenter", function() {
        card.style.borderColor = "#ff6500";
    });

    card.addEventListener("mouseleave", function() {
        card.style.borderColor = "#333";
    });

});

// BOTÃO DE VOLTAR AO TOPO
const voltarTopo = document.createElement("button");

voltarTopo.innerText = "⬆ Voltar ao topo";
voltarTopo.id = "voltarTopo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "20px";
voltarTopo.style.right = "20px";
voltarTopo.style.display = "none";
voltarTopo.style.zIndex = "999";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        voltarTopo.style.display = "block";
    } else {
        voltarTopo.style.display = "none";
    }

});

voltarTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ANIMAÇÃO DOS CARDS AO APARECER
const observador = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.15
});

cards.forEach(function(card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";

    observador.observe(card);

});

// ANO AUTOMÁTICO NO RODAPÉ
const rodape = document.querySelector("footer");

if (rodape) {
    rodape.innerHTML +=
        "<p>Desenvolvido por Free Fire News © " +
        new Date().getFullYear() + "</p>";
}