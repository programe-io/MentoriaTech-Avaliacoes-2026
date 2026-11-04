/* ==========================================================================
   LÓGICA DE ALTERNÂNCIA DE TEMA (MODO CLARO / MODO ESCURO)
   Mentoria Tech - SEDUC
   ========================================================================== */

// 1. Seleciona os elementos necessários do HTML através dos IDs/Classes
const themeToggleBtn = document.getElementById('themeToggle');
const bodyElement = document.body;

// 2. Verifica se o usuário já tinha uma preferência salva anteriormente
const savedTheme = localStorage.getItem('theme');

// 3. Se houver um tema salvo, aplica imediatamente ao carregar a página
if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
}

// 4. Adiciona um "ouvinte de evento" para detectar o clique no botão
themeToggleBtn.addEventListener('click', () => {
    
    // Alterna a classe 'dark-mode' no <body> (se tem tira, se não tem coloca)
    bodyElement.classList.toggle('dark-mode');
    
    // 5. Salva a nova preferência no localStorage para não perder ao atualizar
    if (bodyElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
