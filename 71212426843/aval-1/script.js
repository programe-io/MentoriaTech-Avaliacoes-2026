const botao = document.getElementById('comandoSucesso');

botao.addEventListener('click', () => {
  // Dispara os confetes
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6e8efb', '#a777e3', '#ffffff']
  });

  // Muda o texto temporariamente
  botao.innerText = "🎉​Parabens  Enviado🎉​!";
  
  setTimeout(() => {
    botao.innerText = "Finalizar projeto";
  }, 3000);
});
