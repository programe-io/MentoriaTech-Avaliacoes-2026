let trackerActive = false;

let x = 48;
let y = 48;

let dx = 0.15;
let dy = 0.10;

let trackerFrame = null;

const target = document.getElementById("trackerTarget");
const arena = document.getElementById("trackerArena");
const status = document.getElementById("trackerStatus");

document.getElementById("trackerToggle")
.addEventListener("click", function() {

    trackerActive = !trackerActive;

    this.textContent = trackerActive
        ? "DESATIVAR RASTREADOR"
        : "ATIVAR RASTREADOR";

    if (trackerActive) {
        movimentarAlvo();
    } else {
        cancelAnimationFrame(trackerFrame);
        status.textContent = "Rastreador desligado.";
    }
});

function movimentarAlvo() {

    if (!trackerActive) return;

    const velocidade = Number(
        document.getElementById("trackerSpeed").value
    );

    x += dx * velocidade;
    y += dy * velocidade;

    if (x >= 94 || x <= 6) dx *= -1;
    if (y >= 85 || y <= 15) dy *= -1;

    target.style.left = x + "%";
    target.style.top = y + "%";

    status.innerHTML =
        "<span class='ok'>RASTREADOR ATIVO!</span><br>" +
        "Alvo de demonstração acompanhado.";

    trackerFrame = requestAnimationFrame(movimentarAlvo);
}

document.getElementById("trackerReset")
.addEventListener("click", function() {

    x = 48;
    y = 48;

    target.style.left = "48%";
    target.style.top = "48%";

    status.textContent = "Alvo reiniciado.";
});

document.getElementById("trackerSpeed")
.addEventListener("input", function() {

    document.getElementById("trackerSpeedValue")
    .textContent = this.value;

});