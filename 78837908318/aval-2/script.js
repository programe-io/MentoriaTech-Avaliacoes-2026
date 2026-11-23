
let publicacoes = JSON.parse(
  localStorage.getItem("perfumePosts")
) || [
  {
    id: 1,
    nome: "Maria",
    titulo: "Chanel N°5",
    descricao: "Um perfume clássico, elegante e sofisticado! 🌸",
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
    curtidas: 12,
    comentarios: [],
    favorito: false
  },
  {
    id: 2,
    nome: "Ana",
    titulo: "Perfume Floral",
    descricao: "Amo fragrâncias florais. São delicadas e encantadoras! 💗",
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    curtidas: 8,
    comentarios: [],
    favorito: false
  }
];

function salvar() {
  localStorage.setItem(
    "perfumePosts",
    JSON.stringify(publicacoes)
  );
}

function mostrarPosts() {
  const feed = document.getElementById("posts");
  feed.innerHTML = "";

  publicacoes.slice().reverse().forEach(post => {
    const div = document.createElement("article");
    div.className = "post";

    const img = document.createElement("img");
    img.src = post.imagem;
    img.alt = post.titulo;
    img.onerror = () => img.style.display = "none";

    const titulo = document.createElement("h3");
    titulo.textContent = "🧴 " + post.titulo;

    const autor = document.createElement("p");
    autor.textContent = "Publicado por " + post.nome;

    const descricao = document.createElement("p");
    descricao.textContent = post.descricao;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = `❤️ Curtir (${post.curtidas})`;
    like.onclick = () => {
      post.curtidas++;
      salvar();
      mostrarPosts();
    };

    const favorite = document.createElement("button");
    favorite.textContent = post.favorito
      ? "⭐ Salvo"
      : "☆ Favoritar";

    favorite.onclick = () => {
      post.favorito = !post.favorito;
      salvar();
      mostrarPosts();
    };

    const comments = document.createElement("div");
    comments.className = "comment-area";

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    const commentButton = document.createElement("button");
    commentButton.textContent = "Comentar";

    commentButton.onclick = () => {
      if (!input.value.trim()) return;

      post.comentarios.push(input.value.trim());
      salvar();
      mostrarPosts();
    };

    actions.append(like, favorite);
    comments.append(input, commentButton);

    post.comentarios.forEach(comentario => {
      const p = document.createElement("p");
      p.className = "comment";
      p.textContent = "💬 " + comentario;
      comments.appendChild(p);
    });

    div.append(autor, titulo, img, descricao, actions, comments);
    feed.appendChild(div);
  });
}

function publicar() {
  const nome = document.getElementById("nome").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const imagem = document.getElementById("imagem").value.trim();

  if (!nome || !titulo || !descricao || !imagem) {
    alert("Preencha todos os campos!");
    return;
  }

  publicacoes.push({
    id: Date.now(),
    nome,
    titulo,
    descricao,
    imagem,
    curtidas: 0,
    comentarios: [],
    favorito: false
  });

  salvar();
  mostrarPosts();

  document.getElementById("nome").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("imagem").value = "";

  alert("Publicação criada com sucesso! 🌸");
}

mostrarPosts();
