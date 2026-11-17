const formulario = document.getElementById("formulario");
const listaAlunos = document.getElementById("listaAlunos");

// Array para armazenar os alunos
let alunos = [];

// Função para classificar o aluno
function verificarSituacao(media) {
    if (media >= 7) {
        return "Aprovado";
    } else if (media >= 5) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

// Função para cadastrar alunos
function cadastrarAluno(nome, notas) {

    let soma = 0;

    // Repetição FOR
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }

    let media = soma / notas.length;

    // Criação de um objeto
    let aluno = {
        nome: nome,
        notas: notas,
        media: media,
        situacao: verificarSituacao(media)
    };

    alunos.push(aluno);

    mostrarAlunos();
}

// Função para mostrar os alunos
function mostrarAlunos() {

    listaAlunos.innerHTML = "";

    if (alunos.length === 0) {
        listaAlunos.textContent = "Nenhum aluno cadastrado.";
        return;
    }

    // Percorrendo o array
    alunos.forEach(function(aluno) {

        let div = document.createElement("div");
        div.className = "aluno";

        let nome = document.createElement("p");
        nome.textContent = "Aluno: " + aluno.nome;

        let notas = document.createElement("p");
        notas.textContent = "Notas: " + aluno.notas.join(", ");

        let media = document.createElement("p");
        media.textContent = "Média: " + aluno.media.toFixed(2);

        let situacao = document.createElement("p");
        situacao.textContent = "Situação: " + aluno.situacao;
        situacao.className = aluno.situacao.toLowerCase();

        div.append(nome, notas, media, situacao);
        listaAlunos.appendChild(div);
    });
}

// Evento do formulário
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();

    let notas = [
        Number(document.getElementById("nota1").value),
        Number(document.getElementById("nota2").value),
        Number(document.getElementById("nota3").value)
    ];

    if (nome === "") {
        alert("Digite o nome do aluno.");
        return;
    }

    if (notas.some(nota => !Number.isFinite(nota) || nota < 0 || nota > 10)) {
        alert("As notas devem estar entre 0 e 10.");
        return;
    }

    cadastrarAluno(nome, notas);

    formulario.reset();
});