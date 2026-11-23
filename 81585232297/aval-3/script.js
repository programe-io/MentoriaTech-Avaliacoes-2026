function toggleLike(icon, likesElementId) {
  const likesElement = document.getElementById(likesElementId);
  let count = parseInt(likesElement.getAttribute('data-count'), 10);

  if (icon.classList.contains('bx-heart')) {
    icon.classList.remove('bx-heart');
    icon.classList.add('bxs-heart', 'text-red-500');
    count += 1;
  } else {
    icon.classList.remove('bxs-heart', 'text-red-500');
    icon.classList.add('bx-heart');
    count -= 1;
  }

  likesElement.setAttribute('data-count', count);
  likesElement.textContent = `${count} curtidas`;
}

function toggleBookmark(icon) {
  if (icon.classList.contains('bx-bookmark')) {
    icon.classList.remove('bx-bookmark');
    icon.classList.add('bxs-bookmark', 'text-black');
  } else {
    icon.classList.remove('bxs-bookmark', 'text-black');
    icon.classList.add('bx-bookmark');
  }
}