
// Selecionar os elementos do HTML
const formulario = document.getElementById("formulario");
const listaAlunos = document.getElementById("listaAlunos");

// Evento de cadastro
formulario.addEventListener("submit", function(event) {

    // Impedir o recarregamento da página
    event.preventDefault();

    // Pegar os valores digitados
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = document.getElementById("idade").value;

    // Verificar os dados
    if (nome === "" || email === "" || idade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (Number(idade) <= 0 || Number(idade) > 120) {
        alert("Digite uma idade válida!");
        return;
    }

    // Criar um novo elemento da lista
    const aluno = document.createElement("li");

    aluno.textContent =
        "Nome: " + nome +
        " | E-mail: " + email +
        " | Idade: " + idade + " anos";

    // Adicionar aluno à lista
    listaAlunos.appendChild(aluno);

    // Mostrar confirmação
    alert("Aluno cadastrado com sucesso!");

    // Limpar formulário
    formulario.reset();
});
