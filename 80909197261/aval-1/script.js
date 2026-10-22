
function iniciarCorrida() {
    const status = document.getElementById("status");

    status.textContent = "🏁 Preparando a corrida...";

    let contagem = 3;

    const intervalo = setInterval(function() {
        if (contagem > 0) {
            status.textContent = "🚦 Largada em " + contagem + "...";
            contagem--;
        } else {
            clearInterval(intervalo);

            status.textContent = "🏎️ CORRIDA INICIADA! Boa sorte!";

            status.style.color = "#00ff66";
            status.style.fontWeight = "bold";
        }
    }, 1000);
}
