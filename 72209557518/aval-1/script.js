document.getElementById("calcular").addEventListener("click", function () {

    // Variables
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);
    let n3 = Number(document.getElementById("nota3").value);

    // Calcular promedio
    let media = (n1 + n2 + n3) / 3;

    // Resultado
    let resultado = "";

    if (media >= 7) {
        resultado = "Aprobado ✅";
    } else {
        resultado = "Reprobado ❌";
    }

    // Mostrar en pantalla
    document.getElementById("resultado").innerHTML =
        "Promedio: " + media.toFixed(2) + "<br>" + resultado;
});