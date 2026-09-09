function adicionarPessoa() {

    let nome = document.getElementById("nome").value;
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Verifica se os dados foram preenchidos
    if (nome === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcula o IMC
    let imc = peso / (altura * altura);

    let situacao = "";
    let classe = "";

    // Verifica a situação da pessoa
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

    // Pega a tabela
    let tabela = document.getElementById("tabelaPessoas");

    // Cria uma nova linha
    let linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${peso.toFixed(1)} kg</td>
        <td>${altura.toFixed(2)} m</td>
        <td>${imc.toFixed(1)}</td>
        <td class="${classe}">${situacao}</td>
    `;

    // Adiciona a linha na tabela
    tabela.appendChild(linha);

    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
}
