let curtido = false;
let salvo = false;
let totalCurtidas = 124;

const btnLike = document.getElementById('btn-like');
const postImg = document.getElementById('post-img');
const likeCount = document.getElementById('like-count');
const btnSave = document.getElementById('btn-save');
const btnCommentFocus = document.getElementById('btn-comment-focus');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

function alternarCurtida() {
  curtido = !curtido;
  if (curtido) {
    btnLike.textContent = '❤️';
    totalCurtidas++;
  \} else {
    btnLike.textContent = '🤍';
    totalCurtidas--;
  \}
  likeCount.textContent = totalCurtidas;
\}

btnLike.addEventListener('click', alternarCurtida);

postImg.addEventListener('dblclick', () => {
  if (!curtido) {
    alternarCurtida();
  \}
\});

btnSave.addEventListener('click', () => {
  salvo = !salvo;
  btnSave.textContent = salvo ? '✅' : '🔖';
\});

btnCommentFocus.addEventListener('click', () => {
  commentInput.focus();
\});

commentForm.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = commentInput.value.trim();
  
  if (texto !== '') {
    const novoComentario = document.createElement('p');
    novoComentario.innerHTML = `<strong>voce</strong> \${texto\}`;
    commentsList.appendChild(novoComentario);
    commentInput.value = '';
  \}
\});$0