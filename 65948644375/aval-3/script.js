const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const playBtn = document.getElementById("playBtn");
const playTop = document.getElementById("playTop");

const trailerBtn = document.getElementById("trailerBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalButton = document.getElementById("modalButton");

// MENU MOBILE

menuBtn.addEventListener("click", function () {

navLinks.classList.toggle("active");


});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".nav-links a").forEach(function(link) {

link.addEventListener("click", function() {

    navLinks.classList.remove("active");

});


});

// ABRIR MODAL

function abrirModal() {

modal.classList.add("active");


}

// FECHAR MODAL

function fecharModal() {

modal.classList.remove("active");


}

// BOTÕES

playBtn.addEventListener("click", abrirModal);

playTop.addEventListener("click", abrirModal);

trailerBtn.addEventListener("click", abrirModal);

// FECHAR

closeModal.addEventListener("click", fecharModal);

modalButton.addEventListener("click", fecharModal);

// FECHAR CLICANDO FORA

modal.addEventListener("click", function(event) {

if (event.target === modal) {

    fecharModal();

}


});

// FECHAR COM ESC

document.addEventListener("keydown", function(event) {

if (event.key === "Escape") {

    fecharModal();

}


});