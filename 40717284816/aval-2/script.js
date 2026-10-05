/* ==========================================

Manipulação direta com style
========================================== */

const titulo = document.querySelector("#meu-titulo");

titulo.style.color = "blue";
titulo.style.backgroundColor = "lightgray";
titulo.style.padding = "15px";
titulo.style.border = "2px solid blue";

/* ==========================================
2. Manipulação com classList
========================================== */

const paragrafo = document.querySelector("#paragrafo");

const btnAdicionar = document.querySelector("#btnAdicionar");
const btnRemover = document.querySelector("#btnRemover");
const btnAlternar = document.querySelector("#btnAlternar");

// Adiciona a classe
btnAdicionar.addEventListener("click", function () {
paragrafo.classList.add("formatacao");
});

// Remove a classe
btnRemover.addEventListener("click", function () {
paragrafo.classList.remove("formatacao");
});

// Alterna a classe
btnAlternar.addEventListener("click", function () {
paragrafo.classList.toggle("formatacao");
});

/* ==========================================
3. Selecionando vários elementos
========================================== */

const situacoes = document.getElementsByClassName("situacao");

// Percorrendo todos os elementos
for (const situacao of situacoes) {

const texto = situacao.textContent;

if (texto === "Normal") {
    situacao.style.color = "green";
    situacao.style.fontWeight = "bold";
}

if (texto === "Sobrepeso") {
    situacao.style.color = "red";
    situacao.style.fontWeight = "bold";
}


}