// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {

    const curiosidades = [
        "🌍 A população mundial já ultrapassou 8 bilhões de pessoas.",
        "📱 Existem bilhões de smartphones em uso no mundo.",
        "🤖 A Inteligência Artificial está presente em aplicativos, carros e hospitais.",
        "🌱 A energia solar é uma das fontes de energia que mais cresce atualmente.",
        "🚀 Empresas privadas já realizam missões espaciais.",
        "🌐 Mais da metade da população mundial utiliza a internet.",
        "💻 Milhões de pessoas trabalham remotamente usando a tecnologia.",
        "♻️ A reciclagem ajuda a reduzir o impacto ambiental no planeta.",
        "🔋 Os carros elétricos estão se tornando cada vez mais populares.",
        "🛰️ Satélites permitem comunicação e navegação em todo o planeta."
    ];

    const botao = document.getElementById("btnCuriosidade");
    const texto = document.getElementById("textoCuriosidade");

    // Exibe uma curiosidade aleatória
    botao.addEventListener("click", () => {
        const numeroAleatorio = Math.floor(Math.random() * curiosidades.length);
        texto.textContent = curiosidades[numeroAleatorio];
    });

    // Atualiza automaticamente o ano do rodapé
    const rodape = document.querySelector("footer p");
    if (rodape) {
        rodape.innerHTML = `© ${new Date().getFullYear()} - Projeto Educativo: O Mundo Atual`;
    }

    // Rolagem suave para os links do menu
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();

            const destino = document.querySelector(
                link.getAttribute("href")
            );

            destino.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

});