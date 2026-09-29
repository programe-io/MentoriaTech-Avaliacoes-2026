
```javascript
function mostrarMensagem(tipo) {

    if (tipo === "facilidade") {

        document.getElementById("facilidade").textContent =
            "Aprendizado: a organização das funções principais facilitou a navegação.";

    }

    if (tipo === "melhorias") {

        document.getElementById("melhorias").textContent =
            "Aprendizado: precisamos melhorar a clareza de algumas informações.";
    }
}
```