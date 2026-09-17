// =========================
// EFEITO DE DIGITAÇÃO
// =========================

const textos = [
    "Estudante e Desenvolvedor",
    "Desenvolvedor Web",
    "Criador de Jogos"
];

const elemento = document.querySelector("#inicio h2");

let textoIndex = 0;
let caractereIndex = 0;
let apagando = false;

function escrever() {

    const textoAtual = textos[textoIndex];

    if (!apagando) {
        elemento.textContent = textoAtual.substring(
            0,
            caractereIndex + 1
        );

        caractereIndex++;

        if (caractereIndex === textoAtual.length) {
            apagando = true;

            setTimeout(escrever, 1500);
            return;
        }

    } else {

        elemento.textContent = textoAtual.substring(
            0,
            caractereIndex - 1
        );

        caractereIndex--;

        if (caractereIndex === 0) {
            apagando = false;

            textoIndex++;

            if (textoIndex >= textos.length) {
                textoIndex = 0;
            }
        }
    }

    setTimeout(escrever, apagando ? 50 : 100);
}

escrever();


// =========================
// ANIMAÇÃO AO ROLAR A PÁGINA
// =========================

const elementos = document.querySelectorAll(
    ".card, .curso, .projeto, .sobre-conteudo"
);

const observer = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("mostrar");
            }

        });

    },
    {
        threshold: 0.15
    }
);

elementos.forEach((elemento) => {
    observer.observe(elemento);
});


// =========================
// BOTÃO DE CONTATO
// =========================

const botao = document.querySelector(".botao");

botao.addEventListener("click", () => {
    console.log("Usuário acessou a seção Sobre.");
});


// =========================
// ANO AUTOMÁTICO NO RODAPÉ
// =========================

const ano = new Date().getFullYear();

const rodape = document.querySelector("footer p");

rodape.textContent =
    `© ${ano} Erick — Portfólio Pessoal`;
