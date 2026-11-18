
// EFEITO DE APARECIMENTO DOS ALIENÍGENAS
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => {
    observer.observe(card);
});

// NAVEGAÇÃO SUAVE
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        const destino = document.querySelector(this.getAttribute('href'));

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// MENSAGEM AO CLICAR NOS ALIENÍGENAS
cards.forEach(card => {
    card.addEventListener("click", () => {
        const nome = card.querySelector("h3").textContent;

        alert("Você escolheu o alienígena " + nome + "!");
    });
});

// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "⬆";
botaoTopo.id = "voltarTopo";

document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// MOSTRAR BOTÃO AO ROLAR A PÁGINA
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

console.log("Ben 10 Clássico carregado com sucesso!");
