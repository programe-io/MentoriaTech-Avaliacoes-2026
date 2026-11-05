```javascript
function mostrarEsporte() {

    let esporte = document.getElementById("esporte").value;

    let resultado = document.getElementById("resultado");

    if (esporte === "") {
        resultado.innerHTML = "Escolha um esporte primeiro!";
    } else {
        resultado.innerHTML =
        "Seu esporte favorito é: " + esporte + "! Continue praticando!";
    }
}
```