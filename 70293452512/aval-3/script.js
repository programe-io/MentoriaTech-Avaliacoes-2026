const formulario = document.getElementById("formulario");
const listaAlunos = document.getElementById("listaAlunos");

// Recuperando os dados salvos
let alunos = JSON.parse(
    localStorage.getItem("alunosEducaNotas") || "[]"
);

// Função para salvar os dados
function salvarDados() {
    localStorage.setItem(
        "alunosEducaNotas",
        JSON.stringify(alunos)
    );
}

// Função para calcular a média
function calcularMedia(notas) {

    let soma = 0;

    for (let nota of notas) {
        soma += nota;
    }

    return soma / notas.length;
}

// Função para verificar a situação
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

    let aluno = {
        id: Date.now(),
        nome: nome,
        notas: notas,
        media: calcularMedia(notas),
        situacao: ""
    };

    aluno.situacao = verificarSituacao(aluno.media);

    alunos.push(aluno);

    salvarDados();
    atualizarPainel();
}

// Função para excluir um aluno
function excluirAluno(id) {

    alunos = alunos.filter(function(aluno) {
        return aluno.id !== id;
    });

    salvarDados();
    atualizarPainel();
}

// Função para atualizar as estatísticas
function atualizarEstatisticas() {

    let aprovados = 0;
    let recuperacao = 0;
    let reprovados = 0;

    // Estrutura FOR
    for (let i = 0; i < alunos.length; i++) {

        if (alunos[i].situacao === "Aprovado") {
            aprovados++;
        } else if (alunos[i].situacao === "Recuperação") {
            recuperacao++;
        } else {
            reprovados++;
        }
    }

    document.getElementById("total").textContent = alunos.length;
    document.getElementById("aprovados").textContent = aprovados;
    document.getElementById("recuperacao").textContent = recuperacao;
    document.getElementById("reprovados").textContent = reprovados;
}

// Função para mostrar os alunos
function mostrarAlunos() {

    listaAlunos.innerHTML = "";

    if (alunos.length === 0) {
        listaAlunos.textContent = "Nenhum aluno cadastrado.";
        return;
    }

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

        let botao = document.createElement("button");
        botao.textContent = "Excluir aluno";
        botao.className = "excluir";

        botao.addEventListener("click", function() {
            excluirAluno(aluno.id);
        });

        div.append(nome, notas, media, situacao, botao);

        listaAlunos.appendChild(div);
    });
}

// Atualização geral do sistema
function atualizarPainel() {
    mostrarAlunos();
    atualizarEstatisticas();
}

// Evento de cadastro
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
        alert("Digite notas entre 0 e 10.");
        return;
    }

    cadastrarAluno(nome, notas);

    formulario.reset();
});

// Inicialização do sistema
atualizarPainel();