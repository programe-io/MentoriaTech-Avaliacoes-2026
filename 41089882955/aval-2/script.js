document.addEventListener("DOMContentLoaded", () => {
    const botoesOpcoes = document.querySelectorAll(".btn-leia-mais");

    botoesOpcoes.forEach((botao) => {
        botao.addEventListener("click", (evento) => {
            const tituloDaMateria = evento.target.parentElement.querySelector("h2").innerText;
            alert(`Carregando banco de dados da Rockstar...\n\nVocê selecionou: "${tituloDaMateria}"`);
        });
    });
});