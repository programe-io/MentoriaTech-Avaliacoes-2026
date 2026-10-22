
function lerMais(id) {
    const artigo = document.getElementById(id);
    const texto = artigo.querySelector(".extra");
    const botao = artigo.querySelector("button");

    texto.hidden = !texto.hidden;

    botao.textContent = texto.hidden
        ? "Ler mais"
        : "Ler menos";
}

const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");
const semResultados = document.getElementById("semResultados");

pesquisa.addEventListener("input", function () {
    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    let encontrados = 0;

    cards.forEach(function (card) {
        const conteudo = card.textContent.toLocaleLowerCase("pt-BR");
        const corresponde = conteudo.includes(termo);

        card.hidden = !corresponde;

        if (corresponde) {
            encontrados++;
        }
    });

    semResultados.hidden = encontrados > 0;
});
