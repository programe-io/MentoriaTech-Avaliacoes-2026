
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function () {
    console.log("Bem-vindo ao portfólio de Arthur Emanuel!");
});

// EFEITO DE DIGITAÇÃO
const texto = "Desenvolvedor Web | Criatividade e Tecnologia";
const elemento = document.querySelector(".inicio p");

let indice = 0;

function digitar() {
    if (indice < texto.length) {
        elemento.textContent += texto.charAt(indice);
        indice++;
        setTimeout(digitar, 60);
    }
}

if (elemento) {
    elemento.textContent = "";
    digitar();
}

// ANIMAÇÃO DAS SEÇÕES AO ROLAR A PÁGINA
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("mostrar");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach((secao) => {
    observador.observe(secao);
});

// ANO AUTOMÁTICO NO RODAPÉ
const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent =
        `© ${new Date().getFullYear()} - Portfólio de Arthur Emanuel. Todos os direitos reservados.`;
}

// MENSAGEM AO CLICAR NOS LINKS DO MENU
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function () {
        console.log("Navegando para: " + this.textContent);
    });
});

// BOTÃO VOLTAR AO TOPO
const voltarTopo = document.createElement("button");

voltarTopo.textContent = "↑";
voltarTopo.title = "Voltar ao topo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "25px";
voltarTopo.style.right = "25px";
voltarTopo.style.padding = "12px 18px";
voltarTopo.style.background = "#38bdf8";
voltarTopo.style.color = "#0f172a";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "8px";
voltarTopo.style.fontSize = "22px";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "none";
voltarTopo.style.zIndex = "999";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", function () {
    voltarTopo.style.display =
        window.scrollY > 300 ? "block" : "none";
});

voltarTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
