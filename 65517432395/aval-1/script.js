const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Variáveis e tipos de dados
    let nome = document.getElementById("nome").value.trim();
    let idade = Number(document.getElementById("idade").value);
    let area = document.getElementById("area").value;

    // Validação dos dados
    if (nome === "" || area === "" || !Number.isInteger(idade) || idade < 1 || idade > 120) {
        resultado.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    // Operadores relacionais
    let maiorDeIdade = idade >= 18;

    // Exibição do perfil
    resultado.innerHTML = `
        <h3>Perfil criado com sucesso!</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Área escolhida:</strong> ${area}</p>
        <p><strong>Faixa etária:</strong>
        ${maiorDeIdade ? "18 anos ou mais" : "Menor de 18 anos"}</p>
        <p>Seu caminho profissional começa aqui!</p>
    `;

});