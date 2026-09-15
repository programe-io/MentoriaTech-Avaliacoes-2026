```javascript
// Mensagem do botão principal

function mostrarMensagem() {

    alert(
        "Olá! Eu sou Jenilsa Pereira Lima! " +
        "Tenho 17 anos, estudo no 2º ano do Ensino Médio, " +
        "faço cursos de Desenvolvimento, Inglês e Teologia " +
        "e também participo do Grêmio Estudantil. " +
        "Estou sempre buscando aprender e crescer! 😊"
    );

}


// Efeito no botão

const botao = document.querySelector("button");

botao.addEventListener("mouseenter", function () {

    botao.innerText = "Que legal! ✨";

});


botao.addEventListener("mouseleave", function () {

    botao.innerText = "Saiba mais sobre mim";

});
```
