
const botao = document.querySelector("#botao");
const titulo = document.querySelector("#titulo");
const corpo = document.body;

let ativado = false;

botao.addEventListener("click", () => {
    ativado = !ativado;

    if (ativado) {
        titulo.textContent = "✨ Modo ativado!";
        corpo.style.background =
            "linear-gradient(135deg, #0f172a, #6d28d9)";
        botao.textContent = "Desativar efeito";
    } else {
        titulo.textContent = "Olá, mundo!";
        corpo.style.background =
            "linear-gradient(135deg, #0f172a, #0891b2)";
        botao.textContent = "Ativar efeito";
    }

    console.log("Estado atual:", ativado);
});
