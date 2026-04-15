function calcularMedia() {
    let nome = document.getElementById("nome").value;
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);

    let media = (n1 + n2) / 2;

    let resultado = document.getElementById("resultado");

    if (media >= 7) {
        resultado.innerHTML = nome + " foi Aprovado com média " + media.toFixed(2);
    } else {
        resultado.innerHTML = nome + " foi Reprovado com média " + media.toFixed(2);
    }
}