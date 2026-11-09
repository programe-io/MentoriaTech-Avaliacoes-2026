const visor = document.getElementById("visor");

function adicionar(valor) {
  visor.value += valor;
}

function limpar() {
  visor.value = "";
}

function apagar() {
  visor.value = visor.value.slice(0, -1);
}

function calcular() {
  try {
    if (!/^[0-9+\-*/.() ]+$/.test(visor.value)) {
      throw new Error("Expressão inválida");
    }
    visor.value = Function(
      '"use strict"; return (' + visor.value + ')'
    )();
  } catch {
    visor.value = "Erro";
  }
}