
// SISTEMA DE LESÕES NO FUTEBOL ⚽

// Lista de jogadores
let jogadores = [];

// Registrar uma lesão
function registrarLesao(nome, tipo, regiao, sintomas) {

    let lesao = {
        jogador: nome,
        tipo: tipo,
        regiao: regiao,
        sintomas: sintomas,
        data: new Date().toLocaleDateString("pt-BR")
    };

    jogadores.push(lesao);

    console.log("🏥 LESÃO REGISTRADA!");
    console.log(lesao);
}

// Mostrar todas as lesões
function mostrarLesoes() {

    console.log("===== RELATÓRIO DE LESÕES =====");

    if (jogadores.length === 0) {
        console.log("Nenhuma lesão registrada.");
        return;
    }

    jogadores.forEach((lesao, indice) => {

        console.log("Jogador: " + lesao.jogador);
        console.log("Tipo: " + lesao.tipo);
        console.log("Região: " + lesao.regiao);
        console.log("Sintomas: " + lesao.sintomas);
        console.log("Data: " + lesao.data);

        console.log("----------------------");
    });
}

// Contar lesões
function contarLesoes() {

    console.log(
        "Total de lesões registradas: " + jogadores.length
    );

}

// Pesquisar jogador
function pesquisarJogador(nome) {

    let resultado = jogadores.filter(lesao =>
        lesao.jogador.toLowerCase() === nome.toLowerCase()
    );

    if (resultado.length > 0) {
        console.log("Lesões encontradas:", resultado);
    } else {
        console.log("Jogador não encontrado!");
    }

}

// Orientações educativas de prevenção
function prevenirLesoes() {

    console.log("===== PREVENÇÃO DE LESÕES =====");

    console.log("1. Fazer aquecimento antes dos jogos.");
    console.log("2. Fortalecer os músculos.");
    console.log("3. Manter boa hidratação.");
    console.log("4. Respeitar o descanso.");
    console.log("5. Utilizar equipamentos adequados.");
    console.log("6. Evitar excesso de treinamento.");

}

// EXEMPLOS DE REGISTROS

registrarLesao(
    "Carlos",
    "Lesão muscular",
    "Coxa",
    "Dor e dificuldade de movimentação"
);

registrarLesao(
    "Pedro",
    "Entorse",
    "Tornozelo",
    "Inchaço e dor"
);

registrarLesao(
    "Lucas",
    "Contusão",
    "Joelho",
    "Dor após impacto"
);

// EXECUTAR FUNÇÕES

mostrarLesoes();

contarLesoes();

pesquisarJogador("Carlos");

prevenirLesoes();
