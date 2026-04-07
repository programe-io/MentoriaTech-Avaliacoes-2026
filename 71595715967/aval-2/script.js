function pegarValores() {
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").innerText = "Digite valores válidos!";
        return null;
    }

    return { n1, n2 };
}

function somar() {
    let valores = pegarValores();
    if (!valores) return;

    let resultado = valores.n1 + valores.n2;
    mostrarResultado(resultado);
}

function subtrair() {
    let valores = pegarValores();
    if (!valores) return;

    let resultado = valores.n1 - valores.n2;
    mostrarResultado(resultado);
}

function multiplicar() {
    let valores = pegarValores();
    if (!valores) return;

    let resultado = valores.n1 * valores.n2;
    mostrarResultado(resultado);
}

function dividir() {
    let valores = pegarValores();
    if (!valores) return;

    if (valores.n2 === 0) {
        document.getElementById("resultado").innerText = "Não é possível dividir por zero!";
        return;
    }

    let resultado = valores.n1 / valores.n2;
    mostrarResultado(resultado);
}

function mostrarResultado(valor) {
    document.getElementById("resultado").innerText = 
        "Resultado: " + valor;
}