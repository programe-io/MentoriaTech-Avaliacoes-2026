// Criando as informações
const nome = "Mayara";
const curso = "2º ano de Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Selecionando a div com classe "container"
const container = document.querySelector(".container");

// Inserindo conteúdo dentro da página
container.innerHTML = `
    <h1>Sobre Mim</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Curso:</strong> ${curso}</p>
    <p><strong>Escola:</strong> ${escola}</p>
`;