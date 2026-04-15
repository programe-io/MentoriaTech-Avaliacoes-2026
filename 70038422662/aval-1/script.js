function filtrar(categoria) {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Se for 'todos' ou se o card tiver a classe da categoria, ele aparece
        if (categoria === 'todos' || card.classList.contains(categoria)) {
            card.style.display = "block";
            // Pequeno delay para efeito visual
            setTimeout(() => card.style.opacity = "1", 10);
        } else {
            card.style.display = "none";
            card.style.opacity = "0";
        }
    });
}