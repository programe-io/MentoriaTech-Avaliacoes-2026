const blog = document.createElement("main");
blog.style.maxWidth = "800px";
blog.style.margin = "40px auto";
blog.style.padding = "0 20px";
blog.style.fontFamily = "Arial, sans-serif";
blog.style.lineHeight = "1.6";
blog.style.color = "#222";

const titulo = document.createElement("h1");
titulo.textContent = "Meu Blog";
titulo.style.color = "#5b4bdb";
blog.appendChild(titulo);

const descricao = document.createElement("p");
descricao.textContent = "Ideias, histórias e novidades.";
blog.appendChild(descricao);

const navegacao = document.createElement("nav");
navegacao.style.margin = "24px 0";

[
  ["Início", "#inicio"],
  ["Artigos", "#artigos"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"]
].forEach(([texto, destino], indice) => {
  const link = document.createElement("a");
  link.href = destino;
  link.textContent = texto;
  link.style.marginRight = "16px";
  navegacao.appendChild(link);
});

blog.appendChild(navegacao);

const artigos = document.createElement("section");
artigos.id = "artigos";

const tituloArtigos = document.createElement("h2");
tituloArtigos.textContent = "Últimos artigos";
artigos.appendChild(tituloArtigos);

const publicacoes = [
  {
    titulo: "Como começar um novo projeto",
    data: "29 de outubro de 2026",
    texto: "Todo grande projeto começa com uma ideia. Organize seus primeiros passos e transforme essa ideia em realidade."
  },
  {
    titulo: "Aprendendo algo novo todos os dias",
    data: "25 de outubro de 2026",
    texto: "Descubra maneiras simples de incluir o aprendizado na sua rotina e desenvolver novas habilidades."
  }
];

publicacoes.forEach((publicacao) => {
  const artigo = document.createElement("article");
  artigo.style.margin = "24px 0";
  artigo.style.padding = "20px";
  artigo.style.border = "1px solid #ddd";
  artigo.style.borderRadius = "10px";

  const titulo = document.createElement("h3");
  titulo.textContent = publicacao.titulo;

  const data = document.createElement("p");
  data.textContent = `Publicado em ${publicacao.data}`;
  data.style.color = "#666";

  const texto = document.createElement("p");
  texto.textContent = publicacao.texto;

  artigo.append(titulo, data, texto);
  artigos.appendChild(artigo);
});

blog.appendChild(artigos);

const sobre = document.createElement("section");
sobre.id = "sobre";

const tituloSobre = document.createElement("h2");
tituloSobre.textContent = "Sobre o blog";

const textoSobre = document.createElement("p");
textoSobre.textContent =
  "Um espaço para compartilhar ideias, experiências e conteúdos úteis.";

sobre.append(tituloSobre, textoSobre);
blog.appendChild(sobre);

const contato = document.createElement("section");
contato.id = "contato";

const tituloContato = document.createElement("h2");
tituloContato.textContent = "Contato";

const email = document.createElement("a");
email.href = "mailto:contato@meublog.com";
email.textContent = "contato@meublog.com";

contato.append(tituloContato, email);
blog.appendChild(contato);

const rodape = document.createElement("footer");
rodape.style.marginTop = "40px";
rodape.style.padding = "20px 0";
rodape.style.borderTop = "1px solid #ddd";

const direitos = document.createElement("p");
direitos.textContent = `© ${new Date().getFullYear()} Meu Blog. Todos os direitos reservados.`;

rodape.appendChild(direitos);
blog.appendChild(rodape);

document.body.appendChild(blog);
