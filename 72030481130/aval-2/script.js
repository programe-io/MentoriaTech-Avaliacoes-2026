
function verificar() {

    let numero = Number(document.getElementById("numero").value);

    let mensagem = "";

    switch(numero) {

        case 5:
            mensagem = "O valor é igual a 5";
            break;

        case 7:
            mensagem = "O valor é igual a 7";
            break;

        case 10:
            mensagem = "O valor é igual a 10";
            break;

        case 15:
            mensagem = "O valor é igual a 15";
            break;

        default:
            mensagem = "Valor não encontrado!";
    }

    document.getElementById("resultado").innerHTML = mensagem;
}
