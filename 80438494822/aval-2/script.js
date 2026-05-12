const botao = document.getElementById("gerar");
const caixaCor = document.getElementById("caixa-cor");
const codigoCor = document.getElementById("codigo-cor");

function gerarCorAleatoria() {
  const letras = "0123456789ABCDEF";
  let cor = "#";

  for (let i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }

  return cor;
}

botao.addEventListener("click", () => {
  const novaCor = gerarCorAleatoria();

  caixaCor.style.background = novaCor;
  codigoCor.textContent = novaCor;
});