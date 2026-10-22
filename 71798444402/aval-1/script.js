const formulario = document.getElementById('newsletter-form');
const campoNome = document.getElementById('nome');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = campoNome.value.trim();

  if (nome.length < 2) {
    mensagem.textContent = 'Digite um nome válido!';
    return;
  }

  mensagem.textContent =
    `⚽ Valeu, ${nome}! Você já faz parte da torcida FutBlog!`;

  formulario.reset();
});