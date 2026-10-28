
const botao = document.querySelector("#botao");
const curiosidade = document.querySelector("#curiosidade");

const curiosidades = [
    "Os cavalos conseguem dormir em pé!",
    "Os cavalos possuem um campo de visão muito amplo.",
    "Eles conseguem reconhecer vozes e expressões familiares.",
    "Os cavalos são animais sociais e gostam de companhia."
];

botao.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * curiosidades.length);

    curiosidade.textContent = curiosidades[indice];
});
