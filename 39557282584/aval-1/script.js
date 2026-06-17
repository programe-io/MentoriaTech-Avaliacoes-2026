let notas = [7, 8, 9, 6, 10];

function calcularMedia(lista) {
    let soma = 0;

    for (let i = 0; i < lista.length; i++) {
        soma += lista[i];
    }

    return soma / lista.length;
}

function mostrarResultado() {
    let media = calcularMedia(notas);

    let resultado = document.getElementById("resultado");

    resultado.innerHTML =
        "Notas: " + notas +
        "<br>Média: " + media.toFixed(2);
}