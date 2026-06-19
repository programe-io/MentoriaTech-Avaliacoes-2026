// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {

    // Mensagem de boas-vindas
    console.log("Bem-vindo ao site sobre BTS!");

    // Atualiza o ano no rodapé automaticamente
    const footer = document.querySelector("footer p");
    const ano = new Date().getFullYear();
    footer.textContent = `© ${ano} - Site sobre BTS`;

    // Efeito nos títulos das seções
    const titulos = document.querySelectorAll("section h2");

    titulos.forEach(titulo => {
        titulo.addEventListener("mouseenter", () => {
            titulo.style.color = "#b57edc";
            titulo.style.transition = "0.3s";
        });

        titulo.addEventListener("mouseleave", () => {
            titulo.style.color = "#6a0dad";
        });
    });

    // Botão "voltar ao topo"
    const botaoTopo = document.createElement("button");
    botaoTopo.innerText = "⬆ Topo";

    botaoTopo.style.position = "fixed";
    botaoTopo.style.bottom = "20px";
    botaoTopo.style.right = "20px";
    botaoTopo.style.padding = "10px 15px";
    botaoTopo.style.border = "none";
    botaoTopo.style.borderRadius = "8px";
    botaoTopo.style.backgroundColor = "#6a0dad";
    botaoTopo.style.color = "white";
    botaoTopo.style.cursor = "pointer";
    botaoTopo.style.display = "none";

    document.body.appendChild(botaoTopo);

    // Mostra o botão ao rolar a página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
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