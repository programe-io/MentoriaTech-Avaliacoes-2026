document.addEventListener("DOMContentLoaded", function () {

    const nome = "Milena";
    const curso = "Desenvolvimento de Sistemas";
    const escola = "CETI Francisca Trindade";

    // Criando elementos
    const container = document.createElement("div");
    container.classList.add("card");

    const titulo = document.createElement("h1");
    titulo.textContent = `Olá, eu sou ${nome} 👋`;

    const textoCurso = document.createElement("p");
    textoCurso.textContent = `Sou estudante do curso de ${curso}.`;

    const textoEscola = document.createElement("p");
    textoEscola.textContent = `Estudo na escola ${escola}.`;

    const botao = document.createElement("button");
    botao.textContent = "Clique para ver uma mensagem";

    const mensagem = document.createElement("p");

    // Evento de clique
    botao.addEventListener("click", function () {
        mensagem.textContent = "Seja bem-vindo(a) ao meu perfil! 🚀";
    });

    // Adicionando elementos na página
    container.appendChild(titulo);
    container.appendChild(textoCurso);
    container.appendChild(textoEscola);
    container.appendChild(botao);
    container.appendChild(mensagem);

    document.body.appendChild(container);

});