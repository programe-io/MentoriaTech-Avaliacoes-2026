document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternar Modo Claro / Escuro
    const btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // 2. Ampliar imagens ao clicar (Lightbox para apresentação do trabalho)
    const modal = document.getElementById('modal-imagem');
    const modalImg = document.getElementById('img-ampliada');
    const legendaModal = document.getElementById('legenda-modal');
    const btnFechar = document.querySelector('.fechar-modal');

    const imagens = document.querySelectorAll('.card-img img');
    imagens.forEach((img) => {
        img.addEventListener('click', () => {
            if (modal && modalImg && legendaModal) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                legendaModal.textContent = img.alt;
            }
        });
    });

    if (btnFechar && modal) {
        btnFechar.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});