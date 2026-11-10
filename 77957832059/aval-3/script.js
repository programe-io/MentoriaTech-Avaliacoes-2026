function toggleLike(icon) {
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular', 'fa-heart');
    icon.classList.add('fa-solid', 'fa-heart');
    icon.style.color = '#ed4956'; // Vermelho do Instagram
  } else {
    icon.classList.remove('fa-solid', 'fa-heart');
    icon.classList.add('fa-regular', 'fa-heart');
    icon.style.color = '#262626';
  }
}
