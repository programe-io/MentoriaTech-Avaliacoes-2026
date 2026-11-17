
const etapas = document.querySelectorAll(".etapa");

const barra = document.getElementById("barra");

const texto = document.getElementById("progresso");

const botaoReiniciar = document.getElementById("reiniciar");

function atualizarProgresso() {

    const concluidas = document.querySelectorAll(".etapa:checked").length;

    const percentual = (concluidas / etapas.length) * 100;

    barra.style.width = percentual + "%";

    texto.textContent =
        `${concluidas} de ${etapas.length} etapas concluídas`;

}

etapas.forEach(etapa => {

    etapa.addEventListener("change", atualizarProgresso);

});

function reiniciar() {

    etapas.forEach(etapa => {
        etapa.checked = false;
    });

    atualizarProgresso();

}

botaoReiniciar.addEventListener("click", reiniciar);
