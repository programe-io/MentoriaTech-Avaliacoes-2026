document.addEventListener("DOMContentLoaded", function () {

    // Mensagem de boas-vindas
    alert("🐾 Bem-vinda à Galeria da Mizilene! 🐾");

    // Seleciona todas as imagens da galeria
    const imagens = document.querySelectorAll(".item img");

    // Seleciona os nomes dos animais
    const nomes = document.querySelectorAll(".item p");

    // Contador de cliques
    let cliques = 0;

    // Adiciona interação em cada imagem
    imagens.forEach(function (imagem, index) {

        imagem.addEventListener("click", function () {

            cliques++;

            // Aumenta ou diminui a imagem
            imagem.classList.toggle("ampliada");

            // Nome do animal
            const animal = nomes[index].textContent;

            // Mostra informações no console
            console.log("Animal selecionado:", animal);
            console.log("Quantidade de cliques:", cliques);

            // Mensagem para o usuário
            alert(
                "Você escolheu " +
                animal +
                " 🐾\n\n" +
                "Cliques nas imagens: " +
                cliques
            );
        });

        // Efeito ao passar o mouse
        imagem.addEventListener("mouseenter", function () {
            imagem.style.opacity = "0.8";
        });

        // Volta ao normal quando o mouse sai
        imagem.addEventListener("mouseleave", function () {
            imagem.style.opacity = "1";
        });
    });

    // Mensagem no console
    console.log("Galeria da Mizilene carregada com sucesso! 💕");

});
