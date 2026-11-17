
const voltarTopo = document.getElementById("voltarTopo");

// Mostrar ou esconder o botão ao rolar a página
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        voltarTopo.style.display = "block";
    } else {
        voltarTopo.style.display = "none";
    }
});

// Voltar para o início
voltarTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Destacar o link do menu ao clicar
const links = document.querySelectorAll(".menu a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        links.forEach(function (item) {
            item.style.color = "#34445c";
            item.style.fontWeight = "normal";
        });

        link.style.color = "#1768bd";
        link.style.fontWeight = "bold";
    });
});

console.log("Blog Conexão Digital carregado com sucesso!");
