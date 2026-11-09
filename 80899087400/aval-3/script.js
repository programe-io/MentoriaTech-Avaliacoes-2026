
// Selecionar o formulário
const formulario = document.querySelector("form");

// Criar evento de cadastro
formulario.addEventListener("submit", function(event) {

    // Impedir o recarregamento da página
    event.preventDefault();

    // Capturar os valores digitados
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let idade = document.getElementById("idade").value;
    let curso = document.getElementById("curso").value;

    // Verificar se os campos foram preenchidos
    if (nome === "" || email === "") {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Verificar a idade
    if (idade !== "" && Number(idade) <= 0) {
        alert("Digite uma idade válida!");
        return;
    }

    // Exibir mensagem de sucesso
    alert(
        "Cadastro realizado com sucesso!\n\n" +
        "Nome: " + nome +
        "\nE-mail: " + email +
        "\nIdade: " + idade +
        "\nCurso: " + curso
    );

    // Limpar os campos
    formulario.reset();

});

// Função para mostrar uma mensagem de boas-vindas
function mensagemBoasVindas() {
    alert("Bem-vindo ao Portal do Estudante!");
}

// Exibir mensagem no console
console.log("Portal do Estudante iniciado!");
