<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instagram — Projeto Clone</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #fafafa; color: #262626; font-family: Arial, sans-serif; }
    .app-header { height: 62px; background: white; border-bottom: 1px solid #dbdbdb; position: sticky; top: 0; z-index: 20; }
    .header-inner { max-width: 975px; height: 100%; margin: auto; padding: 0 18px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .brand { font-family: Georgia, serif; font-size: 27px; font-weight: bold; letter-spacing: -1px; }
    .search { width: 270px; border: 0; border-radius: 8px; background: #efefef; padding: 10px 14px; outline: none; }
    .header-icons, .post-actions, .mobile-nav { display: flex; align-items: center; gap: 20px; }
    .icon-btn { border: 0; background: transparent; font-size: 25px; cursor: pointer; padding: 2px; color: #262626; }
    .layout { max-width: 935px; margin: 28px auto; display: grid; grid-template-columns: minmax(0, 615px) 293px; gap: 28px; padding: 0 12px; }
    .stories, .post { background: white; border: 1px solid #dbdbdb; border-radius: 8px; }
    .stories { display: flex; gap: 17px; overflow-x: auto; padding: 16px; margin-bottom: 22px; }
    .story { min-width: 66px; text-align: center; font-size: 12px; cursor: pointer; }
    .story-ring { width: 62px; height: 62px; padding: 3px; margin: auto auto 6px; border-radius: 50%; background: linear-gradient(35deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5); }
    .story-ring span { display: grid; place-items: center; width: 100%; height: 100%; border: 2px solid white; border-radius: 50%; background: #e5e7eb; font-size: 22px; }
    .post { margin-bottom: 22px; overflow: hidden; }
    .post-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; }
    .user { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .avatar { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; background: #e5e7eb; font-size: 20px; flex-shrink: 0; }
    .username { font-size: 14px; font-weight: 600; }
    .subtext { color: #8e8e8e; font-size: 12px; margin-top: 3px; }
    .post-image { width: 100%; aspect-ratio: 1 / 1; display: grid; place-items: center; color: white; font-size: 72px; background: linear-gradient(135deg,#b7c9d6,#e9b8a7 48%,#6b8291); }
    .post-image.second { background: linear-gradient(135deg,#d7c5a3,#8da58a,#344d43); }
    .post-image.third { background: linear-gradient(135deg,#f4c6d7,#9c83b8,#f1d7a8); }
    .post-body { padding: 10px 15px 14px; }
    .post-actions { justify-content: space-between; margin-bottom: 9px; }
    .action-left { display: flex; gap: 13px; }
    .like-btn.liked { color: #ed4956; }
    .likes, .caption { font-size: 14px; margin: 6px 0; }
    .caption strong { margin-right: 5px; }
    .comments { color: #8e8e8e; font-size: 13px; margin: 7px 0; }
    .comment-form { display: flex; border-top: 1px solid #efefef; margin-top: 10px; padding-top: 10px; gap: 8px; }
    .comment-form input { border: 0; outline: none; flex: 1; font-size: 13px; }
    .comment-form button, .follow { border: 0; background: none; color: #0095f6; font-weight: 600; cursor: pointer; }
    .sidebar { padding-top: 12px; position: sticky; top: 85px; height: fit-content; }
    .profile-row, .suggestion { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .suggestion-title { color: #8e8e8e; font-size: 14px; font-weight: 600; margin: 22px 0 16px; }
    .suggestion .user { gap: 10px; }
    .suggestion .avatar { width: 34px; height: 34px; }
    .muted { color: #8e8e8e; font-size: 12px; }
    .mobile-nav { display: none; }
    .story-viewer { position: fixed; inset: 0; background: rgba(0,0,0,.88); z-index: 50; display: none; align-items: center; justify-content: center; color: white; }
    .story-viewer.active { display: flex; }
    .story-card { width: min(360px, 90vw); height: min(620px, 85vh); border-radius: 12px; background: linear-gradient(145deg,#d62976,#fa7e1e,#4f5bd5); display: flex; flex-direction: column; justify-content: space-between; padding: 22px; }
    .story-close { align-self: flex-end; color: white; background: transparent; border: 0; font-size: 28px; cursor: pointer; }
    @media (max-width: 760px) {
      .layout { display: block; margin: 15px auto 75px; padding: 0; }
      .sidebar, .search, .desktop-only { display: none; }
      .stories, .post { border-radius: 0; border-left: 0; border-right: 0; }
      .mobile-nav { display: flex; position: fixed; z-index: 30; bottom: 0; left: 0; right: 0; justify-content: space-around; background: white; border-top: 1px solid #dbdbdb; padding: 10px 4px; }
      .header-inner { padding: 0 14px; }
      .brand { font-size: 25px; }
    }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="header-inner">
      <div class="brand">Instagram</div>
      <input class="search" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
      <div class="header-icons">
        <button class="icon-btn" aria-label="Página inicial"><i class="bx bx-home"></i></button>
        <button class="icon-btn desktop-only" aria-label="Mensagens"><i class="bx bx-send"></i></button>
        <button class="icon-btn desktop-only" aria-label="Criar publicação"><i class="bx bx-plus-square"></i></button>
        <button class="icon-btn" aria-label="Curtidas"><i class="bx bx-heart"></i></button>
        <button class="icon-btn" aria-label="Perfil"><i class="bx bx-user-circle"></i></button>
      </div>
    </div>
  </header>

  <main class="layout">
    <section aria-label="Feed de publicações">
      <div class="stories" aria-label="Stories">
        <div class="story" data-story="Seu story"><div class="story-ring"><span>＋</span></div>Seu story</div>
        <div class="story" data-story="marina"><div class="story-ring"><span>🌸</span></div>marina</div>
        <div class="story" data-story="pedro"><div class="story-ring"><span>🏄</span></div>pedro</div>
        <div class="story" data-story="ana"><div class="story-ring"><span>☀️</span></div>ana</div>
        <div class="story" data-story="lucas"><div class="story-ring"><span>🎧</span></div>lucas</div>
        <div class="story" data-story="beatriz"><div class="story-ring"><span>🌿</span></div>beatriz</div>
        <div class="story" data-story="rafael"><div class="story-ring"><span>📷</span></div>rafael</div>
      </div>

      <article class="post">
        <div class="post-head">
          <div class="user"><div class="avatar">🌸</div><div><div class="username">marina.silva</div><div class="subtext">Teresina, Piauí</div></div></div>
          <button class="icon-btn" aria-label="Mais opções">···</button>
        </div>
        <div class="post-image" role="img" aria-label="Paisagem colorida">🌅</div>
        <div class="post-body">
          <div class="post-actions">
            <div class="action-left">
              <button class="icon-btn like-btn" aria-label="Curtir"><i class="bx bx-heart"></i></button>
              <button class="icon-btn" aria-label="Comentar"><i class="bx bx-message-rounded"></i></button>
              <button class="icon-btn" aria-label="Compartilhar"><i class="bx bx-send"></i></button>
            </div>
            <button class="icon-btn save-btn" aria-label="Salvar"><i class="bx bx-bookmark"></i></button>
          </div>
          <p class="likes"><strong class="like-count">1.234</strong> curtidas</p>
          <p class="caption"><strong>marina.silva</strong> Um dia lindo para guardar na memória! ✨</p>
          <p class="comments">Ver todos os 28 comentários</p>
          <div class="comment-list"></div>
          <form class="comment-form"><input type="text" placeholder="Adicione um comentário..." aria-label="Adicione um comentário"><button type="submit">Publicar</button></form>
        </div>
      </article>

      <article class="post">
        <div class="post-head">
          <div class="user"><div class="avatar">🌿</div><div><div class="username">pedro.viajante</div><div class="subtext">Parque • há 2 horas</div></div></div>
          <button class="icon-btn" aria-label="Mais opções">···</button>
        </div>
        <div class="post-image second" role="img" aria-label="Paisagem de natureza">🌳</div>
        <div class="post-body">
          <div class="post-actions">
            <div class="action-left">
              <button class="icon-btn like-btn" aria-label="Curtir"><i class="bx bx-heart"></i></button>
              <button class="icon-btn" aria-label="Comentar"><i class="bx bx-message-rounded"></i></button>
              <button class="icon-btn" aria-label="Compartilhar"><i class="bx bx-send"></i></button>
            </div>
            <button class="icon-btn save-btn" aria-label="Salvar"><i class="bx bx-bookmark"></i></button>
          </div>
          <p class="likes"><strong class="like-count">856</strong> curtidas</p>
          <p class="caption"><strong>pedro.viajante</strong> Aproveitando a tranquilidade da natureza. 🌱</p>
          <p class="comments">Ver todos os 12 comentários</p>
          <div class="comment-list"></div>
          <form class="comment-form"><input type="text" placeholder="Adicione um comentário..." aria-label="Adicione um comentário"><button type="submit">Publicar</button></form>
        </div>
      </article>

      <article class="post">
        <div class="post-head">
          <div class="user"><div class="avatar">🎨</div><div><div class="username">ana.criativa</div><div class="subtext">Há 5 horas</div></div></div>
          <button class="icon-btn" aria-label="Mais opções">···</button>
        </div>
        <div class="post-image third" role="img" aria-label="Arte em tons coloridos">🎨</div>
        <div class="post-body">
          <div class="post-actions">
            <div class="action-left">
              <button class="icon-btn like-btn" aria-label="Curtir"><i class="bx bx-heart"></i></button>
              <button class="icon-btn" aria-label="Comentar"><i class="bx bx-message-rounded"></i></button>
              <button class="icon-btn" aria-label="Compartilhar"><i class="bx bx-send"></i></button>
            </div>
            <button class="icon-btn save-btn" aria-label="Salvar"><i class="bx bx-bookmark"></i></button>
          </div>
          <p class="likes"><strong class="like-count">2.041</strong> curtidas</p>
          <p class="caption"><strong>ana.criativa</strong> Um pouco de cor para alegrar o dia! 💜</p>
          <p class="comments">Ver todos os 43 comentários</p>
          <div class="comment-list"></div>
          <form class="comment-form"><input type="text" placeholder="Adicione um comentário..." aria-label="Adicione um comentário"><button type="submit">Publicar</button></form>
        </div>
      </article>
    </section>

    <aside class="sidebar">
      <div class="profile-row">
        <div class="user"><div class="avatar">😊</div><div><div class="username">seu_usuario</div><div class="muted">Seu nome</div></div></div>
        <button class="follow">Mudar</button>
      </div>
      <div class="suggestion-title">Sugestões para você</div>
      <div class="suggestion"><div class="user"><div class="avatar">🌻</div><div><div class="username">beatriz.lima</div><div class="muted">Seguido(a) por amigos</div></div></div><button class="follow">Seguir</button></div>
      <div class="suggestion"><div class="user"><div class="avatar">📷</div><div><div class="username">rafael.fotos</div><div class="muted">Sugestão para você</div></div></div><button class="follow">Seguir</button></div>
      <div class="suggestion"><div class="user"><div class="avatar">🎧</div><div><div class="username">lucas.music</div><div class="muted">Novo no Instagram</div></div></div><button class="follow">Seguir</button></div>
      <p class="muted">Sobre • Ajuda • Imprensa • API • Carreiras</p>
      <p class="muted">© 2026 INSTAGRAM CLONE</p>
    </aside>
  </main>

  <nav class="mobile-nav" aria-label="Navegação mobile">
    <button class="icon-btn" aria-label="Início"><i class="bx bx-home"></i></button>
    <button class="icon-btn" aria-label="Pesquisar"><i class="bx bx-search"></i></button>
    <button class="icon-btn" aria-label="Criar"><i class="bx bx-plus-square"></i></button>
    <button class="icon-btn" aria-label="Reels"><i class="bx bx-video"></i></button>
    <button class="icon-btn" aria-label="Perfil"><i class="bx bx-user-circle"></i></button>
  </nav>

  <div class="story-viewer" id="storyViewer" role="dialog" aria-modal="true" aria-label="Visualização de story">
    <div class="story-card">
      <button class="story-close" id="closeStory" aria-label="Fechar story">×</button>
      <div id="storyName" class="username"></div>
      <div style="font-size:64px;text-align:center">✨</div>
      <p style="text-align:center">Compartilhando momentos especiais!</p>
    </div>
  </div>

  <script>
    // Curtir e descurtir publicações
    document.querySelectorAll(".like-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const post = button.closest(".post");
        const count = post.querySelector(".like-count");
        const liked = button.classList.toggle("liked");
        button.innerHTML = liked
          ? '<i class="bx bxs-heart"></i>'
          : '<i class="bx bx-heart"></i>';
        count.textContent = Number(count.textContent.replace(".", "")) + (liked ? 1 : -1);
      });
    });

    // Salvar e remover dos salvos
    document.querySelectorAll(".save-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const saved = button.classList.toggle("saved");
        button.innerHTML = saved
          ? '<i class="bx bxs-bookmark"></i>'
          : '<i class="bx bx-bookmark"></i>';
        button.style.color = saved ? "#0095f6" : "#262626";
      });
    });

    // Adicionar comentários na publicação
    document.querySelectorAll(".comment-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("input");
        const message = input.value.trim();
        if (!message) return;

        const comment = document.createElement("p");
        comment.className = "caption";
        const username = document.createElement("strong");
        username.textContent = "seu_usuario";
        comment.append(username, document.createTextNode(" " + message));
        form.previousElementSibling.appendChild(comment);
        input.value = "";
      });
    });

    // Seguir e deixar de seguir sugestões
    document.querySelectorAll(".suggestion .follow").forEach((button) => {
      button.addEventListener("click", () => {
        const following = button.textContent === "Seguir";
        button.textContent = following ? "Seguindo" : "Seguir";
        button.style.color = following ? "#8e8e8e" : "#0095f6";
      });
    });

    // Abrir e fechar stories
    const viewer = document.getElementById("storyViewer");
    const storyName = document.getElementById("storyName");

    document.querySelectorAll(".story").forEach((story) => {
      story.addEventListener("click", () => {
        storyName.textContent = story.dataset.story;
        viewer.classList.add("active");
      });
    });

    document.getElementById("closeStory").addEventListener("click", () => {
      viewer.classList.remove("active");
    });

    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) viewer.classList.remove("active");
    });

    // Fechar story com a tecla Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") viewer.classList.remove("active");
    });
  </script>
</body>
</html>