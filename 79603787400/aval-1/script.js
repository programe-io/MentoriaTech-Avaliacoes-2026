const btnCurtir = document.getElementById('btn-curtir');
const contadorCurtidas = document.getElementById('contador-curtidas');
const btnFocarComentario = document.getElementById('btn-focar-comentario');
const formComentario = document.getElementById('form-comentario');
const inputComentario = document.getElementById('input-comentario');
const listaComentarios = document.getElementById('lista-comentarios');

let curtido = false;
let totalCurtidas = 124;

// Função de Curtir / Descurtir
btnCurtir.addEventListener('click', () => {
  curtido = !curtido;
  
  if (curtido) {
    btnCurtir.textContent = '❤️';
    totalCurtidas++;
  } else {
    btnCurtir.textContent = '🤍';
    totalCurtidas--;
  }
  
  contadorCurtidas.textContent = totalCurtidas;
});

// Focar no campo de texto ao clicar no ícone de balão
btnFocarComentario.addEventListener('click', () => {
  inputComentario.focus();
});

// Adicionar novo comentário
formComentario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  
  const texto = inputComentario.value.trim();
  
  if (texto !== '') {
    const novoComentario = document.createElement('p');
    novoComentario.classList.add('comment');
    novoComentario.innerHTML = <strong>voce</strong> ${texto};
    
    listaComentarios.appendChild(novoComentario);
    inputComentario.value = '';
    listaComentarios.scrollTop = listaComentarios.scrollHeight;
  }
});