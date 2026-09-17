```javascript
// ==============================
// MENU MOBILE
// ==============================

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {

    menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


// Fecha menu ao clicar

document.querySelectorAll("#menu a").forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("ativo");
        menuBtn.textContent = "☰";

    });

});


// ==============================
// EFEITO DE DIGITAÇÃO
// ==============================

const palavras = [
    "estudante de programação 💻",
    "desenvolvedor em formação 🚀",
    "apaixonado por tecnologia ⚡"
];

const digitando = document.getElementById("digitando");

let palavraAtual = 0;
let letraAtual = 0;
let apagando = false;

function escrever() {

    const palavra = palavras[palavraAtual];

    if (!apagando) {

        digitando.textContent =
            palavra.substring(0, letraAtual + 1);

        letraAtual++;

        if (letraAtual === palavra.length) {

            apagando = true;

            setTimeout(escrever, 1800);
            return;

        }

    } else {

        digitando.textContent =
            palavra.substring(0, letraAtual - 1);

        letraAtual--;

        if (letraAtual === 0) {

            apagando = false;

            palavraAtual++;

            if (palavraAtual >= palavras.length) {
                palavraAtual = 0;
            }

        }

    }

    setTimeout(escrever, apagando ? 45 : 80);
}

escrever();


// ==============================
// MODO CLARO / ESCURO
// ==============================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {

        temaBtn.textContent = "☀️";

    } else {

        temaBtn.textContent = "🌙";

    }

});


// ==============================
// CONTADORES
// ==============================

const contadores = document.querySelectorAll(".contador");

let contadorIniciado = false;

function iniciarContadores() {

    if (contadorIniciado) return;

    contadorIniciado = true;

    contadores.forEach(function (contador) {

        const alvo = Number(contador.dataset.numero);

        let numero = 0;

        const intervalo = setInterval(function () {

            numero++;

            contador.textContent = numero;

            if (numero >= alvo) {
                clearInterval(intervalo);
            }

        }, 100);

    });

}

window.addEventListener("scroll", function () {

    const numeros = document.querySelector(".numeros");

    const posicao = numeros.getBoundingClientRect().top;

    if (posicao < window.innerHeight) {
        iniciarContadores();
    }

});


// ==============================
// MODAL DOS PROJETOS
// ==============================

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

const fecharModal = document.getElementById("fecharModal");
const modalOk = document.getElementById("modalOk");

function abrirModal(titulo, texto) {

    modalTitulo.textContent = titulo;
    modalTexto.textContent = texto;

    modal.classList.add("ativo");

}

function fechar() {
    modal.classList.remove("ativo");
}

fecharModal.addEventListener("click", fechar);
modalOk.addEventListener("click", fechar);


// Fecha clicando fora do modal

modal.addEventListener("click", function (evento) {

    if (evento.target === modal) {
        fechar();
    }

});


// ==============================
// BOTÃO MOTIVAÇÃO
// ==============================

const motivacaoBtn =
    document.getElementById("motivacaoBtn");

motivacaoBtn.addEventListener("click", function () {

    alert(
        "🚀 Minha motivação!\n\n" +
        "Quero aprender cada vez mais sobre programação, " +
        "criar meus próprios projetos e no futuro me tornar " +
        "um desenvolvedor."
    );

});


// ==============================
// FORMULÁRIO
// ==============================

const formulario =
    document.getElementById("formulario");

const resposta =
    document.getElementById("resposta");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    if (nome === "") {

        resposta.textContent =
            "Digite seu nome.";

        return;

    }

    resposta.textContent =
        "✅ Obrigado pela mensagem, " +
        nome +
        "!";

    formulario.reset();

});


// ==============================
// BOTÃO VOLTAR AO TOPO
// ==============================

const topo = document.getElementById("topo");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        topo.style.display = "block";

    } else {

        topo.style.display = "none";

    }

});

topo.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==============================
// ANIMAÇÃO DOS CARDS
// ==============================

const elementos =
    document.querySelectorAll(
        ".projeto, .gosto, .habilidade, .sobre"
    );

const observador =
    new IntersectionObserver(function (entradas) {

        entradas.forEach(function (entrada) {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform =
                    "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });


elementos.forEach(function (elemento) {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "0.7s";

    observador.observe(elemento);

});
```
