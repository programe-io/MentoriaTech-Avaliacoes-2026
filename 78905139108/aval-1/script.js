
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Pesquisa de publicações
const searchInput = document.getElementById("searchInput");
const posts = document.querySelectorAll(".post-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    let visiblePosts = 0;

    posts.forEach(post => {
        const content = post.textContent.toLowerCase();

        if (content.includes(search)) {
            post.style.display = "block";
            visiblePosts++;
        } else {
            post.style.display = "none";
        }
    });

    noResults.hidden = visiblePosts !== 0;
});

// Atualizar ano automaticamente
document.getElementById("year").textContent =
    new Date().getFullYear();
