
const usuarios = [
  {
    nome: "Ana",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    story: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    texto: "Oi, pessoal! 💜"
  },
  {
    nome: "Lucas",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
    story: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    texto: "Curtindo o dia! ☀️"
  },
  {
    nome: "Maria",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    story: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    texto: "Um dia especial! ✨"
  },
  {
    nome: "Pedro",
    foto: "https://randomuser.me/api/portraits/men/75.jpg",
    story: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    texto: "E aí, galera! 😎"
  },
  {
    nome: "Julia",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
    story: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    texto: "Passando para deixar um oi! ❤️"
  }
];

const publicacoes = [
  {
    usuario: "Ana",
    foto: usuarios[0].foto,
    imagem: "https://i.imgflip.com/30b1gx.jpg",
    legenda: "Eu dizendo que vou dormir cedo e o celular me chamando às 2 da manhã 😂",
    curtidas: 120
  },
  {
    usuario: "Lucas",
    foto: usuarios[1].foto,
    imagem: "https://i.imgflip.com/1g8my4.jpg",
    legenda: "Quando o professor fala que a atividade vale nota: 😳",
    curtidas: 85
  },
  {
    usuario: "Maria",
    foto: usuarios[2].foto,
    imagem: "https://i.imgflip.com/1bij.jpg",
    legenda: "Eu tentando entender a matéria cinco minutos antes da prova 🤣",
    curtidas: 203
  },
  {
    usuario: "Pedro",
    foto: usuarios[3].foto,
    imagem: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900",
    legenda: "Minha cara quando alguém diz que tem fofoca nova 👀😂",
    curtidas: 64
  }
];

const stories = document.getElementById("stories");
const feed = document.getElementById("feed");
const reels = document.getElementById("reels");
const pesquisa = document.getElementById("pesquisa");

let storyAtual = 0;

// STORIES
usuarios.forEach((usuario, index) => {
  const elemento = document.createElement("div");
  elemento.className = "story";

  const foto = document.createElement("img");
  foto.src = usuario.foto;
  foto.alt = "Foto de " + usuario.nome;

  const nome = document.createElement("span");
  nome.textContent = usuario.nome;

  elemento.append(foto, nome);

  elemento.addEventListener("click", () => {
    abrirStory(index);
  });

  stories.appendChild(elemento);
});

const visualizador = document.getElementById("storyVisualizador");

function abrirStory(index) {
  storyAtual = index;
  atualizarStory();
  visualizador.classList.add("aberto");
  visualizador.setAttribute("aria-hidden", "false");
}

function atualizarStory() {
  const usuario = usuarios[storyAtual];

  document.getElementById("storyFoto").src = usuario.foto;
  document.getElementById("storyFoto").alt = "Foto de " + usuario.nome;
  document.getElementById("storyNome").textContent = usuario.nome;
  document.getElementById("storyImagem").src = usuario.story;
  document.getElementById("storyTexto").textContent = usuario.texto;
  document.getElementById("storyBarra").style.width =
    (((storyAtual + 1) / usuarios.length) * 100) + "%";
}

function fecharStory() {
  visualizador.classList.remove("aberto");
  visualizador.setAttribute("aria-hidden", "true");
}

document.getElementById("fecharStory").addEventListener("click", fecharStory);

document.getElementById("storyProximo").addEventListener("click", () => {
  storyAtual++;

  if (storyAtual >= usuarios.length) {
    fecharStory();
    return;
  }

  atualizarStory();
});

document.getElementById("storyAnterior").addEventListener("click", () => {
  storyAtual--;

  if (storyAtual < 0) {
    storyAtual = usuarios.length - 1;
  }

  atualizarStory();
});

visualizador.addEventListener("click", (evento) => {
  if (evento.target === visualizador) {
    fecharStory();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharStory();
});

// PUBLICAÇÕES E MEMES
function mostrarPublicacoes(lista) {
  feed.innerHTML = "";

  lista.forEach((post) => {
    const elemento = document.createElement("article");
    elemento.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-top";

    const foto = document.createElement("img");
    foto.className = "foto-perfil";
    foto.src = post.foto;
    foto.alt = "Foto de " + post.usuario;

    const nome = document.createElement("strong");
    nome.textContent = post.usuario;

    topo.append(foto, nome);

    const imagem = document.createElement("img");
    imagem.className = "post-imagem";
    imagem.src = post.imagem;
    imagem.alt = "Publicação de " + post.usuario;
    imagem.loading = "lazy";

    const legenda = document.createElement("p");
    legenda.className = "post-legenda";
    legenda.textContent = post.legenda;

    const contador = document.createElement("p");
    const numero = document.createElement("strong");
    numero.textContent = post.curtidas;
    contador.append(numero, document.createTextNode(" curtidas"));

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtir = document.createElement("button");
    curtir.textContent = "❤️ Curtir";

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";

    acoes.append(curtir, comentar);

    const campo = document.createElement("input");
    campo.className = "comentario";
    campo.placeholder = "Escreva um comentário...";

    const listaComentarios = document.createElement("div");
    listaComentarios.className = "lista-comentarios";

    let curtiu = false;

    curtir.addEventListener("click", () => {
      curtiu = !curtiu;
      post.curtidas += curtiu ? 1 : -1;
      numero.textContent = post.curtidas;
      curtir.textContent = curtiu ? "❤️ Curtido" : "❤️ Curtir";
    });

    function adicionarComentario() {
      const texto = campo.value.trim();

      if (!texto) {
        alert("Digite um comentário primeiro!");
        return;
      }

      const novoComentario = document.createElement("p");
      novoComentario.textContent = "Você: " + texto;
      listaComentarios.appendChild(novoComentario);

      campo.value = "";
    }

    comentar.addEventListener("click", adicionarComentario);

    campo.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") adicionarComentario();
    });

    elemento.append(
      topo,
      imagem,
      legenda,
      contador,
      acoes,
      campo,
      listaComentarios
    );

    feed.appendChild(elemento);
  });

  document.getElementById("totalPosts").textContent = publicacoes.length;
}

mostrarPublicacoes(publicacoes);

// PESQUISA DE USUÁRIOS
pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLowerCase().trim();

  const encontrados = publicacoes.filter(post =>
    post.usuario.toLowerCase().includes(termo) ||
    post.legenda.toLowerCase().includes(termo)
  );

  mostrarPublicacoes(encontrados);
});

// REELS DEMONSTRATIVOS
const listaReels = [
  { usuario: "Ana", texto: "Memes para alegrar seu dia 😂" },
  { usuario: "Lucas", texto: "Quando chega sexta-feira! 🎉" },
  { usuario: "Julia", texto: "Só quem estuda vai entender! 📚" }
];

listaReels.forEach(reel => {
  const elemento = document.createElement("div");
  elemento.className = "reel";

  const titulo = document.createElement("h3");
  titulo.textContent = "🎬 Reel de " + reel.usuario;

  const descricao = document.createElement("p");
  descricao.textContent = reel.texto;

  const aviso = document.createElement("p");
  aviso.textContent = "Vídeo demonstrativo — adicione um vídeo para reproduzir.";

  elemento.append(titulo, descricao, aviso);
  reels.appendChild(elemento);
});

// EDITAR PERFIL
document.getElementById("editarPerfil").addEventListener("click", () => {
  const novoNome = prompt("Digite o nome do seu perfil:");

  if (novoNome && novoNome.trim()) {
    document.getElementById("nomePerfil").textContent = novoNome.trim();
  }

  const novaBio = prompt("Escreva uma descrição para seu perfil:");

  if (novaBio !== null && novaBio.trim()) {
    document.getElementById("bioPerfil").textContent = novaBio.trim();
  }
});

// ABRIR MEU PERFIL
document.getElementById("btnPerfil").addEventListener("click", () => {
  document.getElementById("perfil").scrollIntoView({
    behavior: "smooth"
  });
});
