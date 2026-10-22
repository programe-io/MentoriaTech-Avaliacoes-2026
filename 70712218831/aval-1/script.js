
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// ABRIR E FECHAR O MENU
menuToggle.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");

    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
});

// FECHAR O MENU AO CLICAR EM UM LINK
document.querySelectorAll("#menu a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// ANO AUTOMÁTICO NO RODAPÉ
document.getElementById("ano").textContent =
    new Date().getFullYear();

// FORMULÁRIO DE CONTATO
const formulario = document.getElementById("form-contato");
const resposta = document.getElementById("resposta-form");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const animal = document.getElementById("animal").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !animal || !mensagem) {
        resposta.textContent = "Por favor, preencha todos os campos.";
        resposta.style.color = "#b42318";
        return;
    }

    resposta.textContent =
        `Obrigado, ${nome}! Sua mensagem foi preenchida com sucesso. 🐾`;

    resposta.style.color = "#235943";

    // Este exemplo não envia os dados para um servidor.
    formulario.reset();
});

// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.getElementById("voltar-topo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
