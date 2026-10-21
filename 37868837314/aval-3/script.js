
"use strict";

// ======================================
// 1. SELECIONANDO OS ELEMENTOS
// ======================================

const titulo = document.querySelector("#meu-titulo");
const paragrafo = document.querySelector("#meu-paragrafo");

const btnEstilo = document.querySelector("#btnEstilo");
const btnAdd = document.querySelector("#btnAdd");
const btnRemove = document.querySelector("#btnRemove");
const btnToggle = document.querySelector("#btnToggle");
const btnAtualizar = document.querySelector("#btnAtualizar");


// ======================================
// 2. ALTERANDO ESTILOS COM style
// ======================================

btnEstilo.addEventListener("click", function() {
    titulo.style.color = "white";
    titulo.style.backgroundColor = "#2563eb";
    titulo.style.padding = "15px";
    titulo.style.border = "2px solid #1d4ed8";
    titulo.style.borderRadius = "8px";

    titulo.textContent = "Título estilizado com JavaScript!";
});


// ======================================
// 3. ADICIONANDO UMA CLASSE
// ======================================

btnAdd.addEventListener("click", function() {
    paragrafo.classList.add("formatacao");
});


// ======================================
// 4. REMOVENDO UMA CLASSE
// ======================================

btnRemove.addEventListener("click", function() {
    paragrafo.classList.remove("formatacao");
});


// ======================================
// 5. ALTERNANDO UMA CLASSE
// ======================================

btnToggle.addEventListener("click", function() {
    paragrafo.classList.toggle("formatacao");
});


// ======================================
// 6. SELECIONANDO VÁRIOS ELEMENTOS
// ======================================

function colorirSituacoes() {
    const situacoes =
        document.getElementsByClassName("situacao");

    // A coleção é percorrida com for...of.
    for (const situacao of situacoes) {
        const texto = situacao.textContent
            .trim()
            .toLocaleLowerCase("pt-BR");

        // Limpa as classes de situação anteriores.
        situacao.classList.remove(
            "situacao-normal",
            "situacao-sobrepeso"
        );

        // Aplica a classe conforme o conteúdo.
        if (texto === "normal") {
            situacao.classList.add("situacao-normal");
        } else if (texto === "sobrepeso") {
            situacao.classList.add("situacao-sobrepeso");
        }
    }
}


// ======================================
// 7. EXECUTANDO A FORMATAÇÃO
// ======================================

btnAtualizar.addEventListener("click", colorirSituacoes);

// Aplica as cores assim que a página é carregada.
colorirSituacoes();
