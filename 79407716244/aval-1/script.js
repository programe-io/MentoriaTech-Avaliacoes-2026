
const fotos = [
  {
    titulo: "Natureza incrível",
    imagem: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500"
  },
  {
    titulo: "Arquitetura moderna",
    imagem: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500"
  },
  {
    titulo: "Viagem dos sonhos",
    imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500"
  },
  {
    titulo: "Decoração elegante",
    imagem: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500"
  },
  {
    titulo: "Praia paradisíaca",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500"
  },
  {
    titulo: "Moda e estilo",
    imagem: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500"
  },
  {
    titulo: "Café e aconchego",
    imagem: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500"
  },
  {
    titulo: "Paisagem natural",
    imagem: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500"
  }
];

const galeria = document.getElementById("galeria");
const pesquisa = document.getElementById("pesquisa");

function mostrarFotos(lista) {
  galeria.innerHTML = "";

  lista.forEach(foto => {
    const card = document.createElement("div");
    card.className = "foto";

    const imagem = document.createElement("img");
    imagem.src = foto.imagem;
    imagem.alt = foto.titulo;
    imagem.loading = "lazy";

    const botao = document.createElement("button");
    botao.innerHTML = "♡";
    botao.setAttribute("aria-label", "Curtir foto");

    botao.addEventListener("click", () => {
      botao.innerHTML =
        botao.innerHTML === "♡" ? "❤️" : "♡";
    });

    const titulo = document.createElement("p");
    titulo.textContent = foto.titulo;

    card.append(imagem, botao, titulo);
    galeria.appendChild(card);
  });
}

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLowerCase();

  const filtradas = fotos.filter(foto =>
    foto.titulo.toLowerCase().includes(termo)
  );

  mostrarFotos(filtradas);
});

mostrarFotos(fotos);
