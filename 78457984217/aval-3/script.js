let secreto;
let tentativas = 0;
let terminou = false;

function novoNumero() {
    secreto = Math.floor(Math.random() * 100) + 1;
}

function verificar() {
    if (terminou) return;

    const campo = document.getElementById("numero");
    const numero = Number(campo.value);
    const resultado = document.getElementById("resultado");

    if (campo.value === "" || numero < 1 || numero > 100 || !Number.isInteger(numero)) {
        resultado.textContent = "Digite um número válido!";
        return;
    }

    tentativas++;

    if (numero === secreto) {
        resultado.textContent = "🎉 ACERTOU! PARABÉNS!";
        terminou = true;
    } else if (numero < secreto) {
        resultado.textContent = "📈 Tente um número MAIOR!";
    } else {
        resultado.textContent = "📉 Tente um número MENOR!";
    }

    document.getElementById("tentativas").textContent =
        "Tentativas: " + tentativas;

    campo.value = "";
}

function reiniciar() {
    tentativas = 0;
    terminou = false;

    novoNumero();

    document.getElementById("numero").value = "";
    document.getElementById("resultado").textContent = "Boa sorte!";
    document.getElementById("tentativas").textContent = "Tentativas: 0";
}

novoNumero();