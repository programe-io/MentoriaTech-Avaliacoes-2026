
// FREE FIRE - SISTEMA DE INTERAÇÃO

// BOTÃO JOGAR AGORA

const botaoJogar = document.getElementById("jogar");

botaoJogar.addEventListener("click", function() {

    alert("🔥 Bem-vindo à Arena Gamer! Prepare-se para a batalha!");

});


// SELEÇÃO DE PERSONAGENS

const botoes = document.querySelectorAll(".escolher");

const resultado = document.getElementById("resultado");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const personagem = botao.parentElement.querySelector("h3").textContent;

        resultado.textContent =
        "🔥 Você selecionou: " + personagem;

        // Remove a seleção anterior
        botoes.forEach(function(item) {
            item.textContent = "Selecionar";
            item.classList.remove("selecionado");
        });

        // Marca o personagem escolhido
        botao.textContent = "Selecionado ✓";
        botao.classList.add("selecionado");

    });

});


// MENSAGEM NO CONSOLE

console.log("🔥 Arena Gamer carregada!");

console.log("Projeto desenvolvido com HTML, CSS e JavaScript.");
