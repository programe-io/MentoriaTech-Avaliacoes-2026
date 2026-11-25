
function calcular() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Verificar se os campos foram preenchidos
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Obter a área de resultado
    let resultado = document.getElementById("resultado");

    // Exibir informações do paciente
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h3>Resultado do Paciente</h3>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <hr>

        <p>
            O IMC é um indicador utilizado para relacionar
            o peso e a altura de uma pessoa.
        </p>
    `;
}
