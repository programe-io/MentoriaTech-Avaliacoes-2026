
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("imcForm");
    const resultado = document.getElementById("resultado");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const peso = Number(document.getElementById("peso").value);
        const altura = Number(document.getElementById("altura").value);

        if (!nome || !Number.isFinite(peso) ||
            !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const imc = peso / (altura * altura);

        resultado.innerHTML = `
            <div class="result-icon">📊</div>
            <h2>Resultado do cálculo</h2>
            <p id="nomeResultado"></p>
            <h2 id="valorIMC"></h2>
            <p>Cálculo realizado com sucesso!</p>
        `;

        document.getElementById("nomeResultado").textContent =
            "Participante: " + nome;

        document.getElementById("valorIMC").textContent =
            imc.toFixed(2);
    });
});
