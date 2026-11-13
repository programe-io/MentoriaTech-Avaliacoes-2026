
---

### 3. Arquivo `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Base de dados completa com os 10 capítulos do seu texto
  const postsData = {
    1: {
      chapter: 'CAPÍTULO 01 • INTRODUÇÃO',
      title: 'POR TRÁS DA CORTINA DIGITAL',
      bgClass: 'bg-yellow',
      likes: 142,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> Todos os dias acessamos sites, assistimos vídeos e usamos redes sociais sem perceber a engenharia por trás disso!</p>
                <p>Existe uma infraestrutura tecnológica gigante conectando <strong>bilhões de dispositivos</strong> ao redor do planeta. Dominar como a Internet e a Web funcionam é a base para desenvolvimento web, redes e arquitetura de sistemas. 🕷️💻</p>`,
      comments: ['<strong>@peter.dev:</strong> Essa é a base de todo desenvolvedor!']
    },
    2: {
      chapter: 'CAPÍTULO 02 • CONCEITO',
      title: 'O QUE É A INTERNET?',
      bgClass: 'bg-cyan',
      likes: 218,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> A <strong>Internet</strong> é um sistema global de redes de computadores interligadas.</p>
                <p>Essas redes conversam usando regras padronizadas chamadas <strong>protocolos de comunicação</strong>. É sobre essa infraestrutura que rodam e-mails, mensagens, streaming de vídeo/áudio e computação em nuvem! 🌐</p>`,
      comments: []
    },
    3: {
      chapter: 'CAPÍTULO 03 • HISTÓRIA',
      title: 'HISTÓRIA: DA ARPANET AO MUNDO',
      bgClass: 'bg-red text-light',
      likes: 305,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> Tudo começou nos anos 1960, durante a Guerra Fria, com a <strong>ARPANET</strong> (Departamento de Defesa dos EUA) para comunicação descentralizada entre militares e universidades.</p>
                <p>📅 <strong>1960:</strong> Criação da ARPANET<br>
                   📅 <strong>1970:</strong> Protocolos TCP/IP<br>
                   📅 <strong>1980:</strong> Expansão universitária<br>
                   📅 <strong>1990:</strong> Popularização da internet comercial!</p>`,
      comments: ['<strong>@miles.html:</strong> De projeto militar para o nosso smartphone!']
    },
    4: {
      chapter: 'CAPÍTULO 04 • MUNDO FÍSICO',
      title: 'INFRAESTRUTURA DA INTERNET',
      bgClass: 'bg-white',
      likes: 189,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> Muita gente acha que a internet é algo "virtual", mas ela depende de equipamentos físicos reais:</p>
                <p>🏢 Data centers e servidores<br>
                   🔌 Cabos de fibra óptica e roteadores<br>
                   🛰️ Satélites de comunicação</p>
                <p>Sua requisição viaja por essa rede e volta em <strong>poucos milissegundos</strong>!</p>`,
      comments: []
    },
    5: {
      chapter: 'CAPÍTULO 05 • OCEANO',
      title: 'CABOS SUBMARINOS DE FIBRA',
      bgClass: 'bg-blue text-light',
      likes: 412,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> Grande parte do tráfego global da internet atravessa oceanos por meio de <strong>cabos submarinos de fibra óptica</strong>!</p>
                <p>Mesmo existindo satélites, os cabos submarinos carregam a maior parte dos dados entre continentes porque oferecem <strong>muito mais velocidade e menor latência</strong>. 🌊⚡</p>`,
      comments: ['<strong>@gwen.net:</strong> Tubarões já tentaram morder esses cabos no fundo do mar!']
    },
    6: {
      chapter: 'CAPÍTULO 06 • WWW',
      title: 'O QUE É A WORLD WIDE WEB?',
      bgClass: 'bg-magenta text-light',
      likes: 274,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> A <strong>World Wide Web (Web)</strong> é um sistema que funciona <em>sobre</em> a internet.</p>
                <p>Ela reúne documentos interligados por <strong>hiperlinks</strong> contendo textos, imagens, vídeos, sons e animações armazenados em servidores. É a experiência de navegação que usamos todos os dias! 🕸️</p>`,
      comments: []
    },
    7: {
      chapter: 'CAPÍTULO 07 • ARQUITETURA',
      title: 'CLIENTE X SERVIDOR (HTTP)',
      bgClass: 'bg-yellow',
      likes: 330,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> A Web funciona no modelo <strong>Cliente-Servidor</strong>:</p>
                <p>1️⃣ Seu navegador (Cliente: Chrome, Firefox, Edge, Safari) envia uma requisição.<br>
                   2️⃣ O Servidor processa o pedido.<br>
                   3️⃣ O Servidor devolve os dados via protocolo <strong>HTTP</strong>.<br>
                   4️⃣ O navegador exibe a página na tela!</p>`,
      comments: []
    },
    8: {
      chapter: 'CAPÍTULO 08 • PIONEIRO',
      title: 'O PAPEL DE TIM BERNERS-LEE',
      bgClass: 'bg-cyan',
      likes: 295,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> No fim dos anos 1980, trabalhando no <strong>CERN</strong> (Europa), o cientista <strong>Tim Berners-Lee</strong> criou a World Wide Web para facilitar a troca de pesquisas.</p>
                <p>Ele inventou os 3 pilares da Web:<br>
                   🧱 <strong>HTML:</strong> linguagem de marcação<br>
                   🚀 <strong>HTTP:</strong> protocolo de comunicação<br>
                   📍 <strong>URL:</strong> sistema de endereços</p>`,
      comments: []
    },
    9: {
      chapter: 'CAPÍTULO 09 & 10 • CONCLUSÃO',
      title: 'INTERNET X WEB: O DUELO FINAL',
      bgClass: 'bg-red text-light',
      likes: 510,
      liked: false,
      saved: false,
      caption: `<p><strong>@teia.digital</strong> Não confunda mais os dois conceitos:</p>
                <p>🔌 <strong>INTERNET = Infraestrutura:</strong> A rede física global que suporta e-mail, FTP, jogos online, streaming e a Web.<br>
                   🕸️ <strong>WEB = Serviço de páginas:</strong> Documentos e sites interligados acessados via navegador.</p>
                <p>Dominar essa base é o primeiro passo para criar os sistemas digitais do futuro!</p>`,
      comments: ['<strong>@mj.clarim:</strong> Resumo perfeito para salvar e revisar antes da prova!']
    }
  };

  let currentPostId = null;

  // 1. Botão Seguir no Perfil
  const btnFollow = document.getElementById('btnFollow');
  const followerCount = document.getElementById('followerCount');
  let isFollowing = false;

  btnFollow.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if (isFollowing) {
      btnFollow.textContent = 'SEGUINDO ✔';
      btnFollow.classList.add('following');
      followerCount.textContent = '19.621';
    } else {
      btnFollow.textContent = 'SEGUIR';
      btnFollow.classList.remove('following');
      followerCount.textContent = '19.620';
    }
  });

  // 2. Destaques dos Stories (Highlights)
  const storyBanner = document.getElementById('storyBanner');
  const storyBannerText = document.getElementById('storyBannerText');
  const closeBanner = document.getElementById('closeBanner');

  document.querySelectorAll('.highlight-item').forEach((item) => {
    item.addEventListener('click', () => {
      storyBannerText.textContent = item.getAttribute('data-highlight');
      storyBanner.style.display = 'flex';
    });
  });

  document.getElementById('btnBioTip').addEventListener('click', () => {
    storyBannerText.textContent = '🕷️ SENTIDO ARANHA: Clique em qualquer quadrado da grade abaixo para abrir o post completo, curtir e comentar!';
    storyBanner.style.display = 'flex';
  });

  closeBanner.addEventListener('click', () => {
    storyBanner.style.display = 'none';
  });

  // 3. Abrir Modal do Post ao clicar na grade 3x3
  const modal = document.getElementById('postModal');
  const modalVisual = document.getElementById('modalVisual');
  const modalChapter = document.getElementById('modalChapter');
  const modalTitle = document.getElementById('modalTitle');
  const modalCaption = document.getElementById('modalCaption');
  const modalComments = document.getElementById('modalComments');
  const modalLikeBtn = document.getElementById('modalLikeBtn');
  const modalLikeCount = document.getElementById('modalLikeCount');
  const modalSaveBtn = document.getElementById('modalSaveBtn');

  function renderModal(id) {
    currentPostId = id;
    const post = postsData[id];

    modalVisual.className = `modal-visual ${post.bgClass}`;
    modalChapter.textContent = post.chapter;
    modalTitle.textContent = post.title;
    modalCaption.innerHTML = post.caption;
    modalLikeCount.textContent = post.likes;

    modalLikeBtn.classList.toggle('active-state', post.liked);
    modalSaveBtn.classList.toggle('active-state', post.saved);
    modalSaveBtn.textContent = post.saved ? '🔖 SALVO!' : '🔖 SALVAR';

    modalComments.innerHTML = post.comments.map((c) => `<div>${c}</div>`).join('');
    modal.classList.add('open');
  }

  document.querySelectorAll('.grid-post').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      renderModal(id);
    });
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // 4. Curtir e Salvar dentro do Modal
  modalLikeBtn.addEventListener('click', () => {
    if (!currentPostId) return;
    const post = postsData[currentPostId];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderModal(currentPostId);
  });

  modalSaveBtn.addEventListener('click', () => {
    if (!currentPostId) return;
    const post = postsData[currentPostId];
    post.saved = !post.saved;
    updateSavedCounter();
    renderModal(currentPostId);
  });

  function updateSavedCounter() {