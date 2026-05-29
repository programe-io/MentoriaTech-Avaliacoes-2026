let cronogramaCapilar = [
  "Hidratação 💧",
  "Nutrição 🥑",
  "Reconstrução 💪"
];

function mostrarCronograma() {
  cronogramaCapilar.forEach((etapa, index) => {
    console.log(`${index + 1}. ${etapa}`);
  });
}

mostrarCronograma();
