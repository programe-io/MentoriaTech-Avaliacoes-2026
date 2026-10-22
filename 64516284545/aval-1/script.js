
let numero = 0;

// Aumentar o contador
function aumentar() {
    numero++;
    atualizar();
}

// Diminuir o contador
function diminuir() {
    numero--;
    atualizar();
}

// Zerar o contador
function zerar() {
    numero = 0;
    atualizar();
}

// Atualizar o número na tela
function atualizar() {
    document.getElementById("contador").textContent = numero;
}
