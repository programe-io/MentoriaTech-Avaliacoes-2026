
// MESSI BLOG - JAVASCRIPT

// 1. MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Messi Blog!");
});

// 2. EFEITO DE APARECIMENTO DAS SEÇÕES
const secoes = document.querySelectorAll("section");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("aparecer");
        }
    });
}, {
    threshold: 0.15
});

secoes.forEach((secao) => {
    observador.observe(secao);
});

// 3. EFEITO NOS CARDS
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", function() {
        card.classList.toggle("selecionado");
    });
});

// 4. BOTÃO VOLTAR AO TOPO
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.id = "voltarTopo";

document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Mostrar botão quando rolar a página
window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

// 5. MENSAGEM INTERATIVA
const titulo = document.querySelector(".banner h2");

if (titulo) {
    titulo.addEventListener("click", function() {
        alert("Lionel Messi: uma lenda do futebol mundial! ⚽");
    });
}

// 6. ANO AUTOMÁTICO NO RODAPÉ
const rodape = document.querySelector("footer p:last-child");

if (rodape) {
    rodape.innerHTML = 
        "© " + new Date().getFullYear() +
        " - Todos os direitos reservados";
}

// 7. DESTAQUE NO MENU AO CLICAR
const links = document.querySelectorAll("nav a");

links.forEach((link) => {
    link.addEventListener("click", function() {
        links.forEach((item) => {
            item.classList.remove("ativo");
        });

        link.classList.add("ativo");
    });
});