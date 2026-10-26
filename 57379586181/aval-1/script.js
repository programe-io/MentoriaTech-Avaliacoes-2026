/* =========================================================
   LÓGICA DA APLICAÇÃO — SPA simples feita com JS puro
   ========================================================= */
(function () {
  var DATA = window.BLOG_DATA;
  var posts = DATA.posts;
  var snippets = DATA.snippets;
  var glossario = DATA.glossario;
  var categorias = DATA.categorias;

  // Estado da aplicação
  var state = { view: "home", postId: null, search: "", cat: "Todos" };

  // ----- Persistência (localStorage) -----
  function getLikes() { try { return JSON.parse(localStorage.getItem("cd_likes") || "{}"); } catch (e) { return {}; } }
  function saveLikes(l) { localStorage.setItem("cd_likes", JSON.stringify(l)); }
  function getComments() { try { return JSON.parse(localStorage.getItem("cd_comments") || "{}"); } catch (e) { return {}; } }
  function saveComments(c) { localStorage.setItem("cd_comments", JSON.stringify(c)); }

  var app = document.getElementById("app");

  // ----- Helpers -----
  function catColor(cat) {
    var m = {
      "Front-end": "#0d9488", "Back-end": "#c4693d", "Carreira": "#7c3aed",
      "Ferramentas": "#2563eb", "Dados": "#db2777", "DevOps": "#0891b2",
      "Qualidade": "#65a30d", "Linguagens": "#ea580c"
    };
    return m[cat] || "#64748b";
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function setActiveNav(view) {
    document.querySelectorAll("#nav .nav-link").forEach(function (el) {
      var active = el.getAttribute("data-nav") === view;
      el.classList.toggle("active", active);
    });
  }

  /* =========================================================
     RENDER: HOME (lista de posts + busca + filtros)
     ========================================================= */
  function renderHome() {
    state.view = "home";
    setActiveNav("home");

    var q = state.search.toLowerCase().trim();
    var filtered = posts.filter(function (p) {
      var matchCat = state.cat === "Todos" || p.categoria === state.cat;
      var matchSearch = !q || (p.titulo + " " + p.resumo + " " + p.tags.join(" ")).toLowerCase().indexOf(q) !== -1;
      return matchCat && matchSearch;
    });

    var chips = categorias.map(function (c) {
      return '<span class="chip' + (state.cat === c ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</span>';
    }).join("");

    var cards;
    if (filtered.length === 0) {
      cards = '<div class="empty-state">'
        + '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
        + '<div class="title">Nenhum post encontrado</div>'
        + '<div class="sub">Tente outra busca ou categoria.</div></div>';
    } else {
      cards = filtered.map(function (p) {
        var likes = getLikes()[p.id] || 0;
        var cc = catColor(p.categoria);
        return '<article class="post-card fade-in" data-post="' + p.id + '">'
          + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">'
          + '<span class="cat-badge" style="color:' + cc + ';background:' + cc + '1f;">' + esc(p.categoria) + '</span>'
          + '<span class="meta">' + esc(p.data) + ' · ' + esc(p.leitura) + ' de leitura</span></div>'
          + '<h2 class="post-title">' + esc(p.titulo) + '</h2>'
          + '<p class="post-resume">' + esc(p.resumo) + '</p>'
          + '<div class="post-footer">'
          + '<div class="author-row"><div class="avatar">' + esc(p.autor.charAt(0)) + '</div><span style="font-size:13px;color:var(--muted);font-weight:500;">' + esc(p.autor) + '</span></div>'
          + '<div class="like-count"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
          + likes + ' curtidas</div></div></article>';
      }).join("");
    }

    app.innerHTML =
      '<div class="fade-in">'
      + '<div class="section-head">'
      + '<h1 class="section-title">Artigos recentes</h1>'
      + '<p class="section-sub">' + filtered.length + ' post' + (filtered.length === 1 ? '' : 's') + ' · tutoriais, arquitetura e carreira em tecnologia</p></div>'
      + '<div class="search-wrap">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
      + '<input id="search-input" class="search-input" type="text" placeholder="Buscar por título, tag ou conteúdo..." value="' + esc(state.search) + '"></div>'
      + '<div style="margin-bottom:24px;">' + chips + '</div>'
      + cards + '</div>';

    var inp = document.getElementById("search-input");
    inp.addEventListener("input", function (e) {
      state.search = e.target.value;
      renderHome();
      var i = document.getElementById("search-input");
      i.focus();
      var v = i.value; i.value = ""; i.value = v; // mantém cursor no fim
    });
  }

  /* =========================================================
     RENDER: POST (artigo completo + curtir + comentários)
     ========================================================= */
  function renderPost(id) {
    var p = posts.find(function (x) { return x.id === id; });
    if (!p) { renderHome(); return; }
    state.view = "post"; state.postId = id;
    setActiveNav("home");

    var likes = getLikes()[id] || 0;
    var liked = getLikes()["u_" + id] === true;
    var cc = catColor(p.categoria);
    var comments = getComments()[id] || [];

    var conteudoHtml = p.conteudo.map(function (sec) {
      return '<h3>' + esc(sec.t) + '</h3><p>'
        + sec.p.replace(/<code>(.*?)<\/code>/g, '<code>$1</code>')
               .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>') + '</p>';
    }).join("");

    var tagsHtml = p.tags.map(function (t) {
      return '<span class="tag-pill">#' + esc(t) + '</span>';
    }).join("");

    var commentsHtml = comments.length === 0
      ? '<div class="comments-empty">Nenhum comentário ainda. Seja o primeiro a comentar!</div>'
      : comments.map(function (c) {
          return '<div class="comment-item">'
            + '<div class="comment-head"><div class="avatar">' + esc(c.nome.charAt(0).toUpperCase()) + '</div>'
            + '<span class="name">' + esc(c.nome) + '</span><span class="date">· ' + esc(c.data) + '</span></div>'
            + '<p class="comment-text">' + esc(c.texto) + '</p></div>';
        }).join("");

    app.innerHTML =
      '<div class="fade-in">'
      + '<button class="back-btn" id="back-btn">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>'
      + 'Voltar para todos os posts</button>'
      + '<div class="article-hero" style="background:linear-gradient(135deg,' + cc + '14,' + cc + '08);border:1px solid ' + cc + '22;">'
      + '<span class="cat-badge" style="color:' + cc + ';background:' + cc + '1f;">' + esc(p.categoria) + '</span>'
      + '<h1>' + esc(p.titulo) + '</h1>'
      + '<div class="article-meta"><div class="avatar avatar-lg">' + esc(p.autor.charAt(0)) + '</div>'
      + '<strong>' + esc(p.autor) + '</strong><span>·</span><span>' + esc(p.data) + '</span><span>·</span><span>' + esc(p.leitura) + ' de leitura</span></div></div>'
      + '<div class="prose">' + conteudoHtml + '</div>'
      + '<div style="margin-bottom:32px;">' + tagsHtml + '</div>'
      + '<div style="display:flex;justify-content:center;margin-bottom:40px;">'
      + '<button id="like-btn" class="like-btn' + (liked ? ' liked' : '') + '">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (liked ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
      + '<span id="like-count">' + likes + '</span> ' + (liked ? 'Curtido!' : 'Curtir este artigo') + '</button></div>'
      + '<div class="comments-box">'
      + '<h3>Comentários <span style="color:var(--muted);font-weight:400;font-size:14px;">(' + comments.length + ')</span></h3>'
      + '<p class="hint">Salvos localmente no seu navegador.</p>'
      + '<form class="comment-form" id="comment-form">'
      + '<input id="c-nome" type="text" placeholder="Seu nome" required>'
      + '<textarea id="c-texto" placeholder="Escreva seu comentário..." required rows="3"></textarea>'
      + '<button type="submit" class="submit-btn">Publicar comentário</button>'
      + '</form><div id="comments-list">' + commentsHtml + '</div></div></div>';

    document.getElementById("back-btn").addEventListener("click", renderHome);

    document.getElementById("like-btn").addEventListener("click", function () {
      var l = getLikes();
      var already = l["u_" + id] === true;
      l[id] = (l[id] || 0) + (already ? -1 : 1);
      if (l[id] < 0) l[id] = 0;
      l["u_" + id] = !already;
      saveLikes(l);
      renderPost(id);
    });

    document.getElementById("comment-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("c-nome").value.trim();
      var texto = document.getElementById("c-texto").value.trim();
      if (!nome || !texto) return;
      var c = getComments();
      if (!c[id]) c[id] = [];
      var hoje = new Date();
      var meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
      var dataStr = hoje.getDate() + " " + meses[hoje.getMonth()] + " " + hoje.getFullYear();
      c[id].unshift({ nome: nome, texto: texto, data: dataStr });
      saveComments(c);
      renderPost(id);
    });
  }

  /* =========================================================
     RENDER: DICAS RÁPIDAS (snippets de código)
     ========================================================= */
  function renderDicas() {
    state.view = "dicas";
    setActiveNav("dicas");

    var html = snippets.map(function (s) {
      return '<div class="snippet-card fade-in">'
        + '<div class="snippet-head"><h3>' + esc(s.titulo) + '</h3>'
        + '<span class="lang-badge">' + esc(s.linguagem) + '</span></div>'
        + '<p class="snippet-desc">' + esc(s.desc) + '</p>'
        + '<pre class="code-block">' + s.code + '</pre></div>';
    }).join("");

    app.innerHTML =
      '<div class="fade-in">'
      + '<div class="section-head">'
      + '<h1 class="section-title">Dicas Rápidas</h1>'
      + '<p class="section-sub">' + snippets.length + ' trechos de código prontos para copiar e usar no seu projeto.</p></div>'
      + html + '</div>';
  }

  /* =========================================================
     RENDER: GLOSSÁRIO (acordeão interativo)
     ========================================================= */
  function renderGlossario() {
    state.view = "glossario";
    setActiveNav("glossario");

    var html = glossario.map(function (g, i) {
      return '<div class="glossary-item" data-gloss="' + i + '">'
        + '<div class="glossary-head">'
        + '<span class="glossary-term">' + esc(g.termo) + '</span>'
        + '<svg class="glossary-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div>'
        + '<div class="glossary-def"><p>' + esc(g.def) + '</p></div></div>';
    }).join("");

    app.innerHTML =
      '<div class="fade-in">'
      + '<div class="section-head">'
      + '<h1 class="section-title">Glossário de Programação</h1>'
      + '<p class="section-sub">' + glossario.length + ' termos essenciais explicados em linguagem simples. Clique em um termo para ver a definição.</p></div>'
      + html + '</div>';

    app.querySelectorAll(".glossary-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var def = item.querySelector(".glossary-def");
        var arrow = item.querySelector(".glossary-arrow");
        def.classList.toggle("open");
        arrow.style.transform = def.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
      });
    });
  }

  /* =========================================================
     RENDER: SOBRE
     ========================================================= */
  function renderSobre() {
    state.view = "sobre";
    setActiveNav("sobre");
    app.innerHTML =
      '<div class="info-card fade-in">'
      + '<h1>Sobre o Código Diário</h1>'
      + '<p>O Código Diário é um blog de programação feito para desenvolvedores que querem crescer — do primeiro código à arquitetura de sistemas em produção.</p>'
      + '<p>Este blog é um exemplo funcional construído inteiramente com <strong>HTML, CSS e JavaScript puro</strong>, sem frameworks. Ele demonstra:</p>'
      + '<ul>'
      + '<li>' + posts.length + ' artigos completos sobre programação</li>'
      + '<li>Busca em tempo real e filtro por categoria</li>'
      + '<li>' + snippets.length + ' dicas rápidas com trechos de código</li>'
      + '<li>Glossário com ' + glossario.length + ' termos técnicos</li>'
      + '<li>Curtidas e comentários persistentes (localStorage)</li></ul>'
      + '<p style="margin-bottom:0;">Explore o menu acima e bons estudos!</p></div>';
  }

  /* =========================================================
     EVENTOS (delegação + navegação)
     ========================================================= */
  app.addEventListener("click", function (e) {
    var card = e.target.closest("[data-post]");
    if (card && state.view === "home") {
      renderPost(parseInt(card.getAttribute("data-post"), 10));
      return;
    }
    var chip = e.target.closest("[data-cat]");
    if (chip) {
      state.cat = chip.getAttribute("data-cat");
      renderHome();
    }
  });

  document.getElementById("logo-btn").addEventListener("click", renderHome);

  document.querySelectorAll("#nav .nav-link").forEach(function (el) {
    el.addEventListener("click", function () {
      var v = el.getAttribute("data-nav");
      if (v === "home") renderHome();
      else if (v === "dicas") renderDicas();
      else if (v === "glossario") renderGlossario();
      else if (v === "sobre") renderSobre();
    });
  });

  // Inicializa
  renderHome();
})();

/* =========================================================
   DADOS DO BLOG — edite aqui para adicionar novos conteúdos
   ========================================================= */

window.BLOG_DATA = {

  categorias: ["Todos", "Front-end", "Back-end", "Carreira", "Ferramentas", "Dados", "DevOps", "Qualidade", "Linguagens"],

  posts: [
    {
      id: 1,
      titulo: "JavaScript moderno: os recursos que você precisa dominar em 2026",
      categoria: "Front-end",
      data: "18 out 2026",
      autor: "Renan Larp Sahur",
      leitura: "8 min",
      resumo: "De optional chaining a top-level await, veja quais features da linguagem deixaram de ser opcionais e já são esperadas em qualquer entrevista.",
      tags: ["JavaScript", "ES2024", "Fundamentos"],
      conteudo: [
        { t: "O JavaScript não para de evoluir", p: "A cada ano o TC39 aprova novas funcionalidades que mudam a forma como escrevemos código. Quem não acompanha acaba escrevendo versões mais longas e menos seguras do que a linguagem permite hoje." },
        { t: "Optional chaining e nullish coalescing", p: "O operador ?. evita o temido erro 'Cannot read property of undefined', enquanto ?? trata apenas null e undefined — diferente do ||, que também captura 0 e string vazia. Use <code>usuario?.endereco?.cidade ?? 'Não informada'</code> e durma tranquilo." },
        { t: "Top-level await", p: "Módulos ES agora podem usar await diretamente no escopo superior. Isso simplifica inicializações assíncronas e carregamento de configurações sem funções IIFE." },
        { t: "Array.at() e structuredClone", p: "<code>array.at(-1)</code> pega o último elemento de forma legível. E <code>structuredClone()</code> faz cópia profunda de objetos nativamente, sem gambiarra com JSON.parse(JSON.stringify())." },
        { t: "Conclusão", p: "Domine esses recursos e seu código ficará mais curto, legível e livre de bugs. O próximo passo é estudar pattern matching, que deve chegar em breve." }
      ]
    },
    {
      id: 2,
      titulo: "Como estruturar uma API REST escalável com Node.js",
      categoria: "Back-end",
      data: "12 out 2026",
      autor: "Marcelo Sem Aura da Silva",
      leitura: "12 min",
      resumo: "Camadas, middlewares, validação e tratamento de erros: a arquitetura que uso em produção e que já sobreviveu a picos de milhões de requisições.",
      tags: ["Node.js", "API", "Arquitetura"],
      conteudo: [
        { t: "Por que estrutura importa", p: "Uma API começa pequena, mas cresce rápido. Sem organização, cada rota nova vira um arquivo monstruoso de 500 linhas. A solução é separar responsabilidades em camadas." },
        { t: "As 4 camadas essenciais", p: "<b>Routes</b> definem os endpoints. <b>Controllers</b> recebem a requisição e devolvem a resposta. <b>Services</b> contêm a regra de negócio. <b>Repositories</b> falam com o banco. Nunca coloque SQL no controller." },
        { t: "Middlewares transversais", p: "Autenticação, logging, rate limiting e tratamento de erros devem ser middlewares reutilizáveis. Assim cada rota foca apenas no seu objetivo." },
        { t: "Validação em cada entrada", p: "Nunca confie no que vem do cliente. Use Zod ou Joi para validar body, query e params. Isso elimina uma classe inteira de bugs de segurança." },
        { t: "Tratamento de erros centralizado", p: "Crie um error handler único no final do pipeline. Todos os erros passam por lá, garantindo respostas consistentes e logs completos." }
      ]
    },
    {
      id: 3,
      titulo: "Do zero ao primeiro emprego: roadmap de estudos para devs iniciantes",
      categoria: "Carreira",
      data: "05 out 2026",
      autor: "Benjamin Farmador de Aura",
      leitura: "10 min",
      resumo: "Um plano de 6 meses com o que estudar, em que ordem, e como montar portfólio que realmente chama a atenção de recrutadores.",
      tags: ["Carreira", "Estudos", "Iniciante"],
      conteudo: [
        { t: "A ordem certa das coisas", p: "Muitos iniciantes pulam do HTML direto para um framework e travam. O caminho seguro é: lógica de programação → HTML/CSS → JavaScript básico → um framework → banco de dados → projetos reais." },
        { t: "Meses 1 e 2: fundamentos", p: "Foque em lógica, HTML, CSS e JavaScript puro. Resolva exercícios no Codewars ou Beecrowd. Não se apresse: aqui se constrói a base." },
        { t: "Meses 3 e 4: um framework e banco de dados", p: "Escolha React (front) ou Node.js (back) e aprofunde. Aprenda SQL e um ORM. Faça seu primeiro projeto full-stack pequeno." },
        { t: "Meses 5 e 6: portfólio e entrevista", p: "Tenha 3 projetos no GitHub com README bem escrito. Pratique perguntas de entrevista no LeetCode. Comece a aplicar para vagas júnior e estágio." },
        { t: "O diferencial real", p: "Recrutadores olham mil currículos. O que destaca é um projeto com problema real, código limpo e deploy feito. Não precisa ser perfeito — precisa estar no ar." }
      ]
    },
    {
      id: 4,
      titulo: "Git avançado: fluxos de trabalho que todo dev deveria conhecer",
      categoria: "Ferramentas",
      data: "28 set 2026",
      autor: "Francieudo Tec",
      leitura: "7 min",
      resumo: "Mais do que commit e push: cherry-pick, rebase interativo, stash e como desfazer qualquer erro sem pânico.",
      tags: ["Git", "Produtividade", "Ferramentas"],
      conteudo: [
        { t: "Commit não é só salvar", p: "Um bom histórico conta uma história. Commits atômicos e mensagens claras facilitam code review e debugging anos depois." },
        { t: "Rebase interativo", p: "<code>git rebase -i</code> permite reordenar, juntar e editar commits antes de enviar. Use para limpar a branch antes de abrir um PR." },
        { t: "Stash: seu amigo do dia a dia", p: "Precisa trocar de branch no meio de uma mudança? <code>git stash</code> guarda o trabalho e <code>git stash pop</code> recupera depois." },
        { t: "Cherry-pick com cuidado", p: "Traga um commit específico de outra branch com <code>git cherry-pick</code>. Útil para hotfixes, mas evite em fluxos complexos." },
        { t: "Como desfazer qualquer coisa", p: "Errou o commit? <code>git commit --amend</code>. Errou o push? <code>git revert</code> cria um commit de reversão, seguro para branches compartilhadas." }
      ]
    },
    {
      id: 5,
      titulo: "TypeScript na prática: tipos avançados que resolvem problemas reais",
      categoria: "Front-end",
      data: "20 set 2026",
      autor: "Tony stark Pobre e Burro",
      leitura: "9 min",
      resumo: "Generics, utility types e discriminated unions: pare de lutar contra o any e deixe o compilador trabalhar por você.",
      tags: ["TypeScript", "Tipos", "Front-end"],
      conteudo: [
        { t: "Por que ir além do básico", p: "Quem usa TypeScript só com tipos explícitos não aproveita 30% do poder. Os recursos avançados eliminam código repetido e bugs de borda." },
        { t: "Generics: tipos como parâmetro", p: "Uma função <code>function first&lt;T&gt;(arr: T[]): T</code> funciona com qualquer array e preserva o tipo de retorno. Reutilização sem perder segurança." },
        { t: "Utility types do dia a dia", p: "<code>Partial&lt;T&gt;</code>, <code>Pick&lt;T, K&gt;</code> e <code>Omit&lt;T, K&gt;</code> derivam tipos a partir de interfaces existentes. Menos código, menos inconsistência." },
        { t: "Discriminated unions", p: "Adicione um campo <code>type</code> literal a cada variante e o TypeScript estreita o tipo automaticamente nos switchs. Ideal para estados de API (loading/success/error)." },
        { t: "Conclusão", p: "Tipos avançados não são firula. Eles documentam intenções e quebram o build antes que o bug chegue ao usuário." }
      ]
    },
    {
      id: 6,
      titulo: "SQL vs NoSQL: quando usar cada um em 2026",
      categoria: "Dados",
      data: "12 set 2026",
      autor: "Homem Aranha Rico",
      leitura: "6 min",
      resumo: "Não é uma guerra. Entenda os trade-offs e escolha a ferramenta certa para cada parte do seu sistema.",
      tags: ["Banco de Dados", "SQL", "NoSQL"],
      conteudo: [
        { t: "O erro mais comum", p: "Escolher o banco pela moda, não pelo problema. PostgreSQL resolve 90% dos casos. MongoDB brilha nos outros 10% específicos." },
        { t: "Quando usar relacional", p: "Dados estruturados, relacionamentos muitos-para-muitos, transações financeiras, relatórios complexos. A integridade referencial e o SQL poderoso valem o esforço." },
        { t: "Quando usar NoSQL", p: "Dados não estruturados ou que mudam o tempo todo, logs, catálogos com campos variáveis, necessidade de escala horizontal massiva. Documentos são flexíveis por natureza." },
        { t: "A verdade híbrida", p: "Sistemas grandes usam os dois. PostgreSQL com JSONB cobre quase tudo. Só migre para NoSQL quando tiver um motivo concreto e mensurável." },
        { t: "Dica final", p: "Comece com PostgreSQL. Modele bem. Só mude quando a dor for real e mensurável — não por hype." }
      ]
    },
    {
      id: 7,
      titulo: "CSS moderno: Grid, Flexbox e Container Queries de uma vez por todas",
      categoria: "Front-end",
      data: "05 set 2026",
      autor: "Glaydson Lab",
      leitura: "7 min",
      resumo: "Layouts responsivos sem media queries quebradas. Entenda quando usar cada técnica e por que Container Queries mudou o jogo.",
      tags: ["CSS", "Layout", "Responsivo"],
      conteudo: [
        { t: "Flexbox vs Grid: a regra simples", p: "Uma dimensão (linha ou coluna) → Flexbox. Duas dimensões (linhas E colunas) → Grid. Decida pela estrutura, não por preferência pessoal." },
        { t: "Container Queries: o fim das media queries globais", p: "Agora um componente pode reagir ao tamanho do SEU container, não da tela. <code>@container (min-width: 400px)</code> deixa cards responsivos de verdade, independente de onde forem colocados." },
        { t: "Gap é seu amigo", p: "Esqueça margins entre itens. Use <code>gap</code> no container flex ou grid — espaçamento consistente sem o último item sobrando." },
        { t: "Subgrid: alinhamento perfeito", p: "Com <code>grid-template-columns: subgrid</code>, itens aninhados herdam as colunas do grid pai. Alinhamento de cards em galerias nunca foi tão fácil." },
        { t: "Conclusão", p: "CSS moderno resolve 90% dos casos sem framework. Aprenda Grid + Container Queries e você não vai mais querer voltar." }
      ]
    },
    {
      id: 8,
      titulo: "Docker do zero: containerize sua aplicação em 15 minutos",
      categoria: "DevOps",
      data: "28 ago 2026",
      autor: "Michael Jackson IHIIIII",
      leitura: "8 min",
      resumo: "Do Dockerfile ao docker-compose: o guia prático para você nunca mais ouvir 'na minha máquina funciona'.",
      tags: ["Docker", "DevOps", "Deploy"],
      conteudo: [
        { t: "O problema que Docker resolve", p: "'Funciona na minha máquina' é o grito de guerra de ambientes inconsistentes. Docker empacota código + dependências em um container que roda igual em qualquer lugar." },
        { t: "Seu primeiro Dockerfile", p: "Comece com uma imagem base (<code>node:20-alpine</code>), copie o código, instale dependências e defina o comando de start. Menos de 10 linhas." },
        { t: "Multi-stage builds", p: "Use um estágio para build (com todas as dependências) e outro para produção (só o essencial). Imagens menores e mais seguras." },
        { t: "docker-compose para múltiplos serviços", p: "Quando sua app precisa de banco + cache + fila, o compose orquestra tudo em um arquivo YAML. Um <code>docker-compose up</code> sobe o ambiente inteiro." },
        { t: "Boas práticas", p: "Use versões específicas (não latest), não rode como root, e aproveite o cache de camadas copiando package.json antes do código." }
      ]
    },
    {
      id: 9,
      titulo: "Testes automatizados: TDD na prática sem medo",
      categoria: "Qualidade",
      data: "20 ago 2026",
      autor: "Michael Jordan sem o Jordan e pobre",
      leitura: "9 min",
      resumo: "Red, Green, Refactor. Como escrever testes que realmente dão confiança para refatorar — sem testar detalhes de implementação.",
      tags: ["Testes", "TDD", "Qualidade"],
      conteudo: [
        { t: "Por que testar?", p: "Testes não são para provar que o código funciona hoje. São para permitir que você mude ele amanhã sem medo de quebrar tudo." },
        { t: "O ciclo TDD", p: "<b>Red</b>: escreva um teste que falha. <b>Green</b>: faça ele passar com o mínimo de código. <b>Refactor</b>: limpe o código mantendo os testes verdes. Repita." },
        { t: "O que testar?", p: "Teste comportamento, não implementação. Se você renomeia uma variável interna e o teste quebra, ele está testando a coisa errada." },
        { t: "A pirâmide de testes", p: "Muitos testes unitários (rápidos), alguns de integração (serviços conversando), poucos end-to-end (fluxo completo do usuário). O inverso é lento e frágil." },
        { t: "Ferramentas", p: "JavaScript: Vitest + Testing Library. Python: pytest. Back-end: supertest para APIs. Escolha uma e domine." }
      ]
    },
    {
      id: 10,
      titulo: "React Hooks avançados: useEffect, useMemo e useCallback sem erros",
      categoria: "Front-end",
      data: "12 ago 2026",
      autor: "Bob Esponja",
      leitura: "10 min",
      resumo: "O array de dependências não é um enfeite. Entenda cada hook de uma vez e pare de ter bugs de renderização infinita.",
      tags: ["React", "Hooks", "Front-end"],
      conteudo: [
        { t: "useEffect: não é lifecycle", p: "useEffect sincroniza seu componente com um sistema externo (API, subscription, DOM). Se não há sistema externo, provavelmente você não precisa dele." },
        { t: "O array de dependências", p: "Toda variável de fora usada dentro do effect deve estar no array. Falhar nisso causa bugs com valores 'stale'. A regra do ESLint existe por um motivo." },
        { t: "useMemo e useCallback: otimize com medida", p: "Eles memorizam valores e funções entre renders. Use apenas quando houver custo computacional real ou problema de referência. Usar em tudo deixa o código mais lento." },
        { t: "Limpeza no effect", p: "Sempre retorne uma função de limpeza quando o effect cria subscrição ou timer. Vazar listeners é a causa #1 de bugs estranhos." },
        { t: "Conclusão", p: "Hooks são poderosos mas exigem disciplina. Pense em sincronização, não em ciclos de vida, e 80% dos bugs somem." }
      ]
    },
    {
      id: 11,
      titulo: "Python: por que continua sendo a melhor primeira linguagem",
      categoria: "Linguagens",
      data: "05 ago 2026",
      autor: "Van Vestarppen",
      leitura: "6 min",
      resumo: "Sintaxe limpa, comunidade gigante e emprego em IA, dados e automação. Veja por que Python é o ponto de partida ideal.",
      tags: ["Python", "Iniciante", "Linguagens"],
      conteudo: [
        { t: "Sintaxe que parece pseudocódigo", p: "Python força indentação e tem pouca cerimônia. Você foca na lógica, não em chaves e ponto-e-vírgula. Perfeito para iniciantes." },
        { t: "Ecossistema incomparável", p: "Pandas para dados, Django para web, NumPy para ciência, PyTorch para IA. Qualquer área que você escolher, Python tem bibliotecas maduras." },
        { t: "Mercado de trabalho aquecido", p: "Python lidera em ciência de dados, machine learning e automação. É também uma das linguagens mais bem pagas no mundo." },
        { t: "Mas não pare por aí", p: "Aprenda Python como base, mas depois estude uma linguagem de tipagem estática (TypeScript, Go ou Rust) para entender outros paradigmas." },
        { t: "Primeiros passos", p: "Instale o Python, abra o terminal e digite <code>print('Olá, mundo!')</code>. Pronto — você já é programador. O resto é prática." }
      ]
    },
    {
      id: 12,
      titulo: "Algoritmos e estrutura de dados: o que realmente cai em entrevista",
      categoria: "Carreira",
      data: "28 jul 2026",
      autor: "Rafael Lima",
      leitura: "11 min",
      resumo: "Não decore 500 problemas. Domine estes 6 padrões e você resolve 90% das questões de entrevista de big techs.",
      tags: ["Algoritmos", "Entrevista", "Carreira"],
      conteudo: [
        { t: "O mito dos 500 exercícios", p: "Você não precisa resolver centenas de problemas. Precisa reconhecer padrões. A mesma questão aparece com roupagens diferentes." },
        { t: "Os 6 padrões que dominam", p: "<b>Two pointers</b> (arrays ordenados), <b>Sliding window</b> (substrings/máximos), <b>BFS/DFS</b> (grafos e árvores), <b>Binary search</b> (busca otimizada), <b>Hash map</b> (contagem e busca), <b>Dynamic programming</b> (problemas de otimização)." },
        { t: "Complexidade: Big O na veia", p: "Saber dizer que sua solução é O(n log n) e explicar por que é tão importante quanto o código funcionando. Estude tempo e espaço." },
        { t: "Como praticar", p: "Resolva 1-2 problemas por dia no LeetCode. Gaste 30 minutos; se não achar, veja a solução e entenda o padrão. Consistência vence quantidade." },
        { t: "Na hora da entrevista", p: "Comunique seu raciocínio em voz alta. Comece pela força bruta, otimize depois. O entrevistador quer ver como você pensa, não só a resposta final." }
      ]
    }
  ],

  snippets: [
    {
      titulo: "Debounce (evita múltiplas chamadas)",
      linguagem: "JavaScript",
      desc: "Use em inputs de busca para não chamar a API a cada tecla digitada.",
      code: '<span class="kw">function</span> debounce(fn, delay) {\n  <span class="kw">let</span> timer;\n  <span class="kw">return function</span>(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\n<span class="cm">// Uso:</span>\n<span class="kw">const</span> buscar = debounce(termo => api.search(termo), 300);'
    },
    {
      titulo: "Remover itens duplicados de um array",
      linguagem: "JavaScript",
      desc: "Uma linha só, sem bibliotecas.",
      code: '<span class="kw">const</span> numeros = [1, 2, 2, 3, 4, 4, 5];\n<span class="kw">const</span> unico = [...<span class="kw">new</span> Set(numeros)];\n<span class="cm">// [1, 2, 3, 4, 5]</span>'
    },
    {
      titulo: "Fetch com timeout",
      linguagem: "JavaScript",
      desc: "O fetch nativo não tem timeout. Use AbortController para não esperar para sempre.",
      code: '<span class="kw">async function</span> fetchComTimeout(url, ms = 5000) {\n  <span class="kw">const</span> controller = <span class="kw">new</span> AbortController();\n  <span class="kw">const</span> id = setTimeout(() => controller.abort(), ms);\n  <span class="kw">try</span> {\n    <span class="kw">const</span> res = <span class="kw">await</span> fetch(url, { signal: controller.signal });\n    <span class="kw">return await</span> res.json();\n  } <span class="kw">finally</span> { clearTimeout(id); }\n}'
    },
    {
      titulo: "Embaralhar array (Fisher-Yates)",
      linguagem: "JavaScript",
      desc: "O jeito correto e justo de randomizar — sort() com Math.random é viciado.",
      code: '<span class="kw">function</span> shuffle(arr) {\n  <span class="kw">for</span> (<span class="kw">let</span> i = arr.length - 1; i > 0; i--) {\n    <span class="kw">const</span> j = Math.floor(Math.random() * (i + 1));\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n  <span class="kw">return</span> arr;\n}'
    },
    {
      titulo: "Clamp: limitar valor entre mínimo e máximo",
      linguagem: "JavaScript",
      desc: "Útil para paginação, sliders e qualquer valor que não pode sair de uma faixa.",
      code: '<span class="kw">const</span> clamp = (valor, min, max) =>\n  Math.min(Math.max(valor, min), max);\n\nclamp(150, 0, 100);  <span class="cm">// 100</span>\nclamp(-5, 0, 100);   <span class="cm">// 0</span>\nclamp(42, 0, 100);   <span class="cm">// 42</span>'
    },
    {
      titulo: "Tempo relativo (há X minutos)",
      linguagem: "JavaScript",
      desc: "Transforma uma data em 'há 5 minutos', 'há 2 horas', etc.",
      code: '<span class="kw">function</span> tempoRelativo(data) {\n  <span class="kw">const</span> seg = Math.floor((Date.now() - data) / 1000);\n  <span class="kw">const</span> unid = [[31536000,<span class="st">"ano"</span>],[2592000,<span class="st">"mês"</span>],[86400,<span class="st">"dia"</span>],[3600,<span class="st">"hora"</span>],[60,<span class="st">"minuto"</span>]];\n  <span class="kw">for</span> (<span class="kw">const</span> [s, nome] <span class="kw">of</span> unid) {\n    <span class="kw">const</span> v = Math.floor(seg / s);\n    <span class="kw">if</span> (v >= 1) <span class="kw">return</span> `há ${v} ${nome}${v>1?<span class="st">"s"</span>:<span class="st">""</span>}`;\n  }\n  <span class="kw">return</span> <span class="st">"agora mesmo"</span>;\n}'
    }
  ],

  glossario: [
    { termo: "API", def: "Interface de Programação de Aplicações. Conjunto de regras que permite que softwares se comuniquem entre si. Quando seu app busca dados de um servidor, ele usa uma API." },
    { termo: "REST", def: "Estilo arquitetural para APIs que usa métodos HTTP (GET, POST, PUT, DELETE) e URLs que representam recursos. O padrão mais comum da web." },
    { termo: "CRUD", def: "Create, Read, Update, Delete — as quatro operações básicas de armazenamento de dados. Quase toda aplicação é, no fundo, um CRUD com regras de negócio." },
    { termo: "MVC", def: "Model-View-Controller. Padrão de arquitetura que separa dados (Model), interface (View) e lógica (Controller). A base de muitos frameworks web." },
    { termo: "IDE", def: "Ambiente Integrado de Desenvolvimento. Editor avançado com autocomplete, debug e integração com Git. Exemplos: VS Code, IntelliJ, PyCharm." },
    { termo: "Algoritmo", def: "Sequência finita de passos para resolver um problema. Como uma receita de bolo: entrada, processamento, saída. A base da ciência da computação." },
    { termo: "Big O", def: "Notação que descreve o desempenho (tempo/espaço) de um algoritmo conforme a entrada cresce. O(1) é constante, O(n) é linear, O(n²) é quadrático." },
    { termo: "Refatoração", def: "Reescrever código sem mudar seu comportamento externo. Melhora legibilidade e estrutura sem adicionar funcionalidades novas." },
    { termo: "Debug", def: "Processo de encontrar e corrigir bugs (erros) no código. Ferramentas: breakpoints, console.log, e muita paciência." },
    { termo: "Framework vs Biblioteca", def: "Biblioteca você chama; framework chama você. Framework impõe uma arquitetura (React, Django); biblioteca é uma ferramenta que você usa quando quer (Lodash, Axios)." },
    { termo: "Compilador", def: "Programa que traduz código-fonte (que humanos leem) para código de máquina (que computadores executam). C, Java e Rust usam compiladores; JavaScript é interpretado." },
    { termo: "Git", def: "Sistema de controle de versão distribuído. Salva o histórico do código, permite trabalho em equipe e voltar no tempo quando algo quebra." }
  ]
};
