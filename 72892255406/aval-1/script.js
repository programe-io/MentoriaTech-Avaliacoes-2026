document.getElementById('meuFormulario').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem');
  
  mensagem.textContent = `Olá, ${nome}! Seu código está funcionando.`;
});