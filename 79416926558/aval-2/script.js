```javascript
function escolherDestino() {

    let destino = document.getElementById("destino").value;

    let resultado = document.getElementById("resultado");

    if (destino === "") {

        resultado.innerHTML = "Por favor, escolha um destino!";

    } else {

        resultado.innerHTML =
        "Seu próximo destino será: " + destino +
        "! Prepare as malas e boa viagem!";
    }
}
```