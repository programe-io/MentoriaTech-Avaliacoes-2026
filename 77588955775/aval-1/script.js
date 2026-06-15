// Aguarda todo o HTML ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. INTERATIVIDADE NA TABELA DE CAMPEÕES
    // ==========================================
    const linhasTabela = document.querySelectorAll("tbody tr");

    linhasTabela.forEach(linha => {
        linha.addEventListener("click", () => {
            // Pega o nome da seleção (primeira célula) e o número de títulos (segunda célula)
            const selecao = linha.cells[0].innerText;
            const titulos = linha.cells[1].innerText;
            
            // Cria um alerta nativo elegante ou exibe no console
            alert(`⚽ A seleção do ${selecao} possui ${titulos} títulos da Copa do Mundo!`);
        });
        
        // Altera o cursor para indicar que a linha é clicável
        linha.style.cursor = "pointer";
    });

    // ==========================================
    // 2. CRIAÇÃO DINÂMICA DO MODO ESCURO
    // ==========================================
    // Vamos criar o botão diretamente pelo JS e inseri-lo no topo da página
    const botaoTema = document.createElement("button");
    botaoTema.innerText = "🌓 Alternar Tema";
    
    // Estilização rápida do botão via JS
    botaoTema.style.position = "fixed";
    botaoTema.style.bottom = "20px";
    botaoTema.style.right = "20px";
    botaoTema.style.padding = "10px 15px";
    botaoTema.style.borderRadius = "30px";
    botaoTema.style.border = "none";
    botaoTema.style.backgroundColor = "#1e5631";
    botaoTema.style.color = "white";
    botaoTema.style.cursor = "pointer";
    botaoTema.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    botaoTema.style.zIndex = "1000";

    document.body.appendChild(botaoTema);

    // Função para alternar as cores da página (Modo Escuro)
    botaoTema.addEventListener("click", () => {
        const body = document.body;
        const sections = document.querySelectorAll("section");
        
        if (body.style.backgroundColor === "rgb(44, 62, 80)") {
            // Volta para o modo claro
            body.style.backgroundColor = "#f7f9fc";
            body.style.color = "#2c3e50";
            sections.forEach(s => s.style.backgroundColor = "#ffffff");
            botaoTema.style.backgroundColor = "#1e5631";
        } else {
            // Ativa o modo escuro
            body.style.backgroundColor = "#2c3e50";
            body.style.color = "#ecf0f1";
            sections.forEach(s => s.style.backgroundColor = "#34495e");
            botaoTema.style.backgroundColor = "#00875a";
        }
    });

    // ==========================================
    // 3. SISTEMA DE BUSCA NA TABELA
    // ==========================================
    // Seleciona a seção da tabela para inserir o campo de busca antes dela
    const secaoTabela = document.getElementById("maiores-campeoes");
    const tabela = secaoTabela.querySelector("table");
    
    const campoBusca = document.createElement("input");
    campoBusca.type = "text";
    campoBusca.placeholder = "🔍 Digite uma seleção para filtrar...";
    
    // Estilizando o campo de busca
    campoBusca.style.width = "100%";
    campoBusca.style.padding = "10px";
    campoBusca.style.marginBottom = "15px";
    campoBusca.style.borderRadius = "4px";
    campoBusca.style.border = "1px solid #ccc";

    // Insere o campo de busca logo antes da tabela
    secaoTabela.insertBefore(campoBusca, tabela);

    // Lógica do filtro de busca
    campoBusca.addEventListener("keyup", () => {
        const termoBusca = campoBusca.value.toLowerCase();
        
        linhasTabela.forEach(linha => {
            const nomeSelecao = linha.cells[0].innerText.toLowerCase();
            
            // Se o nome da seleção contiver o termo digitado, exibe a linha, senão esconde
            if (nomeSelecao.includes(termoBusca)) {
                linha.style.display = "";
            } else {
                linha.style.display = "none";
            }
        });
    });
});