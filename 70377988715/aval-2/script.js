
const livroForm = document.getElementById("livroForm");
const emprestimoForm = document.getElementById("emprestimoForm");

const livroEscolhido = document.getElementById("livroEscolhido");
const catalogo = document.getElementById("catalogo");
const historico = document.getElementById("historico");
const mensagem = document.getElementById("mensagem");

let livros = [];
let emprestimos = [];

livroForm.addEventListener("submit", event => {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);

  if (titulo.length < 2 || !autor || !categoria ||
      !Number.isInteger(quantidade) || quantidade < 1) {
    mensagem.textContent = "Confira os dados do livro.";
    return;
  }

  if (livros.some(l =>
    l.titulo.toLowerCase() === titulo.toLowerCase() &&
    l.autor.toLowerCase() === autor.toLowerCase()
  )) {
    mensagem.textContent = "Esse livro já está cadastrado.";
    return;
  }

  livros.push({
    id: Date.now() + Math.random(),
    titulo,
    autor,
    categoria,
    disponiveis: quantidade,
    total: quantidade
  });

  livroForm.reset();
  document.getElementById("quantidade").value = 1;

  atualizarSelecao();
  mostrarCatalogo();

  mensagem.textContent = "Livro cadastrado com sucesso!";
});

emprestimoForm.addEventListener("submit", event => {
  event.preventDefault();

  const id = Number(livroEscolhido.value);
  const leitor = document.getElementById("leitor").value.trim();

  const livro = livros.find(l => l.id === id);

  if (!livro || !leitor) {
    mensagem.textContent = "Selecione um livro e informe o leitor.";
    return;
  }

  if (livro.disponiveis < 1) {
    mensagem.textContent = "Não há exemplares disponíveis.";
    return;
  }

  livro.disponiveis--;

  emprestimos.unshift({
    titulo: livro.titulo,
    leitor,
    data: new Date().toLocaleString("pt-BR"),
    devolvido: false,
    livroId: livro.id
  });

  emprestimoForm.reset();

  atualizarSelecao();
  mostrarCatalogo();
  mostrarHistorico();

  mensagem.textContent = "Empréstimo registrado!";
});

function atualizarSelecao() {
  livroEscolhido.replaceChildren();

  const inicio = document.createElement("option");
  inicio.value = "";
  inicio.textContent = "Selecione um livro";
  livroEscolhido.append(inicio);

  livros.filter(l => l.disponiveis > 0).forEach(l => {
    const op = document.createElement("option");
    op.value = l.id;
    op.textContent = `${l.titulo} (${l.disponiveis} disponível(is))`;
    livroEscolhido.append(op);
  });
}

function mostrarCatalogo() {
  catalogo.replaceChildren();

  if (!livros.length) {
    catalogo.textContent = "Nenhum livro cadastrado.";
    return;
  }

  livros.forEach(l => {
    const card = document.createElement("article");
    card.className = "card";

    const h = document.createElement("h3");
    h.textContent = l.titulo;

    const p = document.createElement("p");
    p.textContent = `Autor: ${l.autor} | Categoria: ${l.categoria}`;

    const q = document.createElement("p");
    q.textContent = `Disponíveis: ${l.disponiveis} de ${l.total}`;

    card.append(h, p, q);
    catalogo.append(card);
  });
}

function mostrarHistorico() {
  historico.replaceChildren();

  if (!emprestimos.length) {
    historico.textContent = "Nenhum empréstimo registrado.";
    return;
  }

  emprestimos.forEach((e, i) => {
    const card = document.createElement("article");
    card.className = "card";

    const h = document.createElement("h3");
    h.textContent = e.titulo;

    const p = document.createElement("p");
    p.textContent = `Leitor: ${e.leitor} | Data: ${e.data}`;

    const status = document.createElement("p");
    status.textContent = e.devolvido ? "Devolvido" : "Emprestado";

    card.append(h, p, status);

    if (!e.devolvido) {
      const b = document.createElement("button");
      b.textContent = "Registrar devolução";

      b.addEventListener("click", () => {
        e.devolvido = true;

        const l = livros.find(x => x.id === e.livroId);
        if (l) l.disponiveis++;

        atualizarSelecao();
        mostrarCatalogo();
        mostrarHistorico();
      });

      card.append(b);
    }

    historico.append(card);
  });
}

atualizarSelecao();
mostrarCatalogo();
mostrarHistorico();
