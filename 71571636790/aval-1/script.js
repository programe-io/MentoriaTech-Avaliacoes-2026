
const numeroSecreto = 13;
let tentativasRestantes = 5;
let terminou = false;

const formulario = document.querySelector("#formulario");
const campoPalpite = document.querySelector("#palpite");
const mensagem = document.querySelector("#mensagem");
const restantes = document.querySelector("#restantes");
const botaoReiniciar = document.querySelector("#reiniciar");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (terminou) return;

  const palpite = Number(campoPalpite.value);

  if (!Number.isInteger(palpite) || palpite < 1 || palpite > 20) {
    mensagem.textContent = "Digite um número inteiro entre 1 e 20.";
    return;
  }

  tentativasRestantes--;
  restantes.textContent = tentativasRestantes;

  if (palpite === numeroSecreto) {
    mensagem.textContent = "Parabéns! Você acertou o número secreto.";
    terminou = true;
  } else if (tentativasRestantes === 0) {
    mensagem.textContent = `As tentativas acabaram. O número era ${numeroSecreto}.`;
    terminou = true;
  } else if (palpite > numeroSecreto) {
    mensagem.textContent = "Seu palpite foi maior que o número secreto.";
  } else {
    mensagem.textContent = "Seu palpite foi menor que o número secreto.";
  }
});

botaoReiniciar.addEventListener("click", function () {
  tentativasRestantes = 5;
  terminou = false;
  restantes.textContent = tentativasRestantes;
  mensagem.textContent = "Boa sorte!";
  campoPalpite.value = "";
  campoPalpite.focus();
});
