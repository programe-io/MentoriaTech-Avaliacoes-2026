
const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        cards.forEach(card => {
            card.style.display =
                category === "todos" ||
                card.dataset.category === category
                    ? "block"
                    : "none";
        });
    });
});

document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", () => {
        alert(
            button.dataset.title + "\n\n" +
            button.dataset.text
        );
    });
});

document.getElementById("newsletterForm")
    .addEventListener("submit", event => {
        event.preventDefault();

        document.getElementById("message").textContent =
            "Inscrição demonstrativa realizada!";

        document.getElementById("email").value = "";
    });
