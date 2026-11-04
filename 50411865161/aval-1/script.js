function alternarModoNoturno() {
    // Altera a cor de fundo do corpo do site
    if (document.body.style.backgroundColor === "rgb(47, 62, 70)") {
        // Volta para o Modo Claro (cores originais do CSS)
        document.body.style.backgroundColor = "#f7f5f2";
        document.body.style.color = "#3a3a3a";
    } else {
        // Ativa o Modo Noturno (cores escuras confortáveis para ler à noite)
        document.body.style.backgroundColor = "#2f3e46";
        document.body.style.color = "#f7f5f2";
    }
}
