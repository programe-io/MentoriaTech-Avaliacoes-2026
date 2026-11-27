
const temaBtn = document.getElementById("temaBtn");
const busca = document.getElementById("busca");
const respirarBtn = document.getElementById("respirarBtn");
const circulo = document.getElementById("circulo");
const mensagem = document.getElementById("mensagem");

// Mostrar ou esconder os textos dos artigos
function mostrarTexto(numero) {
    const texto = document.getElementById("texto" + numero);

    if (texto.style.display === "block") {
        texto.style.display = "none";
    } else {
        texto.style.display = "block";
    }
}

// Modo escuro
temaBtn.addEventListener("click", function () {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        temaBtn.textContent = "☀️ Modo claro";
    } else {
        temaBtn.textContent = "🌙 Modo escuro";
    }
});

// Buscar artigos
busca.addEventListener("input", function () {
    const pesquisa = busca.value.toLowerCase();
    const artigos = document.querySelectorAll(".card");

    artigos.forEach(function (artigo) {
        const conteudo = artigo.textContent.toLowerCase();

        if (conteudo.includes(pesquisa)) {
            artigo.style.display = "block";
        } else {
            artigo.style.display = "none";
        }
    });
});

// Exercício de respiração
let intervalo;
let etapa = 0;
let ciclos = 0;
let respirando = false;

respirarBtn.addEventListener("click", function () {
    if (respirando) {
        clearInterval(intervalo);
        circulo.style.transform = "scale(1)";
        mensagem.textContent = "Exercício pausado.";
        respirarBtn.textContent = "Começar novamente";
        respirando = false;
        return;
    }

    respirando = true;
    etapa = 0;
    ciclos = 0;

    respirarBtn.textContent = "Pausar exercício";

    mensagem.textContent = "Prepare-se para respirar devagar.";

    function respirar() {
        if (etapa === 0) {
            circulo.style.transform = "scale(1.4)";
            circulo.textContent = "Inspire";
            mensagem.textContent = "Inspire suavemente por 4 segundos.";
            etapa = 1;
        } else {
            circulo.style.transform = "scale(1)";
            circulo.textContent = "Expire";
            mensagem.textContent = "Expire devagar por 4 segundos.";
            etapa = 0;
            ciclos++;

            if (ciclos >= 4) {
                clearInterval(intervalo);
                respirando = false;
                respirarBtn.textContent = "Começar novamente";
                mensagem.textContent =
                    "Exercício concluído. Você pode descansar.";
                circulo.textContent = "Respire";
                return;
            }
        }
    }

    respirar();

    intervalo = setInterval(respirar, 4000);
});
