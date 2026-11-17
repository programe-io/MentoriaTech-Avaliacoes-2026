
// Recuperar dados salvos no navegador
let livros = JSON.parse(localStorage.getItem("livros")) || [];

let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

// Elementos HTML
const formLivro = document.getElementById("formLivro");
const formEmprestimo = document.getElementById("formEmprestimo");

const listaLivros = document.getElementById("listaLivros");
const listaEmprestimos = document.getElementById("listaEmprestimos");

const pesquisa = document.getElementById("pesquisa");

// Salvar dados
function salvarDados() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}

// Cadastrar livro
formLivro.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!codigo || !titulo || !autor || !categoria ||
        !Number.isSafeInteger(quantidade) || quantidade < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    if (livros.some(livro => livro.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const livro = {
        codigo,
        titulo,
        autor,
        categoria,
        quantidade,
        disponiveis: quantidade
    };

    livros.push(livro);

    salvarDados();
    listarLivros();
    atualizarResumo();

    formLivro.reset();

    alert("Livro cadastrado com sucesso!");

});

// Listar livros
function listarLivros(filtro = "") {

    listaLivros.innerHTML = "";

    livros.forEach((livro, index) => {

        const busca = filtro.toLowerCase();

        if (
            !livro.titulo.toLowerCase().includes(busca) &&
            !livro.autor.toLowerCase().includes(busca)
        ) {
            return;
        }

        const linha = document.createElement("tr");

        const dados = [
            livro.codigo,
            livro.titulo,
            livro.autor,
            livro.categoria,
            livro.disponiveis
        ];

        dados.forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        });

        const acoes = document.createElement("td");
        const div = document.createElement("div");

        div.className = "acoes";

        // Editar livro
        const editar = document.createElement("button");

        editar.textContent = "Editar";
        editar.className = "btn-editar";

        editar.addEventListener("click", () => editarLivro(index));

        // Excluir livro
        const excluir = document.createElement("button");

        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";

        excluir.addEventListener("click", () => excluirLivro(index));

        div.appendChild(editar);
        div.appendChild(excluir);

        acoes.appendChild(div);
        linha.appendChild(acoes);

        listaLivros.appendChild(linha);

    });

    atualizarSelecaoLivros();
}

// Editar livro
function editarLivro(index) {

    const livro = livros[index];

    const novoTitulo = prompt("Novo título:", livro.titulo);

    if (novoTitulo === null) return;

    const novoAutor = prompt("Novo autor:", livro.autor);

    if (novoAutor === null) return;

    const novaCategoria = prompt(
        "Nova categoria:",
        livro.categoria
    );

    if (novaCategoria === null) return;

    const novaQuantidade = prompt(
        "Nova quantidade total:",
        livro.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (
        novoTitulo.trim().length === 0 ||
        novoAutor.trim().length === 0 ||
        novaCategoria.trim().length === 0 ||
        !Number.isSafeInteger(quantidade) ||
        quantidade < 1
    ) {
        alert("Dados inválidos!");
        return;
    }

    const emprestados = livro.quantidade - livro.disponiveis;

    if (quantidade < emprestados) {
        alert("A quantidade não pode ser menor que os livros emprestados!");
        return;
    }

    livro.titulo = novoTitulo.trim();
    livro.autor = novoAutor.trim();
    livro.categoria = novaCategoria.trim();
    livro.quantidade = quantidade;
    livro.disponiveis = quantidade - emprestados;

    salvarDados();
    listarLivros(pesquisa.value);
    listarEmprestimos();
    atualizarResumo();

    alert("Livro atualizado com sucesso!");

}

// Excluir livro
function excluirLivro(index) {

    const livro = livros[index];

    const possuiEmprestimo = emprestimos.some(
        e => e.codigoLivro === livro.codigo && !e.devolvido
    );

    if (possuiEmprestimo) {
        alert("Não é possível excluir um livro que está emprestado!");
        return;
    }

    if (confirm("Deseja realmente excluir este livro?")) {

        livros.splice(index, 1);

        salvarDados();
        listarLivros(pesquisa.value);
        atualizarResumo();

        alert("Livro excluído com sucesso!");
    }
}

// Atualizar opções de livros para empréstimo
function atualizarSelecaoLivros() {

    const select = document.getElementById("livroEmprestimo");

    const valorAtual = select.value;

    select.innerHTML = '<option value="">Selecione um livro</option>';

    livros.forEach(livro => {

        if (livro.disponiveis > 0) {

            const option = document.createElement("option");

            option.value = livro.codigo;
            option.textContent =
                livro.titulo + " - Disponíveis: " + livro.disponiveis;

            select.appendChild(option);
        }

    });

    if ([...select.options].some(o => o.value === valorAtual)) {
        select.value = valorAtual;
    }
}

// Registrar empréstimo
formEmprestimo.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigoLivro =
        document.getElementById("livroEmprestimo").value;

    const aluno =
        document.getElementById("aluno").value.trim();

    const matricula =
        document.getElementById("matricula").value.trim();

    if (!codigoLivro || !aluno || !matricula) {
        alert("Preencha todos os campos!");
        return;
    }

    const livro = livros.find(
        l => l.codigo === codigoLivro
    );

    if (!livro || livro.disponiveis <= 0) {
        alert("Livro indisponível!");
        return;
    }

    const emprestimo = {
        id: Date.now(),
        codigoLivro: livro.codigo,
        titulo: livro.titulo,
        aluno: aluno,
        matricula: matricula,
        data: new Date().toLocaleDateString("pt-BR"),
        devolvido: false
    };

    emprestimos.push(emprestimo);

    livro.disponiveis--;

    salvarDados();

    listarLivros(pesquisa.value);
    listarEmprestimos();
    atualizarResumo();

    formEmprestimo.reset();

    alert("Empréstimo registrado com sucesso!");

});

// Listar empréstimos
function listarEmprestimos() {

    listaEmprestimos.innerHTML = "";

    emprestimos.forEach(emprestimo => {

        const linha = document.createElement("tr");

        const dados = [
            emprestimo.aluno,
            emprestimo.matricula,
            emprestimo.titulo,
            emprestimo.data
        ];

        dados.forEach(dado => {

            const td = document.createElement("td");

            td.textContent = dado;

            linha.appendChild(td);

        });

        const status = document.createElement("td");

        status.textContent = emprestimo.devolvido
            ? "Devolvido"
            : "Emprestado";

        status.className = emprestimo.devolvido
            ? "status-devolvido"
            : "status-ativo";

        linha.appendChild(status);

        const acao = document.createElement("td");

        if (!emprestimo.devolvido) {

            const botao = document.createElement("button");

            botao.textContent = "Devolver";
            botao.className = "btn-devolver";

            botao.addEventListener("click", () => {
                devolverLivro(emprestimo.id);
            });

            acao.appendChild(botao);

        } else {

            acao.textContent = "Finalizado";

        }

        linha.appendChild(acao);

        listaEmprestimos.appendChild(linha);

    });

}

// Registrar devolução
function devolverLivro(id) {

    const emprestimo = emprestimos.find(
        e => e.id === id
    );

    if (!emprestimo || emprestimo.devolvido) {
        return;
    }

    const livro = livros.find(
        l => l.codigo === emprestimo.codigoLivro
    );

    if (!livro) {
        alert("Livro não encontrado!");
        return;
    }

    if (confirm("Confirmar a devolução deste livro?")) {

        emprestimo.devolvido = true;

        livro.disponiveis++;

        salvarDados();

        listarLivros(pesquisa.value);
        listarEmprestimos();
        atualizarResumo();

        alert("Devolução registrada com sucesso!");

    }

}

// Atualizar indicadores
function atualizarResumo() {

    const total = livros.reduce(
        (soma, livro) => soma + livro.quantidade, 0
    );

    const disponiveis = livros.reduce(
        (soma, livro) => soma + livro.disponiveis, 0
    );

    const emprestados = emprestimos.filter(
        e => !e.devolvido
    ).length;

    document.getElementById("totalLivros").textContent = total;

    document.getElementById("disponiveis").textContent =
        disponiveis;

    document.getElementById("emprestados").textContent =
        emprestados;

}

// Pesquisar livros
pesquisa.addEventListener("input", function() {

    listarLivros(this.value);

});

// Inicializar sistema
listarLivros();
listarEmprestimos();
atualizarResumo();
