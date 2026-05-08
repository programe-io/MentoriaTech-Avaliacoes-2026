// Mostrar mensagem
function mostrarMensagem() {
  alert("Olá! JavaScript funcionando 🚀");
}

// Mudar cor do fundo
function mudarCor() {
  document.body.style.background = "#dff9fb";
}

// Mostrar horário atual
function mostrarHora() {
  const agora = new Date();
  alert("Hora atual: " + agora.toLocaleTimeString());
}

// Exemplo de clique em botão
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada com sucesso!");
});