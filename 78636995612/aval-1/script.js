/**
 * Lógica de Interação dos Questionários
 * Melhora a experiência de estudo permitindo exibir/ocultar gabaritos
 */

/**
 * Alterna a visibilidade do bloco de resposta (Gabarito)
 * @param {string} id - O ID do elemento HTML que contém a resposta
 */
function toggleResposta(id) {
    // Seleciona o elemento de resposta pelo ID
    const respostaContainer = document.getElementById(id);
    
    if (!respostaContainer) {
        console.warn(`Elemento com ID "${id}" não foi encontrado.`);
        return;
    }

    // Verifica o estado atual de exibição (display)
    if (respostaContainer.style.display === "block") {
        // Se já estiver visível, oculta
        respostaContainer.style.display = "none";
    } else {
        // Se estiver oculto, exibe o bloco
        respostaContainer.style.display = "block";
        
        // [Opcional] Destaca a alternativa correta visualmente na lista superior
        destacarAlternativaCorreta(respostaContainer);
    }
}

/**
 * Função Auxiliar: Analisa o texto do gabarito e aplica uma classe de destaque
 * na alternativa correspondente dentro da lista do questionário.
 * @param {HTMLElement} container - O elemento da resposta revelada
 */
function destacarAlternativaCorreta(container) {
    // Captura o texto interno (ex: "Alternativa B. A repetição continua...")
    const textoGabarito = container.textContent || container.innerText;
    
    // Expressão regular para capturar qual letra é a correta (A, B, C, D ou E)
    const correspondencia = textoGabarito.match(/Alternativa\s+([A-E])/i);
    
    if (correspondencia && correspondencia[1]) {
        const letraCorreta = correspondencia[1].toUpperCase();
        
        // Sobe até a seção do quiz atual e busca a lista de opções (<ul>)
        const secaoQuiz = container.closest('.quiz-section') || container.parentElement;
        const opcoes = secaoQuiz.querySelectorAll('.options li');
        
        opcoes.forEach(li => {
            // Se o item da lista começar com a letra correta (ex: "B. numero !== 0")
            if (li.textContent.trim().startsWith(letraCorreta)) {
                // Aplica uma estilização direta de sucesso (Verde)
                li.style.backgroundColor = "#e8f8f5";
                li.style.borderLeftColor = "#2ecc71";
                li.style.fontWeight = "bold";
            }
        });
    }
}