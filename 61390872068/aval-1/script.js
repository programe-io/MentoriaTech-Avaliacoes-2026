document.addEventListener("DOMContentLoaded", () => {
    const summaryList = document.getElementById("summary-list");
    const sections = document.querySelectorAll(".blog-section");
    const backToTopBtn = document.getElementById("backToTop");

    // 1. Geração Dinâmica do Sumário na Lateral
    sections.forEach((section) => {
        const titleText = section.querySelector("h2").innerText;
        const sectionId = section.getAttribute("id");

        // Cria o elemento da lista
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        
        link.setAttribute("href", `#${sectionId}`);
        link.innerText = titleText;

        // Adiciona rolagem suave personalizada ao clicar
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById(sectionId).scrollIntoView({
                behavior: "smooth"
            });
        });

        listItem.appendChild(link);
        summaryList.appendChild(listItem);
    });

    // 2. Comportamento do Botão de Voltar ao Topo
    window.onscroll = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
