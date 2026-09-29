// Lista de jogadores
const jogadores = [];

// Código do próximo jogador
let proximoCodigo = 1;

// Formulário
const form = document.getElementById("formJogador");


// =========================
// CADASTRAR JOGADOR
// =========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const time = document.getElementById("time").value.trim();

    const gols = Number(
        document.getElementById("gols").value
    );

    const amarelos = Number(
        document.getElementById("amarelos").value
    );

    const vermelhos = Number(
        document.getElementById("vermelhos").value
    );


    // Validações
    if (nome === "") {
        alert("Digite o nome do jogador.");
        return;
    }

    if (time === "") {
        alert("Digite o nome do time.");
        return;
    }

    if (gols < 0 || isNaN(gols)) {
        alert("Digite uma quantidade válida de gols.");
        return;
    }

    if (amarelos < 0 || isNaN(amarelos)) {
        alert("Digite uma quantidade válida de cartões amarelos.");
        return;
    }

    if (vermelhos < 0 || isNaN(vermelhos)) {
        alert("Digite uma quantidade válida de cartões vermelhos.");
        return;
    }


    // Criando o jogador
    const jogador = {
        codigo: proximoCodigo,
        nome: nome,
        time: time,
        gols: gols,
        amarelos: amarelos,
        vermelhos: vermelhos
    };


    // Adicionar jogador à lista
    jogadores.push(jogador);

    // Próximo código
    proximoCodigo++;


    // Limpar formulário
    form.reset();


    // Atualizar lista
    listarJogadores();
});


// =========================
// LISTAR JOGADORES
// =========================

function listarJogadores() {

    const lista =
        document.getElementById("listaJogadores");

    lista.innerHTML = "";


    if (jogadores.length === 0) {

        lista.innerHTML =
            "<p>Nenhum jogador cadastrado.</p>";

        return;
    }


    jogadores.forEach(function (jogador) {

        const div = document.createElement("div");

        div.classList.add("jogador");


        div.innerHTML = `
            <h3>⚽ ${jogador.nome}</h3>

            <p>
                <strong>Código:</strong>
                ${jogador.codigo}
            </p>

            <p>
                <strong>🏟️ Time:</strong>
                ${jogador.time}
            </p>

            <p>
                <strong>⚽ Gols:</strong>
                ${jogador.gols}
            </p>

            <p>
                <strong>🟨 Cartões amarelos:</strong>
                <span class="cartao-amarelo">
                    ${jogador.amarelos}
                </span>
            </p>

            <p>
                <strong>🟥 Cartões vermelhos:</strong>
                <span class="cartao-vermelho">
                    ${jogador.vermelhos}
                </span>
            </p>

            <div class="botoes">

                <button
                    class="btn-gols"
                    onclick="alterarGols(${jogador.codigo})">
                    ⚽ Alterar gols
                </button>

                <button
                    class="btn-time"
                    onclick="alterarTime(${jogador.codigo})">
                    🏟️ Alterar time
                </button>

            </div>
        `;


        lista.appendChild(div);
    });
}


// =========================
// ALTERAR GOLS
// =========================

function alterarGols(codigo) {

    const jogador = jogadores.find(function (jogador) {

        return jogador.codigo === codigo;

    });


    if (!jogador) {

        alert("Jogador não encontrado.");

        return;
    }


    const novosGols = Number(
        prompt("Digite a nova quantidade de gols:")
    );


    if (
        isNaN(novosGols) ||
        novosGols < 0
    ) {

        alert("Digite uma quantidade válida.");

        return;
    }


    jogador.gols = novosGols;

    listarJogadores();
}


// =========================
// ALTERAR TIME
// =========================

function alterarTime(codigo) {

    const jogador = jogadores.find(function (jogador) {

        return jogador.codigo === codigo;

    });


    if (!jogador) {

        alert("Jogador não encontrado.");

        return;
    }


    const novoTime = prompt(
        "Digite o novo time:"
    );


    if (
        novoTime === null ||
        novoTime.trim() === ""
    ) {

        alert("Digite um nome de time válido.");

        return;
    }


    jogador.time = novoTime.trim();

    listarJogadores();
}


// =========================
// LISTAR AO ABRIR A PÁGINA
// =========================

listarJogadores();