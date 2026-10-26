```javascript
const pessoas = [
    { nome: "João 1", peso: 72, altura: 1.65 },
    { nome: "João 2", peso: 65, altura: 1.68 }
];

const tabela = document.getElementById("tabelaIMC");

pessoas.forEach(pessoa => {
    const imc = pessoa.peso / (pessoa.altura * pessoa.altura);

    let situacao;
    let classe;

    if (imc < 18.5) {
        situacao = "Abaixo do peso";
        classe = "abaixo";
    } else if (imc < 25) {
        situacao = "Normal";
        classe = "normal";
    } else {
        situacao = "Sobrepeso";
        classe = "sobrepeso";
    }

    const linha = document.createElement("tr");

    [
        pessoa.nome,
        pessoa.peso.toFixed(1),
        pessoa.altura.toFixed(2),
        imc.toFixed(1),
        situacao
    ].forEach((valor, indice) => {
        const celula = document.createElement("td");
        celula.textContent = valor;

        if (indice === 4) {
            celula.className = classe;
        }

        linha.appendChild(celula);
    });

    tabela.appendChild(linha);
});
```