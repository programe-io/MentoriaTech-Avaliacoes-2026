
// =================================
// JAVASCRIPT - RESTAURANTE LACASITA
// =================================


// 1. FILTRAR CARDÁPIO

function filtrarCardapio(categoria) {

    const pratos = document.querySelectorAll(".card");

    pratos.forEach(prato => {

        const nome = prato.dataset.categoria;

        if (categoria === "todos" || nome === categoria) {
            prato.style.display = "block";
        } else {
            prato.style.display = "none";
        }

    });

}


// 2. PESQUISAR COMIDAS

function pesquisarComida() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const pratos = document.querySelectorAll(".card");

    pratos.forEach(prato => {

        const nome = prato
            .querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            prato.style.display = "block";
        } else {
            prato.style.display = "none";
        }

    });

}


// 3. MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", function() {

    console.log("Bem-vindo ao LaCasita!");

});


// 4. BOTÃO DE CONTATO

function mensagemContato() {

    alert(
        "Obrigado pelo interesse no LaCasita! " +
        "Esperamos sua visita em Bom Jesus - PI."
    );

}


// 5. ANO AUTOMÁTICO NO RODAPÉ

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}


// 6. MENU RESPONSIVO

const menu = document.querySelector("nav");

function fecharMenu() {

    if (menu) {
        menu.classList.remove("ativo");
    }

}


// 7. ANIMAÇÃO DOS CARDS

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", function() {
        card.style.transform = "translateY(-7px)";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "translateY(0)";
    });

});


// 8. BOTÃO DE VOLTAR AO TOPO

const voltarTopo = document.createElement("button");

voltarTopo.textContent = "↑";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "20px";
voltarTopo.style.right = "20px";
voltarTopo.style.width = "45px";
voltarTopo.style.height = "45px";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "50%";
voltarTopo.style.background = "#0759d5";
voltarTopo.style.color = "white";
voltarTopo.style.fontSize = "25px";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "none";
voltarTopo.style.zIndex = "1000";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
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


// =================================
// FIM DO JAVASCRIPT - LACASITA
// =================================
