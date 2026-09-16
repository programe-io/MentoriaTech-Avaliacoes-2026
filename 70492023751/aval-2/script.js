// --- 1. SAUDAÇÃO INTELIGENTE BASEADA NO HORÁRIO ---
document.addEventListener('DOMContentLoaded', () => {
    const tagSaudacao = document.getElementById('saudacao-dinamica');
    const hora = new Date().getHours();
    let textoSaudacao = "Olá, mundo!";

    if (hora >= 5 && hora < 12) {
        textoSaudacao = "☀️ Bom dia! Pronta para codar?";
    } else if (hora >= 12 && hora < 18) {
        textoSaudacao = "☕ Boa tarde, foco nos estudos!";
    } else {
        textoSaudacao = "🌙 Boa noite! Hora perfeita para maratonar um dorama e programar!";
    }

    if (tagSaudacao) {
        tagSaudacao.textContent = textoSaudacao;
    }
});

// --- 2. SISTEMA INTERATIVO DE ANÁLISE FORENSE ---
document.addEventListener('DOMContentLoaded', () => {
    const btnInvestigar = document.getElementById('btn-investigar');
    const resultadoDiv = document.getElementById('resultado-investigacao');

    if (btnInvestigar) {
        btnInvestigar.addEventListener('click', () => {
            resultadoDiv.style.display = "block";
            resultadoDiv.style.backgroundColor = "rgba(139, 92, 246, 0.15)";
            resultadoDiv.style.border = "1px solid #8b5cf6";
            resultadoDiv.style.color = "#c4b5fd";
            
            resultadoDiv.innerHTML = `
                <strong>🔍 Evidência Analisada com Sucesso:</strong><br>
                Candidata: Salvadora Trindade Souza | Instituição: CETI Paulo Freire.<br>
                Status: Alto potencial detectado em Desenvolvimento de Sistemas e dedicação exemplar rumo à Perícia Criminal!
            `;
        });
    }
});