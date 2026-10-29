// Rede social simples criada inteiramente com JavaScript.
// Execute este código em uma página HTML aberta no navegador.

document.body.style.cssText =
  "margin:0;background:#f0f2f5;color:#1c1e21;font:16px Arial,sans-serif";

const estilo = document.createElement("style");
estilo.textContent = `
  * { box-sizing: border-box; }
  a { color: #1877f2; text-decoration: none; }
  button { cursor: pointer; border: 0; border-radius: 7px; padding: 10px 14px; font-weight: bold; }
  input, textarea { font: inherit; padding: 10px; border: 1px solid #ccd0d5; border-radius: 7px; }
`;
document.head.appendChild(estilo);

const pagina = document.createElement("div");
pagina.style.cssText = "max-width:700px;margin:auto;padding:16px";

function criarElemento(tag, texto, pai) {
  const elemento = document.createElement(tag);
  if (texto) elemento.textContent = texto;
  if (pai) pai.appendChild(elemento);
  return elemento;
}

const cabecalho = criarElemento("header", null, pagina);
cabecalho.style.cssText =
  "display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px";

const logo = criarElemento("h1", "Conecta", cabecalho);
logo.style.color = "#1877f2";

const navegacao = criarElemento("nav", null, cabecalho);
["Início", "Perfil", "Mensagens"].forEach((nome) => {
  const link = criarElemento("a", nome, navegacao);
  link.href = "#";
  link.style.marginLeft = "14px";
});

const formulario = criarElemento("form", null, pagina);
formulario.style.cssText =
  "margin:20px 0;padding:16px;background:white;border-radius:10px";

const campo = criarElemento("textarea", null, formulario);
campo.placeholder = "O que você está pensando?";
campo.rows = 3;
campo.required = true;
campo.maxLength = 500;
campo.style.cssText = "display:block;width:100%;resize:vertical;margin-bottom:10px";

const botaoPublicar = criarElemento("button", "Publicar", formulario);
botaoPublicar.type = "submit";
botaoPublicar.style.cssText = "background:#1877f2;color:white";

const tituloFeed = criarElemento("h2", "Feed de publicações", pagina);
const feed = criarElemento("section", null, pagina);

function adicionarPublicacao(nome, mensagem) {
  const cartao = criarElemento("article", null, feed);
  cartao.style.cssText =
    "margin:14px 0;padding:16px;background:white;border-radius:10px";

  const autor = criarElemento("h3", nome, cartao);
  autor.style.marginTop = "0";

  const texto = criarElemento("p", mensagem, cartao);

  const botoes = criarElemento("div", null, cartao);
  botoes.style.cssText = "display:flex;gap:8px;flex-wrap:wrap";

  const curtir = criarElemento("button", "Curtir", botoes);
  curtir.style.background = "#e7f3ff";
  curtir.style.color = "#1877f2";

  const comentarios = criarElemento("div", null, cartao);

  curtir.addEventListener("click", () => {
    const curtidas = Number(curtir.dataset.curtidas || 0) + 1;
    curtir.dataset.curtidas = curtidas;
    curtir.textContent = `Curtido (${curtidas})`;
  });

  const formularioComentario = criarElemento("form", null, cartao);
  formularioComentario.style.cssText = "display:flex;gap:8px;margin-top:12px";

  const entradaComentario = criarElemento("input", null, formularioComentario);
  entradaComentario.type = "text";
  entradaComentario.placeholder = "Escreva um comentário...";
  entradaComentario.required = true;
  entradaComentario.style.flex = "1";

  const enviarComentario = criarElemento("button", "Comentar", formularioComentario);
  enviarComentario.type = "submit";
  enviarComentario.style.cssText = "background:#e4e6eb;color:#1c1e21";

  formularioComentario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const comentario = entradaComentario.value.trim();

    if (comentario) {
      criarElemento("p", `Você: ${comentario}`, comentarios);
      entradaComentario.value = "";
    }
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const mensagem = campo.value.trim();

  if (mensagem) {
    adicionarPublicacao("Você", mensagem);
    campo.value = "";
  }
});

adicionarPublicacao(
  "Ana Souza",
  "Começando um projeto novo hoje. Animada para compartilhar as novidades por aqui!"
);

adicionarPublicacao(
  "Lucas Mendes",
  "Uma caminhada ao ar livre é uma ótima maneira de começar o dia."
);

document.body.appendChild(pagina);
