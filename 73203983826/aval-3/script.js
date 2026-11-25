
document.getElementById("formIMC").addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        alert("Informe dados válidos!");
        return;
    }

    // Calcular IMC
    let imc = peso / (altura * altura);

    // Exibir resultado
    document.getElementById("resultado").innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, c =>
            ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <h3>IMC: ${imc.toFixed(2)}</h3>

        <p>O IMC é um indicador que relaciona peso e altura.
        Sua interpretação depende da idade e de outros fatores de saúde.</p>

        <p>Procure um profissional de saúde para avaliar
        corretamente o resultado.</p>
    `;
});
