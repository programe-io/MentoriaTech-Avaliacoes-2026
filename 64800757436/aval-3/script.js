3. JavaScript — script.js

javascript

function toggleMenu() {
    document.getElementById("menu")
        .classList.toggle("active");
}

// Fechar menu ao clicar nos links
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu")
            .classList.remove("active");
    });
});

// CRONÔMETRO
let segundos = 60;
let intervalo = null;

function atualizarTela() {
    let minutos = Math.floor(segundos / 60);
    let resto = segundos % 60;

    document.getElementById("tempo").textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(resto).padStart(2, "0");
}

function iniciar() {

    if (intervalo !== null || segundos <= 0) {
        return;
    }

    intervalo = setInterval(() => {

        segundos--;

        atualizarTela();

        if (segundos <= 0) {
            clearInterval(intervalo);
            intervalo = null;

            alert("Descanso finalizado! Hora de treinar!");
        }

    }, 1000);
}

function pausar() {

    clearInterval(intervalo);
    intervalo = null;
}

function reiniciar() {

    pausar();
    segundos = 60;
    atualizarTela();
}

function definirTempo(valor) {

    pausar();
    segundos = valor;
    atualizarTela();
}

atualizarTela();

console.log("BODY FIT carregado com sucesso!");
4. Divisão dos grupos musculares
Exemplo de organização semanal
Dia

Treino

Segunda	Peito e tríceps
Terça	Costas e bíceps
Quarta	Pernas completas
Quinta	Ombros e abdômen
Sexta	Corpo todo
Sábado	Descanso ou atividade leve
Domingo	Descanso
Importante: essa é uma divisão ilustrativa. O treino de sexta-feira deve ter volume ajustado para não sobrecarregar os músculos já trabalhados durante a semana. Adapte cargas, séries e exercícios ao seu nível, com orientação de um profissional de educação física.