
/* =====================================
   BLOG PESSOAL - RYAN MOTOS
   JAVASCRIPT
   ===================================== */

// NOME DO PROPRIETÁRIO
const nome = "Ryan";

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao blog de " + nome + "!");
});

// ANO AUTOMÁTICO NO RODAPÉ
const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.id = "voltarTopo";

botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "25px";
botaoTopo.style.right = "25px";
botaoTopo.style.padding = "12px 18px";
botaoTopo.style.background = "#ff2020";
botaoTopo.style.color = "white";
botaoTopo.style.border = "none";
botaoTopo.style.borderRadius = "8px";
botaoTopo.style.fontSize = "25px";
botaoTopo.style.cursor = "pointer";
botaoTopo.style.display = "none";
botaoTopo.style.zIndex = "999";

document.body.appendChild(botaoTopo);

// MOSTRAR BOTÃO AO DESCER A PÁGINA
window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }

});

// VOLTAR AO TOPO
botaoTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ANIMAÇÃO DOS CARDS
const fotos = document.querySelectorAll(".foto");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("mostrar");
        }

    });

}, {
    threshold: 0.2
});

fotos.forEach((foto) => {
    observador.observe(foto);
});

// CLIQUE NAS FOTOS DA GALERIA
fotos.forEach((foto) => {

    foto.addEventListener("click", function() {

        const titulo = foto.querySelector("h3");

        if (titulo) {
            alert(
                "RYAN MOTOS 🏍️\nVocê selecionou: " +
                titulo.textContent
            );
        }

    });

});

// MENSAGEM NO CONSOLE
console.log("================================");
console.log("       RYAN MOTOS 🏍️");
console.log("   Blog pessoal de motociclismo");
console.log("================================");
