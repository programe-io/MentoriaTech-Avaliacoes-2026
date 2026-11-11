/**
 * PROJETO CLONE INSTAGRAM COM TAILWIND CSS
 * Arquivo: script.js (Lógica de interação e comportamento)
 * Baseado na Avaliação 2 - Projeto Clone Instagram
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Instagram Clone carregado com sucesso!');
});

/**
 * Alterna o estado de curtir (like) da postagem:
 * - Troca entre ícone vazado (bx-heart) e preenchido vermelho (bxs-heart)
 * - Aplica animação suave 'heart-active'
 * - Incrementa ou decrementa a contagem de curtidas dinamicamente
 *
 * @param {HTMLElement} iconElement - Elemento do ícone de coração clicado
 * @param {string} counterId - ID do elemento de texto que exibe as curtidas
 */
function toggleLike(iconElement, counterId) {
  const counter = document.getElementById(counterId);
  if (!counter) return;

  let currentCount = parseInt(counter.getAttribute('data-count') || '1000', 10);

  if (iconElement.classList.contains('bx-heart')) {
    // Curtir
    iconElement.classList.remove('bx-heart');
    iconElement.classList.add('bxs-heart', 'heart-active');
    currentCount += 1;
    counter.setAttribute('data-count', currentCount);
    counter.textContent = currentCount.toLocaleString('pt-BR') + ' curtidas';
  } else {
    // Descurtir
    iconElement.classList.remove('bxs-heart', 'heart-active');
    iconElement.classList.add('bx-heart');
    currentCount -= 1;
    counter.setAttribute('data-count', currentCount);
    counter.textContent = currentCount.toLocaleString('pt-BR') + ' curtidas';
  }
}

/**
 * Alterna o estado de salvar (bookmark) da postagem:
 * - Troca entre o ícone de contorno (bx-bookmark) e preenchido (bxs-bookmark)
 *
 * @param {HTMLElement} iconElement - Elemento do ícone de marcador clicado
 */
function toggleBookmark(iconElement) {
  if (iconElement.classList.contains('bx-bookmark')) {
    iconElement.classList.remove('bx-bookmark');
    iconElement.classList.add('bxs-bookmark', 'text-slate-900');
  } else {
    iconElement.classList.remove('bxs-bookmark', 'text-slate-900');
    iconElement.classList.add('bx-bookmark');
  }
}

/**
 * Alterna o status de seguir usuários na barra lateral:
 * - Troca entre "Seguir" (azul) e "Seguindo" (cinza)
 *
 * @param {HTMLElement} buttonElement - Botão de seguir clicado
 */
function toggleFollow(buttonElement) {
  const isFollowing = buttonElement.textContent.trim() === 'Seguindo';

  if (!isFollowing) {
    buttonElement.textContent = 'Seguindo';
    buttonElement.classList.remove('text-blue-500', 'hover:text-blue-700');
    buttonElement.classList.add('text-gray-400', 'hover:text-gray-600');
  } else {
    buttonElement.textContent = 'Seguir';
    buttonElement.classList.remove('text-gray-400', 'hover:text-gray-600');
    buttonElement.classList.add('text-blue-500', 'hover:text-blue-700');
  }
}
