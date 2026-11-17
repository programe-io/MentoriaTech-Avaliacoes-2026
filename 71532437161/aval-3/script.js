
let alunos = [];
let proximaMatricula = 1;

// ELEMENTOS HTML
const formulario = document.getElementById("formAluno");
const nome = document.getElementById("nome");
const turma = document.getElementById("turma");
const nota = document.getElementById("nota");
const listaAlunos = document.getElementById("listaAlunos");

// CADASTRAR ALUNO
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeAluno = nome.value.trim();
    const turmaAluno = turma.value.trim();
    const notaAluno = Number(nota.value);

    // VALIDAR NOME
    if (nomeAluno.length < 5) {
        alert("O nome deve ter no mínimo 5 caracteres!");
        return;
    }

    // VALIDAR TURMA
    if (turmaAluno === "") {
        alert("Informe a turma do aluno!");
        return;
    }

    // VALIDAR NOTA
    if (
        nota.value === "" ||
        !Number.isFinite(notaAluno) ||
        notaAluno < 0 ||
        notaAluno > 10
    ) {
        alert("A nota deve estar entre 0 e 10!");
        return;
    }

    // CRIAR ALUNO
    const aluno = {
        matricula: proximaMatricula,
        nome: nomeAluno,
        turma: turmaAluno,
        nota: notaAluno
    };

    alunos.push(aluno);
    proximaMatricula++;

    listarAlunos();
    atualizarResumo();

    formulario.reset();

    alert("Aluno cadastrado com sucesso!");
});

// VERIFICAR SITUAÇÃO
function verificarSituacao(nota) {
    if (nota >= 7) {
        return "Aprovado";
    } else if (nota >= 5) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

// LISTAR ALUNOS
function listarAlunos() {
    listaAlunos.innerHTML = "";

    if (alunos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum aluno cadastrado.";
        mensagem.className = "vazio";
        listaAlunos.appendChild(mensagem);
        return;
    }

    alunos.forEach(function(aluno) {
        const situacao = verificarSituacao(aluno.nota);

        const elemento = document.createElement("div");
        elemento.className = "aluno";

        const titulo = document.createElement("h3");
        titulo.textContent = aluno.nome;

        const matricula = document.createElement("p");
        matricula.textContent = "Matrícula: " + aluno.matricula;

        const turmaAluno = document.createElement("p");
        turmaAluno.textContent = "Turma: " + aluno.turma;

        const notaAluno = document.createElement("p");
        notaAluno.textContent = "Nota: " + aluno.nota.toFixed(1);

        const status = document.createElement("span");
        status.textContent = situacao;
        status.className = "status";

        if (situacao === "Aprovado") {
            status.classList.add("aprovado");
        } else if (situacao === "Recuperação") {
            status.classList.add("recuperacao");
        } else {
            status.classList.add("reprovado");
        }

        // BOTÕES
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Alterar nota";
        botaoEditar.className = "editar";

        botaoEditar.addEventListener("click", function() {
            alterarNota(aluno.matricula);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir aluno";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirAluno(aluno.matricula);
        });

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);

        elemento.appendChild(titulo);
        elemento.appendChild(matricula);
        elemento.appendChild(turmaAluno);
        elemento.appendChild(notaAluno);
        elemento.appendChild(status);
        elemento.appendChild(acoes);

        listaAlunos.appendChild(elemento);
    });
}

// ALTERAR NOTA
function alterarNota(matricula) {
    const aluno = alunos.find(function(item) {
        return item.matricula === matricula;
    });

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

    const novaNota = prompt(
        "Digite a nova nota entre 0 e 10:",
        aluno.nota
    );

    if (novaNota === null) {
        return;
    }

    const valor = novaNota.trim().replace(",", ".");
    const notaAtualizada = Number(valor);

    if (
        valor === "" ||
        !Number.isFinite(notaAtualizada) ||
        notaAtualizada < 0 ||
        notaAtualizada > 10
    ) {
        alert("Digite uma nota válida entre 0 e 10!");
        return;
    }

    aluno.nota = notaAtualizada;

    listarAlunos();
    atualizarResumo();

    alert("Nota alterada com sucesso!");
}

// EXCLUIR ALUNO
function excluirAluno(matricula) {
    const confirmar = confirm(
        "Deseja realmente excluir este aluno?"
    );

    if (!confirmar) {
        return;
    }

    alunos = alunos.filter(function(aluno) {
        return aluno.matricula !== matricula;
    });

    listarAlunos();
    atualizarResumo();

    alert("Aluno excluído com sucesso!");
}

// ATUALIZAR RESUMO
function atualizarResumo() {
    const total = alunos.length;

    const aprovados = alunos.filter(function(aluno) {
        return aluno.nota >= 7;
    }).length;

    const recuperacao = alunos.filter(function(aluno) {
        return aluno.nota >= 5 && aluno.nota < 7;
    }).length;

    const reprovados = alunos.filter(function(aluno) {
        return aluno.nota < 5;
    }).length;

    document.getElementById("totalAlunos").textContent = total;
    document.getElementById("totalAprovados").textContent = aprovados;
    document.getElementById("totalRecuperacao").textContent = recuperacao;
    document.getElementById("totalReprovados").textContent = reprovados;
}

// INICIAR SISTEMA
listarAlunos();
atualizarResumo();
