
let livros = [];

window.cadastrarLivro = function() {
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const categoria = document.getElementById("categoria").value;
  const quantidade = Number(document.getElementById("quantidade").value);

  const mensagem = document.getElementById("mensagem");

  if (titulo === "" || autor === "" || categoria === "" || quantidade < 1 || !Number.isInteger(quantidade)) {
    mensagem.style.color = "#ff7777";
    mensagem.textContent = "Preencha todos os campos corretamente!";
    return;
  }

  const livro = {
    id: Date.now() + Math.random(),
    titulo: titulo,
    autor: autor,
    categoria: categoria,
    quantidade: quantidade
  };

  livros.push(livro);

  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("quantidade").value = "";

  mensagem.style.color = "#7df5a5";
  mensagem.textContent = "Livro cadastrado com sucesso!";

  listarLivros();
};

window.listarLivros = function() {
  const lista = document.getElementById("listaLivros");
  const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

  const encontrados = livros.filter(function(livro) {
    return livro.titulo.toLowerCase().includes(pesquisa) ||
           livro.autor.toLowerCase().includes(pesquisa);
  });

  document.getElementById("totalLivros").textContent = livros.length;

  if (encontrados.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum livro encontrado.</p>';
    return;
  }

  lista.innerHTML = "";

  encontrados.forEach(function(livro) {
    const item = document.createElement("div");
    item.className = "livro";

    const titulo = document.createElement("h3");
    titulo.textContent = "📘 " + livro.titulo;

    const autor = document.createElement("p");
    autor.textContent = "Autor: " + livro.autor;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + livro.categoria;

    const quantidade = document.createElement("p");
    quantidade.textContent = "Exemplares: " + livro.quantidade;

    const excluir = document.createElement("button");
    excluir.className = "botao-excluir";
    excluir.textContent = "Excluir livro";

    excluir.onclick = function() {
      window.excluirLivro(livro.id);
    };

    item.appendChild(titulo);
    item.appendChild(autor);
    item.appendChild(categoria);
    item.appendChild(quantidade);
    item.appendChild(excluir);

    lista.appendChild(item);
  });
};

window.excluirLivro = function(id) {
  livros = livros.filter(function(livro) {
    return livro.id !== id;
  });

  listarLivros();

  document.getElementById("mensagem").style.color = "#7df5a5";
  document.getElementById("mensagem").textContent = "Livro excluído com sucesso!";
};

listarLivros();
