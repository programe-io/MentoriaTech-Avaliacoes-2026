document.addEventListener("DOMContentLoaded", () => {
    
    // Configura botões de espiar
    const botoesEspiar = document.querySelectorAll(".btn-ver");
    botoesEspiar.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            alert(`[Mini-Feed] Abrindo detalhes rápidos do tópico #${id}...`);
        });
    });

    // Simulação do botão atualizar
    const btnAtualizar = document.getElementById("btn-atualizar");
    btnAtualizar.addEventListener("click", () => {
        const badge = document.getElementById("feed-count");
        badge.innerText = "Conectado";
        badge.style.backgroundColor = "#10b981"; // Muda para verde
        alert("O mini feed já está sincronizado com os servidores da Rockstar!");
    });
});