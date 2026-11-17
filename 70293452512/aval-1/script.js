const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Variáveis e tipos de dados
    let nome = document.getElementById("nome").value.trim();

    let notas = [
        Number(document.getElementById("nota1").value),
        Number(document.getElementById("nota2").value),
        Number(document.getElementById("nota3").value)
    ];

    let soma = 0;
    let indice = 0;

    // Estrutura de repetição WHILE
    while (indice < notas.length) {

        if (
            document.getElementById("nota" + (indice + 1)).value === "" ||
            !Number.isFinite(notas[indice]) ||
            notas[indice] < 0 ||
            notas[indice] > 10
        ) {
            resultado.className = "reprovado";
            resultado.innerHTML = "Digite notas válidas entre 0 e 10.";
            return;
        }

        indice++;
    }

    // Estrutura de repetição FOR
    for (let i = 0; i < notas.length; i++) {
        soma = soma + notas[i];
    }

    // Operador aritmético
    let media = soma / notas.length;

    // Estruturas condicionais
    let situacao = "";
    let classe = "";

    if (media >= 7) {
        situacao = "Aprovado!";
        classe = "aprovado";

    } else if (media >= 5) {
        situacao = "Em recuperação!";
        classe = "recuperacao";

    } else {
        situacao = "Reprovado!";
        classe = "reprovado";
    }

    // Operadores relacionais e booleanos
    let aprovado = media >= 7;

    // Exibição dos resultados
    resultado.className = classe;

    resultado.innerHTML = `
        <h3>Resultado do Aluno</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Notas:</strong> ${notas.join(" | ")}</p>
        <p><strong>Média:</strong> ${media.toFixed(2)}</p>
        <p><strong>Situação:</strong> ${situacao}</p>
        <p><strong>Aprovado:</strong> ${aprovado ? "Sim" : "Não"}</p>
    `;
});