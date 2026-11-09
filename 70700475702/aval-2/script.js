
// MENSAGEM DE BOAS-VINDAS

function mostrarMensagem() {
    alert("😈 Bem-vindo à Família Sacana!");
}

// SISTEMA DE CURTIDAS

function curtir(botao) {
    const contador = botao.querySelector("span");

    let numero = Number(contador.textContent);

    numero++;

    contador.textContent = numero;
}

// FORMULÁRIO

function enviarMensagem(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    document.getElementById("resultado").textContent =
        "Obrigado, " + nome + "! Sua mensagem foi recebida.";

    console.log("Mensagem:", mensagem);

    event.target.reset();
}

// ANIMAÇÃO AO DESCER A PÁGINA

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".container, .post").forEach((elemento) => {

    elemento.classList.add("animar");

    observador.observe(elemento);

});

// PARTÍCULAS VERMELHAS FLUTUANTES

function criarParticula() {

    const particula = document.createElement("div");

    particula.classList.add("particula");

    particula.textContent = "♥";

    particula.style.left = Math.random() * 100 + "vw";

    particula.style.fontSize =
        (Math.random() * 15 + 10) + "px";

    document.body.appendChild(particula);

    setTimeout(() => {
        particula.remove();
    }, 5000);
}

setInterval(criarParticula, 500);
