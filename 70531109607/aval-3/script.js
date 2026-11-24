const alunoForm = document.getElementById("alunoForm");
const alunosLista = document.getElementById("alunosLista");

let alunos = [];

alunoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const turma = document.getElementById("turma").value.trim();
    const nota = Number(document.getElementById("nota").value);

    if (!nome || !turma || !Number.isFinite(nota) ||
        nota < 0 || nota > 10) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const aluno = {
        id: Date.now(),
        nome: nome,
        turma: turma,
        nota: nota
    };

    alunos.push(aluno);

    alunoForm.reset();
    mostrarAlunos();
});

function mostrarAlunos() {
    alunosLista.innerHTML = "";

    alunos.forEach(function(aluno) {
        const card = document.createElement("div");
        card.className = "aluno";

        const nome = document.createElement("p");
        nome.textContent = "Nome: " + aluno.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + aluno.turma;

        const nota = document.createElement("p");
        nota.textContent = "Nota: " + aluno.nota;

        const botao = document.createElement("button");
        botao.className = "excluir";
        botao.textContent = "Excluir";

        botao.addEventListener("click", function() {
            alunos = alunos.filter(function(item) {
                return item.id !== aluno.id;
            });

            mostrarAlunos();
        });

        card.append(nome, turma, nota, botao);
        alunosLista.appendChild(card);
    });
}