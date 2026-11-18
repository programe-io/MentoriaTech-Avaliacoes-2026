/* ============================================
   Clone Instagram — Interações simples
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Curtir / descurtir ----
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
    });
  });

  // ---- Trocar ícone do bookmark ao clicar ----
  const bookmarkButtons = document.querySelectorAll('.bx-bookmark');

  bookmarkButtons.forEach((icon) => {
    icon.parentElement.addEventListener('click', () => {
      icon.classList.toggle('bx-bookmark');
      icon.classList.toggle('bx-bookmark-filled');
      icon.classList.toggle('text-slate-900');
    });
  });

  // ---- Botões "Seguir" da sidebar ----
  const followButtons = document.querySelectorAll('aside button.text-blue-500');

  followButtons.forEach((btn) => {
    if (btn.textContent.trim().toLowerCase() === 'seguir') {
      btn.addEventListener('click', () => {
        if (btn.textContent.trim().toLowerCase() === 'seguir') {
          btn.textContent = 'Seguindo';
          btn.classList.remove('text-blue-500');
          btn.classList.add('text-gray-500');
        } else {
          btn.textContent = 'Seguir';
          btn.classList.remove('text-gray-500');
          btn.classList.add('text-blue-500');
        }
      });
    }
  });

});