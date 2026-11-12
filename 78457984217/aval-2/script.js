const mundo = document.getElementById("mundo");

const largura = 10;
const altura = 10;

let ferramenta = "quebrar";

let inventario = {
    grama: 0,
    terra: 0,
    pedra: 0
};

let blocos = [];

function gerarMundo() {
    for (let y = 0; y < altura; y++) {
        for (let x = 0; x < largura; x++) {

            let tipo = "vazio";

            if (y === 6) tipo = "grama";
            if (y > 6 && y <= 8) tipo = "terra";
            if (y === 9) tipo = "pedra";

            blocos.push(tipo);
        }
    }

    desenharMundo();
}

function desenharMundo() {
    mundo.innerHTML = "";

    blocos.forEach((tipo, indice) => {
        const bloco = document.createElement("button");

        bloco.className = "bloco " + tipo;

        bloco.textContent =
            tipo === "grama" ? "🌱" :
            tipo === "terra" ? "🟫" :
            tipo === "pedra" ? "🪨" : "";

        bloco.onclick = () => interagir(indice);

        mundo.appendChild(bloco);
    });

    atualizarInventario();
}

function selecionar(tipo) {
    ferramenta = tipo;

    document.getElementById("mensagem").textContent =
        "Ferramenta selecionada: " + tipo;
}

function interagir(indice) {
    const atual = blocos[indice];

    if (ferramenta === "quebrar") {

        if (atual === "vazio") return;

        inventario[atual]++;
        blocos[indice] = "vazio";

    } else {

        if (atual !== "vazio") {
            document.getElementById("mensagem").textContent =
                "Esse espaço já está ocupado!";
            return;
        }

        if (inventario[ferramenta] <= 0) {
            document.getElementById("mensagem").textContent =
                "Você não possui esse bloco!";
            return;
        }

        inventario[ferramenta]--;
        blocos[indice] = ferramenta;
    }

    desenharMundo();
}

function atualizarInventario() {
    document.getElementById("grama").textContent =
        inventario.grama;

    document.getElementById("terra").textContent =
        inventario.terra;

    document.getElementById("pedra").textContent =
        inventario.pedra;
}

gerarMundo();