```javascript
function mostrarMensagem() {
    document.getElementById("mensagem").textContent =
        "O poder de Ladybug está na coragem e na amizade! 🐞";
}

let totalCurtidas = 0;

function curtir() {
    totalCurtidas++;

    document.getElementById("curtidas").textContent =
        totalCurtidas;
}
```