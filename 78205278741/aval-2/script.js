
/* =====================================
   1. ELEMENTOS DO BLOG
===================================== */

const form = document.getElementById("formPost");
const listaPosts = document.getElementById("listaPosts");
const botaoTema = document.getElementById("botaoTema");

const campoNome = document.getElementById("nome");
const campoBio = document.getElementById("bio");
const campoTitulo = document.getElementById("titulo");
const campoConteudo = document.getElementById("conteudo");

/* =====================================
   2. SALVAR E LER DADOS DO NAVEGADOR
===================================== */

function carregar(chave, padrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor === null ? padrao : JSON.parse(valor);
  } catch {
    return padrao;
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    alert(
      "Não foi possível salvar os dados. Verifique o espaço disponível no navegador."
    );
    return false;
  }
}

/* =====================================
   3. DADOS DO BLOG
===================================== */

let posts = carregar("meuBlogPosts", []);
let curtidas = carregar("meuBlogCurtidas", []);

let nomeSalvo = carregar("meuBlogNome", "Seu Nome");

let bioSalva = carregar(
  "meuBlogBio",
  "Sou uma pessoa que gosta de aprender, descobrir coisas novas e compartilhar experiências."
);

let temaEscuro = carregar("meuBlogTema", false);

/* =====================================
   4. ATUALIZAR PERFIL
===================================== */

function atualizarPerfil() {
  document.getElementById("nomeHero").textContent = nomeSalvo;
  document.getElementById("nomeSobre").textContent = nomeSalvo;
  document.getElementById("nomeFooter").textContent = nomeSalvo;
  document.getElementById("biografia").textContent = bioSalva;
}

/* =====================================
   5. FORMATAR DATA
===================================== */

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

/* =====================================
   6. CRIAR ELEMENTOS COM SEGURANÇA
===================================== */

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  elemento.textContent = texto;

  return elemento;
}

/* =====================================
   7. MOSTRAR AS PUBLICAÇÕES
===================================== */

function renderizarPosts() {
  listaPosts.replaceChildren();

  if (posts.length === 0) {
    const mensagem = criarElemento(
      "p",
      "vazio",
      "Ainda não há publicações. Compartilhe sua primeira história! 💜"
    );

    listaPosts.appendChild(mensagem);
    return;
  }

  posts.forEach((post) => {
    const cartao = criarElemento("article", "post", "");

    const data = criarElemento(
      "p",
      "post-data",
      formatarData(post.data)
    );

    const titulo = criarElemento(
      "h3",
      "",
      post.titulo
    );

    const conteudo = criarElemento(
      "p",
      "post-texto",
      post.conteudo
    );

    const acoes = criarElemento("div", "post-acoes", "");

    /* BOTÃO DE CURTIR */

    const jaCurtiu = curtidas.includes(post.id);

    const botaoCurtir = criarElemento(
      "button",
      "curtir",
      `${jaCurtiu ? "❤️" : "🤍"} Curtir (${post.curtidas || 0})`
    );

    botaoCurtir.type = "button";
    botaoCurtir.setAttribute("aria-pressed", String(jaCurtiu));

    botaoCurtir.addEventListener("click", () => {
      if (curtidas.includes(post.id)) {
        curtidas = curtidas.filter(id => id !== post.id);
        post.curtidas = Math.max(0, (post.curtidas || 0) - 1);
      } else {
        curtidas.push(post.id);
        post.curtidas = (post.curtidas || 0) + 1;
      }

      salvar("meuBlogCurtidas", curtidas);
      salvar("meuBlogPosts", posts);

      renderizarPosts();
    });

    /* BOTÃO DE EXCLUIR */

    const botaoExcluir = criarElemento(
      "button",
      "excluir",
      "Excluir publicação"
    );

    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", () => {
      const confirmar = confirm(
        "Deseja realmente excluir esta publicação?"
      );

      if (!confirmar) return;

      posts = posts.filter(item => item.id !== post.id);
      curtidas = curtidas.filter(id => id !== post.id);

      salvar("meuBlogPosts", posts);
      salvar("meuBlogCurtidas", curtidas);

      renderizarPosts();
    });

    /* MONTAR O CARTÃO */

    acoes.append(botaoCurtir, botaoExcluir);

    cartao.append(
      data,
      titulo,
      conteudo,
      acoes
    );

    listaPosts.appendChild(cartao);
  });
}

/* =====================================
   8. PUBLICAR NOVA EXPERIÊNCIA
===================================== */

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const bio = campoBio.value.trim();
  const titulo = campoTitulo.value.trim();
  const conteudo = campoConteudo.value.trim();

  if (!nome || !bio || !titulo || !conteudo) {
    alert("Preencha todos os campos antes de publicar.");
    return;
  }

  const novoPost = {
    id: Date.now().toString() +
        Math.random().toString(36).slice(2),

    titulo: titulo,
    conteudo: conteudo,
    data: new Date().toISOString(),
    curtidas: 0
  };

  /* Guardar os dados anteriores caso ocorra um erro */

  const postsAnteriores = posts;
  const nomeAnterior = nomeSalvo;
  const bioAnterior = bioSalva;

  posts = [novoPost, ...posts];
  nomeSalvo = nome;
  bioSalva = bio;

  const sucessoPosts = salvar("meuBlogPosts", posts);
  const sucessoNome = salvar("meuBlogNome", nomeSalvo);
  const sucessoBio = salvar("meuBlogBio", bioSalva);

  if (!sucessoPosts || !sucessoNome || !sucessoBio) {
    posts = postsAnteriores;
    nomeSalvo = nomeAnterior;
    bioSalva = bioAnterior;
    return;
  }

  atualizarPerfil();
  renderizarPosts();

  form.reset();

  alert("Sua história foi publicada com sucesso! 🎉");

  document.getElementById("posts").scrollIntoView({
    behavior: "smooth"
  });
});

/* =====================================
   9. ALTERNAR TEMA CLARO E ESCURO
===================================== */

function atualizarTema() {
  document.body.classList.toggle("escuro", temaEscuro);

  botaoTema.textContent = temaEscuro
    ? "☀️ Tema"
    : "🌙 Tema";

  botaoTema.setAttribute(
    "aria-pressed",
    String(temaEscuro)
  );
}

botaoTema.addEventListener("click", () => {
  const temaAnterior = temaEscuro;

  temaEscuro = !temaEscuro;

  if (salvar("meuBlogTema", temaEscuro)) {
    atualizarTema();
  } else {
    temaEscuro = temaAnterior;
  }
});

/* =====================================
   10. INICIALIZAR O BLOG
===================================== */

atualizarPerfil();
atualizarTema();
renderizarPosts();

document.getElementById("ano").textContent =
  new Date().getFullYear();
