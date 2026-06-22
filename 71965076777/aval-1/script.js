function mostrarInfo(tipo) {
    const resultado = document.getElementById("resultado");

    const cabelos = {
        liso: {
            titulo: "Cabelo Liso",
            texto: "Possui fios retos desde a raiz até as pontas. Costuma ter mais brilho natural devido à distribuição uniforme da oleosidade."
        },
        ondulado: {
            titulo: "Cabelo Ondulado",
            texto: "Forma ondas suaves em formato de S. É um tipo intermediário entre o liso e o cacheado."
        },
        cacheado: {
            titulo: "Cabelo Cacheado",
            texto: "Possui cachos definidos e volumosos. Requer hidratação frequente para manter a definição e reduzir o ressecamento."
        },
        crespo: {
            titulo: "Cabelo Crespo",
            texto: "Tem cachos muito fechados ou em formato de zigue-zague. É delicado e geralmente necessita de bastante nutrição e hidratação."
        }
    };

    resultado.innerHTML = `
        <h2>${cabelos[tipo].titulo}</h2>
        <p>${cabelos[tipo].texto}</p>
    `;
}