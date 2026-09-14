function verificarIdade() {

    const nome = document.getElementById("nome").value;
    const idade = Number(document.getElementById("idade").value);

    const resultado = document.getElementById("resultado");

    if (idade < 18) {
        resultado.textContent =
            `Olá, ${nome}! Você é menor de idade.`;

    } else if (idade < 60) {
        resultado.textContent =
            `Olá, ${nome}! Você é maior de idade.`;

    } else {
        resultado.textContent =
            `Olá, ${nome}! Você tem 60 anos ou mais.`;
    }
}


function calcular() {

    const numero1 =
        Number(document.getElementById("numero1").value);

    const numero2 =
        Number(document.getElementById("numero2").value);

    const calculos =
        document.getElementById("calculos");

    calculos.innerHTML = `
        <p>Adição: ${numero1 + numero2}</p>

        <p>Subtração: ${numero1 - numero2}</p>

        <p>Multiplicação: ${numero1 * numero2}</p>

        <p>Divisão: ${numero1 / numero2}</p>

        <p>Resto: ${numero1 % numero2}</p>

        <p>Potência: ${numero1 ** numero2}</p>
    `;
}
