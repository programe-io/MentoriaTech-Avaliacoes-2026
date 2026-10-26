
const pessoas = [
    { nome: "João 1", peso: 72, altura: 1.65 },
    { nome: "João 2", peso: 65, altura: 1.68 },
    { nome: "Maria", peso: 50, altura: 1.60 },
    { nome: "Pedro", peso: 95, altura: 1.75 }
];

const tabela = document.getElementById("tabela");

pessoas.forEach(pessoa => {
    const imc = pessoa.peso / (pessoa.altura ** 2);

    let situacao;
    let classe;

    if (imc < 18.5) {
        situacao = "Abaixo do peso";
        classe = "baixo";
    } else if (imc < 25) {
        situacao = "Normal";
        classe = "normal";
    } else if (imc < 30) {
        situacao = "Sobrepeso";
        classe = "sobrepeso";
    } else {
        situacao = "Obesidade";
        classe = "obesidade";
    }

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.peso.toFixed(1)}</td>
        <td>${pessoa.altura.toFixed(2)}</td>
        <td>${imc.toFixed(1)}</td>
        <td class="${classe}">${situacao}</td>
    `;

    tabela.appendChild(linha);
});
