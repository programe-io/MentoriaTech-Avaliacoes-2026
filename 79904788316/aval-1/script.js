```javascript
// ===============================
// GALERIA DE FOTOS DO MICHAEL JACKSON
// ===============================

const fotosMJ = [
    "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg",

    "https://upload.wikimedia.org/wikipedia/commons/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg",

    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Michael_Jackson_Cannes.jpg"
];

let fotoAtual = 0;


// Cria a galeria
function criarGaleria() {

    const galeria = document.createElement("section");

    galeria.className = "galeria";

    galeria.innerHTML = `
        <h2>📸 Fotos do Michael Jackson</h2>

        <div class="foto-container">
            <button id="anterior">❮</button>

            <img id="fotoMJ" src="${fotosMJ[0]}" alt="Michael Jackson">

            <button id="proxima">❯</button>
        </div>

        <p id="contador">Foto 1 de ${fotosMJ.length}</p>
    `;

    document.querySelector("main").prepend(galeria);

    document
        .querySelector("#anterior")
        .addEventListener("click", fotoAnterior);

    document
        .querySelector("#proxima")
        .addEventListener("click", proximaFoto);

    document
        .querySelector("#fotoMJ")
        .addEventListener("click", abrirFoto);
}


// Mostra a próxima foto
function proximaFoto() {

    fotoAtual++;

    if (fotoAtual >= fotosMJ.length) {
        fotoAtual = 0;
    }

    atualizarFoto();
}


// Mostra a foto anterior
function fotoAnterior() {

    fotoAtual--;

    if (fotoAtual < 0) {
        fotoAtual = fotosMJ.length - 1;
    }

    atualizarFoto();
}


// Atualiza a imagem
function atualizarFoto() {

    const imagem = document.querySelector("#fotoMJ");

    imagem.src = fotosMJ[fotoAtual];

    document.querySelector("#contador").textContent =
        `Foto ${fotoAtual + 1} de ${fotosMJ.length}`;
}


// Abre a foto maior
function abrirFoto() {

    const tela = document.createElement("div");

    tela.className = "foto-grande";

    tela.innerHTML = `
        <span id="fechar">×</span>

        <img src="${fotosMJ[fotoAtual]}" alt="Michael Jackson">
    `;

    document.body.appendChild(tela);

    document
        .querySelector("#fechar")
        .addEventListener("click", () => {
            tela.remove();
        });

    tela.addEventListener("click", (event) => {

        if (event.target === tela) {
            tela.remove();
        }

    });
}


// ===============================
// BOTÃO DE CURTIR
// ===============================

function curtir(botao) {

    let numero = botao.querySelector("span");

    let curtidas = Number(numero.textContent);

    if (botao.classList.contains("curtido")) {

        curtidas--;

        botao.classList.remove("curtido");

        botao.innerHTML = `🤍 Curtir <span>${curtidas}</span>`;

    } else {

        curtidas++;

        botao.classList.add("curtido");

        botao.innerHTML = `❤️ Curtido <span>${curtidas}</span>`;

    }
}


// Inicia a galeria quando a página carregar
document.addEventListener("DOMContentLoaded", criarGaleria);
```
