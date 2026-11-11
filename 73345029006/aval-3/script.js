
// Mensagem de boas-vindas no console
console.log("Bem-vindo ao Planeta Sustentável! 🌱");

// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(event) {

        const destino = document.querySelector(
            this.getAttribute('href')
        );

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: 'smooth'
            });
        }

    });

});

// Mensagem no console quando a página carregar
window.addEventListener('load', function() {
    console.log("Blog carregado com sucesso!");
});
