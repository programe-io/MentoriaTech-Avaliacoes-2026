function filtrar(tipo) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    if (tipo === 'todos') {
      card.style.display = 'block';
    } else {
      card.style.display = card.classList.contains(tipo)
        ? 'block'
        : 'none';
    }
  });
}