let totalApoiadores = 12;

const form = document.getElementById('formApoio');
const contadorEl = document.getElementById('contador');
const mensagemEl = document.getElementById('mensagem');

form.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nome').value;
  const tipo = document.getElementById('tipoApoio').value;

  totalApoiadores++;
  contadorEl.textContent = totalApoiadores;

  mensagemEl.textContent = `Obrigado, ${nome}! Seu cadastro como ${tipo} foi registrado com sucesso.`;
  mensagemEl.classList.remove('oculto');

  form.reset();
});