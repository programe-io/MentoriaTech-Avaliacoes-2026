function mostrarResultado() {

    let pontos = {
        programador: 0,
        medico: 0,
        designer: 0,
        professor: 0,
        advogado: 0
    };

    let respostas = document.querySelectorAll("input:checked");

    if (respostas.length < 15) {
        document.getElementById("resultado").innerHTML =
            "<h2>⚠️ Responda todas as perguntas!</h2>";

        return;
    }

    respostas.forEach(function(resposta) {

        pontos[resposta.value]++;

    });

    let lista = [

        ["Programador", pontos.programador],
        ["Médico", pontos.medico],
        ["Designer", pontos.designer],
        ["Professor", pontos.professor],
        ["Advogado", pontos.advogado]

    ];

    lista.sort(function(a, b) {

        return b[1] - a[1];

    });

    document.getElementById("resultado").innerHTML = `

        <h2>🎯 Seu resultado</h2>

        <h3 class="primeiro">
            🥇 1ª - ${lista[0][0]}
        </h3>

        <p>
            ${lista[0][1]} pontos
        </p>

        <h3 class="segundo">
            🥈 2ª - ${lista[1][0]}
        </h3>

        <p>
            ${lista[1][1]} pontos
        </p>

        <h3 class="terceiro">
            🥉 3ª - ${lista[2][0]}
        </h3>

        <p>
            ${lista[2][1]} pontos
        </p>

        <hr>

        <p>
            O resultado é uma orientação baseada nas suas respostas.
        </p>

    `;

}