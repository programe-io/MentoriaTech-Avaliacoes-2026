// Aguarda todo o HTML carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    /* ============================================================
       1. SISTEMA DE FILTRO DE PERSONAGENS
       ============================================================ */
    const tabelaPersonagens = document.getElementById("lista-personagens");
    const linhasPersonagens = tabelaPersonagens.querySelectorAll("tr");
    const secaoPersonagens = document.getElementById("personagens");

    // Cria dinamicamente os botões de filtro antes da tabela
    const containerBotoes = document.createElement("div");
    containerBotoes.style.margin = "20px 0";
    containerBotoes.style.display = "flex";
    containerBotoes.style.gap = "10px";
    containerBotoes.style.flexWrap = "wrap";

    const casas = ["Todos", "Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];

    casas.forEach(casa => {
        const botao = document.createElement("button");
        botao.innerText = casa;
        
        // Estilização básica do botão via JS (para manter o CSS limpo)
        botao.style.padding = "10px 15px";
        botao.style.border = "1px solid #d3a625";
        botao.style.background = "#252525";
        botao.style.color = "#d3a625";
        botao.style.cursor = "pointer";
        botao.style.borderRadius = "5px";
        botao.style.fontWeight = "bold";
        botao.style.transition = "all 0.3s ease";

        // Efeito de hover no botão
        botao.addEventListener("mouseover", () => {
            botao.style.background = "#740001";
            botao.style.color = "#fff";
        });
        botao.addEventListener("mouseout", () => {
            botao.style.background = "#252525";
            botao.style.color = "#d3a625";
        });

        // Evento de clique para filtrar
        botao.addEventListener("click", () => {
            const casaNormalizada = casa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            linhasPersonagens.forEach(linha => {
                const casaDaLinha = linha.getAttribute("data-casa");
                if (casaNormalizada === "todos" || casaDaLinha === casaNormalizada) {
                    linha.style.display = ""; // Mostra a linha
                } else {
                    linha.style.display = "none"; // Esconde a linha
                }
            });
        });

        containerBotoes.appendChild(botao);
    });

    // Insere os botões logo acima da tabela de personagens
    secaoPersonagens.insertBefore(containerBotoes, secaoPersonagens.querySelector(".table-responsive, table"));


    /* ============================================================
       2. EASTER EGG: DIGITE UM FEITIÇO! (Lumos / Nox)
       ============================================================ */
    let codigoDigitado = "";
    
    window.addEventListener("keydown", (evento) => {
        codigoDigitado += evento.key.toLowerCase();
        
        // Mantém apenas os últimos 5 caracteres para não acumular memória infinitamente
        codigoDigitado = codigoDigitado.slice(-5);

        // Se digitar "lumos", o fundo acende
        if (codigoDigitado.includes("lumos")) {
            document.body.style.backgroundColor = "#4a4a3a";
            alert("✨ Lumos! Você acendeu a luz de Hogwarts.");
        } 
        
        // Se digitar "nox", o fundo volta ao normal
        if (codigoDigitado.includes("nox")) {
            document.body.style.backgroundColor = "#121212";
            alert("🌑 Nox! As luzes se apagaram.");
        }
    });


    /* ============================================================
       3. ANIMAÇÃO DE CLICK NO MAPA (Efeito visual na tabela)
       ============================================================ */
    linhasPersonagens.forEach(linha => {
        linha.addEventListener("click", () => {
            const nomeBruxo = linha.querySelector("td").innerText;
            alert(`🧙‍♂️ Varinha selecionada: ${nomeBruxo} está pronto para o duelo!`);
        });
    });

    console.log("Feitiços carregados com sucesso! O site está pronto.");
});