// Alternar entre modo escuro e modo claro

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-claro");

    if (document.body.classList.contains("modo-claro")) {
        botaoTema.textContent = "Modo Escuro";
    } else {
        botaoTema.textContent = "Modo Claro";
    }
});

// Selecionar um tema para debate

const botaoDebate = document.getElementById("botaoDebate");
const escolha = document.getElementById("escolha");
const resultado = document.getElementById("resultado");

botaoDebate.addEventListener("click", function () {
    const tema = escolha.value;

    if (tema === "") {
        resultado.textContent = "Escolha um tema para continuar.";
        return;
    }

    resultado.textContent =
        "Tema escolhido: " + tema +
        ". Pesquise e compare as propostas dos políticos sobre esse assunto.";
});