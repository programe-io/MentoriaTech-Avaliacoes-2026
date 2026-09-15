// ABRIR E FECHAR MENU NO CELULAR

function abrirMenu() {
    const menu = document.getElementById("menu");

    menu.classList.toggle("ativo");
}


// INTERESSE EM UM PRODUTO

function comprar(produto) {

    const mensagem =
        "Você selecionou: " + produto +
        ". Entre em contato para saber mais!";

    alert(mensagem);

    // Aqui futuramente você pode colocar
    // um link de WhatsApp para vendas.
}


// CONTATO

function mostrarContato() {

    const caixa = document.getElementById("mensagemContato");

    caixa.innerHTML =
        "📱 WhatsApp: (89) 99999-9999<br>" +
        "📸 Instagram: @jhonnatavaqueiro";

}


// ANIMAÇÃO AO ROLAR A PÁGINA

const elementos = document.querySelectorAll(
    ".sobre-card, .produto, .video-card"
);

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementos.forEach((elemento) => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "all .7s ease";

    observador.observe(elemento);

});