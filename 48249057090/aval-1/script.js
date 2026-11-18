
// MENU RESPONSIVO

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function() {

    menu.classList.toggle("active");

});

// FECHAR MENU AO CLICAR EM UM LINK

const links = document.querySelectorAll("#menu a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        menu.classList.remove("active");

    });

});

// MODAL DOS ARTIGOS

const botoes = document.querySelectorAll(".read-btn");

const modal = document.getElementById("modal");

const modalTitle = document.getElementById("modalTitle");

const modalText = document.getElementById("modalText");

const closeModal = document.getElementById("closeModal");

// ABRIR ARTIGO

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const titulo = botao.dataset.title;

        const texto = botao.dataset.text;

        modalTitle.textContent = titulo;

        modalText.textContent = texto;

        modal.style.display = "flex";

    });

});

// FECHAR MODAL

closeModal.addEventListener("click", function() {

    modal.style.display = "none";

});

// FECHAR AO CLICAR FORA DA JANELA

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

// FORMULÁRIO DE CONTATO

const contactForm = document.getElementById("contactForm");

const resultado = document.getElementById("resultado");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        "Obrigado, " + nome +
        "! Sua mensagem foi preenchida com sucesso.";

    contactForm.reset();

});
