// Alternar Modo Simbionte
const btnTraje = document.getElementById('btn-traje');
btnTraje.addEventListener('click', () => {
  document.body.classList.toggle('simbionte');
  btnTraje.textContent = document.body.classList.contains('simbionte') 
    ? 'Clássico 🔴' 
    : 'Simbionte ⚫';
});

// Botão Seguir / Seguindo
const btnSeguir = document.getElementById('btn-seguir');
const numSeguidores = document.getElementById('num-seguidores');
let seguindo = false;

btnSeguir.addEventListener('click', () => {
  seguindo = !seguindo;
  if (seguindo) {
    btnSeguir.textContent = 'Seguindo';
    btnSeguir.classList.add('seguindo');
    numSeguidores.textContent = '1.451';
  } else {
    btnSeguir.textContent = 'Seguir';
    btnSeguir.classList.remove('seguindo');
    numSeguidores.textContent = '1.450';
  }
});

// Interação nos Posts (Curtir, Duplo Clique e Comentários)
document.querySelectorAll('.post').forEach(post => {
  const btnCurtir = post.querySelector('.btn-curtir');
  const contador = post.querySelector('.contador');
  const imagem = post.querySelector('.post-imagem');
  const coracaoAnimado = post.querySelector('.coracao-animado');
  const btnComentar = post.querySelector('.btn-comentar');
  const inputComentario = post.querySelector('.input-comentario');
  const listaComentarios = post.querySelector('.comentarios-lista');

  let curtido = false;

  function alternarCurtida(forcarCurtir = false) {
    let total = parseInt(contador.textContent);
    if (!curtido) {
      curtido = true;
      btnCurtir.textContent = '❤️';
      contador.textContent = total + 1;
    } else if (!forcarCurtir) {
      curtido = false;
      btnCurtir.textContent = '🤍';
      contador.textContent = total - 1;
    }
  }

  btnCurtir.addEventListener('click', () => alternarCurtida(false));

  // Duplo clique na imagem para curtir
  imagem.addEventListener('dblclick', () => {
    alternarCurtida(true);
    coracaoAnimado.classList.add('mostrar');
    setTimeout(() => coracaoAnimado.classList.remove('mostrar'), 700);
  });

  // Adicionar comentário
  btnComentar.addEventListener('click', () => {
    const texto = inputComentario.value.trim();
    if (texto) {
      const novoComentario = document.createElement('p');
      novoComentario.innerHTML = `<strong>@voce:</strong> ${texto}`;
      listaComentarios.appendChild(novoComentario);
      inputComentario.value = '';
    }
  });
});

// Visualizar Stories
const modalStory = document.getElementById('modal-story');
const textoStory = document.getElementById('texto-story');
const fecharStory = document.getElementById('fechar-story');

document.querySelectorAll('.story-item').forEach(item => {
  item.addEventListener('click', () => {
    textoStory.textContent = item.getAttribute('data-story');
    modalStory.classList.remove('oculto');
  });
});

fecharStory.addEventListener('click', () => {
  modalStory.classList.add('oculto');
});
