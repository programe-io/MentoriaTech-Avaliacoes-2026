
let posts = JSON.parse(localStorage.getItem("perfumgramPosts")) || [
  {
    id: 1,
    usuario: "Maria",
    perfume: "Chanel N°5",
    legenda: "Uma fragrância clássica, elegante e inesquecível! 🌸",
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900",
    curtidas: 25,
    comentarios: [],
    favorito: false
  },
  {
    id: 2,
    usuario: "Ana",
    perfume: "Perfume Floral",
    legenda: "Apaixonada por fragrâncias delicadas e femininas! 💗",
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900",
    curtidas: 18,
    comentarios: [],
    favorito: false
  },
  {
    id: 3,
    usuario: "Julia",
    perfume: "Luxury Collection",
    legenda: "Meu novo perfume favorito! ✨",
    imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900",
    curtidas: 42,
    comentarios: [],
    favorito: false
  }
];

function salvar() {
  localStorage.setItem("perfumgramPosts", JSON.stringify(posts));
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function mostrarPosts(lista = posts) {
  const feed = document.getElementById("publicacoes");
  feed.innerHTML = "";

  lista.slice().reverse().forEach(post => {
    const card = criarElemento("article", "post");

    const header = criarElemento("div", "post-header");
    const avatar = criarElemento("div", "avatar", "🌸");
    const info = document.createElement("div");

    info.append(
      criarElemento("strong", "", post.usuario),
      criarElemento("small", "", "Apaixonado(a) por perfumes")
    );

    header.append(avatar, info);

    const titulo = criarElemento("h3", "post-title", "🧴 " + post.perfume);

    const imagem = criarElemento("img", "post-image");
    imagem.src = post.imagem;
    imagem.alt = post.perfume;
    imagem.onerror = () => imagem.style.display = "none";

    const legenda = criarElemento("p", "post-caption", post.legenda);

    const actions = criarElemento("div", "actions");

    const curtir = criarElemento(
      "button", "",
      `❤️ Curtir (${post.curtidas})`
    );

    curtir.onclick = () => {
      post.curtidas++;
      salvar();
      mostrarPosts();
    };

    const favorito = criarElemento(
      "button", "",
      post.favorito ? "⭐ Salvo" : "☆ Salvar"
    );

    favorito.onclick = () => {
      post.favorito = !post.favorito;
      salvar();
      mostrarPosts();
    };

    const compartilhar = criarElemento(
      "button", "", "📤 Compartilhar"
    );

    compartilhar.onclick = async () => {
      const texto = `${post.perfume} - ${post.legenda}`;
      if (navigator.share) {
        try {
          await navigator.share({ title: post.perfume, text: texto });
        } catch (e) {}
      } else {
        await navigator.clipboard.writeText(texto);
        alert("Texto copiado!");
      }
    };

    actions.append(curtir, favorito, compartilhar);

    const comentarios = criarElemento("div", "comments");
    comentarios.appendChild(
      criarElemento("strong", "", "💬 Comentários")
    );

    post.comentarios.forEach(comentario => {
      comentarios.appendChild(
        criarElemento("p", "comment", "🌷 " + comentario)
      );
    });

    const campo = criarElemento("input");
    campo.placeholder = "Adicione um comentário...";

    const comentar = criarElemento("button", "", "Enviar");

    comentar.onclick = () => {
      const texto = campo.value.trim();
      if (!texto) return;

      post.comentarios.push(texto);
      salvar();
      mostrarPosts();
    };

    campo.addEventListener("keydown", event => {
      if (event.key === "Enter") comentar.click();
    });

    comentarios.append(campo, comentar);

    card.append(
      header, titulo, imagem, legenda, actions, comentarios
    );

    feed.appendChild(card);
  });

  document.getElementById("totalPosts").textContent = posts.length;
  mostrarFavoritos();
}

function publicar() {
  const usuario = document.getElementById("usuario").value.trim();
  const perfume = document.getElementById("nomePerfume").value.trim();
  const legenda = document.getElementById("legenda").value.trim();
  const arquivo = document.getElementById("foto").files[0];

  if (!usuario || !perfume || !legenda || !arquivo) {
    alert("Preencha todos os campos e escolha uma foto!");
    return;
  }

  if (!arquivo.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem válido.");
    return;
  }

  if (arquivo.size > 2 * 1024 * 1024) {
    alert("Escolha uma foto de até 2 MB.");
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function(event) {
    posts.push({
      id: Date.now(),
      usuario,
      perfume,
      legenda,
      imagem: event.target.result,
      curtidas: 0,
      comentarios: [],
      favorito: false
    });

    try {
      salvar();
      mostrarPosts();

      document.getElementById("usuario").value = "";
      document.getElementById("nomePerfume").value = "";
      document.getElementById("legenda").value = "";
      document.getElementById("foto").value = "";

      alert("Sua publicação foi criada! 🌸");
    } catch (erro) {
      posts.pop();
      alert("Não foi possível salvar. O armazenamento do navegador está cheio.");
    }
  };

  leitor.readAsDataURL(arquivo);
}

function mostrarFavoritos() {
  const area = document.getElementById("listaFavoritos");
  area.innerHTML = "";

  const favoritos = posts.filter(post => post.favorito);

  if (favoritos.length === 0) {
    area.textContent = "Você ainda não salvou nenhum perfume. 💗";
    return;
  }

  favoritos.forEach(post => {
    const item = criarElemento("div", "post");
    const titulo = criarElemento("h3", "", "⭐ " + post.perfume);
    const descricao = criarElemento("p", "", post.legenda);
    item.append(titulo, descricao);
    area.appendChild(item);
  });
}

// PESQUISAR PERFUMES

document.getElementById("pesquisa").addEventListener("input", event => {
  const termo = event.target.value.toLowerCase();

  const resultado = posts.filter(post =>
    post.perfume.toLowerCase().includes(termo) ||
    post.usuario.toLowerCase().includes(termo) ||
    post.legenda.toLowerCase().includes(termo)
  );

  mostrarPosts(resultado);
});

// INICIAR FEED

mostrarPosts();
