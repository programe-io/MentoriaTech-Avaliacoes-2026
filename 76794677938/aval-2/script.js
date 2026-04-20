
document.addEventListener("DOMContentLoaded", () => {

    // MENU: destacar link ativo ao clicar
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.style.color = "white");
            link.style.color = "#00c3ff";
        \});
    \});

    // ARTIGOS: mostrar alerta ao clicar
    const artigos = document.querySelectorAll("article");

    artigos.forEach((artigo, index) => {
        artigo.addEventListener("click", () => {
            alert(`Você clicou no artigo \${index + 1\}`);
        \});
    \});

    // IMAGEM: efeito de zoom ao clicar
    const imagens = document.querySelectorAll("img");

    imagens.forEach(img => {
        img.addEventListener("click", () => {
            if (img.style.transform === "scale(1.2)") {
                img.style.transform = "scale(1)";
            \} else {
                img.style.transform = "scale(1.2)";
            \}
            img.style.transition = "0.3s";
        \});
    \});

    // SCROLL SUAVE para navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute("href"));
            destino.scrollIntoView({
                behavior: "smooth"
            \});
        \});
    \});

\});$0