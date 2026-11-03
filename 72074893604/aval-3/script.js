const botao = document.querySelector("button");

let pontos = 0;

botao.addEventListener("click", function() {
    pontos++;

    document.querySelector("h2").textContent =
        "Sua pontuação: " + pontos;

    if (pontos === 10) {
        alert("Parabéns! Você fez 10 pontos!");
    \}
\});$0