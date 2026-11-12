document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "pulso_social_posts_v1";
  const THEME_KEY = "pulso_social_theme_v1";
  const MAX_CHARS = 280;

  // Dados iniciais de exemplo
  const DEFAULT_POSTS = [
    {
      id: "post-1",
      author: "Camila Rocha",
      handle: "@camilarocha.dev",
      initials: "CR",
      avatarBg: "linear-gradient(135deg, #ec4899, #f43f5e)",
      verified: true,
      isMine: false,
      content: "Nada como começar o dia refatorando aquele código legado e vendo tudo passar nos testes de primeira! 🚀☕\n\nQual linguagem vocês estão mais usando esta semana?",
      image: "",
      likes: 24,
      liked: false,
      createdAt: Date.now() - 1000 * 60 * 35,
      comments: [
        { id: "c-1", author: "Lucas Mendes", text: "Por aqui muito JavaScript puro e TypeScript!" },
        { id: "c-2", author: "Mariana Silva", text: "Sensação maravilhosa quando o terminal fica todo verde!" }
      ]
    },
    {
      id: "post-2",
      author: "Rafael Costa",
      handle: "@rafadesign",
      initials: "RC",
      avatarBg: "linear-gradient(135deg, #0ea5e9, #2563eb)",
      verified: true,
      isMine: false,
      content: "Dica rápida de UI Design: aumentar o espaçamento interno (padding) e reduzir o excesso de bordas deixa qualquer interface muito mais limpa e respirável. ✨",
      image: "",
      likes: 41,
      liked: true,
      createdAt: Date.now() - 1000 * 60 * 140,
      comments: []
    },
    {
      id: "post-3",
      author: "Beatriz Almeida",
      handle: "@bia_tech",
      initials: "BA",
      avatarBg: "linear-gradient(135deg, #10b981, #059669)",
      verified: false,
      isMine: false,
      content: "Finalizando meu setup minimalista para estudar desenvolvimento web. Foco total nos projetos práticos!",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      likes: 63,
      liked: false,
      createdAt: Date.now() - 1000 * 60 * 320,
      comments: [
        { id: "c-3", author: "Pedro Henrique", text: "Ficou incrível demais esse ambiente!" }
      ]
    }
  ];

  // Estado da Aplicação
  let posts = loadPosts();
  let currentFilter = "all";
  let searchQuery = "";
  let selectedImageData = "";
  let openCommentsSet = new Set();

  // Elementos do DOM
  const postInput = document.getElementById("post-input");
  const charCounter = document.getElementById("char-counter");
  const publishBtn = document.getElementById("publish-btn");
  const imageFileInput = document.getElementById("image-file-input");
  const toggleUrlBtn = document.getElementById("toggle-url-btn");
  const urlInputWrapper = document.getElementById("url-input-wrapper");
  const imageUrlInput = document.getElementById("image-url-input");
  const imagePreviewWrapper = document.getElementById("image-preview-wrapper");
  const imagePreview = document.getElementById("image-preview");
  const removeImageBtn = document.getElementById("remove-image-btn");
  const feedList = document.getElementById("feed-list");
  const emptyState = document.getElementById("empty-state");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const searchInput = document.getElementById("search-input");
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  const resetFeedBtn = document.getElementById("reset-feed-btn");
  const toastEl = document.getElementById("toast");

  // Inicialização
  initTheme();
  renderFeed();

  // --- Funções de Armazenamento ---
  function loadPosts() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : structuredClone(DEFAULT_POSTS);
    } catch {
      return structuredClone(DEFAULT_POSTS);
    }
  }

  function savePosts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  // --- Tema Claro / Escuro ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "dark") {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // --- Criador de Postagem ---
  function updateComposerState() {
    const text = postInput.value;
    const remaining = MAX_CHARS - text.length;
    charCounter.textContent = remaining;

    charCounter.classList.remove("warning", "danger");
    if (remaining <= 20 && remaining > 0) {
      charCounter.classList.add("warning");
    } else if (remaining <= 0) {
      charCounter.classList.add("danger");
    }

    const hasContent = text.trim().length > 0 || selectedImageData.trim().length > 0;
    publishBtn.disabled = !hasContent || remaining < 0;
  }

  postInput.addEventListener("input", () => {
    postInput.style.height = "auto";
    postInput.style.height = `${postInput.scrollHeight}px`;
    updateComposerState();
  });

  // Upload de arquivo local
  imageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      selectedImageData = event.target.result;
      showImagePreview(selectedImageData);
      urlInputWrapper.classList.add("hidden");
      imageUrlInput.value = "";
      updateComposerState();
    };
    reader.readAsDataURL(file);
  });

  // Alternar campo de link de imagem
  toggleUrlBtn.addEventListener("click", () => {
    urlInputWrapper.classList.toggle("hidden");
    if (!urlInputWrapper.classList.contains("hidden")) {
      imageUrlInput.focus();
    }
  });

  imageUrlInput.addEventListener("input", () => {
    const url = imageUrlInput.value.trim();
    selectedImageData = url;
    if (url) {
      showImagePreview(url);
    } else {
      hideImagePreview();
    }
    updateComposerState();
  });

  removeImageBtn.addEventListener("click", () => {
    clearImageSelection();
    updateComposerState();
  });

  function showImagePreview(src) {
    imagePreview.src = src;
    imagePreviewWrapper.classList.remove("hidden");
  }

  function hideImagePreview() {
    imagePreview.src = "";
    imagePreviewWrapper.classList.add("hidden");
  }

  function clearImageSelection() {
    selectedImageData = "";
    imageFileInput.value = "";
    imageUrlInput.value = "";
    urlInputWrapper.classList.add("hidden");
    hideImagePreview();
  }

  // Publicar Post
  publishBtn.addEventListener("click", () => {
    const content = postInput.value.trim();
    if (!content && !selectedImageData) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: "Você",
      handle: "@voce",
      initials: "VC",
      avatarBg: "linear-gradient(135deg, #2563eb, #7c3aed)",
      verified: true,
      isMine: true,
      content,
      image: selectedImageData,
      likes: 0,
      liked: false,
      createdAt: Date.now(),
      comments: []
    };

    posts.unshift(newPost);
    savePosts();

    postInput.value = "";
    postInput.style.height = "auto";
    clearImageSelection();
    updateComposerState();

    if (currentFilter === "liked") {
      setActiveTab("all");
    } else {
      renderFeed();
    }

    showToast("Publicação enviada com sucesso!");
  });

  // --- Filtros e Busca ---
  function setActiveTab(filter) {
    currentFilter = filter;
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderFeed();
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.filter));
  });

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderFeed();
  });

  resetFeedBtn.addEventListener("click", () => {
    posts = structuredClone(DEFAULT_POSTS);
    savePosts();
    renderFeed();
    showToast("Feed inicial restaurado!");
  });

  // --- Renderização do Feed ---
  function renderFeed() {
    const filtered = posts.filter((post) => {
      if (currentFilter === "liked" && !post.liked) return false;
      if (currentFilter === "mine" && !post.isMine) return false;

      if (searchQuery) {
        const matchAuthor = post.author.toLowerCase().includes(searchQuery);
        const matchHandle = post.handle.toLowerCase().includes(searchQuery);
        const matchContent = post.content.toLowerCase().includes(searchQuery);
        return matchAuthor || matchHandle || matchContent;
      }
      return true;
    });

    feedList.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    filtered.forEach((post) => {
      const article = document.createElement("article");
      article.className = "post-card";
      article.dataset.id = post.id;

      const isCommentsOpen = openCommentsSet.has(post.id);

      article.innerHTML = `
        <div class="post-header">
          <div class="post-author-group">
            <div class="avatar" style="background: ${post.avatarBg}">${escapeHTML(post.initials)}</div>
            <div class="post-author-meta">
              <div class="post-author-row">
                <span class="post-author-name">${escapeHTML(post.author)}</span>
                ${
                  post.verified
                    ? `<span class="verified-badge" title="Perfil verificado">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </span>`
                    : ""
                }
                <span class="post-author-handle">${escapeHTML(post.handle)}</span>
              </div>
              <span class="post-time">${formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>

          ${
            post.isMine
              ? `<button class="delete-post-btn" data-action="delete" title="Excluir post">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                  </svg>
                </button>`
              : ""
          }
        </div>

        ${post.content ? `<div class="post-content">${escapeHTML(post.content)}</div>` : ""}

        ${
          post.image
            ? `<div class="post-image">
                <img src="${escapeHTML(post.image)}" alt="Imagem da publicação" loading="lazy" onerror="this.parentElement.style.display='none'" />
              </div>`
            : ""
        }

        <div class="post-actions">
          <button class="post-action-btn ${post.liked ? "liked" : ""}" data-action="like">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${post.likes}</span>
          </button>

          <button class="post-action-btn" data-action="toggle-comments">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>${post.comments.length}</span>
          </button>

          <button class="post-action-btn" data-action="share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Compartilhar</span>
          </button>
        </div>

        <div class="comments-section ${isCommentsOpen ? "" : "hidden"}">
          <form class="comment-form" data-action="add-comment">
            <input type="text" placeholder="Escreva um comentário..." maxlength="180" required />
            <button type="submit">Enviar</button>
          </form>

          <div class="comments-list">
            ${post.comments
              .map(
                (c) => `
                <div class="comment-item">
                  <div>
                    <span class="comment-author">${escapeHTML(c.author)}:</span>
                    <span class="comment-text">${escapeHTML(c.text)}</span>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;

      feedList.appendChild(article);
    });
  }

  // --- Delegação de Eventos no Feed ---
  feedList.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;

    const card = actionBtn.closest(".post-card");
    const postId = card.dataset.id;
    const action = actionBtn.dataset.action;

    if (action === "like") {
      toggleLike(postId);
    } else if (action === "toggle-comments") {
      toggleComments(postId);
    } else if (action === "delete") {
      deletePost(postId);
    } else if (action === "share") {
      sharePost(postId);
    }
  });

  feedList.addEventListener("submit", (e) => {
    if (!e.target.matches(".comment-form")) return;
    e.preventDefault();

    const card = e.target.closest(".post-card");
    const postId = card.dataset.id;
    const input = e.target.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    addComment(postId, text);
  });

  // --- Ações dos Posts ---
  function toggleLike(postId) {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    savePosts();
    renderFeed();
  }

  function toggleComments(postId) {
    if (openCommentsSet.has(postId)) {
      openCommentsSet.delete(postId);
    } else {
      openCommentsSet.add(postId);
    }
    renderFeed();
  }

  function