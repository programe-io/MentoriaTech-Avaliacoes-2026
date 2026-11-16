const btnTeia = document.getElementById('btn-teia');
const btnTraje = document.getElementById('btn-traje');
const teiaContainer = document.getElementById('teia-container');
const titulo = document.querySelector('header h1');

// Função para disparar teias em posições aleatórias da tela
btnTeia.addEventListener('click', () => {
  const teia = document.createElement('div');
  teia.classList.add('teia-disparada');
  teia.textContent = '🕸️';

  // Posição aleatória na tela
  const x = Math.random() * (window.innerWidth - 60);
  const y = Math.random() * (window.innerHeight - 60);

  teia.style.left = `${x}px`;
  teia.style.top = `${y}px`;

  teiaContainer.appendChild(teia);

  // Remove a teia após a animação terminar
  setTimeout(() => {
    teia.remove();
  }, 1200);
});

// Função para alternar entre o traje clássico e o simbionte
btnTraje.addEventListener('click', () => {
  document.body.classList.toggle('simbionte');
  
  if (document.body.classList.contains('simbionte')) {
    titulo.textContent = 'TRAJE SIMBIONTE';
    btnTraje.textContent = 'Traje Clássico 🔴';
  } else {
    titulo.textContent = 'HOMEM-ARANHA';
    btnTraje.textContent = 'Trocar Traje ⚫';
  }
});
