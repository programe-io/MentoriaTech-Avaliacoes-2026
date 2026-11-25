
// FUNÇÃO PARA MOSTRAR DICAS DE NUTRIÇÃO

function mostrarDica() {

    const dicas = [
        "🍎 Inclua frutas variadas na sua alimentação!",
        "💧 Beba água ao longo do dia!",
        "🥦 Experimente novos legumes e verduras!",
        "🍽️ Procure manter horários regulares para as refeições!",
        "🥗 Tenha uma alimentação variada e equilibrada!",
        "🏃 Pratique atividades físicas regularmente!",
        "🥕 Inclua alimentos naturais no seu dia a dia!"
    ];

    // Escolhe uma dica aleatória
    const numero = Math.floor(Math.random() * dicas.length);

    // Mostra a dica na tela
    document.getElementById("dica").innerText = dicas[numero];
}
