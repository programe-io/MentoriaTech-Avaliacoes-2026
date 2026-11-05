
// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuBtn.textContent = nav.classList.contains("open")
        ? "✕"
        : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// ANIMAÇÃO AO ROLAR A PÁGINA

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});
