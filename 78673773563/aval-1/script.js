
/* ==========================================
   FELIPE VIEIRA | COBRA KAI
   JAVASCRIPT PRINCIPAL DO BLOG
========================================== */


/* ==========================================
   1. ANO AUTOMÁTICO
========================================== */

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}


/* ==========================================
   2. EFEITO DE DIGITAÇÃO
========================================== */

const nome = "FELIPE VIEIRA";

const elementoNome = document.getElementById("nome-digitando");

if (elementoNome) {

    let letra = 0;

    function digitarNome() {

        if (letra < nome.length) {

            elementoNome.textContent += nome.charAt(letra);

            letra++;

            setTimeout(digitarNome, 120);

        }

    }

    digitarNome();

}


/* ==========================================
   3. ANIMAÇÕES AO ROLAR A PÁGINA
========================================== */

const elementos = document.querySelectorAll(
    ".reveal, .character, .dojo, .season, .curiosity"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("show");

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.15
});

elementos.forEach(elemento => {

    elemento.classList.add("reveal");

    observador.observe(elemento);

});


/* ==========================================
   4. FORMULÁRIO DE CONTATO
========================================== */

const formulario = document.getElementById("formulario");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nomeUsuario = formulario.querySelector(
            'input[type="text"]'
        ).value.trim();

        const emailUsuario = formulario.querySelector(
            'input[type="email"]'
        ).value.trim();

        const mensagem = formulario.querySelector(
            "textarea"
        ).value.trim();

        if (!nomeUsuario || !emailUsuario || !mensagem) {

            alert("Preencha todos os campos!");

            return;

        }

        alert(
            "🥋 Olá, " + nomeUsuario + "!\n\n" +
            "Obrigado por visitar o blog de Felipe Vieira!\n" +
            "Sua mensagem foi preenchida com sucesso."
        );

        formulario.reset();

    });

}


/* ==========================================
   5. FRASES ALEATÓRIAS COBRA KAI
========================================== */

const frases = [

    "Strike First. Strike Hard. No Mercy.",

    "A vida nem sempre é justa.",

    "O karatê é mais do que lutar.",

    "Nunca desista do seu treinamento.",

    "A verdadeira força começa na mente.",

    "Equilíbrio é tudo.",

    "Um verdadeiro lutador nunca para de aprender."

];

const botaoFrase = document.getElementById("nova-frase");

const textoFrase = document.getElementById("frase-aleatoria");

if (botaoFrase && textoFrase) {

    botaoFrase.addEventListener("click", function() {

        const indice = Math.floor(
            Math.random() * frases.length
        );

        textoFrase.textContent = frases[indice];

    });

}


/* ==========================================
   6. BOTÃO VOLTAR AO TOPO
========================================== */

const voltarTopo = document.getElementById("voltar-topo");

if (voltarTopo) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 400) {

            voltarTopo.classList.add("visivel");

        } else {

            voltarTopo.classList.remove("visivel");

        }

    });

    voltarTopo.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ==========================================
   7. MENU ATIVO
========================================== */

const linksMenu = document.querySelectorAll(".links a");

linksMenu.forEach(link => {

    link.addEventListener("click", function() {

        linksMenu.forEach(item => {

            item.classList.remove("ativo");

        });

        this.classList.add("ativo");

    });

});


/* ==========================================
   8. EFEITO NOS PERSONAGENS
========================================== */

const personagens = document.querySelectorAll(".character");

personagens.forEach(personagem => {

    personagem.addEventListener("mouseenter", function() {

        this.style.borderColor = "#dc171f";

    });

    personagem.addEventListener("mouseleave", function() {

        this.style.borderColor = "#333333";

    });

});


/* ==========================================
   9. RELÓGIO DIGITAL
========================================== */

const relogio = document.getElementById("relogio");

function atualizarRelogio() {

    if (!relogio) return;

    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR");

    relogio.textContent = horario;

}

atualizarRelogio();

setInterval(atualizarRelogio, 1000);


/* ==========================================
   10. MENSAGEM DE BOAS-VINDAS
========================================== */

window.addEventListener("load", function() {

    console.log(
        "🐍 Bem-vindo ao blog de Felipe Vieira!"
    );

    console.log(
        "🥋 COBRA KAI: STRIKE FIRST, STRIKE HARD, NO MERCY!"
    );

});


/* ==========================================
   FIM DO JAVASCRIPT
   DESENVOLVIDO PARA FELIPE VIEIRA
========================================== */
