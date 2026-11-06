document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".article-section");

    function destacarSumario() {
        let index = sections.length;

        while(--index && window.scrollY + 130 < sections[index].offsetTop) {}
        
        links.forEach((link) => link.classList.remove("active"));
        if(links[index]) {
            links[index].classList.add("active");
        }
    }

    window.addEventListener("scroll", destacarSumario);
    destacarSumario();
});
