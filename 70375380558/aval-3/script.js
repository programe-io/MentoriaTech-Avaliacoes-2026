
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("🌸 Bem-vinda à MODA CROCHÊ! Temos peças lindas feitas à mão para você!");
});

// EFEITO NAS SEÇÕES
const secoes = document.querySelectorAll("section");

secoes.forEach(function(secao) {
    secao.addEventListener("mouseenter", function() {
        secao.style.transform = "scale(1.02)";
        secao.style.transition = "0.3s";
    });

    secao.addEventListener("mouseleave", function() {
        secao.style.transform = "scale(1)";
    });
});

// BOTÃO DE COMPRA
const botao = document.querySelector("section a");

if (botao) {
    botao.addEventListener("click", function() {
        alert("💕 Obrigada por escolher a MODA CROCHÊ! Você será direcionada ao WhatsApp!");
    });
}

// ATUALIZAR ANO DO RODAPÉ
const ano = new Date().getFullYear();
const rodape = document.querySelector("footer p:last-child");

if (rodape) {
    rodape.textContent =
        "© " + ano + " - Todos os direitos reservados.";
}
