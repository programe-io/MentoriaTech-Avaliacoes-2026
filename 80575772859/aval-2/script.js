
/* =========================
   NAVEGAÇÃO
========================= */

function irProjetos() {
    const projetos = document.getElementById("projetos");

    projetos.scrollIntoView({
        behavior: "smooth"
    });
}

/* =========================
   CALCULADORA DE ÁREA
========================= */

function calcularArea() {

    const comprimento = Number(
        document.getElementById("comprimento").value
    );

    const largura = Number(
        document.getElementById("largura").value
    );

    const resultado = document.getElementById("resultado");

    if (
        comprimento <= 0 ||
        largura <= 0 ||
        !Number.isFinite(comprimento) ||
        !Number.isFinite(largura)
    ) {
        resultado.innerText = "Digite medidas válidas!";
        return;
    }

    const area = comprimento * largura;

    resultado.innerText =
        "Área total: " + area.toFixed(2) + " m²";
}

/* =========================
   ANIMAÇÃO DOS PROJETOS
========================= */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});

/* =========================
   MENSAGEM DE BOAS-VINDAS
========================= */

window.addEventListener("load", () => {

    console.log("Bem-vindo ao ArchStudio!");

});

/* =========================
   ESTILOS ARQUITETÔNICOS
========================= */

const estilos = document.querySelectorAll(".style-item");

estilos.forEach((estilo) => {

    estilo.addEventListener("click", () => {

        const nome = estilo.querySelector("h3").innerText;

        alert(
            "Você selecionou o estilo arquitetônico: " + nome
        );

    });

});

/* =========================
   ANO AUTOMÁTICO NO RODAPÉ
========================= */

const ano = document.querySelector("footer p:last-child");

if (ano) {
    ano.innerText =
        "© " + new Date().getFullYear() +
        " - Todos os direitos reservados.";
}
