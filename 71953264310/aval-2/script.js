function resposta(opcao) {
    let resultado = document.getElementById("resultado");

    if (opcao === "Brasil") {
        resultado.innerHTML = "<span>✅ Correto! O Brasil possui 5 títulos mundiais.</span>";
    } else {
        resultado.innerHTML = "<span>❌ Errado! A resposta correta é Brasil.</span>";
    }
}