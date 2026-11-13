// CARREGAMENTO DOS DADOS

let livros = JSON.parse(localStorage.getItem("livros")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

function salvarDados() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}

// NAVEGAÇÃO

function mostrarAba(nome) {
    document.querySelectorAll(".aba").forEach(aba => {
        aba.classList.remove("ativa");
    });

    document.getElementById(nome).classList.add("ativa");

    atualizarSistema();
}

// CADASTRAR LIVROS

document.getElementById("formLivro").addEventListener("submit", function(e) {

    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!titulo || !autor || !categoria || !Number.isInteger(quantidade) || quantidade < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    livros.push({
        id: Date.now(),
        titulo,
        autor,
        categoria,
        quantidade,
        disponivel: quantidade
    });

    salvarDados();

    this.reset();

    listarLivros();
    atualizarSistema();

    alert("Livro cadastrado com sucesso!");
});

// LISTAR LIVROS

function listarLivros() {

    const lista = document.getElementById("listaLivros");
    const pesquisa = document.getElementById("pesquisaLivro").value.toLowerCase();

    lista.innerHTML = "";

    const encontrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(pesquisa) ||
        livro.autor.toLowerCase().includes(pesquisa)
    );

    if (encontrados.length === 0) {
        lista.innerHTML = "<p>Nenhum livro encontrado.</p>";
    }

    encontrados.forEach(livro => {

        lista.innerHTML += `
            <div class="item">
                <h3>${escapar(livro.titulo)}</h3>
                <p>Autor: ${escapar(livro.autor)}</p>
                <p>Categoria: ${escapar(livro.categoria)}</p>
                <p>Quantidade total: ${livro.quantidade}</p>
                <p>Disponíveis: ${livro.disponivel}</p>

                <button class="excluir"
                    onclick="excluirLivro(${livro.id})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// EXCLUIR LIVROS

function excluirLivro(id) {

    const possuiEmprestimo = emprestimos.some(e =>
        e.livroId === id && !e.devolvido
    );

    if (possuiEmprestimo) {
        alert("Não é possível excluir um livro emprestado!");
        return;
    }

    if (confirm("Deseja excluir este livro?")) {

        livros = livros.filter(livro => livro.id !== id);

        salvarDados();
        atualizarSistema();
    }
}

// CADASTRAR ALUNOS

document.getElementById("formAluno").addEventListener("submit", function(e) {

    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const turma = document.getElementById("turma").value.trim();

    if (nome.length < 3 || !matricula || !turma) {
        alert("Preencha os dados corretamente!");
        return;
    }

    if (alunos.some(a => a.matricula.toLowerCase() === matricula.toLowerCase())) {
        alert("Esta matrícula já está cadastrada!");
        return;
    }

    alunos.push({
        id: Date.now(),
        nome,
        matricula,
        turma
    });

    salvarDados();

    this.reset();

    listarAlunos();
    atualizarSistema();

    alert("Aluno cadastrado com sucesso!");
});

// LISTAR ALUNOS

function listarAlunos() {

    const lista = document.getElementById("listaAlunos");

    lista.innerHTML = "";

    if (alunos.length === 0) {
        lista.innerHTML = "<p>Nenhum aluno cadastrado.</p>";
    }

    alunos.forEach(aluno => {

        lista.innerHTML += `
            <div class="item">
                <h3>${escapar(aluno.nome)}</h3>
                <p>Matrícula: ${escapar(aluno.matricula)}</p>
                <p>Turma: ${escapar(aluno.turma)}</p>

                <button class="excluir"
                    onclick="excluirAluno(${aluno.id})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// EXCLUIR ALUNOS

function excluirAluno(id) {

    const possuiEmprestimo = emprestimos.some(e =>
        e.alunoId === id && !e.devolvido
    );

    if (possuiEmprestimo) {
        alert("O aluno possui empréstimo ativo!");
        return;
    }

    if (confirm("Deseja excluir este aluno?")) {

        alunos = alunos.filter(aluno => aluno.id !== id);

        salvarDados();
        atualizarSistema();
    }
}

// ATUALIZAR LISTAS DE SELEÇÃO

function atualizarSeletores() {

    const selectAluno = document.getElementById("alunoEmprestimo");
    const selectLivro = document.getElementById("livroEmprestimo");

    const alunoAtual = selectAluno.value;
    const livroAtual = selectLivro.value;

    selectAluno.innerHTML = '<option value="">Escolha um aluno</option>';
    selectLivro.innerHTML = '<option value="">Escolha um livro</option>';

    alunos.forEach(aluno => {

        selectAluno.innerHTML += `
            <option value="${aluno.id}">
                ${escapar(aluno.nome)}
            </option>
        `;
    });

    livros.filter(livro => livro.disponivel > 0).forEach(livro => {

        selectLivro.innerHTML += `
            <option value="${livro.id}">
                ${escapar(livro.titulo)}
            </option>
        `;
    });

    selectAluno.value = alunoAtual;
    selectLivro.value = livroAtual;
}

// REGISTRAR EMPRÉSTIMOS

document.getElementById("formEmprestimo").addEventListener("submit", function(e) {

    e.preventDefault();

    const alunoId = Number(document.getElementById("alunoEmprestimo").value);
    const livroId = Number(document.getElementById("livroEmprestimo").value);

    const aluno = alunos.find(a => a.id === alunoId);
    const livro = livros.find(l => l.id === livroId);

    if (!aluno || !livro || livro.disponivel < 1) {
        alert("Selecione um aluno e um livro disponível!");
        return;
    }

    livro.disponivel--;

    emprestimos.push({
        id: Date.now(),
        alunoId,
        livroId,
        data: new Date().toLocaleDateString("pt-BR"),
        devolvido: false
    });

    salvarDados();

    this.reset();

    listarEmprestimos();
    atualizarSistema();

    alert("Empréstimo registrado com sucesso!");
});

// LISTAR EMPRÉSTIMOS

function listarEmprestimos() {

    const lista = document.getElementById("listaEmprestimos");

    lista.innerHTML = "";

    if (emprestimos.length === 0) {
        lista.innerHTML = "<p>Nenhum empréstimo registrado.</p>";
    }

    emprestimos.forEach(emp => {

        const aluno = alunos.find(a => a.id === emp.alunoId);
        const livro = livros.find(l => l.id === emp.livroId);

        const nomeAluno = aluno ? aluno.nome : "Aluno removido";
        const nomeLivro = livro ? livro.titulo : "Livro removido";

        lista.innerHTML += `
            <div class="item">
                <h3>${escapar(nomeLivro)}</h3>

                <p>Aluno: ${escapar(nomeAluno)}</p>

                <p>Data: ${emp.data}</p>

                <p>Status:
                    ${emp.devolvido ? "Devolvido" : "Emprestado"}
                </p>

                ${!emp.devolvido ? `
                    <button class="devolver"
                        onclick="devolverLivro(${emp.id})">
                        Registrar Devolução
                    </button>
                ` : ""}
            </div>
        `;
    });
}

// DEVOLVER LIVROS

function devolverLivro(id) {

    const emprestimo = emprestimos.find(e => e.id === id);

    if (!emprestimo || emprestimo.devolvido) {
        return;
    }

    const livro = livros.find(l => l.id === emprestimo.livroId);

    if (!livro) {
        alert("Livro não encontrado!");
        return;
    }

    if (confirm("Confirmar a devolução deste livro?")) {

        emprestimo.devolvido = true;

        livro.disponivel++;

        salvarDados();

        atualizarSistema();

        alert("Devolução realizada com sucesso!");
    }
}

// ATUALIZAR PAINEL

function atualizarSistema() {

    document.getElementById("totalLivros").textContent =
        livros.reduce((total, livro) => total + livro.quantidade, 0);

    document.getElementById("totalAlunos").textContent =
        alunos.length;

    document.getElementById("totalEmprestimos").textContent =
        emprestimos.filter(e => !e.devolvido).length;

    listarLivros();
    listarAlunos();
    listarEmprestimos();
    atualizarSeletores();
}

// PROTEÇÃO DE TEXTO INSERIDO PELO USUÁRIO

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// INICIALIZAÇÃO

atualizarSistema();