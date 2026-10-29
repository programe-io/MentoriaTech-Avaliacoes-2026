/**
 * ==========================================================================
 * INSTAGRAM CLONE - PROFILE INTERACTION SCRIPT
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEÇÃO DE ELEMENTOS DO DOM
    const tabItems = document.querySelectorAll('.tab-item');
    const postsGrid = document.querySelector('.posts-grid');
    const btnEditProfile = document.querySelector('.info-row .btn-secondary');

    // 2. ALTERNÂNCIA DE ABAS DO FEED (PUBLICAÇÕES, REELS, MARCADO)
    if (tabItems.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove a classe ativa de todas as abas
                tabItems.forEach(item => item.classList.remove('active'));
                
                // Adiciona a classe ativa na aba clicada
                tab.classList.add('active');

                // Exemplo de comportamento visual ao trocar de aba
                const tabName = tab.textContent.trim();
                console.log(`Aba selecionada: ${tabName}`);
            });
        });
    }

    // 3. EVENTO DE CLIQUE NAS PUBLICAÇÕES (ABRIR MODAL DE VISUALIZAÇÃO)
    if (postsGrid) {
        postsGrid.addEventListener('click', (e) => {
            const postItem = e.target.closest('.post-item');
            if (!postItem) return;

            const imgSrc = postItem.querySelector('img')?.src;
            const stats = postItem.querySelector('.post-overlay')?.innerText.replace(/\n/g, ' ') || '';

            if (imgSrc) {
                abrirModalPost(imgSrc, stats);
            }
        });
    }

    // 4. EFEITO DE BOTÃO DE SEGUIR / EDITAR PERFIL
    if (btnEditProfile) {
        btnEditProfile.addEventListener('click', () => {
            alert('Ação: Abrir tela de edição de perfil.');
        });
    }

    // 5. FUNÇÃO DE MODAL EXPANDIDO (DINÂMICO)
    function abrirModalPost(src, stats) {
        // Cria a estrutura da modal dinamicamente
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // Estilos embutidos para garantir isolamento da modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            cursor: 'pointer'
        });

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; width: 90%; background: #000; border-radius: 8px; overflow: hidden; border: 1px solid #262626; cursor: default;">
                <img src="${src}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block;">
                <div style="padding: 16px; color: #fff; text-align: center; font-size: 0.9rem;">
                    <span>${stats}</span>
                </div>
            </div>
        `;

        // Fechar ao clicar fora da imagem ou pressionar ESC
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.appendChild(modal);
    }
});
```<FollowUp label="Quer ver como integrar esses arquivos no projeto completo?" query="Explique como vincular index.html, style.css e script.js no projeto do Instagram Clone."/>