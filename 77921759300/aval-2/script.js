const formulario = document.getElementById("avaliacao");
const resultado = document.getElementById("resultado");

// Respostas corretas
const gabarito = {
    q1: "a",
    q2: "b",
    q3: "c"
};

// Corrigir a avaliação
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let acertos = 0;
    const total = Object.keys(gabarito).length;

    for (let questao in gabarito) {
        const resposta = formulario.querySelector(
            `input[name="${questao}"]:checked`
        );

        if (resposta && resposta.value === gabarito[questao]) {
            acertos++;
        }
    }

    const nota = (acertos / total) * 10;

    resultado.textContent =
        `Você acertou ${acertos} de ${total} questões. ` +
        `Sua nota foi ${nota.toFixed(1)} de 10.`;
});

// Limpar o resultado ao reiniciar
formulario.addEventListener("reset", function() {
    resultado.textContent = "";
});