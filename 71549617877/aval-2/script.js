// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {

    // Mensagem de boas-vindas
    alert("Bem-vindo ao site do Flamengo!");

    // Atualiza o ano automaticamente no rodapé
    const footer = document.querySelector("footer p");
    const anoAtual = new Date().getFullYear();
    footer.textContent = `© ${anoAtual} - Site sobre o Flamengo`;

    // Efeito nos títulos das seções
    const titulos = document.querySelectorAll("section h2");

    titulos.forEach(titulo => {
        titulo.addEventListener("mouseenter", () => {
            titulo.style.color = "#000";
            titulo.style.transition = "0.3s";
        });

        titulo.addEventListener("mouseleave", () => {
            titulo.style.color = "#c00000";
        });
    });

    // Botão "Voltar ao Topo"
    const botaoTopo = document.createElement("button");
    botaoTopo.innerText = "⬆ Topo";

    botaoTopo.style.position = "fixed";
    botaoTopo.style.bottom = "20px";
    botaoTopo.style.right = "20px";
    botaoTopo.style.padding = "10px 15px";
    botaoTopo.style.backgroundColor = "#c00000";
    botaoTopo.style.color = "#fff";
    botaoTopo.style.border = "none";
    botaoTopo.style.borderRadius = "8px";
    botaoTopo.style.cursor = "pointer";
    botaoTopo.style.display = "none";
    botaoTopo.style.fontWeight = "bold";

    document.body.appendChild(botaoTopo);

    // Mostrar botão ao rolar a página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }
    });

    // Voltar ao topo suavemente
    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});