
// ======================================
// EXPLOREWORLD - SISTEMA DE VIAGENS
// ======================================


// 1. PESQUISAR DESTINOS
function pesquisarDestino() {
    let pesquisa = prompt("Qual destino você deseja conhecer?");

    if (pesquisa === null || pesquisa.trim() === "") {
        alert("Digite um destino para pesquisar!");
        return;
    }

    let destinos = ["Maldivas", "Itália", "Japão"];

    let encontrado = destinos.find(
        destino => destino.toLowerCase() === pesquisa.trim().toLowerCase()
    );

    if (encontrado) {
        alert("Encontramos seu destino: " + encontrado + "!");
    } else {
        alert("Destino não encontrado em nossa lista.");
    }
}


// 2. CALCULAR PREÇO DA VIAGEM
function calcularViagem() {
    let dias = Number(prompt("Quantos dias você deseja viajar?"));

    if (!Number.isInteger(dias) || dias <= 0) {
        alert("Digite uma quantidade válida de dias!");
        return;
    }

    let valorDiario = 250;
    let total = dias * valorDiario;

    alert(
        "Sua viagem terá " + dias +
        " dias.\nValor estimado: R$ " +
        total.toFixed(2).replace(".", ",")
    );
}


// 3. ADICIONAR DESTINOS AOS FAVORITOS
let favoritos = [];

function adicionarFavorito() {
    let destino = prompt("Digite o destino favorito:");

    if (destino === null || destino.trim() === "") {
        alert("Informe um destino válido.");
        return;
    }

    if (favoritos.includes(destino.trim())) {
        alert("Esse destino já está nos favoritos!");
        return;
    }

    favoritos.push(destino.trim());

    alert("Destino adicionado aos favoritos!");

    console.log("Meus favoritos:", favoritos);
}


// 4. CONTADOR DE VIAGENS
let viagens = 0;

function registrarViagem() {
    viagens++;

    alert("Viagem registrada com sucesso!");

    console.log("Total de viagens: " + viagens);
}


// 5. SISTEMA DE RESERVA
function reservarViagem(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let destino = document.getElementById("destino").value;
    let data = document.getElementById("data").value;

    if (!nome || !email || !destino || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    let dataEscolhida = new Date(data + "T00:00:00");
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataEscolhida < hoje) {
        alert("Escolha uma data futura!");
        return;
    }

    alert(
        "RESERVA SOLICITADA!\n\n" +
        "Cliente: " + nome +
        "\nDestino: " + destino +
        "\nData: " + data
    );

    registrarViagem();

    event.target.reset();
}


// 6. MOSTRAR INFORMAÇÕES DO DESTINO
function verDestino(destino) {
    let informacoes = {
        "Maldivas": "Um paraíso tropical com praias incríveis.",
        "Itália": "Um destino famoso por sua cultura e gastronomia.",
        "Japão": "Um país que mistura tradição e tecnologia."
    };

    alert(informacoes[destino] || "Informações não disponíveis.");
}


// 7. MENSAGEM DE DESPEDIDA
function despedida() {
    alert("Obrigado por visitar a ExploreWorld! Boa viagem!");
}


// ======================================
// FIM DO SISTEMA
// ======================================

console.log("ExploreWorld está funcionando!");
