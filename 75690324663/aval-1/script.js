// Botão voltar ao topo
let botao = document.getElementById("topo");

botao.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao blog da Serra da Capivara!");
}