document.querySelectorAll("button").forEach(function(botao) {
    botao.onclick = function() {
        if (botao.innerText === "Curtir") {
            botao.innerText = "❤️ Curtido";
        } else if (botao.innerText === "Comentar") {
            alert("Você clicou em comentar!");
        } else if (botao.innerText === "Publicar") {
            alert("Publicação realizada!");
        } else {
            botao.innerText = "Curtir";
        }
    };
});