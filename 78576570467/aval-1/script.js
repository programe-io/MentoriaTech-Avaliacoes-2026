// ==========================================================================
// 1. CONFIGURAÇÃO INICIAL E SELEÇÃO DE ELEMENTOS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos botões de controle
    const btn1x = document.getElementById("btn-1x");
    const btn2x = document.getElementById("btn-2x");
    const btnFrosting = document.getElementById("btn-frosting");
    const btnBack = document.querySelector(".btn-back");

    // Seleção das seções e títulos
    const sectionReceita = document.getElementById("section-receita");
    const sectionCoberturas = document.getElementById("section-coberturas");
    const mainTitle = document.getElementById("main-title");

    // Elementos interativos das listas
    const ingredientItems = document.querySelectorAll(".ingredient-item");
    const stepItems = document.querySelectorAll(".step-item");
    const qtySpans = document.querySelectorAll(".qty");

    // Define o botão '1x' como ativo por padrão no início
    if (btn1x) btn1x.classList.add("active");

    // ==========================================================================
    // 2. LÓGICA DE INTERATIVIDADE (CLIQUES NAS LISTAS)
    // ==========================================================================

    // Marcar/Desmarcar ingredientes da massa
    ingredientItems.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
        });
    });

    // Marcar/Desmarcar passos do modo de preparo
    stepItems.forEach(step => {
        step.addEventListener("click", () => {
            step.classList.toggle("done");
        });
    });

    // ==========================================================================
    // 3. LÓGICA DE ESCALONAMENTO DE QUANTIDADES (MULTIPLICADOR)
    // ==========================================================================
    
    function alterarRendimento(fator, botaoAtivo, botaoInativo) {
        qtySpans.forEach(span => {
            // Pega o valor original guardado no 'data-base' do HTML
            const valorBase = parseFloat(span.getAttribute("data-base"));
            
            // Multiplica o valor e atualiza o texto na tela
            if (!isNaN(valorBase)) {
                span.textContent = valorBase * fator;
            }
        });

        // Gerencia as classes de estilo dos botões
        botaoAtivo.classList.add("active");
        botaoInativo.classList.remove("active");
    }

    // Ouvintes para os botões de escala
    if (btn1x && btn2x) {
        btn1x.addEventListener("click", () => alterarRendimento(1, btn1x, btn2x));
        btn2x.addEventListener("click", () => alterarRendimento(2, btn2x, btn1x));
    }

    // ==========================================================================
    // 4. LÓGICA DE NAVEGAÇÃO ENTRE TELAS (ABAS)
    // ==========================================================================

    function gerenciarNavegacao(exibirCoberturas) {
        if (exibirCoberturas) {
            sectionReceita.classList.add("hidden");
            sectionCoberturas.classList.remove("hidden");
            mainTitle.textContent = "Escolha sua Cobertura";
        } else {
            sectionReceita.classList.remove("hidden");
            sectionCoberturas.classList.add("hidden");
            mainTitle.textContent = "Bolo de Chocolate Perfeito";
        }
        // Joga a tela de volta para o topo de forma suave ao mudar de aba
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Ouvintes para os botões de navegação
    if (btnFrosting) {
        btnFrosting.addEventListener("click", () => gerenciarNavegacao(true));
    }
    if (btnBack) {
        btnBack.addEventListener("click", () => gerenciarNavegacao(false));
    }
});