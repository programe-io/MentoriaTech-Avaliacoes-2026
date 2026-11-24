
function calcularIMC() {

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");

    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        resultado.innerHTML = `
            <h2>Atenção!</h2>
            <p>Preencha todos os campos corretamente.</p>
        `;
        return;
    }

    const imc = peso / (altura * altura);

    let classificacao = "";
    let mensagem = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "O resultado está abaixo da faixa considerada adequada para adultos.";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
        mensagem = "O resultado está dentro da faixa de referência para adultos.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "O resultado está acima da faixa de referência para adultos.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "O resultado indica obesidade grau I.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "O resultado indica obesidade grau II.";
    }
    else {
        classificacao = "Obesidade grau III";
        mensagem = "O resultado indica obesidade grau III.";
    }

    resultado.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = "Resultado do IMC";

    const paciente = document.createElement("p");
    paciente.textContent = "Paciente: " + nome;

    const valor = document.createElement("p");
    valor.textContent = "IMC: " + imc.toFixed(2);

    const classe = document.createElement("p");
    classe.textContent = "Classificação: " + classificacao;
    classe.style.fontWeight = "bold";

    const informacao = document.createElement("p");
    informacao.textContent = mensagem;

    resultado.append(titulo, paciente, valor, classe, informacao);
}
