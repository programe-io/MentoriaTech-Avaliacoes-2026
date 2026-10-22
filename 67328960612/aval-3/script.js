```javascript
function mostrarOpiniao(tipo) {
    const mensagem = document.getElementById("mensagem");

    if (tipo === "positiva") {
        mensagem.textContent =
            "Você escolheu uma avaliação positiva. Considere as ações e os resultados que você aprova.";
    } else if (tipo === "critica") {
        mensagem.textContent =
            "Você escolheu uma avaliação crítica. Analise decisões, propostas e resultados do governo.";
    } else {
        mensagem.textContent =
            "Você escolheu uma opinião neutra. Compare diferentes fontes antes de formar sua conclusão.";
    }
}
```