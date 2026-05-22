document.getElementById("calcular").addEventListener("click", function(){

    // Variáveis
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);
    let n3 = Number(document.getElementById("nota3").value);

    // Média
    let media = (n1 + n2 + n3) / 3;

    // Resultado
    document.getElementById("resultado").innerHTML =
        "Sua média é: " + media.toFixed(2);

});