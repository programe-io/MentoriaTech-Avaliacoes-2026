/**
 * ==========================================================================
 * CLASSES E ESTILOS VIA JAVASCRIPT
 * Script prático baseado no sumário da apresentação.
 * ==========================================================================
 */

// Aguarda o DOM estar totalmente carregado para evitar erros de elementos nulos
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script 'Classes e Estilos' carregado com sucesso.");
});

/* ==========================================================================
   PARTE 1: Estilização Direta com a Propriedade 'style' (Tópicos 2, 4 e 5)
   ========================================================================== */

/**
 * Altera os estilos diretamente no elemento usando propriedades CSS inline.
 * Limitação (Tópico 5): Substitui ou adiciona estilos inline que têm maior 
 * especificidade, tornando mais difícil a manutenção pelo arquivo CSS externo.
 */
function aplicarEstiloDireto() {
    const paragrafo = document.getElementById("paragrafo-estilo");
    
    if (paragrafo) {
        // As propriedades que possuem hífen no CSS viram camelCase no JS
        paragrafo.style.color = "#1e3a8a";
        paragrafo.style.fontWeight = "bold";
        paragrafo.style.backgroundColor = "#eff6ff";
        paragrafo.style.padding = "10px";
        paragrafo.style.borderRadius = "4px";
    }
}


/* ==========================================================================
   PARTE 2: Manipulando Classes com 'classList' (Tópicos 6, 7 e 8)
   ========================================================================== */

/**
 * Adiciona uma classe CSS existente no arquivo externo ao elemento.
 * Método: classList.add()
 */
function adicionarClasseDestaque() {
    const caixa = document.getElementById("caixa-exemplo");
    if (caixa) {
        caixa.classList.add("caixa-destaque");
    }
}

/**
 * Remove uma classe CSS do elemento.
 * Método: classList.remove()
 */
function removerClasseDestaque() {
    const caixa = document.getElementById("caixa-exemplo");
    if (caixa) {
        caixa.classList.remove("caixa-destaque");
    }
}

/**
 * Alterna a presença de uma classe (adiciona se não tiver, remove se já tiver).
 * Método: classList.toggle()
 */
function alternarTextoGrande() {
    const caixa = document.getElementById("caixa-exemplo");
    if (caixa) {
        caixa.classList.toggle("texto-enfase");
    }
}


/* ==========================================================================
   PARTE 3: Seleção Múltipla e Estilos Condicionais (Tópicos 10 e 11)
   ========================================================================== */

/**
 * Seleciona vários elementos em lote e aplica estilos baseados em uma condição de texto.
 */
function analisarSituacoesTabela() {
    // Tópico 10: Selecionando vários elementos com getElementsByClassName
    // Retorna uma HTMLCollection (uma lista de elementos vivos do DOM)
    const linhasAlunos = document.getElementsByClassName("linha-aluno");
    
    // Tópico 11: Percorrendo os elementos da lista utilizando um laço de repetição
    for (let i = 0; i < linhasAlunos.length; i++) {
        const linha = linhasAlunos[i];
        
        // Acessa o texto da terceira célula (coluna de índice 2: Situação)
        // O uso de .trim() remove espaços em branco extras nas pontas do texto
        const textoSituacao = linha.cells[2].innerText.trim();
        
        // Aplicação condicional de estilos através de classes CSS
        if (textoSituacao === "Aprovado") {
            linha.classList.add("aprovado");
            linha.classList.remove("reprovado"); // Garante a remoção da classe oposta
        } else if (textoSituacao === "Reprovado") {
            linha.classList.add("reprovado");
            linha.classList.remove("aprovado"); // Garante a remoção da classe oposta
        }
    }
}
