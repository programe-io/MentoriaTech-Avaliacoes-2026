
function mostrarMensagem() {
    alert("🐍 Bem-vindo ao Cobra Kai! Strike First, Strike Hard, No Mercy!");
}

function mostrarTemporada(numero) {

    const descricoes = {
        1: "Johnny Lawrence reabre o Cobra Kai e começa a treinar novos alunos.",
        2: "A rivalidade entre Cobra Kai e Miyagi-Do fica ainda mais intensa.",
        3: "Daniel e Johnny enfrentam novos desafios e precisam rever o passado.",
        4: "Os dojos se preparam para o grande torneio All Valley.",
        5: "Uma nova ameaça coloca os alunos e mestres em conflito.",
        6: "A temporada final leva os personagens a uma competição mundial."
    };

    document.getElementById("descricao-temporada").innerText =
        descricoes[numero];
}
