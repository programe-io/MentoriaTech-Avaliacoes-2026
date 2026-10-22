// Aguarda o carregamento completo do DOM para executar os scripts interativos
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Teste 1: Igualdade Estrita vs Simples ---
    const btnTestEquality = document.getElementById("btnTestEquality");
    const equalityResult = document.getElementById("equalityResult");

    if (btnTestEquality) {
        btnTestEquality.addEventListener("click", () => {
            let valorNumber = 10;
            let valorString = "10";

            // Comparações baseadas na aula de operadores relacionais
            let comparacaoSimples = (valorNumber == valorString);   // Compara apenas valor
            let comparacaoEstrita = (valorNumber === valorString); // Compara valor e tipo

            equalityResult.innerHTML = `
                Analisando <code>10 (number)</code> e <code>"10" (string)</code>:<br>
                • (10 == "10") &rarr; <strong>${comparacaoSimples}</strong> (considera apenas o valor)<br>
                • (10 === "10") &rarr; <strong style="color: #f87171;">${comparacaoEstrita}</strong> (considera valor e tipo estrito)
            `;
        });
    }

    // --- Teste 2: Simulador Condicional (if / else if / else) ---
    const btnCheckGrade = document.getElementById("btnCheckGrade");
    const notaInput = document.getElementById("notaInput");
    const gradeResult = document.getElementById("gradeResult");

    if (btnCheckGrade) {
        btnCheckGrade.addEventListener("click", () => {
            let nota = Number(notaInput.value);
            let conceito = "";

            // Estrutura condicional idêntica à estudada em aula
            if (isNaN(nota) || nota < 0 || nota > 100) {
                conceito = "⚠️ Por favor, insira um valor válido entre 0 e 100.";
            } else if (nota >= 90) {
                conceito = "🏆 Conceito A - Excelente! Domínio total dos fundamentos.";
            } else if (nota >= 75) {
                conceito = "⭐ Conceito B - Muito bom! Bom aproveitamento da revisão.";
            } else if (nota >= 60) {
                conceito = "👍 Conceito C - Aprovado, mas revise os pontos com atenção.";
            } else {
                conceito = "📚 Conceito D - Abaixo da média. Necessário revisar a aula.";
            }

            gradeResult.innerHTML = `Resultado para nota ${nota}: <br><strong>${conceito}</strong>`;
        });
    }

});