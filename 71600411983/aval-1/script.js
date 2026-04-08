const fases = [
  "nebulosa",
  "protoestrela",
  "sequencia",
  "gigante",
  "ana_branca"
];

let faseAtual = 0;

function proximaFase() {
  const estrela = document.getElementById("estrela");

  estrela.className = fases[faseAtual];

  faseAtual++;

  if (faseAtual >= fases.length) {
    faseAtual = 0;
  }
}