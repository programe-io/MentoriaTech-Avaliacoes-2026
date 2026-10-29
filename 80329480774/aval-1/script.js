document.body.innerHTML = `
  <header>
    <h1>Meu Blog</h1>
    <p>Ideias, histórias e novidades</p>
    <nav>
      <a href="#inicio">Início</a>
      <a href="#artigos">Artigos</a>
      <a href="#sobre">Sobre</a>
    </nav>
  </header>

  <main id="inicio">
    <section id="artigos">
      <h2>Artigos recentes</h2>

      <article>
        <h3>Bem-vindo ao meu blog</h3>
        <p><time datetime="2026-10-29">29 de outubro de 2026</time></p>
        <p>Este blog foi criado usando apenas JavaScript.</p>
      </article>

      <article>
        <h3>Uma nova jornada</h3>
        <p><time datetime="2026-10-28">28 de outubro de 2026</time></p>
        <p>Aqui vou compartilhar histórias, ideias e novidades.</p>
      </article>
    </section>

    <section id="sobre">
      <h2>Sobre o blog</h2>
      <p>Um espaço para publicar conteúdo e compartilhar ideias.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Meu Blog</p>
  </footer>
`;
