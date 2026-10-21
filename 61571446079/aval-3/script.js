// Captura dos elementos do DOM
const display = document.querySelector("#display");
const btnIniciar = document.querySelector("#btn-iniciar");
const btnVolta = document.querySelector("#btn-volta");
const btnZerar = document.querySelector("#btn-zerar");
const listaVoltas = document.querySelector("#lista-voltas");

// Variáveis de controle de tempo
let milissegundos = 0;
let segundos = 0;
let minutos = 0;
let intervalo = null;
let rodando = false;
let numeroVolta = 1;

// Formata números menores que 10 com zero à esquerda
function formatarTempo(valor) {
    return valor < 10 ? `0${valor}` : valor;
}

// Atualiza a exibição no HTML
function atualizarDisplay() {
    const min = formatarTempo(minutos);
    const seg = formatarTempo(segundos);
    const ms = formatarTempo(Math.floor(milissegundos / 10)); // Exibe 2 dígitos para milissegundos
    display.textContent = `${min}:${seg}:${ms}`;
}

// Lógica de contagem
function iniciarContagem() {
    milissegundos += 10;

    if (milissegundos >= 1000) {
        milissegundos = 0;
        segundos++;
    }

    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }

    atualizarDisplay();
}

// Iniciar ou Pausar o cronômetro
btnIniciar.addEventListener("click", () => {
    if (!rodando) {
        // Iniciar
        intervalo = setInterval(iniciarContagem, 10);
        rodando = true;

        btnIniciar.textContent = "Pausar";
        btnIniciar.classList.remove("btn-iniciar");
        btnIniciar.classList.add("btn-pausar");

        btnVolta.disabled = false;
        btnZerar.disabled = false;
    } else {
        // Pausar
        clearInterval(intervalo);
        rodando = false;

        btnIniciar.textContent = "Continuar";
        btnIniciar.classList.remove("btn-pausar");
        btnIniciar.classList.add("btn-iniciar");

        btnVolta.disabled = true;
    }
});

// Registrar Volta
btnVolta.addEventListener("click", () => {
    if (!rodando) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>Volta ${numeroVolta}</span>
        <span>${display.textContent}</span>
    `;

    // Insere a nova volta no topo da lista
    listaVoltas.prepend(li);
    numeroVolta++;
});

// Zerar Cronômetro
btnZerar.addEventListener("click", () => {
    clearInterval(intervalo);
    rodando = false;
    milissegundos = 0;
    segundos = 0;
    minutos = 0;
    numeroVolta = 1;

    atualizarDisplay();

    btnIniciar.textContent = "Iniciar";
    btnIniciar.classList.remove("btn-pausar");
    btnIniciar.classList.add("btn-iniciar");

    btnVolta.disabled = true;
    btnZerar.disabled = true;
    listaVoltas.innerHTML = "";
});