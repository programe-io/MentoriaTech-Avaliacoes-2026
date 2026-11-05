```javascript
function enviarOpiniao() {

    let opiniao = document.getElementById("opiniao").value;

    let resultado = document.getElementById("resultado");

    if (opiniao === "") {

        resultado.innerHTML = "Selecione um tema primeiro!";

    } else {

        resultado.innerHTML =
        "Você escolheu: " + opiniao +
        ". Sua participação é importante!";
    }
}
```