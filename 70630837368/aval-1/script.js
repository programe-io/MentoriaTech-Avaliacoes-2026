document.addEventListener("DOMContentLoaded", function () {
    
    // Criando elementos
    const titulo = document.createElement("h1");
    titulo.textContent = "Sobre Mim";

    const nome = document.createElement("p");
    nome.innerHTML = "<strong>Nome:</strong> Carlos Emanuel";

    const curso = document.createElement("p");
    curso.innerHTML = "<strong>Curso:</strong> Desenvolvimento de Sistemas";

    const escola = document.createElement("p");
    escola.innerHTML = "<strong>Escola:</strong> Escola Francisca Trindade";

    // Selecionando o container
    const container = document.querySelector(".container");

    // Inserindo elementos na página
    container.appendChild(titulo);
    container.appendChild(nome);
    container.appendChild(curso);
    container.appendChild(escola);

});