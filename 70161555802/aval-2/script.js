document.addEventListener("DOMContentLoaded", function () {
    
    // Mensagem inicial
    alert("Bem-vindo ao site do Byel Cardoso 💜");

    const card = document.querySelector(".card");

    // Alternar cor do card ao clicar
    let roxoClaro = true;

    card.addEventListener("click", function () {
        if (roxoClaro) {
            card.style.background = "#f3e6ff";
        } else {
            card.style.background = "white";
        }
        roxoClaro = !roxoClaro;
    });

    // Mudar texto do nome ao passar o mouse
    const titulo = document.querySelector("h1");

    titulo.addEventListener("mouseover", function () {
        titulo.textContent = "Byel 💜 Cardoso";
    });

    titulo.addEventListener("mouseout", function () {
        titulo.textContent = "Byel Cardoso";
    });

});