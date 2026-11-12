
const botao = document.getElementById("iniciar");
const combustivel = document.getElementById("combustivel");
const estado = document.getElementById("estado");
const mensagem = document.getElementById("mensagem");

let lancamento = false;

botao.addEventListener("click", () => {

  if (lancamento) return;

  lancamento = true;
  botao.disabled = true;

  let segundos = 5;

  estado.textContent = "PREPARANDO";
  mensagem.textContent = "Preparando motores...";

  const contagem = setInterval(() => {

    mensagem.textContent = `LANÇAMENTO EM ${segundos}...`;
    segundos--;

    if (segundos < 0) {
      clearInterval(contagem);

      combustivel.textContent = "85%";
      estado.textContent = "EM ÓRBITA";
      mensagem.textContent = "🚀 Decolagem concluída! Boa viagem, astronauta!";

      botao.textContent = "MISSÃO CONCLUÍDA";
    }

  }, 1000);
});

// Criar estrelas
const area = document.getElementById("estrelas");

for (let i = 0; i < 100; i++) {
  const estrela = document.createElement("div");

  estrela.className = "estrela";
  estrela.style.left = Math.random() * 100 + "vw";
  estrela.style.top = Math.random() * 100 + "vh";

  const tamanho = Math.random() * 3 + 1;

  estrela.style.width = tamanho + "px";
  estrela.style.height = tamanho + "px";

  estrela.style.animationDelay = Math.random() * 3 + "s";

  area.appendChild(estrela);
}
