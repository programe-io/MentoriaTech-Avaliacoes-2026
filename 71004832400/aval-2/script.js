// Mensagem de boas-vindas no console
console.log("Bem-vindo ao portfólio de Lohane Isabella!");

// Efeito no botão do início
const botao = document.querySelector(".botao");

botao.addEventListener("click", function () {
    console.log("Conhecendo o portfólio...");
    });


    // Efeito simples ao rolar a página
    const secoes = document.querySelectorAll(".secao");

    window.addEventListener("scroll", function () {

        secoes.forEach(function (secao) {

                const posicao = secao.getBoundingClientRect().top;
                        const alturaTela = window.innerHeight;

                                if (posicao < alturaTela - 100) {
                                            secao.classList.add("visivel");
                                                    }

                                                        });

                                                        });