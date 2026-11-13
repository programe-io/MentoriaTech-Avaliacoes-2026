
let livros = JSON.parse(localStorage.getItem("biblioteca")) || [];
let indiceEdicao = null;

const form = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisa");

function salvarDados() {
    localStorage.setItem("biblioteca", JSON.stringify(livros));
}

function atualizarDashboard() {
    document.getElementById("totalLivros").textContent = livros.length;

    document.getElementById("disponiveis").textContent =
        livros.filter(l => !l.emprestado).length;

    document.getElementById("emprestados").textContent =
        livros.filter(l => l.emprestado).length;
}

function cadastrarLivro(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    if (!titulo || !autor || !categoria || !isbn) {
        alert("Preencha todos os campos!");
        return;
    }

    const duplicado = livros.some((livro, index) =>
        livro.isbn.toLowerCase() === isbn.toLowerCase() &&
        index !== indiceEdicao
    );

    if (duplicado) {
        alert("Esse código já está cadastrado!");
        return;
    }

    if (indiceEdicao === null) {
        livros.push({
            titulo,
            autor,
            categoria,
            isbn,
            emprestado: false,
            emprestadoPara: ""
        });

        alert("Livro cadastrado com sucesso!");
    } else {
        livros[indiceEdicao].titulo = titulo;
        livros[indiceEdicao].autor = autor;
        livros[indiceEdicao].categoria = categoria;
        livros[indiceEdicao].isbn = isbn;

        alert("Livro atualizado com sucesso!");
    }

    salvarDados();
    form.reset();
    indiceEdicao = null;
    document.getElementById("btnSalvar").textContent = "Cadastrar livro";
    document.getElementById("btnCancelar").hidden = true;

    listarLivros();
}

function listarLivros() {
    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    livros.forEach((livro, index) => {
        const corresponde =
            livro.titulo.toLowerCase().includes(termo) ||
            livro.autor.toLowerCase().includes(termo) ||
            livro.categoria.toLowerCase().includes(termo) ||
            livro.isbn.toLowerCase().includes(termo);

        if (!corresponde) return;

        const linha = document.createElement("tr");

        const dados = [
            livro.titulo,
            livro.autor,
            livro.categoria,
            livro.isbn
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const status = document.createElement("td");
        status.className = "status " +
            (livro.emprestado ? "emprestado" : "disponivel");

        status.textContent = livro.emprestado
            ? "Emprestado"
            : "Disponível";

        if (livro.emprestadoPara) {
            status.title = "Com: " + livro.emprestadoPara;
        }

        linha.appendChild(status);

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const editar = criarBotao("Editar", "editar", index);
        const emprestar = criarBotao(
            livro.emprestado ? "Devolver" : "Emprestar",
            livro.emprestado ? "devolver" : "",
            index
        );
        const excluir = criarBotao("Excluir", "excluir", index);

        acoes.append(editar, emprestar, excluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });

    atualizarDashboard();
}

function criarBotao(texto, classe, index) {
    const botao = document.createElement("button");

    botao.textContent = texto;
    botao.className = classe;
    botao.dataset.acao = classe || "emprestar";
    botao.dataset.index = index;

    return botao;
}

function editarLivro(index) {
    const livro = livros[index];

    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("categoria").value = livro.categoria;
    document.getElementById("isbn").value = livro.isbn;

    indiceEdicao = index;

    document.getElementById("btnSalvar").textContent = "Salvar alterações";
    document.getElementById("btnCancelar").hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirLivro(index) {
    if (livros[index].emprestado) {
        alert("Devolva o livro antes de excluí-lo!");
        return;
    }

    if (confirm("Deseja realmente excluir este livro?")) {
        livros.splice(index, 1);

        salvarDados();
        listarLivros();

        alert("Livro excluído!");
    }
}

function emprestarLivro(index) {
    const aluno = prompt("Digite o nome do aluno:");

    if (aluno === null) return;

    if (!aluno.trim()) {
        alert("Digite o nome do aluno!");
        return;
    }

    livros[index].emprestado = true;
    livros[index].emprestadoPara = aluno.trim();

    salvarDados();
    listarLivros();

    alert("Empréstimo registrado com sucesso!");
}

function devolverLivro(index) {
    if (confirm("Confirmar a devolução deste livro?")) {
        livros[index].emprestado = false;
        livros[index].emprestadoPara = "";

        salvarDados();
        listarLivros();

        alert("Devolução registrada com sucesso!");
    }
}

lista.addEventListener("click", function(event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    const index = Number(botao.dataset.index);
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarLivro(index);
    } else if (acao === "excluir") {
        excluirLivro(index);
    } else if (acao === "devolver") {
        devolverLivro(index);
    } else if (acao === "emprestar") {
        emprestarLivro(index);
    }
});

form.addEventListener("submit", cadastrarLivro);

pesquisa.addEventListener("input", listarLivros);

document.getElementById("btnCancelar").addEventListener("click", function() {
    form.reset();
    indiceEdicao = null;

    document.getElementById("btnSalvar").textContent = "Cadastrar livro";
    this.hidden = true;
});

listarLivros();
