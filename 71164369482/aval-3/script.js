
let livros = JSON.parse(localStorage.getItem("livros")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

const formLivro = document.getElementById("formLivro");
const formAluno = document.getElementById("formAluno");
const formEmprestimo = document.getElementById("formEmprestimo");

function salvarDados() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}

// CADASTRAR LIVRO
function cadastrarLivro(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const ano = Number(document.getElementById("ano").value);

    if (!codigo || !titulo || !autor || !categoria ||
        !Number.isInteger(ano) || ano < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (livros.some(l => l.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    livros.push({
        codigo, titulo, autor, categoria, ano,
        disponivel: true
    });

    salvarDados();
    atualizarSistema();
    formLivro.reset();

    alert("Livro cadastrado com sucesso!");
}

// CADASTRAR ALUNO
function cadastrarAluno(event) {
    event.preventDefault();

    const matricula = document.getElementById("matricula").value.trim();
    const nome = document.getElementById("nomeAluno").value.trim();

    if (!matricula || nome.length < 3) {
        alert("Informe uma matrícula e um nome válido!");
        return;
    }

    if (alunos.some(a => a.matricula === matricula)) {
        alert("Esta matrícula já está cadastrada!");
        return;
    }

    alunos.push({ matricula, nome });

    salvarDados();
    atualizarSistema();
    formAluno.reset();

    alert("Aluno cadastrado com sucesso!");
}

// EMPRÉSTIMO
function registrarEmprestimo(event) {
    event.preventDefault();

    const codigoLivro = document.getElementById("livroEmprestimo").value;
    const matriculaAluno = document.getElementById("alunoEmprestimo").value;

    const livro = livros.find(l => l.codigo === codigoLivro);
    const aluno = alunos.find(a => a.matricula === matriculaAluno);

    if (!livro || !aluno) {
        alert("Selecione um livro e um aluno!");
        return;
    }

    if (!livro.disponivel) {
        alert("Este livro já está emprestado!");
        return;
    }

    livro.disponivel = false;

    emprestimos.push({
        codigoLivro,
        matriculaAluno,
        data: new Date().toLocaleDateString("pt-BR")
    });

    salvarDados();
    atualizarSistema();
    formEmprestimo.reset();

    alert("Empréstimo realizado com sucesso!");
}

// DEVOLUÇÃO
function devolverLivro(codigoLivro) {
    if (!confirm("Deseja registrar a devolução?")) return;

    const emprestimo = emprestimos.find(
        e => e.codigoLivro === codigoLivro
    );

    if (!emprestimo) return;

    const livro = livros.find(l => l.codigo === codigoLivro);

    if (livro) livro.disponivel = true;

    emprestimos = emprestimos.filter(
        e => e.codigoLivro !== codigoLivro
    );

    salvarDados();
    atualizarSistema();

    alert("Devolução registrada!");
}

// EDITAR LIVRO
function editarLivro(codigo) {
    const livro = livros.find(l => l.codigo === codigo);

    const titulo = prompt("Novo título:", livro.titulo);
    if (titulo === null) return;

    if (titulo.trim().length < 2) {
        alert("Título inválido!");
        return;
    }

    const autor = prompt("Novo autor:", livro.autor);
    if (autor === null) return;

    if (autor.trim().length < 2) {
        alert("Autor inválido!");
        return;
    }

    livro.titulo = titulo.trim();
    livro.autor = autor.trim();

    salvarDados();
    atualizarSistema();

    alert("Livro atualizado!");
}

// EXCLUIR LIVRO
function excluirLivro(codigo) {
    if (emprestimos.some(e => e.codigoLivro === codigo)) {
        alert("Não é possível excluir um livro emprestado!");
        return;
    }

    if (!confirm("Deseja excluir este livro?")) return;

    livros = livros.filter(l => l.codigo !== codigo);

    salvarDados();
    atualizarSistema();
}

// EXCLUIR ALUNO
function excluirAluno(matricula) {
    if (emprestimos.some(e => e.matriculaAluno === matricula)) {
        alert("Este aluno possui empréstimo ativo!");
        return;
    }

    if (!confirm("Deseja excluir este aluno?")) return;

    alunos = alunos.filter(a => a.matricula !== matricula);

    salvarDados();
    atualizarSistema();
}

// LISTAR LIVROS
function mostrarLivros(filtro = "") {
    const lista = document.getElementById("listaLivros");
    lista.innerHTML = "";

    const encontrados = livros.filter(l =>
        l.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        l.autor.toLowerCase().includes(filtro.toLowerCase()) ||
        l.codigo.toLowerCase().includes(filtro.toLowerCase())
    );

    encontrados.forEach(livro => {
        const linha = document.createElement("tr");

        [
            livro.codigo,
            livro.titulo,
            livro.autor,
            livro.categoria,
            livro.ano
        ].forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        });

        const status = document.createElement("td");
        status.textContent = livro.disponivel ? "Disponível" : "Emprestado";
        status.className = livro.disponivel ? "disponivel" : "emprestado";
        linha.appendChild(status);

        const acoes = document.createElement("td");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarLivro(livro.codigo);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirLivro(livro.codigo);

        acoes.append(editar, excluir);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });
}

// LISTAR ALUNOS
function mostrarAlunos() {
    const lista = document.getElementById("listaAlunos");
    lista.innerHTML = "";

    alunos.forEach(aluno => {
        const linha = document.createElement("tr");

        const matricula = document.createElement("td");
        matricula.textContent = aluno.matricula;

        const nome = document.createElement("td");
        nome.textContent = aluno.nome;

        const acoes = document.createElement("td");

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirAluno(aluno.matricula);

        acoes.appendChild(excluir);
        linha.append(matricula, nome, acoes);
        lista.appendChild(linha);
    });
}

// LISTAR EMPRÉSTIMOS
function mostrarEmprestimos() {
    const lista = document.getElementById("listaEmprestimos");
    lista.innerHTML = "";

    emprestimos.forEach(emprestimo => {
        const livro = livros.find(l => l.codigo === emprestimo.codigoLivro);
        const aluno = alunos.find(a => a.matricula === emprestimo.matriculaAluno);

        if (!livro || !aluno) return;

        const linha = document.createElement("tr");

        [livro.titulo, aluno.nome, emprestimo.data].forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        });

        const acoes = document.createElement("td");

        const devolver = document.createElement("button");
        devolver.textContent = "Devolver";
        devolver.className = "devolver";
        devolver.onclick = () => devolverLivro(livro.codigo);

        acoes.appendChild(devolver);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });
}

// ATUALIZAR SISTEMA
function atualizarSistema() {
    document.getElementById("totalLivros").textContent = livros.length;

    document.getElementById("disponiveis").textContent =
        livros.filter(l => l.disponivel).length;

    document.getElementById("emprestados").textContent =
        livros.filter(l => !l.disponivel).length;

    document.getElementById("totalAlunos").textContent = alunos.length;

    const selectLivro = document.getElementById("livroEmprestimo");
    const selectAluno = document.getElementById("alunoEmprestimo");

    selectLivro.innerHTML = '<option value="">Selecione um livro</option>';
    selectAluno.innerHTML = '<option value="">Selecione um aluno</option>';

    livros.filter(l => l.disponivel).forEach(livro => {
        const opcao = document.createElement("option");
        opcao.value = livro.codigo;
        opcao.textContent = livro.titulo;
        selectLivro.appendChild(opcao);
    });

    alunos.forEach(aluno => {
        const opcao = document.createElement("option");
        opcao.value = aluno.matricula;
        opcao.textContent = aluno.nome;
        selectAluno.appendChild(opcao);
    });

    mostrarLivros(document.getElementById("pesquisaLivro").value);
    mostrarAlunos();
    mostrarEmprestimos();
}

// PESQUISA
document.getElementById("pesquisaLivro").addEventListener("input", function() {
    mostrarLivros(this.value);
});

// EVENTOS
formLivro.addEventListener("submit", cadastrarLivro);
formAluno.addEventListener("submit", cadastrarAluno);
formEmprestimo.addEventListener("submit", registrarEmprestimo);

// INICIAR
atualizarSistema();
