html
<div class="instagram-container">
  <!-- Cabeçalho do Perfil -->
  <header class="profile-header">
    <div class="avatar-wrapper">
      <img src="https://unsplash.com" alt="Foto de Perfil de Carro" class="avatar">
    </div>
    
    <div class="profile-info">
      <div class="username-row">
        <h2 class="username">luan.rodrigues_15</h2>
        <button id="follow-btn" class="btn-follow">Seguir</button>
      </div>

      <ul class="stats">
        <li><strong id="posts-count">3</strong> publicações</li>
        <li><strong id="followers-count">248</strong> seguidores</li>
        <li><strong>312</strong> seguindo</li>
      </ul>

      <div class="bio">
        <p class="full-name">Luan Pereira Rodrigues</p>
        <p class="bio-text">🏁 15 anos<br>🏎️ Apaixonado por carros e velocidade<br>🔧 Futuro piloto / mecânico</p>
      </div>
    </div>
  </header>

  <!-- Grade de Publicações -->
  <section class="posts-section">
    <div class="tab-bar">
      <span>▦ PUBLICAÇÕES</span>
    </div>

    <div class="posts-grid">
      <div class="post-card" data-likes="42">
        <img src="https://unsplash.com" alt="Porsche Esportivo">
        <div class="post-overlay">
          <span>❤️ <b class="like-num">42</b></span>
        </div>
      </div>

      <div class="post-card" data-likes="67">
        <img src="https://unsplash.com" alt="Chevrolet Camaro">
        <div class="post-overlay">
          <span>❤️ <b class="like-num">67</b></span>
        </div>
      </div>

      <div class="post-card" data-likes="89">
        <img src="https://unsplash.com" alt="Supercar">
        <div class="post-overlay">
          <span>❤️ <b class="like-num">89</b></span>
        </div>
      </div>
    </div>
  </section>
</div>$0* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
\}

body {
  background-color: #fafafa;
  color: #262626;
  display: flex;
  justify-content: center;
  padding: 20px;
\}

.instagram-container {
  max-width: 600px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding: 24px;
\}

/* Cabeçalho */
.profile-header {
  display: flex;
  align-items: center;
  gap: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #dbdbdb;
\}// Funcionalidade do botão Seguir / Seguindo
const followBtn = document.getElementById('follow-btn');
const followersCount = document.getElementById('followers-count');
let isFollowing = false;

followBtn.addEventListener('click', () => {
  let currentFollowers = parseInt(followersCount.textContent);

  if (!isFollowing) {
    isFollowing = true;
    followBtn.textContent = 'Seguindo';
    followBtn.classList.add('following');
    followersCount.textContent = currentFollowers + 1;
  \} else {
    isFollowing = false;
    followBtn.textContent = 'Seguir';
    followBtn.classList.remove('following');
    followersCount.textContent = currentFollowers - 1;
  \}
\});

// Funcionalidade de Curtir nas fotos ao clicar
const postCards = document.querySelectorAll('.post-card');

postCards.forEach(card => {
  card.addEventListener('click', () => {
    const likeSpan = card.querySelector('.like-num');
    let likes = parseInt(likeSpan.textContent);

    if (!card.classList.contains('liked')) {
      card.classList.add('liked');
      likeSpan.textContent = likes + 1;
    \} else {
      card.classList.remove('liked');
      likeSpan.textContent = likes - 1;
    \}
  \});$0

.avatar-wrapper {
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
\}

.avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  display: block;
\}

.profile-info {
  flex: 1;
\}

.username-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
\}

.username {
  font-size: 20px;
  font-weight: 400;
\}

.btn-follow {
  background-color: #0095f6;
  color: white;
  border: none;
  padding: 6px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
\}

.btn-follow:hover {
  background-color: #1877f2;
\}

.btn-follow.following {
  background-color: #efefef;
  color: #262626;
\}

.stats {
  display: flex;
  list-style: none;
  gap: 24px;
  margin-bottom: 14px;
  font-size: 14px;
\}

.full-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
\}

.bio-text {
  font-size: 14px;
  line-height: 1.4;
\}

/* Grade de Fotos */
.tab-bar {
  text-align: center;
  padding: 12px 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #262626;
\}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
\}

.post-card {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
\}

.post-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
\}

.post-card:hover img {
  transform: scale(1.05);
\}

.post-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
\}

.post-card:hover .post-overlay,
.post-card.liked .post-overlay {
  opacity: 1;
\}
Use o código com cuidado.
$0