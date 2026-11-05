document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buy-btn");
    const cartCount = document.getElementById("cart-count");
    let count = 0;

    // Adiciona evento dinâmico para somar itens ao carrinho
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            count++;
            cartCount.textContent = count;
            
            // Feedback visual temporário no botão
            const originalText = button.textContent;
            button.textContent = "✓ Adicionado";
            button.style.backgroundColor = "#2a9d8f"; // Verde sucesso
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "#3e2723";
            }, 1000);
        });
    });
});
