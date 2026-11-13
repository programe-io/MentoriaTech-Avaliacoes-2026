
// Função para mudar o tema do site

function mudarTema() {

    document.body.classList.toggle("light");

    const botao = document.getElementById("tema");

    if (document.body.classList.contains("light")) {
        botao.innerHTML = "🌙 Tema";
    } else {
        botao.innerHTML = "☀️ Tema";
    }
}


// Lista de curiosidades sobre Neymar

const curiosidades = [
    "Neymar nasceu em 5 de fevereiro de 1992.",
    "Seu nome completo é Neymar da Silva Santos Júnior.",
    "Conquistou a medalha de ouro olímpica em 2016.",
    "Foi campeão da Liga dos Campeões com o Barcelona em 2015.",
    "É conhecido mundialmente por seus dribles e habilidade."
];


// Contador de curiosidades

let contador = 0;


// Função para mostrar curiosidades

function mostrarCuriosidade() {

    document.getElementById("curiosidade").innerHTML =
        curiosidades[contador];

    contador++;

    if (contador >= curiosidades.length) {
        contador = 0;
    }

}


// Atualizar o ano automaticamente

document.getElementById("ano").innerText =
    new Date().getFullYear();
