let pontos = 0;

const botao = document.getElementById("botao");
const contador = document.getElementById("pontos");
const recorde = document.getElementById("recorde");

botao.addEventListener("click", function() {

    pontos++;

    contador.textContent = pontos;

    if (pontos === 10) {
        recorde.textContent = "🔥 Você chegou a 10 pontos!";
    }

    if (pontos === 50) {
        recorde.textContent = "🏆 INCRÍVEL! 50 PONTOS!";
    }

    if (pontos === 100) {
        recorde.textContent = "👑 VOCÊ É UM CAMPEÃO!";
    }

});