const dateElement = document.getElementById('currentDate');

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}
