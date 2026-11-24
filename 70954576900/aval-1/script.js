
// FORMULÁRIO DE CONTATO

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const resposta = document.getElementById("resposta");

    if (nome === "" || mensagem === "") {
        resposta.textContent = "Preencha todos os campos!";
        return;
    }

    resposta.textContent =
        "Obrigado, " + nome + "! Sua mensagem foi registrada neste site.";

    formulario.reset();
});


// BOTÃO VOLTAR AO TOPO

const voltarTopo = document.getElementById("voltarTopo");

window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
        voltarTopo.style.display = "block";
    } else {
        voltarTopo.style.display = "none";
    }
});

voltarTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ANIMAÇÃO DOS CARDS

const elementos = document.querySelectorAll(
    ".marca-card, .foto-card, .curiosidades-grid div"
);

const observador = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("aparecer");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.12
});

elementos.forEach(function(elemento) {
    elemento.classList.add("animar");
    observador.observe(elemento);
});


