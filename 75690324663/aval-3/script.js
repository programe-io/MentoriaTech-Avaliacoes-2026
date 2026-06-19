const letras = [
    ["H","T","M","L","A","B","C","D"],
    ["X","Y","Z","Q","W","E","R","T"],
    ["C","S","S","U","I","O","P","L"],
    ["J","A","V","A","K","M","N","B"],
    ["J","O","G","O","F","G","H","I"],
    ["P","R","O","G","R","A","M","A"],
    ["L","E","T","R","A","S","X","Y"],
    ["C","O","D","I","G","O","Z","W"]
];

const palavras = ["HTML", "CSS", "JAVA", "JOGO"];

let selecionadas = [];

const tabuleiro = document.getElementById("tabuleiro");


function criarTabuleiro() {
    tabuleiro.innerHTML = "";

    letras.forEach(linha => {
        linha.forEach(letra => {

            let casa = document.createElement("div");
            casa.className = "letra";
            casa.textContent = letra;

            casa.onclick = function() {
                selecionar(casa);
            };

            tabuleiro.appendChild(casa);

        });
    });
}


function selecionar(casa) {

    casa.classList.toggle("selecionada");

    if(casa.classList.contains("selecionada")) {
        selecionadas.push(casa.textContent);
    } else {
        selecionadas.pop();
    }

    verificar();
}


function verificar() {

    let palavra = selecionadas.join("");

    if(palavras.includes(palavra)) {

        alert("🎉 Você encontrou: " + palavra);

        document
            .querySelectorAll(".selecionada")
            .forEach(item => {
                item.classList.remove("selecionada");
                item.classList.add("encontrada");
            });

        selecionadas = [];
    }
}


function reiniciar() {
    selecionadas = [];
    criarTabuleiro();
}


criarTabuleiro();