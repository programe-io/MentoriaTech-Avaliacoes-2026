
/* 1. Selecionando o título */
const titulo = document.querySelector("#meu-titulo");

/* 2. Aplicando estilos diretamente com style */
titulo.style.color = "white";
titulo.style.backgroundColor = "purple";
titulo.style.padding = "12px";
titulo.style.border = "2px solid black";

/* 3. Selecionando o parágrafo */
const paragrafo = document.querySelector("#meu-paragrafo");

/* 4. Adicionando uma classe CSS */
paragrafo.classList.add("formatacao");

/* 5. Removendo uma classe CSS */
paragrafo.classList.remove("formatacao");

/* 6. Alternando uma classe CSS */
paragrafo.classList.toggle("formatacao");

/* 7. Selecionando os botões */
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnRemover = document.querySelector("#btn-remover");
const btnAlternar = document.querySelector("#btn-alternar");

/* 8. Eventos dos botões */
btnAdicionar.addEventListener("click", function () {
    paragrafo.classList.add("formatacao");
});

btnRemover.addEventListener("click", function () {
    paragrafo.classList.remove("formatacao");
});

btnAlternar.addEventListener("click", function () {
    paragrafo.classList.toggle("formatacao");
});

/* 9. Selecionando todas as situações da tabela */
const situacoes = document.getElementsByClassName("situacao");

/* 10. Percorrendo os elementos e alterando as cores */
for (const situacao of situacoes) {
    const texto = situacao.textContent.trim().toLowerCase();

    if (texto === "normal") {
        situacao.style.color = "green";
    } else if (texto === "sobrepeso") {
        situacao.style.color = "red";
    }
}
