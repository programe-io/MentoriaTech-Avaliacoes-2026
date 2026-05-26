// ==========================================
// FUNÇÃO PARA CURTIR OS POSTS
// ==========================================
function toggleLike(button) {
    // Encontra o elemento de texto que exibe o número de curtidas dentro do botão clicado
    const countSpan = button.querySelector('.like-count');
    
    // Converte o texto atual de curtidas para um número inteiro
    let currentLikes = parseInt(countSpan.textContent);
    
    // Verifica se o usuário já tinha curtido o post (se a classe 'liked' existe no botão)
    if (button.classList.contains('liked')) {
        // Se já tinha curtido, remove a classe e diminui 1 curtida
        button.classList.remove('liked');
        countSpan.textContent = currentLikes - 1;
    } else {
        // Se não tinha curtido, adiciona a classe (fica vermelho) e soma 1 curtida
        button.classList.add('liked');
        countSpan.textContent = currentLikes + 1;
    }
}

// ==========================================
// SELEÇÃO E CONTROLE DO MODO ESCURO / CLARO
// ==========================================
// Captura o botão de alternar tema pelo ID correspondente no HTML
const themeBtn = document.getElementById('themeBtn');

// Fica ouvindo quando o usuário clica no botão
themeBtn.addEventListener('click', () => {
    // Verifica o tema atual que está aplicado na raiz (tag <html>) do documento
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Se estiver no modo escuro, remove o atributo para voltar ao modo claro padrão
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = 'Modo Escuro 🌙';
    } else {
        // Se estiver no modo claro, adiciona o atributo 'dark' para ativar as cores escuras do CSS
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = 'Modo Claro ☀️';
    }
});