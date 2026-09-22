```javascript
// BOTÃO DO INÍCIO

function mostrarInicio() {

    document.getElementById("mensagemInicio").innerHTML =
        "🚀 Obrigado por visitar meu blog! Espero que você goste do conteúdo.";

}


// BOTÕES LER MAIS

function lerMais(id) {

    const texto = document.getElementById(id);

    if (texto.style.display === "block") {

        texto.style.display = "none";

    } else {

        texto.style.display = "block";

    }

}


// BOTÃO DE CONTATO

function mostrarContato() {

    document.getElementById("mensagemContato").innerHTML =
        "💜 Obrigado pela visita! Sua mensagem é muito importante.";

}
```
