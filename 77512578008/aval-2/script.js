const feed = document.getElementById('feed');
const form = document.getElementById('formPost');
const texto = document.getElementById('texto');
const contador = document.getElementById('contador');
const btnPublicar = document.getElementById('btnPublicar');
const vazio = document.getElementById('vazio');
const aviso = document.getElementById('aviso');
const LIMITE = 240;

function mostrarAviso(msg) {
  aviso.textContent = msg;
  aviso.classList.add('aviso--ativo');
  clearTimeout(mostrarAviso.t);
  mostrarAviso.t = setTimeout(() => aviso.classList.remove('aviso--ativo'), 2000);
}

function atualizarTotais() {
  const posts = feed.querySelectorAll('.post');
  let curtidas = 0;
  posts.forEach(p => curtidas += Number(p.querySelector('.btn-curtir b').textContent));
  document.getElementById('totalPosts').textContent = posts.length;
  document.getElementById('totalCurtidas').textContent = curtidas;
  vazio.hidden = posts.length > 0;
}

/* campo de publicar */
texto.addEventListener('input', () => {
  const restante = LIMITE - texto.value.length;
  contador.textContent = restante;
  contador.classList.toggle('contador--alerta', restante <= 20);
  btnPublicar.disabled = texto.value.trim() === '';
  texto.style.height = 'auto';
  texto.style.height = texto.scrollHeight + 'px';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const conteudo = texto.value.trim();
  if (!conteudo) return;

  const post = document.createElement('article');
  post.className = 'post post--nova';
  post.innerHTML = `
    <div class="avatar">L</div>
    <div class="post__corpo">
      <header class="post__cab">
        <strong>Luzinéia Boiba</strong>
        <time class="tempo" data-min="0">agora mesmo</time>
        <button class="excluir" type="button">Excluir</button>
      </header>
      <p class="post__texto"></p>
      <div class="acoes">
        <button class="acao btn-curtir" aria-pressed="false">Curtir <b>0</b></button>
        <button class="acao btn-comentar" aria-expanded="false">Comentar <b>0</b></button>
      </div>
      <div class="comentarios" hidden>
        <ul class="lista-com"></ul>
        <form class="form-com">
          <input type="text" placeholder="Escreva um comentário" maxlength="120" aria-label="Comentário">
          <button class="btn btn--leve" type="submit">Enviar</button>
        </form>
      </div>
    </div>`;
  post.querySelector('.post__texto').textContent = conteudo;
  feed.prepend(post);

  form.reset();
  texto.style.height = 'auto';
  contador.textContent = LIMITE;
  btnPublicar.disabled = true;
  atualizarTotais();
  mostrarAviso('Publicado');
});

/* curtir, comentar e excluir */
feed.addEventListener('click', e => {
  const post = e.target.closest('.post');
  if (!post) return;

  const curtir = e.target.closest('.btn-curtir');
  if (curtir) {
    const ativo = curtir.getAttribute('aria-pressed') === 'true';
    const num = curtir.querySelector('b');
    curtir.setAttribute('aria-pressed', String(!ativo));
    num.textContent = Number(num.textContent) + (ativo ? -1 : 1);
    curtir.classList.remove('pulo'); void curtir.offsetWidth; curtir.classList.add('pulo');
    atualizarTotais();
    return;
  }

  const comentar = e.target.closest('.btn-comentar');
  if (comentar) {
    const caixa = post.querySelector('.comentarios');
    caixa.hidden = !caixa.hidden;
    comentar.setAttribute('aria-expanded', String(!caixa.hidden));
    if (!caixa.hidden) caixa.querySelector('input').focus();
    return;
  }

  if (e.target.closest('.excluir')) {
    post.remove();
    atualizarTotais();
    mostrarAviso('Publicação excluída');
  }
});

feed.addEventListener('submit', e => {
  const f = e.target.closest('.form-com');
  if (!f) return;
  e.preventDefault();
  const input = f.querySelector('input');
  const valor = input.value.trim();
  if (!valor) return;
  const post = f.closest('.post');
  const li = document.createElement('li');
  li.textContent = valor;
  post.querySelector('.lista-com').append(li);
  const num = post.querySelector('.btn-comentar b');
  num.textContent = Number(num.textContent) + 1;
  input.value = '';
});

/* tempo relativo */
function formatar(min) {
  if (min < 1) return 'agora mesmo';
  if (min < 60) return `há ${min} ${min === 1 ? 'minuto' : 'minutos'}`;
  const h = Math.floor(min / 60);
  return `há ${h} ${h === 1 ? 'hora' : 'horas'}`;
}
setInterval(() => {
  document.querySelectorAll('.tempo').forEach(t => {
    const min = Number(t.dataset.min) + 1;
    t.dataset.min = min;
    t.textContent = formatar(min);
  });
}, 60000);

atualizarTotais();