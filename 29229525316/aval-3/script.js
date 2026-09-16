let pessoas = [
    {
        nome: "João 1",
        peso: 72,
        altura: 1.65
    },

    {
        nome: "João 2",
        peso: 65,
        altura: 1.68
    }
];

let tabela = document.getElementById("tabela");

pessoas.forEach(function(pessoa) {

    let imc = pessoa.peso / (pessoa.altura * pessoa.altura);

    let situacao = "";
    let classe = "";

    if (imc < 18.5) {
        situacao = "Abaixo do peso";
        classe = "abaixo";
    }

    else if (imc < 25) {
        situacao = "Normal";
        classe = "normal";
    }

    else if (imc < 30) {
        situacao = "Sobrepeso";
        classe = "sobrepeso";
    }

    else {
        situacao = "Obesidade";
        classe = "obesidade";
    }

    tabela.innerHTML += `
        <tr>
            <td>${pessoa.nome}</td>
            <td>${pessoa.peso}</td>
            <td>${pessoa.altura}</td>
            <td>${imc.toFixed(1)}</td>
            <td class="${classe}">${situacao}</td>
        </tr>
    `;
});