// script.js - Interatividade para o Blog Pessoal
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada e script executado com sucesso!");

    // Adiciona interatividade aos itens de listas (Tecnologias e Formações)
    const itens = document.querySelectorAll("ul li, ol li");
    
    itens.forEach(item => {
        item.style.cursor = "pointer";
        item.title = "Clique para destacar";
        
        item.addEventListener("click", () => {
            // Alterna a cor do texto ao clicar
            if (item.style.color === "rgb(52, 152, 219)") {
                item.style.color = "#333";
                item.style.fontWeight = "500";
            } else {
                item.style.color = "#3498db";
                item.style.fontWeight = "bold";
            }
        });
    });
});