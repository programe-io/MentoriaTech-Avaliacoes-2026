/* =========================================================
   CLONE INSTAGRAM — Interatividade
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. TOAST (feedback visual)
  ------------------------------------------------------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    // força reflow para a transição funcionar
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
  }

  /* -------------------------------------------------------
     2. MENU HAMBURGUER (mobile)
  ------------------------------------------------------- */
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  btnMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  /* -------------------------------------------------------
     3. NAVEGAÇÃO (menu inferior + dropdown mobile + desktop)
  ------------------------------------------------------- */
  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;

      switch (target) {
        case 'home':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast('🏠 Início');
          break;
        case 'search':
          const inputBusca = document.getElementById('input-busca');
          if (inputBusca) {
            inputBusca.focus();
            showToast('🔍 Pesquisar');
          } else {
            showToast('🔍 Pesquisar');
          }
          break;
        case 'plus':
          abrirModalNovaPostagem();
          break;
        case 'heart':
          showToast('❤️ Curtidas');
          break;
        case 'user':
          showToast('👤 Perfil');
          break;
      }

      // Fecha o menu mobile após clicar
      mobileMenu.classList.add('hidden');
    });
  });

  /* -------------------------------------------------------
     4. CURTIR
  ------------------------------------------------------- */
  function configurarCurtir(post) {
    const btnCurtir = post.querySelector('.btn-curtir');
    const curtidasEl = post.querySelector('.curtidas');

    // Estado inicial
    let curtido = false;
    let curtidas = 1000; // valor base ("mil e poucas curtidas")

    btnCurtir.addEventListener('click', () => {
      curtido = !curtido;
      curtidas += curtido ? 1 : -1;

      btnCurtir.classList.toggle('curtido', curtido);
      curtidasEl.textContent = curtido
        ? `${curtidas} curtidas`
        : 'mil e poucas curtidas';
    });
  }

  /* -------------------------------------------------------
     5. SALVAR
  ------------------------------------------------------- */
  function configurarSalvar(post) {
    const btnSalvar = post.querySelector('.btn-salvar');
    btnSalvar.addEventListener('click', () => {
      btnSalvar.classList.toggle('salvo');
      showToast(btnSalvar.classList.contains('salvo')
        ? '📌 Post salvo'
        : 'Post removido dos salvos');
    });
  }

  /* -------------------------------------------------------
     6. COMPARTILHAR
  ------------------------------------------------------- */
  function configurarCompartilhar(post) {
    const btn = post.querySelector('.btn-compartilhar');
    btn.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title: 'Instagram Clone', url });
        } else {
          await navigator.clipboard.writeText(url);
          showToast('🔗 Link copiado!');
        }
      } catch (err) {
        showToast('Não foi possível compartilhar');
      }
    });
  }

  /* -------------------------------------------------------
     7. COMENTÁRIOS
  ------------------------------------------------------- */
  function configurarComentarios(post) {
    const btnComentar   = post.querySelector('.btn-comentar');
    const btnVerTodos   = post.querySelector('.btn-comentarios');
    const formComentario = post.querySelector('.form-comentario');
    const lista         = post.querySelector('.comentarios-lista');
    const input         = formComentario.querySelector('input');

    // Abre/fecha o campo de comentário
    function toggleForm() {
      formComentario.classList.toggle('hidden');
      if (!formComentario.classList.contains('hidden')) {
        input.focus();
      }
    }

    btnComentar.addEventListener('click', toggleForm);
    btnVerTodos.addEventListener('click', toggleForm);

    // Publicar comentário
    formComentario.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;

      const p = document.createElement('p');
      p.className = 'text-sm';
      p.innerHTML = `<span class="font-semibold">frojo_dev</span> <span class="opacity-80">${escapeHtml(texto)}</span>`;
      lista.appendChild(p);

      lista.classList.remove('hidden');
      input.value = '';
      showToast('💬 Comentário publicado');
    });
  }

  /* -------------------------------------------------------
     8. OPÇÕES DA POSTAGEM (3 pontinhos)
  ------------------------------------------------------- */
  function configurarOpcoes(post) {
    const btn = post.querySelector('.btn-opcoes');

    // Menu contextual simples
    let menuAberto = null;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (menuAberto) {
        menuAberto.remove();
        menuAberto = null;
        return;
      }

      const menu = document.createElement('div');
      menu.className = 'absolute right-3 top-12 z-40 bg-white border border-gray-200 rounded-lg shadow-lg text-sm w-40';
      menu.innerHTML = `
        <button class="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500">Denunciar</button>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-50">Copiar link</button>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-50">Cancelar</button>
      `;

      // posiciona relativo ao header do post
      const header = post.querySelector('header');
      header.style.position = 'relative';
      header.appendChild(menu);

      menu.querySelectorAll('button').forEach((b) => {
        b.addEventListener('click', () => {
          showToast(b.textContent.trim());
          menu.remove();
          menuAberto = null;
        });
      });

      menuAberto = menu;
    });

    // fecha ao clicar fora
    document.addEventListener('click', () => {
      if (menuAberto) {
        menuAberto.remove();
        menuAberto = null;
      }
    });
  }

  /* -------------------------------------------------------
     9. STORIES (abrir visualização)
  ------------------------------------------------------- */
  document.querySelectorAll('.story-item').forEach((story) => {
    story.addEventListener('click', () => {
      const user = story.dataset.user;
      showToast(`📸 Visualizando story de ${user}`);
    });
  });

  const storyAdd = document.getElementById('story-add');
  if (storyAdd) {
    storyAdd.addEventListener('click', () => {
      showToast('➕ Adicionar novo story');
    });
  }

  /* -------------------------------------------------------
     10. SEGUIR / TROCAR (aside)
  ------------------------------------------------------- */
  document.querySelectorAll('.btn-seguir').forEach((btn) => {
    btn.addEventListener('click', () => {
      const seguindo = btn.textContent.trim().toLowerCase() === 'seguindo';
      btn.textContent = seguindo ? 'seguir' : 'seguindo';
      btn.classList.toggle('text-gray-500', !seguindo);
      btn.classList.toggle('text-blue-500', seguindo);
      showToast(seguindo ? 'Deixou de seguir' : '✅ Seguindo');
    });
  });

  const btnTrocar = document.getElementById('btn-trocar');
  if (btnTrocar) {
    btnTrocar.addEventListener('click', () => {
      showToast('🔄 Trocar de conta');
    });
  }

  /* -------------------------------------------------------
     11. MODAL NOVA POSTAGEM
  ------------------------------------------------------- */
  const modal          = document.getElementById('modal-nova-postagem');
  const btnFecharModal = document.getElementById('fechar-modal');
  const btnPublicar    = document.getElementById('publicar-postagem');
  const inputImagem    = document.getElementById('modal-imagem-url');
  const inputDescricao = document.getElementById('modal-descricao');
  const feedContainer  = document.getElementById('feed-container');

  function abrirModalNovaPostagem() {
    modal.classList.remove('hidden');
    inputImagem.value = '';
    inputDescricao.value = '';
  }

  function fecharModal() {
    modal.classList.add('hidden');
  }

  // Botões que abrem o modal
  document.getElementById('btn-nova-postagem-nav')
    ?.addEventListener('click', abrirModalNovaPostagem);
  document.getElementById('btn-nova-postagem-mobile')
    ?.addEventListener('click', abrirModalNovaPostagem);
  document.getElementById('btn-nova-postagem-desktop')
    ?.addEventListener('click', abrirModalNovaPostagem);

  btnFecharModal.addEventListener('click', fecharModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fecha modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      fecharModal();
    }
  });

  // Publicar nova postagem
  btnPublicar.addEventListener('click', () => {
    const imagem = inputImagem.value.trim() || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800';
    const descricao = inputDescricao.value.trim() || 'Nova postagem ✨';

    const novoPost = criarPost(imagem, descricao);
    feedContainer.prepend(novoPost);
    configurarPost(novoPost);

    fecharModal();
    showToast('✅ Postagem publicada');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------
     12. CRIAÇÃO DINÂMICA DE POST
  ------------------------------------------------------- */
  function criarPost(imagemUrl, descricao) {
    const article = document.createElement('article');
    article.className = 'bg-white border border-gray-200 rounded-lg mb-4 post';
    article.innerHTML = `
      <header class="flex items-center justify-between p-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
            <div class="w-full h-full rounded-full bg-white p-0.5">
              <img src="https://i.pravatar.cc/150?img=12" alt="Foto de perfil" class="w-full h-full object-cover rounded-full">
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold">frojo_dev</p>
            <p class="text-xs text-gray-500">Parnaíba-PI</p>
          </div>
        </div>
        <button class="btn-opcoes">
          <i class="bx bx-dots-horizontal-rounded text-xl"></i>
        </button>
      </header>

      <div class="bg-gray-100 relative">
        <img src="${escapeHtml(imagemUrl)}" alt="imagem do meu projeto" class="w-full h-full object-cover">
      </div>

      <div class="p-3">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-4">
            <button class="btn-curtir"><i class="bx bx-heart text-2xl"></i></button>
            <button class="btn-comentar"><i class="bx bx-message-rounded text-2xl"></i></button>
            <button class="btn-compartilhar"><i class="bx bx-send text-2xl"></i></button>
          </div>
          <button class="btn-salvar"><i class="bx bx-bookmark text-2xl"></i></button>
        </div>

        <p class="curtidas font-semibold text-sm mb-2">mil e poucas