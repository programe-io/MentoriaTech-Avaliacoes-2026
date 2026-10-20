// ==========================================
// 2, 4 e 5. ESTILIZAÇÃO DIRETA COM A PROPRIEDADE STYLE
// ==========================================
// Seleciona um único elemento do DOM
const meuTitulo = document.querySelector("#meu-titulo");

if (meuTitulo) {
    // Altera propriedades de estilo diretamente (gera CSS inline)
    meuTitulo.style.color = "blue";
    meuTitulo.style.padding = "10px";
    
    // Propriedades compostas do CSS usam camelCase no JavaScript
    meuTitulo.style.backgroundColor = "lightgray"; 
    meuTitulo.style.border = "2px solid black";
}

// ==========================================
// 6, 7 e 8. MANIPULANDO CLASSES COM CLASSLIST
// ==========================================
const meuParagrafo = document.querySelector("#meu-paragrafo");

if (meuParagrafo) {
    // Adiciona uma classe configurada no CSS externo
    meuParagrafo.classList.add("formatacao");
    
    // Remove uma classe
    meuParagrafo.classList.remove("outra-classe");
    
    // Alterna a presença de uma classe (adiciona se não tiver, remove se tiver)
    meuParagrafo.classList.toggle("destaque");
}

// ==========================================
// 9, 10 e 11. EXEMPLO PRÁTICO COM TABELA DE SITUAÇÕES
// ==========================================
function atualizarEstilosTabela() {
    // Seleciona todos os elementos que possuem a classe 'situacao' (retorna HTMLCollection)
    const celulasSituacao = document.getElementsByClassName("situacao");

    // Percorre a coleção de elementos utilizando a estrutura for...of
    for (const celula of celulasSituacao) {
        // Obtém o conteúdo de texto da célula atual
        const texto = celula.textContent.trim().toLowerCase();

        // Estrutura condicional para aplicar estilos baseados no texto
        if (texto === "normal") {
            celula.style.color = "green";
            celula.style.fontWeight = "bold";
        } else if (texto === "sobrepeso") {
            celula.style.color = "red";
            celula.style.fontWeight = "bold";
        }
    }
}

// Executa a função da tabela após o carregamento
atualizarEstilosTabela();
