// Função de Curtir
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
          icon.classList.toggle('bx-heart');
              icon.classList.toggle('bxs-heart');
                  
                      // Animação de curtir duas vezes
                          if (icon.classList.contains('bxs-heart')) {
                                icon.style.animation = 'none';
                                      icon.offsetHeight; // trigger reflow
                                            icon.style.animation = 'likeAnim 0.3s ease';
                                                }
                                                  });
                                                  });
                                                  