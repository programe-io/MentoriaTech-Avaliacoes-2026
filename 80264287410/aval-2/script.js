```javascript
function curtir(botao) {
    botao.classList.toggle("curtido");

    if (botao.classList.contains("curtido")) {
        botao.innerHTML = "❤️ Curtido";
    } else {
        botao.innerHTML = "🤍 Curtir";
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario) {
        alert("Comentário enviado! 💕");
    }
}
```
