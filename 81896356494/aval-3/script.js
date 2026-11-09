document.addEventListener('DOMContentLoaded', () => {
  // 1. Funcionalidade de Curtir/Gostar da Publicação
  const heartIcons = document.querySelectorAll('.post-actions .bx-heart');
  const likesCountElement = document.querySelector('.likes-count');

  heartIcons.forEach((heart) => {
    heart.addEventListener('click', () => {
      // Alterna entre o ícone normal e o preenchido (solid)
      const isLiked = heart.classList.contains('bxs-heart');

      if (isLiked) {
        heart.classList.remove('bxs-heart', 'text-red-500');
        heart.classList.add('bx-heart');
        heart.style.color = '';
        
        // Atualiza a contagem de curtidas
        if (likesCountElement) {
          likesCountElement.textContent = '1.234 curtidas';
        }
      } else {
        heart.classList.remove('bx-heart');
        heart.classList.add('bxs-heart');
        heart.style.color = '#ef4444'; // Cor vermelha do Instagram
        
        // Atualiza a contagem de curtidas
        if (likesCountElement) {
          likesCountElement.textContent = '1.235 curtidas';
        }
      }
    });
  });

  // 2. Funcionalidade de Guardar / Bookmark
  const bookmarkIcons = document.querySelectorAll('.bx-bookmark');

  bookmarkIcons.forEach((bookmark) => {
    bookmark.addEventListener('click', () => {
      const isBookmarked = bookmark.classList.contains('bxs-bookmark');

      if (isBookmarked) {
        bookmark.classList.remove('bxs-bookmark');
        bookmark.classList.add('bx-bookmark');
      } else {
        bookmark.classList.remove('bx-bookmark');
        bookmark.classList.add('bxs-bookmark');
      }
    });
  });

  // 3. Botão "Seguir / Seguindo" na Sidebar
  const followButtons = document.querySelectorAll('.sidebar .btn-link');

  followButtons.forEach((btn) => {
    if (btn.textContent.trim().toLowerCase() === 'seguir') {
      btn.addEventListener('click', () => {
        if (btn.textContent.trim() === 'Seguir') {
          btn.textContent = 'Seguindo';
          btn.style.color = '#6b7280'; // tom de cinzento
        } else {
          btn.textContent = 'Seguir';
          btn.style.color = '#3b82f6'; // tom de azul
        }
      });
    }
  });

  // 4. Navegação Móvel (Destacar o ícone ativo)
  const navButtons = document.querySelectorAll('.bottom-nav .nav-btn');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      navButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 5. Filtro Simples na Barra de Pesquisa
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      console.log('Pesquisando por:', searchTerm);
    });
  }
});