const formulario = document.getElementById("prova");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    // Gabarito das questões
    const gabarito = {
        q1: "a",
        q2: "b",
        q3: "b"
    };

    let acertos = 0;
    const totalQuestoes = Object.keys(gabarito).length;

    // Corrigir as respostas
    for (const pergunta in gabarito) {
        const resposta = document.querySelector(
            `input[name="${pergunta}"]:checked`
        );

        if (resposta && resposta.value === gabarito[pergunta]) {
            acertos++;
        }
    }

    // Calcular a nota de zero a dez
    const nota = (acertos / totalQuestoes) * 10;

    // Definir o resultado
    let mensagem;

    if (nota >= 7) {
        mensagem = "Parabéns! Você foi aprovado!";
    } else {
        mensagem = "Continue estudando. Você pode melhorar!";
    }

    // Mostrar o resultado na página
    resultado.innerHTML = `
        <h2>Resultado da avaliação</h2>
        <p>Aluno: ${nome.replace(/[&<>"']/g, "")}</p>
        <p>Acertos: ${acertos} de ${totalQuestoes}</p>
        <p>Nota: ${nota.toFixed(1)} / 10</p>
        <p>${mensagem}</p>
    `;
});