const btnCurtir = document.getElementById('btnCurtir');
const contadorCurtidas = document.getElementById('contadorCurtidas');
const inputComentario = document.getElementById('inputComentario');
const btnComentar = document.getElementById('btnComentar');
const listaComentarios = document.getElementById('listaComentarios');

let curtido = false;
let totalCurtidas = 124;

btnCurtir.addEventListener('click', () => {
  curtido = !curtido;
  
  if (curtido) {
    btnCurtir.textContent = '❤️';
    totalCurtidas++;
  } else {
    btnCurtir.textContent = '🤍';
    totalCurtidas--;
  }
  
  contadorCurtidas.innerHTML = `<strong>${totalCurtidas} curtidas</strong>`;
});

function adicionarComentario() {
  const texto = inputComentario.value.trim();
  
  if (texto !== '') {
    const novoP = document.createElement('p');
    novoP.innerHTML = `<strong>kauane_oficial</strong> ${texto}`;
    listaComentarios.appendChild(novoP);
    inputComentario.value = '';
  }
}

btnComentar.addEventListener('click', adicionarComentario);

inputComentario.addEventListener('keypress', (evento) => {
  if (evento.key === 'Enter') {
    adicionarComentario();
  }
});
