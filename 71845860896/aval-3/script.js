
const titulo = document.querySelector("#meu-titulo");

titulo.style.color = "blue";
titulo.style.backgroundColor = "#ddd";
titulo.style.padding = "10px";
titulo.style.border = "1px solid black";

function atualizarCores() {
    const situacoes =
        document.getElementsByClassName("situacao");

    for (const situacao of situacoes) {
        situacao.classList.remove("normal", "sobrepeso");

        if (situacao.textContent.trim() === "Normal") {
            situacao.classList.add("normal");
        } else if (situacao.textContent.trim() === "Sobrepeso") {
            situacao.classList.add("sobrepeso");
        }
    }
}

function adicionar() {
    const paragrafo = document.createElement("p");
    const texto = document.createTextNode("Normal");

    paragrafo.appendChild(texto);
    paragrafo.classList.add("formatação", "situacao");

    document.querySelector("#container").appendChild(paragrafo);

    atualizarCores();
}

function remover() {
    const container = document.querySelector("#container");
    const ultimo = container.lastElementChild;

    if (ultimo) {
        container.removeChild(ultimo);
    }
}

function alternar() {
    const elementos = document.querySelectorAll(".formatação");

    elementos.forEach(elemento => {
        elemento.classList.toggle("formatação");
    });
}

atualizarCores();
