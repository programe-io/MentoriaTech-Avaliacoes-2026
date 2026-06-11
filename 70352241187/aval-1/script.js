function mostrarCuriosidade() {
  const curiosidades = [
    "🇧🇷 O Brasil é o maior campeão com 5 títulos.",
    "🌍 A primeira Copa do Mundo foi em 1930 no Uruguai.",
    "🏆 A Argentina venceu a Copa de 2022 no Catar.",
    "⚽ A Copa do Mundo acontece a cada 4 anos.",
    "🔥 A final mais assistida foi a de 2018."
  ];

  const index = Math.floor(Math.random() * curiosidades.length);

  document.getElementById("curiosidade").innerText = curiosidades[index];
}