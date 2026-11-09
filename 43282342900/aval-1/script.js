
function curtir(botao) {
  if (botao.textContent.includes("Curtir")) {
    botao.textContent = "💖 Curtido!";
    botao.style.background = "#e91e63";
  } else {
    botao.textContent = "❤️ Curtir";
    botao.style.background = "#ff7b00";
  }
}
