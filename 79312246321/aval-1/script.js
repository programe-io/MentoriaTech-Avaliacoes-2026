
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {
    let curtido = false;
    let contador = 0;

    botao.addEventListener("click", function() {
        curtido = !curtido;
        contador = curtido ? 1 : 0;

        botao.querySelector("span").textContent = contador;
        botao.textContent = curtido
            ? "❤️ Curtido "
            : "🤎 Curtir ";

        const span = document.createElement("span");
        span.textContent = contador;
        botao.appendChild(span);
    });
});

const botaoReceita = document.querySelector("#botaoReceita");
const ingredientes = document.querySelector("#ingredientes");

botaoReceita.addEventListener("click", function() {
    ingredientes.classList.toggle("escondido");

    botaoReceita.textContent =
        ingredientes.classList.contains("escondido")
            ? "Ver ingredientes"
            : "Ocultar ingredientes";
});

document.querySelector("#ano").textContent = new Date().getFullYear();
