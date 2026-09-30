function mostrarMensagem() {
    alert("Bem-vindo a Beacon Hills! 🐺");
}

function mostrarTemporada(numero) {

    const descricao = document.getElementById("descricao-temporada");

    const temporadas = {

        1: "Scott McCall é mordido por um lobisomem e começa a descobrir um novo mundo sobrenatural.",

        2: "Scott enfrenta novos perigos enquanto tenta proteger seus amigos e controlar seus poderes.",

        3: "Uma das fases mais intensas da série, envolvendo novos inimigos e acontecimentos sobrenaturais.",

        4: "Scott e seu grupo enfrentam novos desafios e ameaças em Beacon Hills.",

        5: "O grupo enfrenta conflitos sobrenaturais ainda maiores e precisa permanecer unido.",

        6: "A história chega à sua fase final, trazendo novos desafios e encerrando a jornada dos personagens."
    };

    descricao.innerHTML = `
        <h3>Temporada ${numero}</h3>
        <p>${temporadas[numero]}</p>
    `;
}