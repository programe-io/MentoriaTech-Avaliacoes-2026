const botao = document.getElementById("botao");
const conteudo = document.getElementById("conteudo");

botao.addEventListener("click", () => {

    conteudo.classList.toggle("animar");

    if (conteudo.classList.contains("animar")) {
        botao.textContent = "Remover Animação";
    } else {
        botao.textContent = "Animar";
    }

});