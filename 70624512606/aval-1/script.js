// Dados da pessoa
const nome = "Victoria";
const curso = "2º ano de Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Seleciona a div container
const container = document.querySelector(".container");

// Adiciona o conteúdo na página
container.innerHTML = `
    <h1>Sobre Mim</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Curso:</strong> ${curso}</p>
    <p><strong>Escola:</strong> ${escola}</p>
`;