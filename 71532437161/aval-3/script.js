
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    // Impede que a página seja recarregada
    event.preventDefault();

    // Recebe os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validação dos dados
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        resultado.style.display = "block";
        resultado.textContent = "Por favor, informe dados válidos.";
        return;
    }

    // Calcula o IMC
    const imc = peso / (altura * altura);

    // Define a classificação
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    // Limpa o resultado anterior
    resultado.innerHTML = "";

    // Cria os elementos do resultado
    const titulo = document.createElement("h3");
    titulo.textContent = "Resultado do paciente";

    const paragrafoNome = document.createElement("p");
    paragrafoNome.textContent = "Nome: " + nome;

    const paragrafoImc = document.createElement("p");
    paragrafoImc.textContent = "Seu IMC: " + imc.toFixed(2);

    const paragrafoClassificacao = document.createElement("p");
    paragrafoClassificacao.textContent =
        "Classificação: " + classificacao;

    // Adiciona os elementos na página
    resultado.appendChild(titulo);
    resultado.appendChild(paragrafoNome);
    resultado.appendChild(paragrafoImc);
    resultado.appendChild(paragrafoClassificacao);

    // Exibe o resultado
    resultado.style.display = "block";

});
