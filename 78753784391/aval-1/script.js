
/* ==================================
   NIGHT CITY ALIVE - JAVASCRIPT
   ================================== */

// EFEITO DE DIGITAÇÃO NO BANNER

const titulo = document.querySelector(".banner h2");

if (titulo) {
    const textoOriginal = titulo.textContent;
    titulo.textContent = "";

    let indice = 0;

    function digitar() {
        if (indice < textoOriginal.length) {
            titulo.textContent += textoOriginal.charAt(indice);
            indice++;
            setTimeout(digitar, 55);
        }
    }

    digitar();
}

// ANIMAÇÃO DOS CARDS AO APARECER NA TELA

const cards = document.querySelectorAll(".card");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

cards.forEach((card) => {
    card.classList.add("animar");
    observador.observe(card);
});

// EFEITO NOS LINKS DO MENU

const links = document.querySelectorAll("nav a");

links.forEach((link) => {
    link.addEventListener("click", () => {
        links.forEach((item) => item.classList.remove("ativo"));
        link.classList.add("ativo");
    });
});

// BOTÃO VOLTAR AO TOPO

const voltarTopo = document.createElement("button");

voltarTopo.innerHTML = "↑";
voltarTopo.id = "voltarTopo";
voltarTopo.title = "Voltar ao topo";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        voltarTopo.classList.add("mostrar");
    } else {
        voltarTopo.classList.remove("mostrar");
    }
});

voltarTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ANO AUTOMÁTICO NO RODAPÉ

const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent =
        `© ${new Date().getFullYear()} Night City Alive - Todos os direitos reservados.`;
}

// MENSAGEM NO CONSOLE

console.log(
    "%c NIGHT CITY ALIVE ",
    "background: #00f7ff; color: #070910; font-size: 22px; font-weight: bold;"
);

console.log(
    "%c Sistema inicializado com sucesso!",
    "color: #ff00a6; font-size: 14px;"
);
