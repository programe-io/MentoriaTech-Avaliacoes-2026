
// Alternar entre tema claro e escuro

const temaBtn = document.getElementById("tema");

temaBtn.addEventListener("click", function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});


// Dicas interativas

const dicas = [
    "Organize seus horários para conciliar estudos e atividades físicas.",
    "Respeite seu tempo de descanso e tenha boas noites de sono.",
    "Mantenha uma alimentação variada e equilibrada.",
    "Procure orientação profissional antes de iniciar exercícios.",
    "Escolha atividades físicas que você goste de praticar."
];

let contador = 0;

const dicaBtn = document.getElementById("dicaBtn");
const resultado = document.getElementById("resultado");

dicaBtn.addEventListener("click", function() {

    resultado.textContent = dicas[contador];

    contador++;

    if (contador >= dicas.length) {
        contador = 0;
    }

});
