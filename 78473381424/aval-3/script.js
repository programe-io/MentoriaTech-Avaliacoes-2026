
// CURIOSIDADES SOBRE GABIGOL

const curiosidades = [

    "⚽ Gabigol nasceu em 30 de agosto de 1996.",

    "🏆 Foi decisivo na final da Libertadores de 2019.",

    "🔴⚫ Marcou dois gols na final da Libertadores de 2019.",

    "🇧🇷 Já representou a Seleção Brasileira.",

    "🥇 Foi campeão olímpico com o Brasil em 2016.",

    "⚽ Seu nome verdadeiro é Gabriel Barbosa Almeida.",

    "🔥 É conhecido pelo apelido de Predestinado."

];

// FUNÇÃO PARA MOSTRAR CURIOSIDADES

function mostrarCuriosidade() {

    const indice = Math.floor(
        Math.random() * curiosidades.length
    );

    const resultado =
        document.getElementById("curiosidade");

    resultado.textContent = curiosidades[indice];
}

// MENSAGEM NO CONSOLE

console.log("Site do Gabigol carregado com sucesso!");
