document.body.innerHTML = `
  <header>
    <h1>Conecta</h1>
    <nav>
      <a href="#inicio">Início</a>
      <a href="#perfil">Perfil</a>
    </nav>
  </header>

  <main id="inicio">
    <section>
      <h2>Criar publicação</h2>
      <form id="form-publicacao">
        <label for="texto-publicacao">O que você está pensando?</label>
        <textarea id="texto-publicacao" required></textarea>
        <button type="submit">Publicar</button>
      </form>
    </section>

    <section>
      <h2>Feed</h2>
      <div id="feed"></div>
    </section>

    <section id="perfil">
      <h2>Meu perfil</h2>
      <p>Bem-vindo à sua rede social!</p>
    </section>
  </main>
`;

const formulario = document.querySelector("#form-publicacao");
const campoTexto = document.querySelector("#texto-publicacao");
const feed = document.querySelector("#feed");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = campoTexto.value.trim();
  if (!texto) return;

  const publicacao = document.createElement("article");
  const autor = document.createElement("h3");
  const mensagem = document.createElement("p");
  const data = document.createElement("time");

  autor.textContent = "Você";
  mensagem.textContent = texto;
  data.textContent = new Date().toLocaleString("pt-BR");

  publicacao.append(autor, data, mensagem);
  feed.prepend(publicacao);

  campoTexto.value = "";
});
