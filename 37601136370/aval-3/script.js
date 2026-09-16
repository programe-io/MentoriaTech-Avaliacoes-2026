function adicionarPessoa() {

    // Pegando os valores dos inputs
    const nome = document.getElementById("nome").value;
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Verificando se os dados foram preenchidos
    if (nome === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calculando o IMC
    const imc = peso / (altura * altura);

    // Descobrindo a situação
    let situacao;
    let classe;

    if (imc < 18.5) {
        situacao = "Abaixo do peso";
        classe = "abaixo";

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

    // Pegando a tabela
    const tabela = document.getElementById("tabelaPessoas");

    // Criando uma nova linha
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${peso.toFixed(1)}</td>
        <td>${altura.toFixed(2)}</td>
        <td>${imc.toFixed(1)}</td>
        <td class="${classe}">
            ${situacao}
        </td>
    `;

    // Adicionando a linha na tabela
    tabela.appendChild(linha);

    // Limpando os campos
    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
}
