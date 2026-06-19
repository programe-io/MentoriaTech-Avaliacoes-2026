// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    
    // Mensagem de boas-vindas
    console.log("Bem-vindo ao site Moda e Beleza!");

    // Exibe a data atual no rodapé
    const footer = document.querySelector("footer");
    const data = new Date();
    const ano = data.getFullYear();

    footer.innerHTML = `
        <p>&copy; ${ano} - Tema: Moda e Beleza</p>
    `;

    // Efeito ao passar o mouse nos títulos
    const titulos = document.querySelectorAll("h2");

    titulos.forEach(titulo => {
        titulo.addEventListener("mouseover", () => {
            titulo.style.color = "#ff69b4";
            titulo.style.transition = "0.3s";
        });

        titulo.addEventListener("mouseout", () => {
            titulo.style.color = "#d63384";
        });
    });

    // Botão de voltar ao topo (criado via JavaScript)
    const botaoTopo = document.createElement("button");
    botaoTopo.textContent = "↑ Topo";
    botaoTopo.style.position = "fixed";
    botaoTopo.style.bottom = "20px";
    botaoTopo.style.right = "20px";
    botaoTopo.style.padding = "10px 15px";
    botaoTopo.style.border = "none";
    botaoTopo.style.borderRadius = "8px";
    botaoTopo.style.backgroundColor = "#d63384";
    botaoTopo.style.color = "white";
    botaoTopo.style.cursor = "pointer";
    botaoTopo.style.display = "none";

    document.body.appendChild(botaoTopo);

    // Mostrar botão ao rolar a página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }
    });

    // Voltar ao topo ao clicar
    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});