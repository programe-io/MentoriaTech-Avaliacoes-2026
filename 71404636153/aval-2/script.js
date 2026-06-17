let milissegundos = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;

let intervalo;
let executando = false;

// Elementos do DOM
const display = document.getElementById('display');
const btnIniciar = document.getElementById('btn-iniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnZerar = document.getElementById('btn-zerar');

function iniciar() {
    if (!executando) {
        executando = true;
        // Atualiza a cada 10 milissegundos
        intervalo = setInterval(cronometro, 10);
        
        // Gerencia estado dos botões
        btnIniciar.disabled = true;
        btnPausar.disabled = false;
        btnZerar.disabled = false;
    }
}

function pausar() {
    executando = false;
    clearInterval(intervalo);
    
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
}

function zerar() {
    executando = false;
    clearInterval(intervalo);
    
    // Reseta as variáveis
    milissegundos = 0;
    segundos = 0;
    minutos = 0;
    horas = 0;
    
    // Atualiza o display manualmente para o zero
    display.innerHTML = `00:00:00.<span class="ms">00</span>`;
    
    // Reseta os botões
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnZerar.disabled = true;
}

function cronometro() {
    milissegundos += 1;

    if (milissegundos === 100) {
        milissegundos = 0;
        segundos++;
    }
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }
    if (minutos === 60) {
        minutos = 0;
        horas++;
    }

    // Formata o texto para ter sempre dois dígitos (ex: 02 em vez de 2)
    let h = horas < 10 ? '0' + horas : horas;
    let m = minutos < 10 ? '0' + minutos : minutos;
    let s = segundos < 10 ? '0' + segundos : segundos;
    let ms = milissegundos < 10 ? '0' + milissegundos : milissegundos;

    // Atualiza a tela
    display.innerHTML = `${h}:${m}:${s}.<span class="ms">${ms}</span>`;
}