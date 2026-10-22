
const dicas = [
  "Comece seu desenho usando formas geométricas.",
  "Misture cores para descobrir novas tonalidades.",
  "Use materiais recicláveis para criar artesanato.",
  "Faça um esboço antes de começar a pintar.",
  "Pratique um pouco todos os dias e divirta-se!",
  "Não tenha medo de experimentar novas ideias."
];

function mostrarDica() {
  const indice = Math.floor(Math.random() * dicas.length);
  document.getElementById("dica").textContent = dicas[indice];
}
