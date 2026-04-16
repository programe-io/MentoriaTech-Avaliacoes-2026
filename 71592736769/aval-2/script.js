// Lista de fases da estrela
const fases = [
  { nome: "Protoestrela", classe: "protoestrela" },
  { nome: "Sequência Principal", classe: "sequencia-principal" },
  { nome: "Gigante Vermelha", classe: "gigante-vermelha" },
  { nome: "Supernova", classe: "supernova" },
  { nome: "Anã Branca", classe: "ana-branca" }
];

let indice = 0;

function proximaFase() {
  const estrela = document.getElementById("estrela");
  const texto = document.getElementById("fase");

  indice++;

  // Se passar do limite, reinicia
  if (indice >= fases.length) {
    indice = 0;
  }

  // Aplica nova fase
  estrela.className = fases[indice].classe;
  texto.textContent = fases[indice].nome;

  // Se for supernova, avança automaticamente depois
  if (fases[indice].classe === "supernova") {
    setTimeout(() => {
      indice++;
      if (indice >= fases.length) indice = 0;

      estrela.className = fases[indice].classe;
      texto.textContent = fases[indice].nome;
    }, 800);
  }
}

// Modo automático (opcional)
let auto = false;
let intervalo;

function toggleAuto() {
  auto = !auto;

  if (auto) {
    intervalo = setInterval(proximaFase, 2000);
  } else {
    clearInterval(intervalo);
  }
}