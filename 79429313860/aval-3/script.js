
const formulario = document.getElementById("form-post");
const campoNome = document.getElementById("nome");
const campoMensagem = document.getElementById("mensagem");
const feed = document.getElementById("feed");
const vazio = document.getElementById("vazio");

let publicacoes = [];
let proximoId = 1;

document.getElementById("ano").textContent =
  new Date().getFullYear();

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const mensagem = campoMensagem.value.trim();

  if (!nome || !mensagem) {
    alert("Preencha seu nome e sua mensagem!");
    return;
  }

  const post = {
    id: proximoId++,
    nome: nome,
    mensagem: mensagem,
    curtidas: 0,
    data: new Date().toLocaleString("pt-BR")
  };

  publicacoes.unshift(post);
  renderizarFeed();

  campoMensagem.value = "";
  campoMensagem.focus();
});

function renderizarFeed() {
  feed.replaceChildren();

  vazio.hidden = publicacoes.length > 0;
  feed.appendChild(vazio);

  publicacoes.forEach(function(post) {
    const artigo = document.createElement("article");
    artigo.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const autor = document.createElement("strong");
    autor.textContent = post.nome;

    const data = document.createElement("span");
    data.className = "data";
    data.textContent = post.data;

    topo.append(autor, data);

    const texto = document.createElement("p");
    texto.className = "mensagem";
    texto.textContent = post.mensagem;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.textContent = `❤️ Curtir (${post.curtidas})`;

    botaoCurtir.addEventListener("click", function() {
      post.curtidas++;
      renderizarFeed();
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "excluir";
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function() {
      publicacoes = publicacoes.filter(function(item) {
        return item.id !== post.id;
      });

      renderizarFeed();
    });

    acoes.append(botaoCurtir, botaoExcluir);
    artigo.append(topo, texto, acoes);
    feed.appendChild(artigo);
  });
}

renderizarFeed();
