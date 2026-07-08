// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function() {
    
    let contador = 0;
    const botaoGrito = document.getElementById("btn-grito");
    const textoContador = document.getElementById("contador-cliques");

    // Evento de clique para o botão "Vai Corinthians!"
    botaoGrito.addEventListener("click", () => {
        contador++;
        textoContador.textContent = `${contador} gritos de apoio hoje!`;
        
        // Efeito visual temporário no botão
        botaoGrito.style.backgroundColor = "#555";
        botaoGrito.style.color = "#fff";
        
        setTimeout(() => {
            botaoGrito.style.backgroundColor = "#fff";
            botaoGrito.style.color = "#111";
        }, 200);

        // Alerta divertido em cliques específicos
        if (contador === 5) {
            alert("Isso aí! A Fiel não para!");
        }
    });

    // Evento para os botões "Ler mais" dos posts
    const botoesLerMais = document.querySelectorAll(".btn-read");
    botoesLerMais.forEach((botao) => {
        botao.addEventListener("click", () => {
            alert("Esta é apenas uma demonstração. Em um blog real, aqui abriria a notícia completa! Vai Corinthians!");
        });
    });
});