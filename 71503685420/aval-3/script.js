
// Recuperar livros salvos no navegador
let livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

let proximoCodigo = livros.length > 0
    ? Math.max(...livros.map(livro => livro.codigo)) + 1
    : 1;

// Elementos da página
const formulario = document.getElementById("formLivro");
const listaLivros = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisa");

// Salvar os dados
function salvarDados() {
    localStorage.setItem("biblioteca", JSON.stringify(livros));
}

// Cadastrar livro
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    if (titulo.length < 5) {
        alert("O título deve possuir pelo menos 5 caracteres!");
        return;
    }

    if (autor.length < 2) {
        alert("Digite um nome de autor válido!");
        return;
    }

    if (!categoria) {
        alert("Selecione uma categoria!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("A quantidade deve ser um número inteiro maior que zero!");
        return;
    }

    const livro = {
        codigo: proximoCodigo,
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        quantidade: quantidade,
        emprestados: 0
    };

    livros.push(livro);
    proximoCodigo++;

    salvarDados();
    listarLivros();
    formulario.reset();

    document.getElementById("quantidade").value = 1;

    alert("Livro cadastrado com sucesso!");
});

// Listar livros
function listarLivros() {
    listaLivros.replaceChildren();

    const termo = pesquisa.value.trim().toLowerCase();

    const resultado = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );

    if (resultado.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = livros.length === 0
            ? "Nenhum livro cadastrado."
            : "Nenhum livro encontrado.";
        listaLivros.appendChild(mensagem);
    }

    resultado.forEach(livro => {
        const disponiveis = livro.quantidade - livro.emprestados;

        const div = document.createElement("div");
        div.className = "livro";

        const titulo = document.createElement("h3");
        titulo.textContent = livro.titulo;

        const dados = [
            "Código: " + livro.codigo,
            "Autor: " + livro.autor,
            "Categoria: " + livro.categoria,
            "Quantidade total: " + livro.quantidade,
            "Emprestados: " + livro.emprestados,
            "Disponíveis: " + disponiveis
        ];

        div.appendChild(titulo);

        dados.forEach(texto => {
            const p = document.createElement("p");
            p.textContent = texto;
            div.appendChild(p);
        });

        const status = document.createElement("p");
        status.textContent = disponiveis > 0
            ? "Status: Disponível"
            : "Status: Indisponível";

        status.className = disponiveis > 0
            ? "disponivel"
            : "indisponivel";

        div.appendChild(status);

        // Botão de empréstimo
        const btnEmprestar = document.createElement("button");
        btnEmprestar.textContent = "Registrar empréstimo";
        btnEmprestar.className = "btn-emprestar";
        btnEmprestar.disabled = disponiveis === 0;

        btnEmprestar.addEventListener("click", function() {
            emprestarLivro(livro.codigo);
        });

        div.appendChild(btnEmprestar);

        // Botão de devolução
        const btnDevolver = document.createElement("button");
        btnDevolver.textContent = "Registrar devolução";
        btnDevolver.className = "btn-devolver";
        btnDevolver.disabled = livro.emprestados === 0;

        btnDevolver.addEventListener("click", function() {
            devolverLivro(livro.codigo);
        });

        div.appendChild(btnDevolver);

        // Botão de exclusão
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir livro";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", function() {
            excluirLivro(livro.codigo);
        });

        div.appendChild(btnExcluir);

        listaLivros.appendChild(div);
    });

    atualizarResumo();
}

// Registrar empréstimo
function emprestarLivro(codigo) {
    const livro = livros.find(l => l.codigo === codigo);

    if (!livro) return;

    if (livro.emprestados >= livro.quantidade) {
        alert("Não existem exemplares disponíveis!");
        return;
    }

    livro.emprestados++;

    salvarDados();
    listarLivros();

    alert("Empréstimo registrado com sucesso!");
}

// Registrar devolução
function devolverLivro(codigo) {
    const livro = livros.find(l => l.codigo === codigo);

    if (!livro) return;

    if (livro.emprestados <= 0) {
        alert("Não existem empréstimos para devolver!");
        return;
    }

    livro.emprestados--;

    salvarDados();
    listarLivros();

    alert("Devolução registrada com sucesso!");
}

// Excluir livro
function excluirLivro(codigo) {
    const livro = livros.find(l => l.codigo === codigo);

    if (!livro) return;

    if (livro.emprestados > 0) {
        alert("Não é possível excluir um livro que possui empréstimos pendentes!");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir o livro " + livro.titulo + "?"
    );

    if (!confirmar) return;

    livros = livros.filter(l => l.codigo !== codigo);

    salvarDados();
    listarLivros();

    alert("Livro excluído com sucesso!");
}

// Atualizar os números do painel
function atualizarResumo() {
    const total = livros.reduce(
        (soma, livro) => soma + livro.quantidade, 0
    );

    const emprestados = livros.reduce(
        (soma, livro) => soma + livro.emprestados, 0
    );

    const disponiveis = total - emprestados;

    document.getElementById("totalLivros").textContent = total;
    document.getElementById("disponiveis").textContent = disponiveis;
    document.getElementById("emprestados").textContent = emprestados;
}

// Pesquisar livros
pesquisa.addEventListener("input", listarLivros);

// Mostrar livros ao abrir a página
listarLivros();
