
const filmeForm = document.getElementById("filmeForm");
const situacaoForm = document.getElementById("situacaoForm");

const filmeEscolhido = document.getElementById("filmeEscolhido");
const catalogo = document.getElementById("catalogo");
const mensagem = document.getElementById("mensagem");

let filmes = [];

filmeForm.addEventListener("submit", event => {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const ano = Number(document.getElementById("ano").value);
  const genero = document.getElementById("genero").value;

  if (titulo.length < 2 || !Number.isInteger(ano) ||
      ano < 1888 || ano > 2100 || !genero) {
    mensagem.textContent = "Confira os dados do filme.";
    return;
  }

  if (filmes.some(f =>
    f.titulo.toLowerCase() === titulo.toLowerCase() &&
    f.ano === ano
  )) {
    mensagem.textContent = "Esse filme já está cadastrado.";
    return;
  }

  filmes.push({
    id: Date.now() + Math.random(),
    titulo,
    ano,
    genero,
    situacao: "Quero assistir"
  });

  filmeForm.reset();

  atualizarSelecao();
  mostrarCatalogo();

  mensagem.textContent = "Filme adicionado com sucesso!";
});

situacaoForm.addEventListener("submit", event => {
  event.preventDefault();

  const id = Number(filmeEscolhido.value);
  const situacao = document.getElementById("situacao").value;

  const filme = filmes.find(f => f.id === id);

  if (!filme || !situacao) {
    mensagem.textContent = "Selecione um filme e uma situação.";
    return;
  }

  filme.situacao = situacao;

  situacaoForm.reset();
  mostrarCatalogo();

  mensagem.textContent = "Situação atualizada!";
});

function atualizarSelecao() {
  filmeEscolhido.replaceChildren();

  const inicio = document.createElement("option");
  inicio.value = "";
  inicio.textContent = "Selecione um filme";

  filmeEscolhido.append(inicio);

  filmes.forEach(f => {
    const op = document.createElement("option");
    op.value = f.id;
    op.textContent = f.titulo;

    filmeEscolhido.append(op);
  });
}

function mostrarCatalogo() {
  catalogo.replaceChildren();

  if (!filmes.length) {
    catalogo.textContent = "Nenhum filme cadastrado.";
    return;
  }

  filmes.forEach(f => {
    const card = document.createElement("article");
    card.className = "card";

    const h = document.createElement("h3");
    h.textContent = f.titulo;

    const p = document.createElement("p");
    p.textContent = `Ano: ${f.ano} | Gênero: ${f.genero}`;

    const s = document.createElement("p");
    s.textContent = `Situação: ${f.situacao}`;

    card.append(h, p, s);
    catalogo.append(card);
  });
}

atualizarSelecao();
mostrarCatalogo();
