// ================================
// MENU - ROLAGEM SUAVE
// ================================

const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ================================
// EFEITO AO ROLAR A PÁGINA
// ================================

const elementos = document.querySelectorAll(
    ".habilidade, .projeto, .formacao-item"
);

const observar = new IntersectionObserver(
    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementos.forEach(elemento => {

    elemento.style.opacity = "0";

    elemento.style.transform = "translateY(30px)";

    elemento.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observar.observe(elemento);

});


// ================================
// MENSAGEM NO CONSOLE
// ================================

console.log("Portfólio de Marcos Vinicios carregado com sucesso!");


// ================================
// ANO AUTOMÁTICO NO RODAPÉ
// ================================

const ano = document.querySelector("footer p");

if (ano) {

    const anoAtual = new Date().getFullYear();

    ano.innerHTML =
        `© ${anoAtual} Marcos Vinicios — Portfólio Pessoal`;

}


// ================================
// EFEITO DE DIGITAÇÃO
// ================================

const texto = document.querySelector(".inicio-conteudo p");

const frases = [
    "Estudante de Desenvolvimento de Sistemas",
    "Desenvolvedor em formação",
    "Apaixonado por tecnologia",
    "Interessado em programação e jogos"
];

let fraseAtual = 0;
let caractereAtual = 0;
let apagando = false;


function escreverTexto() {

    if (!texto) return;

    const frase = frases[fraseAtual];

    if (!apagando) {

        texto.textContent =
            frase.substring(0, caractereAtual + 1);

        caractereAtual++;

        if (caractereAtual === frase.length) {

            apagando = true;

            setTimeout(escreverTexto, 2000);

            return;
        }

    } else {

        texto.textContent =
            frase.substring(0, caractereAtual - 1);

        caractereAtual--;

        if (caractereAtual === 0) {

            apagando = false;

            fraseAtual++;

            if (fraseAtual === frases.length) {
                fraseAtual = 0;
            }

        }
    }

    const velocidade = apagando ? 50 : 80;

    setTimeout(escreverTexto, velocidade);
}


escreverTexto();
``