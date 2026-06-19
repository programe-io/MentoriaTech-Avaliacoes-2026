function mostrarCuriosidade(){

    const curiosidades = [
        "A água representa cerca de 60% do corpo humano.",
        "O café é uma das bebidas mais consumidas do mundo.",
        "Sucos naturais são ricos em vitaminas.",
        "A hidratação adequada melhora o funcionamento do organismo.",
        "Beber água regularmente ajuda na saúde."
    ];

    let indice = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("resultado").innerHTML =
        curiosidades[indice];
}