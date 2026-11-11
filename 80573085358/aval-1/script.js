document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVEGAÇÃO ENTRE ABAS (SISTEMA DE SPA SIMPLES)
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active de todos os links e seções
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Adiciona active ao link clicado
            link.classList.add('active');
            
            // Mostra a seção correspondente com base no data-target
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. RECOLHER/EXPANDIR A SIDEBAR
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // 3. ALTERNADOR DE MODO ESCURO
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    // 4. INTERAÇÃO INTERNA EXTRA (Botão na aba de Usuários)
    const btnAlert = document.getElementById('btn-alert');
    if(btnAlert) {
        btnAlert.addEventListener('click', () => {
            alert('Função de adicionar usuário acionada com sucesso!');
        });
    }
});
