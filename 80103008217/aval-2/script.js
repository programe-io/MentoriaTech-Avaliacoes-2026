// ================================
// JAVASCRIPT - PROJETO FINAL
// ================================

// Mensagem ao clicar no botão
function mostrarMensagem() {
    alert("O projeto está funcionando corretamente!");
}

// Destaca o menu quando o usuário passa o mouse
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("mouseenter", function() {
        link.style.transform = "scale(1.1)";
    });

    link.addEventListener("mouseleave", function() {
        link.style.transform = "scale(1)";
    });
});

// Mensagem no console para verificar o funcionamento
console.log("JavaScript carregado com sucesso!");

// Verifica quando a página foi carregada
window.addEventListener("load", function() {
    console.log("Página carregada completamente.");
});
Como colocar no HTML

Antes de fechar a tag </body>, coloque:

<script src="script.js"></script>
Checklist da entrega

☑ HTML revisado
☑ CSS revisado
☑ JavaScript funcionando
☑ Botão interativo
☑ Menu com efeito
☑ Código organizado
☑ Projeto pronto para avaliação










