const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o usuário já salvou o tema claro anteriormente
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙 Modo Escuro';
    }

    // Alterna entre Escuro (padrão) e Claro ao clicar
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-mode');

        const isLight = body.classList.contains('light-mode');
          themeToggleBtn.textContent = isLight ? '🌙 Modo Escuro' : '☀️ Modo Claro';

            // Salva a preferência no navegador
              localStorage.setItem('theme', isLight ? 'light' : 'dark');
              });