
function mostrarMensagem() {
    alert("Bem-vindo ao TechWorld! 💻 Explore o mundo da tecnologia!");
}

const curiosidades = [
    "O primeiro computador eletrônico de uso geral ocupava uma sala inteira!",
    "O mouse foi inventado na década de 1960.",
    "O SSD costuma ser mais rápido que um HD tradicional.",
    "A memória RAM ajuda o computador a executar várias tarefas.",
    "Os computadores utilizam códigos binários formados por 0 e 1.",
    "Existem supercomputadores capazes de realizar cálculos extremamente complexos."
];

let indice = 0;

function novaCuriosidade() {
    indice = (indice + 1) % curiosidades.length;

    document.getElementById("textoCuriosidade").textContent =
        curiosidades[indice];
}
