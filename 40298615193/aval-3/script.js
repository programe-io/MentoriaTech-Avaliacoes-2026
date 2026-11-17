
function calcularIMC() {

    // Receber os dados
    const nome = document.getElementById("nome").value.trim();

    const peso = parseFloat(
        document.getElementById("peso").value
    );

    const altura = parseFloat(
        document.getElementById("altura").value
    );

    const resultado = document.getElementById("resultado");

    // Validar os campos
    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        resultado.style.display = "block";
        resultado.className = "erro";
        resultado.textContent =
            "Preencha todos os campos corretamente!";
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao;
    let informacao;
    let classe;

    // Classificar o IMC
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        informacao = "O paciente está abaixo do peso de referência.";
        classe = "abaixo";

    } else if (imc < 25) {

        classificacao = "Peso adequado";
        informacao = "O paciente está dentro da faixa de referência.";
        classe = "normal";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        informacao = "O paciente apresenta sobrepeso.";
        classe = "sobrepeso";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        informacao = "O paciente apresenta obesidade grau I.";
        classe = "obesidade";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        informacao = "O paciente apresenta obesidade grau II.";
        classe = "obesidade";

    } else {

        classificacao = "Obesidade grau III";
        informacao = "O paciente apresenta obesidade grau III.";
        classe = "obesidade";

    }

    // Mostrar resultado
    resultado.style.display = "block";
    resultado.className = classe;

    // Criar resultado sem inserir HTML fornecido pelo usuário
    resultado.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = "Resultado do Paciente";
    resultado.appendChild(titulo);

    const dados = [
        ["Nome", nome],
        ["Peso", peso + " kg"],
        ["Altura", altura + " m"],
        ["IMC", imc.toFixed(2)],
        ["Classificação", classificacao],
        ["Informação", informacao]
    ];

    dados.forEach(function(dado) {

        const p = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = dado[0] + ": ";

        p.appendChild(strong);
        p.appendChild(document.createTextNode(dado[1]));

        resultado.appendChild(p);

    });

}
