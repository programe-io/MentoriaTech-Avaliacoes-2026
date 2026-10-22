// Atualiza as datas dos posts com a data atual
const dateSpans = document.querySelectorAll('.post-date');
const today = new Date().toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

dateSpans.forEach(span => {
  span.textContent = today;
});

// Atualiza o relógio no console (opcional, só pra manter algo em execução)
setInterval(() => {
  console.log(`🕐 Paredão ativo desde ${new Date().toLocaleTimeString('pt-BR')}`);
}, 10000);