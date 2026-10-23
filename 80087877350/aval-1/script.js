const personagens = [
  {
    id: "pennywise",
    nome: "Pennywise",
    descricao: "A entidade que assume a forma de um palhaço e aterroriza Derry.",
    foto: "https://i.redd.it/hds5dksnv37g1.png"
  },
  {
    id: "lilly",
    nome: "Lillian Bainbridge",
    descricao: "Uma jovem envolvida nos mistérios e acontecimentos assustadores de Derry.",
    foto: "https://i0.wp.com/thefilmbandit.com/wp-content/uploads/2025/12/welcome-to-derry-lilly-4.jpeg?resize=1024%2C691&ssl=1"
  },
  {
    id: "ronnie",
    nome: "Veronica Grogan",
    descricao: "Uma garota corajosa que enfrenta os mistérios da cidade.",
    foto: "https://preview.redd.it/my-favorite-character-i-worry-for-ronnie-every-episode-v0-8rtwhtplai4g1.jpeg?auto=webp&s=996a28a830c89427138c21154c03f0969aa12d9f"
  },
  {
    id: "will",
    nome: "William Hanlon",
    descricao: "Um jovem que enfrenta os segredos e o preconceito de Derry.",
    foto: "https://preview.redd.it/the-saddest-thing-about-will-hanlons-death-is-that-during-v0-koycaodqxibg1.jpg?width=427&format=pjpg&auto=webp&s=a8a2b1f9ca9161079278a79d264a014da2e97eca"
  },
  {
    id: "marge",
    nome: "Margaret Truman",
    descricao: "Amiga de Lilly, dividida entre a lealdade e o desejo de aceitação.",
    foto: "https://statico.soapcentral.com/editor/2025/12/9588e-17658001351098.jpg?w=640"
  },
  {
    id: "rich",
    nome: "Ricardo Santos",
    descricao: "Um jovem que enfrenta os perigos para proteger seus amigos.",
    foto: "https://i.pinimg.com/736x/91/62/67/916267a86916780a63c660a915eb142c.jpg"
  },
  {
    id: "teddy",
    nome: "Theodore Uris",
    descricao: "Um garoto ligado aos mistérios e às famílias de Derry.",
    foto: "https://static.wikia.nocookie.net/headhuntershorrorhouse/images/6/6b/It_-_Welcome_to_Derry_1x01_010.jpg/revision/latest?cb=20260412211337"
  },
  {
    id: "phil",
    nome: "Philip Malkin",
    descricao: "Um jovem que ajuda a investigar os acontecimentos estranhos.",
    foto: "https://i.redd.it/e964p3ehl24g1.jpg"
  },
  {
    id: "susie",
    nome: "Susie Malkin",
    descricao: "Uma das crianças envolvidas nos acontecimentos misteriosos.",
    foto: "https://static.wikia.nocookie.net/stephenking/images/f/f6/Suzie_Malkin.png/revision/latest?cb=20260213010711"
  }
];

const galeria = document.getElementById("galeria");

function lerCurtidas() {
  try {
    return JSON.parse(
      localStorage.getItem("curtidasDerry")
    ) || {};
  } catch {
    return {};
  }
}

function salvarCurtidas() {
  try {
    localStorage.setItem(
      "curtidasDerry",
      JSON.stringify(curtidas)
    );
    return true;
  } catch {
    return false;
  }
}

let curtidas = lerCurtidas();

function criarGaleria() {
  if (!galeria) {
    console.error("Não foi encontrado o elemento #galeria.");
    return;
  }

  galeria.innerHTML = "";

  personagens.forEach(personagem => {
    const estado = curtidas[personagem.id] || {};
    const total = Math.max(0, Number(estado.total) || 0);
    const gostei = estado.gostei === true;

    const card = document.createElement("article");
    card.className = "personagem";

    const img = document.createElement("img");
    img.src = personagem.foto;
    img.alt = personagem.nome;
    img.loading = "lazy";

    img.onerror = () => {
      img.onerror = null;
      img.src =
        "https://placehold.co/500x350/171717/ff3948?text=" +
        encodeURIComponent(personagem.nome);
    };

    const conteudo = document.createElement("div");
    conteudo.className = "personagem-conteudo";

    const titulo = document.createElement("h3");
    titulo.textContent = personagem.nome;

    const descricao = document.createElement("p");
    descricao.textContent = personagem.descricao;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "curtir" + (gostei ? " ativo" : "");
    botao.setAttribute("aria-pressed", String(gostei));
    botao.textContent =
      `${gostei ? "❤️" : "🤍"} ${total} ${gostei ? "Curtido" : "Curtir"}`;

    botao.addEventListener("click", () => {
      const atual = curtidas[personagem.id] || {
        total: 0,
        gostei: false
      };

      const novoEstado = !atual.gostei;

      curtidas[personagem.id] = {
        total: Math.max(
          0,
          (Number(atual.total) || 0) + (novoEstado ? 1 : -1)
        ),
        gostei: novoEstado
      };

      if (!salvarCurtidas()) {
        curtidas[personagem.id] = atual;
        alert("Não foi possível salvar a curtida.");
        return;
      }

      criarGaleria();
    });

    conteudo.append(titulo, descricao, botao);
    card.append(img, conteudo);
    galeria.appendChild(card);
  });
}

criarGaleria();

// Cria os balões flutuantes
const recipiente = document.getElementById("balloons");

if (recipiente) {
  for (let i = 0; i < 15; i++) {
    const balao = document.createElement("span");
    balao.className = "balao";
    balao.setAttribute("aria-hidden", "true");

    balao.style.left = Math.random() * 100 + "%";
    balao.style.animationDuration =
      (12 + Math.random() * 15) + "s";
    balao.style.animationDelay =
      (-Math.random() * 25) + "s";

    recipiente.appendChild(balao);
  }
}
