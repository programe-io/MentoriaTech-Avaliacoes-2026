
function mensagem() {
    alert("Seja bem-vindo ao BTS World! 💜 Borahae!");
}

const curiosidades = [
    "O fandom oficial do BTS se chama ARMY.",
    "BTS estreou em 13 de junho de 2013.",
    "RM é o líder do grupo.",
    "Dynamite foi o primeiro single do BTS totalmente em inglês.",
    "Borahae é uma expressão muito especial para o BTS e o ARMY.",
    "O grupo possui sete integrantes.",
    "O nome BTS significa Bangtan Sonyeondan."
];

let indice = 0;

function novaCuriosidade() {
    document.getElementById("textoCuriosidade").textContent =
        curiosidades[indice];

    indice = (indice + 1) % curiosidades.length;
}
