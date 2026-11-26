
const botoesCurtir = document.querySelectorAll(".post-actions button:first-child");

botoesCurtir.forEach(function(botao) {
    botao.addEventListener("click", function() {

        if (botao.textContent === "Curtir") {
            botao.textContent = "Curtido ❤️";
            botao.style.backgroundColor = "#e74c3c";
        } else {
            botao.textContent = "Curtir";
            botao.style.backgroundColor = "#1877f2";
        }

    });
});
