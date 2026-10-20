
const opcoes = document.querySelectorAll(".opcao");
const resultado = document.getElementById("resultado");
const reiniciar = document.getElementById("reiniciar");

opcoes.forEach(function(opcao) {
    opcao.addEventListener("click", function() {
        const acertou = opcao.dataset.correta === "true";

        opcoes.forEach(function(botao) {
            botao.disabled = true;

            if (botao.dataset.correta === "true") {
                botao.classList.add("correta");
            }
        });

        if (acertou) {
            resultado.textContent =
                "Parabéns! Votar e acompanhar as decisões públicas são formas de participação democrática.";
        } else {
            opcao.classList.add("errada");
            resultado.textContent =
                "Não foi dessa vez! A participação democrática inclui votar e acompanhar as decisões públicas.";
        }

        reiniciar.hidden = false;
    });
});

reiniciar.addEventListener("click", function() {
    opcoes.forEach(function(opcao) {
        opcao.disabled = false;
        opcao.classList.remove("correta", "errada");
    });

    resultado.textContent = "";
    reiniciar.hidden = true;
});
