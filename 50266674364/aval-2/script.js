// Atualiza as datas dos cards com a data atual
const dateSpans = document.querySelectorAll('.post-date');
const today = new Date().toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

dateSpans.forEach(span => {
  span.textContent = today;
});

// Simula estatísticas do Fediverso (dados aproximados do mundo real)
function atualizarStats() {
  const usuarios = (9000000 + Math.floor(Math.random() * 500000)).toLocaleString('pt-BR');
  const instancias = (12000 + Math.floor(Math.random() * 500)).toLocaleString('pt-BR');
  const posts = (350 + Math.floor(Math.random() * 150)).toLocaleString('pt-BR');

  document.getElementById('users').textContent = usuarios;
  document.getElementById('instances').textContent = instancias;
  document.getElementById('posts').textContent = posts;
}

atualizarStats();
setInterval(atualizarStats, 8000);

// Log no console pra manter "vida"
setInterval(() => {
  console.log(`🌐 Fed Social — painel ativo ${new Date().toLocaleTimeString('pt-BR')}`);
}, 12000);