const botao = document.getElementById("calcular");

botao.addEventListener("click", function () {

    const nota1 = Number(document.getElementById("nota1").value);
    const nota2 = Number(document.getElementById("nota2").value);
    const nota3 = Number(document.getElementById("nota3").value);

    const media = (nota1 + nota2 + nota3) / 3;

    document.getElementById("resultado").innerHTML =
        `A média é: ${media.toFixed(2)}`;
});