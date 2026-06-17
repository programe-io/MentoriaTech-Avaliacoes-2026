// ==========================================================================
// 1. SAUDAÇÃO DINÂMICA
// ==========================================================================
function configurarSaudacao() {
    // Obtém a hora atual do sistema do usuário
    const horaAtual = new Date().getHours();
    let saudacao = "";

    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao = "Bom dia! ☀️";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = "Boa tarde! 🌤️";
    } else {
        saudacao = "Boa noite! 🌙";
    }

    // Seleciona o parágrafo do header para mudar o texto
    const subitituloHeader = document.querySelector('header p');
    if (subitituloHeader) {
        subitituloHeader.textContent = `${saudacao} Seja bem-vindo ao site interativo.`;
    }
}

// ==========================================================================
// 2. ALTERNADOR DE TEMA (DARK MODE)
// ==========================================================================
function inicializarModoEscuro() {
    // Cria um botão dinamicamente via JS para alternar o tema
    const botaoTema = document.createElement('button');
    botaoTema.textContent = "🌓 Mudar Tema";
    
    // Aplica estilos básicos diretamente no botão criado
    botaoTema.style.position = "fixed";
    botaoTema.style.top = "20px";
    botaoTema.style.right = "20px";
    botaoTema.style.padding = "10px 15px";
    botaoTema.style.cursor = "pointer";
    botaoTema.style.borderRadius = "20px";
    botaoTema.style.border = "none";
    botaoTema.style.fontWeight = "bold";
    botaoTema.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    botaoTema.style.zIndex = "1000";

    // Adiciona o botão ao corpo da página
    document.body.appendChild(botaoTema);

    // Cria os estilos do Modo Escuro na raiz do CSS (injetando via JS)
    const estiloDark = document.createElement('style');
    estiloDark.textContent = `
        body.dark-mode {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
        }
        body.dark-mode .card {
            background-color: #1e1e1e !important;
            color: #e0e0e0 !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5) !important;
        }
        body.dark-mode code {
            background-color: #333 !important;
            color: #ff79c6 !important;
        }
    `;
    document.head.appendChild(estiloDark);

    // Ouve o clique do botão para alternar a classe "dark-mode" no body
    botaoTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// ==========================================================================
// 3. INICIALIZAÇÃO
// ==========================================================================
// Garante que o script só rode após todo o HTML ser carregado na tela
document.addEventListener('DOMContentLoaded', () => {
    configurarSaudacao();
    inicializarModoEscuro();
    console.log("JavaScript carregado com sucesso e pronto para rodar!");
});