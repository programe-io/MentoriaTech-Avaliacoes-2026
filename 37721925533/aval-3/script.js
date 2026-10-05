// Simulando a lista de dados sobre as pessoas (Matriz/JSON)
const pessoas = [
    { nome: "João 1", peso: 72.0, altura: 1.65 },
    { nome: "João 2", peso: 51.0, altura: 1.68 },
    { nome: "Maria", peso: 60.0, altura: 1.60 },
    { nome: "Carlos", peso: 95.0, altura: 1.75 }
];

// Seleciona o corpo da tabela no HTML
const tbody = document.querySelector("#tabela-pessoas tbody");

// Percorre a lista de pessoas para calcular e renderizar na tela
pessoas.forEach(pessoa => {
    // Fórmula do IMC: peso / (altura * altura)
    const imc = (pessoa.peso / (pessoa.altura * pessoa.altura)).toFixed(1);
    
    let situacao = "";
    let classeCor = "";

    // Regras de negócio para definir o status e a classe CSS
    if (imc < 18.5) {
        situacao = "Abaixo do peso";
        classeCor = "abaixo-peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
        situacao = "Normal";
        classeCor = "normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
        situacao = "Sobrepeso";
        classeCor = "sobrepeso";
    } else {
        situacao = "Obesidade";
        classeCor = "obesidade";
    }

    // Cria uma nova linha (tr) estruturada
    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.peso.toFixed(1)}</td>
        <td>${pessoa.altura.toFixed(2)}</td>
        <td>${imc}</td>
        <td class="${classeCor}">${situacao}</td>
    `;

    // Adiciona a linha criada dentro da tabela
    tbody.appendChild(linha);
});
