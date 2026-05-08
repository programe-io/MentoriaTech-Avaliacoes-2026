// Função chamada ao clicar no botão
function mostrarMensagem() {
  alert("Olá! JavaScript funcionando com sucesso!");
}

// Muda a cor do fundo automaticamente
function mudarCor() {
  const cores = ["#f4f4f4", "#dff6ff", "#ffe4e1", "#e8ffd7"];
  
  const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
  
  document.body.style.background = corAleatoria;
}

// Executa a função a cada 3 segundos
setInterval(mudarCor, 3000);

// Mostra mensagem no console
console.log("Arquivo JavaScript carregado!");