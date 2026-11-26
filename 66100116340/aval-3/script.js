/ Seguir e deixar de seguir
function toggleFollow(buttonElement) {
  const isFollowing =
    buttonElement.textContent.trim() === 'Seguindo';

  if (!isFollowing) {
    buttonElement.textContent = 'Seguindo';

    buttonElement.classList.remove(
      'text-blue-500',
      'hover:text-blue-700'
    );

    buttonElement.classList.add(
      'text-gray-400',
      'hover:text-gray-600'
    );
  } else {
    buttonElement.textContent = 'Seguir';

    buttonElement.classList.remove(
      'text-gray-400',
      'hover:text-gray-600'
    );

    buttonElement.classList.add(
      'text-blue-500',
      'hover:text-blue-700'
    );
  }
}