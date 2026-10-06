document.addEventListener('DOMContentLoaded', () => {
  const menInput = document.getElementById('men');
  const womenInput = document.getElementById('women');
  const childrenInput = document.getElementById('children');
  const durationInput = document.getElementById('duration');
  const calcBtn = document.getElementById('calcBtn');
  const resultsContainer = document.getElementById('results');
  const resultsList = document.getElementById('resultsList');

  calcBtn.addEventListener('click', calculate);

  function calculate() {
    const men = parseInt(menInput.value) || 0;
    const women = parseInt(womenInput.value) || 0;
    const children = parseInt(childrenInput.value) || 0;
    const duration = parseInt(durationInput.value) || 1;

    // Fator de ajuste para churrascos longos (> 6 horas)
    const factor = duration >= 6 ? 1.5 : 1;

    // Cálculos por tipo de convidado
    const totalMeat = ((men * 400) + (women * 300) + (children * 200)) * factor;
    const totalBeer = ((men * 2000) + (women * 1000)) * factor; // em ml
    const totalSoda = ((women * 500) + (children * 1000)) * factor; // em ml
    const totalGarlicBread = (men + women + children) * 2; // unidades

    renderResults({
      meat: (totalMeat / 1000).toFixed(1), // kg
      beer: Math.ceil(totalBeer / 350),   // latas de 350ml
      soda: Math.ceil(totalSoda / 2000),  // garrafas de 2L
      bread: totalGarlicBread
    });
  }

  function renderResults(data) {
    resultsList.innerHTML = `
      <li>🥩 Carne total: <strong>${data.meat} kg</strong></li>
      <li>🍺 Cerveja: <strong>${data.beer} latas (350ml)</strong></li>
      <li>🥤 Refrigerante/Água: <strong>${data.soda} garrafa(s) (2L)</strong></li>
      <li>🥖 Pão de Alho: <strong>${data.bread} unidades</strong></li>
    `;

    resultsContainer.classList.remove('hidden');
  }
});