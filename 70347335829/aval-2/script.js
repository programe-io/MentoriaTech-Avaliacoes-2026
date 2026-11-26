
// Função para cadastrar o usuário
function cadastrar() {

    // Capturando os dados do formulário
    let nome = document.getElementById("nome").value;
    let idade = Number(document.getElementById("idade").value);
    let altura = Number(document.getElementById("altura").value);
    let email = document.getElementById("email").value;

    // Constante com uma informação fixa
    const sistema = "Cadastro de Usuários";

    // Verificando se os campos foram preenchidos
    if (nome === "" || email === "" ||
        document.getElementById("idade").value === "" ||
        document.getElementById("altura").value === "") {

        alert("Preencha todos os campos!");
        return;
    }

    // Verificando os tipos de dados
    console.log("Nome:", nome);
    console.log("Tipo do nome:", typeof nome);

    console.log("Idade:", idade);
    console.log("Tipo da idade:", typeof idade);

    console.log("Altura:", altura);
    console.log("Tipo da altura:", typeof altura);

    console.log("E-mail:", email);
    console.log("Tipo do e-mail:", typeof email);

    // Exemplo de null e undefined
    let telefone;
    let endereco = null;

    console.log("Telefone:", telefone);
    console.log("Endereço:", endereco);

    // Exibindo os dados na página
    document.getElementById("resultado").innerHTML = `
        <h2>Cadastro realizado!</h2>
        <p><strong>Sistema:</strong> ${sistema}</p>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Altura:</strong> ${altura} metros</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p>Seja bem-vindo(a)!</p>
    `;
}
