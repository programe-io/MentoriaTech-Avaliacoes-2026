
const respostas = document.querySelectorAll(".resposta");
const resultado = document.getElementById("resultado");
const botaoTema = document.getElementById("tema");

// Verifica a resposta do quiz
respostas.forEach((botao) => {
    botao.addEventListener("click", () => {
        const correta = botao.dataset.correta === "true";

        if (correta) {
            resultado.textContent =
                "Parabéns! Você acertou! 🎉";
            resultado.style.color = "#159447";
        } else {
            resultado.textContent =
                "Ops! Tente novamente. 😊";
            resultado.style.color = "#e05252";
        }

        // Destaca a alternativa escolhida
        respostas.forEach((item) => {
            item.style.borderColor = "#1768ac";
        });

        botao.style.borderColor = correta
            ? "#159447"
            : "#e05252";
    });
});

// Alterna entre tema claro e escuro
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("escuro");

    const escuro = document.body.classList.contains("escuro");

    botaoTema.textContent = escuro
        ? "☀️ Alternar tema"
        : "🌙 Alternar tema";
});
