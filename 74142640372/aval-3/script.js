/**
 * Arquivo de Scripts - TulipGlow
 * Gerencia a interatividade e dinamismo da página.
 */

// Aguarda o carregamento completo do DOM para iniciar as funções
document.addEventListener("DOMContentLoaded", () => {
    configurarAnoRodape();
    configurarFiltroCores();
});

/**
 * Captura o ano atual do sistema e atualiza o copyright do rodapé automaticamente.
 */
function configurarAnoRodape() {
    const elementoAno = document.getElementById("footer-year");
    if (elementoAno) {
        const anoAtual = new Date().getFullYear();
        elementoAno.textContent = anoAtual;
    }
}

/**
 * Injeta dinamicamente um campo de busca e gerencia o filtro em tempo real 
 * para a tabela de significados das cores das tulipas.
 */
function configurarFiltroCores() {
    const tabelaCores = document.getElementById("tabela-cores");
    if (!tabelaCores) return;

    // 1. Criação do elemento container e do input de busca
    const containerBusca = document.createElement("div");
    containerBusca.style.marginBottom = "20px";

    const inputBusca = document.createElement("input");
    inputBusca.type = "text";
    inputBusca.id = "busca-tulipas";
    inputBusca.placeholder = "Digite uma cor ou significado para filtrar a tabela...";
    
    // Aplicação de estilos via JS que complementam o arquivo CSS
    Object.assign(inputBusca.style, {
        width: "100%",
        padding: "14px 16px",
        fontSize: "1rem",
        border: "1px solid #e0d0d7",
        borderRadius: "8px",
        outline: "none",
        transition: "all 0.3s ease"
    });

    // Anexa o input ao container e insere logo antes da tabela
    containerBusca.appendChild(inputBusca);
    tabelaCores.parentNode.insertBefore(containerBusca, tabelaCores);

    // 2. Lógica de filtragem em tempo real (evento keyup)
    inputBusca.addEventListener("keyup", () => {
        const termoPesquisa = inputBusca.value.toLowerCase().trim();
        const linhasCorpoTabela = tabelaCores.querySelectorAll("tbody tr");

        linhasCorpoTabela.forEach(linha => {
            // Captura todo o texto contido na linha atual (tds)
            const conteudoLinha = linha.textContent.toLowerCase();

            // Se o termo pesquisado existir na linha, ela permanece visível, caso contrário é oculta
            if (conteudoLinha.includes(termoPesquisa)) {
                linha.style.display = ""; // Restaura o padrão (table-row)
            } else {
                linha.style.display = "none";
            }
        });
    });
}