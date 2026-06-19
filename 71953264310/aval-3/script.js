function verificar(resposta) {
    const resultado = document.getElementById("resultado");

    if (resposta === 6) {
        resultado.innerHTML =
            "<span>✅ Correto! Cada equipe possui 6 jogadores em quadra.</span>";
    } else {
        resultado.innerHTML =
            "<span>❌ Resposta incorreta. A resposta correta é 6 jogadores.</span>";
    }
}