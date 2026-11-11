// Simulação de navegação web (muda o feed ou exibe avisos conforme o item clicado)
function navigate(section) {
    // Remove a classe 'active' de todos os itens do menu
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => item.classList.remove('active'));

    // Adiciona a classe 'active' ao item correspondente clicado
    event.currentTarget.parentElement.classList.add('active');

    const mainContent = document.querySelector('.main-content');

    if (section === 'home') {
        location.reload(); // Recarrega para o feed original
    } else {
        // Exibe uma visualização personalizada simulando a navegação na web
        mainContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh; color: #8e8e8e; text-align: center;">
                <i class="fa-solid fa-compass" style="font-size: 50px; margin-bottom: 20px;"></i>
                <h2>Seção: ${section.toUpperCase()}</h2>
                <p>Navegação web simulada com sucesso! Esta página está pronta para personalizações.</p>
            </div>
        `;
    }
}

// Interação de curtir postagem (Like)
function toggleLike(icon) {
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('liked');
}