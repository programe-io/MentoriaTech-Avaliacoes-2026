document.addEventListener("DOMContentLoaded", function() {
    
    // Informações
    const nome = "Maria Karliane";
    const curso = "Desenvolvimento de Sistemas";
    const instituicao = "CETI Francisca Trindade";

    // Criando elementos
    const container = document.createElement("div");
    container.classList.add("container");

    const titulo = document.createElement("h1");
    titulo.textContent = "Apresentação";

    const pNome = document.createElement("p");
    pNome.innerHTML = "<strong>Nome:</strong> " + nome;

    const pCurso = document.createElement("p");
    pCurso.innerHTML = "<strong>Curso:</strong> " + curso;

    const pInstituicao = document.createElement("p");
    pInstituicao.innerHTML = "<strong>Instituição:</strong> " + instituicao;

    // Adicionando ao container
    container.appendChild(titulo);
    container.appendChild(pNome);
    container.appendChild(pCurso);
    container.appendChild(pInstituicao);

    // Inserindo na página
    document.body.appendChild(container);

});