
// LISTA DE ALUNOS

let alunos = [];

let proximaMatricula = 1;


// ELEMENTOS HTML

const formulario = document.getElementById("formAluno");

const campoNome = document.getElementById("nome");

const campoTurma = document.getElementById("turma");

const campoNota = document.getElementById("nota");

const listaAlunos = document.getElementById("listaAlunos");


// CADASTRAR ALUNO

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nomeAluno = campoNome.value.trim();

    const turmaAluno = campoTurma.value.trim();

    const notaAluno = Number(campoNota.value);


    // VALIDAR NOME

    if (nomeAluno.length < 5) {

        alert("O nome deve ter pelo menos 5 caracteres!");

        return;

    }


    // VALIDAR TURMA

    if (turmaAluno.length === 0) {

        alert("Informe a turma do aluno!");

        return;

    }


    // VALIDAR NOTA

    if (
        campoNota.value === "" ||
        !Number.isFinite(notaAluno) ||
        notaAluno < 0 ||
        notaAluno > 10
    ) {

        alert("A nota deve estar entre 0 e 10!");

        return;

    }


    // CRIAR OBJETO ALUNO

    const aluno = {

        matricula: proximaMatricula,

        nome: nomeAluno,

        turma: turmaAluno,

        nota: notaAluno

    };


    // ADICIONAR ALUNO

    alunos.push(aluno);

    proximaMatricula++;


    // ATUALIZAR SISTEMA

    listarAlunos();

    atualizarResumo();


    // LIMPAR FORMULÁRIO

    formulario.reset();

    alert("Aluno cadastrado com sucesso!");

});


// VERIFICAR SITUAÇÃO DO ALUNO

function verificarSituacao(nota) {

    if (nota >= 7) {

        return "Aprovado";

    }

    if (nota >= 5) {

        return "Recuperação";

    }

    return "Reprovado";

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


        // NOME

        const titulo = document.createElement("h3");

        titulo.textContent = aluno.nome;


        // MATRÍCULA

        const matricula = document.createElement("p");

        matricula.textContent =
            "Matrícula: " + aluno.matricula;


        // TURMA

        const turma = document.createElement("p");

        turma.textContent =
            "Turma: " + aluno.turma;


        // NOTA

        const nota = document.createElement("p");

        nota.textContent =
            "Nota: " + aluno.nota.toFixed(1);


        // SITUAÇÃO

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


        // ÁREA DOS BOTÕES

        const acoes = document.createElement("div");

        acoes.className = "acoes";


        // BOTÃO ALTERAR NOTA

        const botaoEditar = document.createElement("button");

        botaoEditar.textContent = "Alterar nota";

        botaoEditar.className = "editar";

        botaoEditar.addEventListener("click", function() {

            alterarNota(aluno.matricula);

        });


        // BOTÃO EXCLUIR

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir aluno";

        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {

            excluirAluno(aluno.matricula);

        });


        // ADICIONAR BOTÕES

        acoes.appendChild(botaoEditar);

        acoes.appendChild(botaoExcluir);


        // MONTAR CARTÃO DO ALUNO

        elemento.appendChild(titulo);

        elemento.appendChild(matricula);

        elemento.appendChild(turma);

        elemento.appendChild(nota);

        elemento.appendChild(status);

        elemento.appendChild(acoes);


        listaAlunos.appendChild(elemento);

    });

}


// ALTERAR NOTA DO ALUNO

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


    // VALIDAR NOVA NOTA

    if (
        valor === "" ||
        !Number.isFinite(notaAtualizada) ||
        notaAtualizada < 0 ||
        notaAtualizada > 10
    ) {

        alert("Digite uma nota válida entre 0 e 10!");

        return;

    }


    // ATUALIZAR NOTA

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
