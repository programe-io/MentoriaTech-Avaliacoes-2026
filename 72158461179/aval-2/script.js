function verificarNumero() {

    let número = Number(document.getElementById("numero").value);

    let resultado = document.getElementById("resultado");

    switch (número) {

        case 5:
            resultado.innerHTML = "O valor é igual a 5";
            break;

        case 7:
            resultado.innerHTML = "O valor é igual a 7";
            break;

        case 10:
            resultado.innerHTML = "O valor é igual a 10";
            break;

        case 15:
            resultado.innerHTML = "O valor é igual a 15";
            break;

        default:
            resultado.innerHTML = "Não tenho um case para esse valor específico";
            break;
    }
}