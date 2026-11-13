
const noticias = [
  {
    titulo: "Inteligência artificial está transformando o mundo",
    categoria: "Inteligência Artificial",
    descricao: "Conheça as novidades da inteligência artificial e como ela está mudando nossas vidas.",
    imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    data: "13/11/2026",
    conteudo: "A inteligência artificial está transformando diversos setores, desde a educação até a indústria. Novas ferramentas ajudam a automatizar tarefas, analisar informações e criar soluções inovadoras."
  },
  {
    titulo: "Novidades no mundo dos smartphones",
    categoria: "Celulares",
    descricao: "Veja o que está acontecendo no mercado de celulares e dispositivos móveis.",
    imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    data: "13/11/2026",
    conteudo: "Os smartphones continuam evoluindo com câmeras melhores, baterias mais eficientes e recursos inteligentes."
  },
  {
    titulo: "O futuro dos computadores",
    categoria: "Computadores",
    descricao: "Conheça as tendências de hardware e inovação tecnológica.",
    imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    data: "12/11/2026",
    conteudo: "Os computadores estão cada vez mais eficientes, oferecendo alto desempenho para trabalho, estudo e entretenimento."
  },
  {
    titulo: "Como proteger seus dados na internet",
    categoria: "Segurança Digital",
    descricao: "Aprenda dicas para manter suas informações pessoais protegidas.",
    imagem: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    data: "12/11/2026",
    conteudo: "Utilize senhas fortes, autenticação em duas etapas e mantenha seus dispositivos atualizados para melhorar sua segurança."
  },
  {
    titulo: "Inteligência artificial na educação",
    categoria: "Inteligência Artificial",
    descricao: "Descubra como a tecnologia pode ajudar estudantes e professores.",
    imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    data: "11/11/2026",
    conteudo: "As ferramentas de IA podem apoiar o aprendizado, auxiliar pesquisas e ajudar professores a preparar materiais educacionais."
  },
  {
    titulo: "A importância de atualizar seus aplicativos",
    categoria: "Segurança Digital",
    descricao: "Entenda por que manter seus aplicativos atualizados é importante.",
    imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    data: "10/11/2026",
    conteudo: "As atualizações podem corrigir falhas, melhorar o desempenho e trazer recursos novos aos seus aplicativos."
  }
];

const lista = document.getElementById("listaNoticias");
const pesquisa = document.getElementById("pesquisa");

let categoriaAtual = "Todos";

function mostrarNoticias() {
  const termo = pesquisa.value.toLowerCase();

  const filtradas = noticias.filter(noticia => {
    const correspondeCategoria =
      categoriaAtual === "Todos" ||
      noticia.categoria === categoriaAtual;

    const correspondePesquisa =
      noticia.titulo.toLowerCase().includes(termo) ||
      noticia.descricao.toLowerCase().includes(termo) ||
      noticia.categoria.toLowerCase().includes(termo);

    return correspondeCategoria && correspondePesquisa;
  });

  lista.innerHTML = "";

  if (filtradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
    return;
  }

  filtradas.forEach(noticia => {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("img");
    imagem.src = noticia.imagem;
    imagem.alt = noticia.titulo;
    imagem.loading = "lazy";

    const conteudo = document.createElement("div");
    conteudo.className = "card-content";

    const tag = document.createElement("small");
    tag.textContent = noticia.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = noticia.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = noticia.descricao;

    const data = document.createElement("small");
    data.textContent = noticia.data;

    const botao = document.createElement("button");
    botao.className = "ler";
    botao.textContent = "Ler notícia";

    botao.addEventListener("click", () => {
      abrirNoticia(noticia);
    });

    conteudo.append(tag, titulo, descricao, data, botao);
    card.append(imagem, conteudo);
    lista.appendChild(card);
  });
}

function abrirNoticia(noticia) {
  alert(
    noticia.titulo + "\n\n" +
    noticia.conteudo
  );
}

document.querySelectorAll(".categorias button")
  .forEach(botao => {
    botao.addEventListener("click", () => {
      document.querySelectorAll(".categorias button")
        .forEach(b => b.classList.remove("active"));

      botao.classList.add("active");

      categoriaAtual = botao.dataset.category;
      mostrarNoticias();
    });
  });

pesquisa.addEventListener("input", mostrarNoticias);

document.getElementById("formulario")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("mensagem").textContent =
      "Obrigado! Seu cadastro demonstrativo foi recebido.";

    this.reset();
  });

mostrarNoticias();
