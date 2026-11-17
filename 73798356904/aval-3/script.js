
var livros = [];
var alunos = [];
var emprestimos = [];

var proximoID = 1;

// GERAR CÓDIGO
function gerarID() {
    return proximoID++;
}

// CADASTRAR LIVRO
function cadastrarLivro(event) {

    event.preventDefault();

    var titulo = document.getElementById("titulo").value.trim();
    var autor = document.getElementById("autor").value.trim();
    var categoria = document.getElementById("categoria").value.trim();
    var ano = Number(document.getElementById("ano").value);
    var quantidade = Number(document.getElementById("quantidade").value);

    if (titulo.length < 2 || autor.length < 2 || categoria.length < 2) {
        alert("Preencha os dados corretamente!");
        return;
    }

    if (!Number.isInteger(ano) || ano < 1 || ano > new Date().getFullYear()) {
        alert("Ano inválido!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Quantidade inválida!");
        return;
    }

    var livro = {
        id: gerarID(),
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        ano: ano,
        quantidade: quantidade,
        disponiveis: quantidade
    };

    livros.push(livro);

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("quantidade").value = "";

    atualizarSistema();

    alert("Livro cadastrado com sucesso!");
}

// CADASTRAR ALUNO
function cadastrarAluno(event) {

    event.preventDefault();

    var nome = document.getElementById("nomeAluno").value.trim();
    var turma = document.getElementById("turma").value.trim();

    if (nome.length < 3 || turma === "") {
        alert("Preencha o nome e a turma!");
        return;
    }

    var aluno = {
        id: gerarID(),
        nome: nome,
        turma: turma
    };

    alunos.push(aluno);

    document.getElementById("nomeAluno").value = "";
    document.getElementById("turma").value = "";

    atualizarSistema();

    alert("Aluno cadastrado com sucesso!");
}

// LISTAR LIVROS
function listarLivros() {

    var lista = document.getElementById("listaLivros");
    var pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    var encontrados = livros.filter(function(livro) {
        return livro.titulo.toLowerCase().includes(pesquisa) ||
               livro.autor.toLowerCase().includes(pesquisa);
    });

    if (encontrados.length === 0) {
        lista.innerHTML = "<p class='vazio'>Nenhum livro encontrado.</p>";
        return;
    }

    encontrados.forEach(function(livro) {

        var div = document.createElement("div");
        div.className = "item";

        var titulo = document.createElement("h3");
        titulo.textContent = livro.titulo;

        var autor = document.createElement("p");
        autor.textContent = "Autor: " + livro.autor;

        var categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + livro.categoria;

        var ano = document.createElement("p");
        ano.textContent = "Ano: " + livro.ano;

        var estoque = document.createElement("p");
        estoque.textContent = "Disponíveis: " + livro.disponiveis;

        estoque.className = livro.disponiveis > 0 ? "status" : "indisponivel";

        var botao = document.createElement("button");
        botao.textContent = "Excluir Livro";
        botao.className = "btn-excluir";

        botao.onclick = function() {
            excluirLivro(livro.id);
        };

        div.appendChild(titulo);
        div.appendChild(autor);
        div.appendChild(categoria);
        div.appendChild(ano);
        div.appendChild(estoque);
        div.appendChild(botao);

        lista.appendChild(div);
    });
}

// EXCLUIR LIVRO
function excluirLivro(id) {

    for (var i = 0; i < emprestimos.length; i++) {
        if (emprestimos[i].livroId === id && !emprestimos[i].devolvido) {
            alert("Este livro está emprestado e não pode ser excluído!");
            return;
        }
    }

    if (!confirm("Deseja excluir este livro?")) {
        return;
    }

    livros = livros.filter(function(livro) {
        return livro.id !== id;
    });

    atualizarSistema();

    alert("Livro excluído!");
}

// ATUALIZAR LISTA DE ALUNOS E LIVROS
function atualizarSeletores() {

    var alunoSelect = document.getElementById("alunoSelect");
    var livroSelect = document.getElementById("livroSelect");

    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
    livroSelect.innerHTML = '<option value="">Selecione um livro</option>';

    alunos.forEach(function(aluno) {

        var opcao = document.createElement("option");

        opcao.value = aluno.id;
        opcao.textContent = aluno.nome + " - " + aluno.turma;

        alunoSelect.appendChild(opcao);
    });

    livros.forEach(function(livro) {

        if (livro.disponiveis > 0) {

            var opcao = document.createElement("option");

            opcao.value = livro.id;
            opcao.textContent = livro.titulo + " (" + livro.disponiveis + " disponíveis)";

            livroSelect.appendChild(opcao);
        }
    });
}

// REGISTRAR EMPRÉSTIMO
function registrarEmprestimo(event) {

    event.preventDefault();

    var alunoId = Number(document.getElementById("alunoSelect").value);
    var livroId = Number(document.getElementById("livroSelect").value);
    var data = document.getElementById("dataDevolucao").value;

    if (!alunoId || !livroId || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    var aluno = alunos.find(function(a) {
        return a.id === alunoId;
    });

    var livro = livros.find(function(l) {
        return l.id === livroId;
    });

    if (!aluno || !livro) {
        alert("Aluno ou livro não encontrado!");
        return;
    }

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var dataEscolhida = new Date(data + "T00:00:00");

    if (dataEscolhida <= hoje) {
        alert("A data de devolução deve ser futura!");
        return;
    }

    if (livro.disponiveis <= 0) {
        alert("Livro indisponível!");
        return;
    }

    var emprestimo = {
        id: gerarID(),
        alunoId: alunoId,
        livroId: livroId,
        data: hoje.toLocaleDateString("pt-BR"),
        devolucao: data,
        devolvido: false
    };

    emprestimos.push(emprestimo);

    livro.disponiveis--;

    document.getElementById("dataDevolucao").value = "";

    atualizarSistema();

    alert("Empréstimo realizado com sucesso!");
}

// LISTAR EMPRÉSTIMOS
function listarEmprestimos() {

    var lista = document.getElementById("listaEmprestimos");

    lista.innerHTML = "";

    if (emprestimos.length === 0) {
        lista.innerHTML = "<p class='vazio'>Nenhum empréstimo registrado.</p>";
        return;
    }

    emprestimos.forEach(function(emp) {

        var aluno = alunos.find(function(a) {
            return a.id === emp.alunoId;
        });

        var livro = livros.find(function(l) {
            return l.id === emp.livroId;
        });

        var div = document.createElement("div");
        div.className = "item";

        var nomeLivro = document.createElement("h3");
        nomeLivro.textContent = livro ? livro.titulo : "Livro não encontrado";

        var nomeAluno = document.createElement("p");
        nomeAluno.textContent = "Aluno: " + (aluno ? aluno.nome : "Não encontrado");

        var turma = document.createElement("p");
        turma.textContent = "Turma: " + (aluno ? aluno.turma : "-");

        var data = document.createElement("p");
        data.textContent = "Empréstimo: " + emp.data;

        var devolucao = document.createElement("p");
        devolucao.textContent = "Devolução prevista: " + emp.devolucao.split("-").reverse().join("/");

        var status = document.createElement("p");
        status.textContent = emp.devolvido ? "Status: Devolvido" : "Status: Emprestado";
        status.className = emp.devolvido ? "status" : "indisponivel";

        div.appendChild(nomeLivro);
        div.appendChild(nomeAluno);
        div.appendChild(turma);
        div.appendChild(data);
        div.appendChild(devolucao);
        div.appendChild(status);

        if (!emp.devolvido) {

            var botao = document.createElement("button");

            botao.textContent = "Registrar Devolução";
            botao.className = "btn-devolver";

            botao.onclick = function() {
                devolverLivro(emp.id);
            };

            div.appendChild(botao);
        }

        lista.appendChild(div);
    });
}

// DEVOLVER LIVRO
function devolverLivro(id) {

    var emprestimo = emprestimos.find(function(e) {
        return e.id === id;
    });

    if (!emprestimo || emprestimo.devolvido) {
        alert("Empréstimo não encontrado ou já devolvido!");
        return;
    }

    if (!confirm("Confirmar a devolução do livro?")) {
        return;
    }

    emprestimo.devolvido = true;

    var livro = livros.find(function(l) {
        return l.id === emprestimo.livroId;
    });

    if (livro) {
        livro.disponiveis++;
    }

    atualizarSistema();

    alert("Livro devolvido com sucesso!");
}

// ATUALIZAR PAINEL
function atualizarResumo() {

    var totalDisponiveis = 0;
    var ativos = 0;

    livros.forEach(function(livro) {
        totalDisponiveis += livro.disponiveis;
    });

    emprestimos.forEach(function(emp) {
        if (!emp.devolvido) {
            ativos++;
        }
    });

    document.getElementById("totalLivros").textContent = livros.length;
    document.getElementById("totalAlunos").textContent = alunos.length;
    document.getElementById("totalEmprestimos").textContent = ativos;
    document.getElementById("livrosDisponiveis").textContent = totalDisponiveis;
}

// ATUALIZAR TODO O SISTEMA
function atualizarSistema() {

    listarLivros();
    listarEmprestimos();
    atualizarResumo();
    atualizarSeletores();
}

// INICIAR SISTEMA
atualizarSistema();
