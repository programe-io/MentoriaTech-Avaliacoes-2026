
function mostrarMensagem() {
    alert("Obrigado por visitar o Meu Blog!");
    }

    // Mensagem no console
    console.log("Meu Blog foi carregado com sucesso!");

    // Destacar o menu ao clicar
    const links = document.querySelectorAll("nav a");

    links.forEach(function(link) {
        link.addEventListener("click", function() {
                console.log("Você acessou: " + link.textContent);
                    });
                    });
                    