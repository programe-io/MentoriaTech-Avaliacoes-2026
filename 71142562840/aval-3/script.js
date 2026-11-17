
let livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

const formulario = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisa");

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("biblioteca", JSON.stringify(livros));
}

// CADASTRAR LIVRO
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!codigo || titulo.length < 2 || !autor || !categoria) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("A quantidade deve ser pelo menos 1!");
        return;
    }

    if (livros.some(livro => livro.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const novoLivro = {
        codigo,
        titulo,
        autor,
        categoria,
        quantidade,
        emprestados: 0
    };

    livros.push(novoLivro);

    salvarDados();
    listarLivros();

    formulario.reset();

    alert("Livro cadastrado com sucesso!");
});

// LISTAR LIVROS
function listarLivros(filtro = "") {
    lista.innerHTML = "";

    const resultado = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        livro.autor.toLowerCase().includes(filtro.toLowerCase()) ||
        livro.codigo.toLowerCase().includes(filtro.toLowerCase())
    );

    if (resultado.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhum livro encontrado.
                </td>
            </tr>
        `;
    }

    resultado.forEach(livro => {
        const index = livros.indexOf(livro);

        const disponiveis = livro.quantidade - livro.emprestados;

        const linha = document.createElement("tr");

        const dados = [
            livro.codigo,
            livro.titulo,
            livro.autor,
            livro.categoria,
            disponiveis,
            livro.emprestados
        ];

        dados.forEach(dado => {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        // EDITAR
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "btn-editar";
        editar.onclick = () => editarLivro(index);

        // EMPRESTAR
        const emprestar = document.createElement("button");
        emprestar.textContent = "Emprestar";
        emprestar.className = "btn-emprestar";
        emprestar.onclick = () => emprestarLivro(index);

        // DEVOLVER
        const devolver = document.createElement("button");
        devolver.textContent = "Devolver";
        devolver.className = "btn-devolver";
        devolver.onclick = () => devolverLivro(index);

        // EXCLUIR
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.onclick = () => excluirLivro(index);

        acoes.append(editar, emprestar, devolver, excluir);

        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// EDITAR LIVRO
function editarLivro(index) {
    const livro = livros[index];

    const novoTitulo = prompt("Novo título:", livro.titulo);

    if (novoTitulo === null) return;

    const novoAutor = prompt("Novo autor:", livro.autor);

    if (novoAutor === null) return;

    const novoTituloLimpo = novoTitulo.trim();
    const novoAutorLimpo = novoAutor.trim();

    if (novoTituloLimpo.length < 2 || novoAutorLimpo.length < 2) {
        alert("Título e autor devem ter pelo menos 2 caracteres!");
        return;
    }

    livro.titulo = novoTituloLimpo;
    livro.autor = novoAutorLimpo;

    salvarDados();
    listarLivros(pesquisa.value);

    alert("Livro atualizado com sucesso!");
}

// EMPRESTAR LIVRO
function emprestarLivro(index) {
    const livro = livros[index];

    if (livro.quantidade - livro.emprestados <= 0) {
        alert("Não existem exemplares disponíveis!");
        return;
    }

    const confirmar = confirm(
        `Deseja registrar o empréstimo de "${livro.titulo}"?`
    );

    if (confirmar) {
        livro.emprestados++;

        salvarDados();
        listarLivros(pesquisa.value);

        alert("Empréstimo registrado com sucesso!");
    }
}

// DEVOLVER LIVRO
function devolverLivro(index) {
    const livro = livros[index];

    if (livro.emprestados <= 0) {
        alert("Não existem empréstimos deste livro!");
        return;
    }

    const confirmar = confirm(
        `Deseja registrar a devolução de "${livro.titulo}"?`
    );

    if (confirmar) {
        livro.emprestados--;

        salvarDados();
        listarLivros(pesquisa.value);

        alert("Devolução registrada com sucesso!");
    }
}

// EXCLUIR LIVRO
function excluirLivro(index) {
    const livro = livros[index];

    if (livro.emprestados > 0) {
        alert("Não é possível excluir um livro que possui exemplares emprestados!");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o livro "${livro.titulo}"?`
    );

    if (confirmar) {
        livros.splice(index, 1);

        salvarDados();
        listarLivros(pesquisa.value);

        alert("Livro excluído com sucesso!");
    }
}

// ATUALIZAR RESUMO
function atualizarResumo() {
    const totalLivros = livros.length;

    const totalDisponiveis = livros.reduce(
        (total, livro) =>
            total + livro.quantidade - livro.emprestados, 0
    );

    const totalEmprestados = livros.reduce(
        (total, livro) => total + livro.emprestados, 0
    );

    document.getElementById("totalLivros").textContent =
        totalLivros;

    document.getElementById("totalDisponiveis").textContent =
        totalDisponiveis;

    document.getElementById("totalEmprestados").textContent =
        totalEmprestados;
}

// PESQUISAR LIVROS
pesquisa.addEventListener("input", function() {
    listarLivros(this.value);
});

// INICIAR SISTEMA
listarLivros();
