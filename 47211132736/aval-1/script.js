// Mensagem ao carregar a página
window.onload = function () {
    alert("Bem-vindo ao Meu Blog!");
    };

    // Destaca os links do menu ao passar o mouse
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("mouseover", function () {
                this.style.backgroundColor = "#555";
                    });

                        link.addEventListener("mouseout", function () {
                                this.style.backgroundColor = "";
                                    });
                                    });

                                    // Mensagem ao clicar na postagem
                                    const postagem = document.querySelector("main");

                                    postagem.addEventListener("click", function () {
                                        alert("Obrigado por visitar esta postagem!");
                                        });