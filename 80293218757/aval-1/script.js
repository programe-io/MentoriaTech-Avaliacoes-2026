
// EFEITO DE DIGITAÇÃO
const texto = "Seu Nome";
const elemento = document.querySelector(".hero h1 span");

let indice = 0;

function digitar() {
    if (indice < texto.length) {
        elemento.textContent += texto.charAt(indice);
        indice++;

        setTimeout(digitar, 150);
    }
}

// Iniciar efeito de digitação
elemento.textContent = "";
digitar();


// ANIMAÇÃO AO ROLAR A PÁGINA
const elementos = document.querySelectorAll(
    "section, .projeto"
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {
    elemento.classList.add("aparecer");
    observador.observe(elemento);
});


// DESTAQUE DO MENU
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let secaoAtual = "";

    document.querySelectorAll(
        "section, .hero"
    ).forEach((secao) => {
        const topo = secao.offsetTop - 150;

        if (window.scrollY >= topo) {
            secaoAtual = secao.getAttribute("id");
        }
    });

    links.forEach((link) => {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("ativo");
        }
    });
});


// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.id = "voltarTopo";

document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botaoTopo.classList.add("mostrar");
    } else {
        botaoTopo.classList.remove("mostrar");
    }
});


// MENSAGEM DE BOAS-VINDAS
console.log("Bem-vindo ao meu portfólio!");