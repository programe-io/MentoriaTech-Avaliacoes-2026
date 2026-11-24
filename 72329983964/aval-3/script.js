
// Projeto Prático: Controle de IMC

// Receber os dados do paciente
let nome = prompt("Digite o nome do paciente:");
let peso = Number(prompt("Digite o peso em kg:"));
let altura = Number(prompt("Digite a altura em metros:"));

// Verificar os dados
if (nome === null || nome.trim() === "" ||
    peso <= 0 || altura <= 0 ||
    !Number.isFinite(peso) || !Number.isFinite(altura)) {

    alert("Dados inválidos! Tente novamente.");

} else {

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC
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

    // Exibir informações do paciente
    alert(
        "===== RESULTADO DO PACIENTE =====\n\n" +
        "Nome: " + nome + "\n" +
        "Peso: " + peso + " kg\n" +
        "Altura: " + altura + " m\n" +
        "IMC: " + imc.toFixed(2) + "\n" +
        "Classificação: " + classificacao
    );

    console.log("===== CONTROLE DE IMC =====");
    console.log("Paciente: " + nome);
    console.log("Peso: " + peso + " kg");
    console.log("Altura: " + altura + " m");
    console.log("IMC: " + imc.toFixed(2));
    console.log("Classificação: " + classificacao);
}
