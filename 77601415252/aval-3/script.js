ocument.addEventListener('DOMContentLoaded', () => {

  // Curtir / descurtir
  document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
    });
  });

  // Toggle bookmark
  document.querySelectorAll('.bx-bookmark').forEach((icon) => {
    icon.parentElement.addEventListener('click', () => {
      icon.classList.toggle('bx-bookmark');
      icon.classList.toggle('bx-bookmark-filled');
      icon.classList.toggle('text-slate-900');
    });
  });

  // Botões "Seguir" da sidebar
  document.querySelectorAll('aside button.text-blue-500').forEach((btn) => {
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