// ==========================================================================
// 1. GERENCIAMENTO DE TEMA (DARK MODE)
// ==========================================================================

/**
 * Alterna o tema da página entre claro e escuro.
 * Modifica as variáveis CSS no elemento raiz (:root).
 */
function alternarTema() {
    const raiz = document.documentElement;
    // Verifica o tema atual com base em uma propriedade customizada
    const temaAtual = raiz.style.getPropertyValue('--cor-fundo') || '#f4f4f9';

    if (temaAtual === '#f4f4f9') {
        // Aplica cores do Modo Escuro
        raiz.style.setProperty('--cor-fundo', '#1e1e24');
        raiz.style.setProperty('--cor-texto', '#f4f4f9');
        raiz.style.setProperty('--cor-branca', '#2c3e50');
        raiz.style.setProperty('--cor-principal', '#111827');
        console.log("Modo Escuro ativado.");
    } else {
        // Restaura cores do Modo Claro
        raiz.style.setProperty('--cor-fundo', '#f4f4f9');
        raiz.style.setProperty('--cor-texto', '#333333');
        raiz.style.setProperty('--cor-branca', '#ffffff');
        raiz.style.setProperty('--cor-principal', '#2c3e50');
        console.log("Modo Claro ativado.");
    }
}

// ==========================================================================
// 2. REQUISICÃO ASSÍNCRONA (SIMULAÇÃO DE API)
// ==========================================================================

/**
 * Simula a busca de dados de um servidor com async/await.
 */
async function buscarDadosDaAPI() {
    console.log("Buscando dados...");
    
    // Simula uma espera de 1.5 segundos (rede lenta)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const dados = {
        status: "Sucesso",
        versao: "2026.1",
        autor: "Gemini",
        tecnologias: ["HTML5", "CSS3", "JavaScript ES6+"]
    };

    return dados;
}

/**
 * Função principal que manipula o DOM para exibir os dados simulados.
 */
async function renderizarConteudo() {
    const mainArea = document.querySelector('main');
    
    // Cria um elemento de carregamento temporário
    const loadingMessage = document.createElement('p');
    loadingMessage.innerText = "Carregando novidades do servidor...";
    loadingMessage.style.fontStyle = "italic";
    mainArea.appendChild(loadingMessage);

    try {
        const resultado = await buscarDadosDaAPI();
        
        // Remove a mensagem de carregamento
        mainArea.removeChild(loadingMessage);

        // Cria e insere uma nova seção com os dados recebidos
        const novaSecao = document.createElement('div');
        novaSecao.style.marginTop = "2rem";
        novaSecao.style.paddingTop = "1rem";
        novaSecao.style.borderTop = "1px solid #ccc";

        novaSecao.innerHTML = `
            <h3>Dados Carregados (v${resultado.versao})</h3>
            <p>Este bloco de texto foi gerado dinamicamente via <strong>JavaScript</strong>!</p>
            <small>Criado por: ${resultado.autor}</small>
        `;

        mainArea.appendChild(novaSecao);
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}

// ==========================================================================
// 3. INICIALIZAÇÃO E EVENTOS
// ==========================================================================

// Garante que o código só rode após o HTML estar totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão existente na página (pela classe .btn)
    const botao = document.querySelector('.btn');

    if (botao) {
        // Altera o texto do botão original
        botao.innerText = "Alternar Modo Escuro";
        
        // Substitui o alert antigo pelo nosso evento de trocar tema
        botao.removeAttribute('onclick'); 
        botao.addEventListener('click', alternarTema);
    }

    // Executa a função assíncrona automaticamente após abrir a página
    renderizarConteudo();
});