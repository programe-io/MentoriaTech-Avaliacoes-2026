// Mensagem de boas-vindas
window.onload = function () {
    alert("Bem-vindo ao Meu Blog!");
};

// Botões "Leia mais"
const botoes = document.querySelectorAll("article a");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function(event) {
        event.preventDefault();

        alert("Em breve esta postagem estará disponível completa!");
    });
});

// Destacar item do menu ao clicar
const linksMenu = document.querySelectorAll("nav a");

linksMenu.forEach(function(link) {
    link.addEventListener("click", function() {

        linksMenu.forEach(function(item) {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");
    });
});

// Botão "Voltar ao topo"
const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "⬆";

botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "20px";
botaoTopo.style.right = "20px";
botaoTopo.style.padding = "12px 16px";
botaoTopo.style.fontSize = "18px";
botaoTopo.style.border = "none";
botaoTopo.style.borderRadius = "50%";
botaoTopo.style.cursor = "pointer";
botaoTopo.style.display = "none";

document.body.appendChild(botaoTopo);

// Mostrar botão ao rolar a página
window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }

});

// Voltar ao topo
botaoTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Mostrar data e hora no console
setInterval(function() {

    const agora = new Date();

    console.log(agora.toLocaleString());

}, 1000);