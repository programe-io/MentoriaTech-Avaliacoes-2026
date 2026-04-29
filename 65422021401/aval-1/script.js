document.addEventListener("DOMContentLoaded", function () {
    
    const nome = "Maria Regina";
    const ocupacao = "Estudante";
    const escola = "CETI Francisca Trindade";
    const curso = "Desenvolvimento de Sistema";

    const container = document.createElement("div");

    container.innerHTML = `
        <h2>Sobre Mim</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Ocupação:</strong> ${ocupacao}</p>
        <p><strong>Escola:</strong> ${escola}</p>
        <p><strong>Curso:</strong> ${curso}</p>
    `;

    document.body.appendChild(container);
});