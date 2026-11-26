
// MENU PARA CELULAR
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
                nav.classList.remove("open");
                    });
                    });

                    // MODO ESCURO E CLARO
                    const themeBtn = document.getElementById("themeBtn");

                    themeBtn.addEventListener("click", () => {
                        document.body.classList.toggle("dark");

                            themeBtn.textContent =
                                    document.body.classList.contains("dark") ? "☀️" : "🌙";
                                    });

                                    // PESQUISA E FILTROS
                                    const searchInput = document.getElementById("searchInput");
                                    const searchBtn = document.getElementById("searchBtn");
                                    const filters = document.querySelectorAll(".filter");
                                    const cards = document.querySelectorAll(".card");
                                    const emptyMessage = document.getElementById("emptyMessage");

                                    let selectedCategory = "todos";

                                    function filterNews() {
                                        const search = searchInput.value.toLowerCase().trim();
                                            let visibleCount = 0;

                                                cards.forEach(card => {
                                                        const category = card.dataset.category;
                                                                const content = card.textContent.toLowerCase();

                                                                        const matchesCategory =
                                                                                    selectedCategory === "todos" ||
                                                                                                category === selectedCategory;

                                                                                                        const matchesSearch = content.includes(search);

                                                                                                                if (matchesCategory && matchesSearch) {
                                                                                                                            card.hidden = false;
                                                                                                                                        visibleCount++;
                                                                                                                                                } else {
                                                                                                                                                            card.hidden = true;
                                                                                                                                                                    }
                                                                                                                                                                        });

                                                                                                                                                                            emptyMessage.hidden = visibleCount !== 0;
                                                                                                                                                                            }

                                                                                                                                                                            filters.forEach(button => {
                                                                                                                                                                                button.addEventListener("click", () => {
                                                                                                                                                                                        filters.forEach(item => item.classList.remove("active"));

                                                                                                                                                                                                button.classList.add("active");
                                                                                                                                                                                                        selectedCategory = button.dataset.category;

                                                                                                                                                                                                                filterNews();
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                    searchBtn.addEventListener("click", filterNews);

                                                                                                                                                                                                                    searchInput.addEventListener("input", filterNews);

                                                                                                                                                                                                                    // JANELA DE LEITURA
                                                                                                                                                                                                                    const modal = document.getElementById("modal");
                                                                                                                                                                                                                    const modalTitle = document.getElementById("modalTitle");
                                                                                                                                                                                                                    const modalDescription = document.getElementById("modalDescription");
                                                                                                                                                                                                                    const closeModal = document.getElementById("closeModal");

                                                                                                                                                                                                                    document.querySelectorAll(".read-more").forEach(button => {
                                                                                                                                                                                                                        button.addEventListener("click", () => {
                                                                                                                                                                                                                                modalTitle.textContent = button.dataset.title;
                                                                                                                                                                                                                                        modalDescription.textContent = button.dataset.description;

                                                                                                                                                                                                                                                modal.hidden = false;
                                                                                                                                                                                                                                                        closeModal.focus();
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                            function hideModal() {
                                                                                                                                                                                                                                                                modal.hidden = true;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                closeModal.addEventListener("click", hideModal);

                                                                                                                                                                                                                                                                modal.addEventListener("click", event => {
                                                                                                                                                                                                                                                                    if (event.target === modal) {
                                                                                                                                                                                                                                                                            hideModal();
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                document.addEventListener("keydown", event => {
                                                                                                                                                                                                                                                                                    if (event.key === "Escape" && !modal.hidden) {
                                                                                                                                                                                                                                                                                            hideModal();
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                // FORMULÁRIO
                                                                                                                                                                                                                                                                                                const newsletterForm = document.getElementById("newsletterForm");
                                                                                                                                                                                                                                                                                                const emailInput = document.getElementById("emailInput");
                                                                                                                                                                                                                                                                                                const formMessage = document.getElementById("formMessage");

                                                                                                                                                                                                                                                                                                newsletterForm.addEventListener("submit", event => {
                                                                                                                                                                                                                                                                                                    event.preventDefault();

                                                                                                                                                                                                                                                                                                        if (!emailInput.checkValidity()) {
                                                                                                                                                                                                                                                                                                                emailInput.reportValidity();
                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                formMessage.textContent =
                                                                                                                                                                                                                                                                                                                                        "Cadastro demonstrativo realizado com sucesso!";

                                                                                                                                                                                                                                                                                                                                            formMessage.style.color = "green";

                                                                                                                                                                                                                                                                                                                                                newsletterForm.reset();
                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                // ANO AUTOMÁTICO
                                                                                                                                                                                                                                                                                                                                                document.getElementById("year").textContent =
                                                                                                                                                                                                                                                                                                                                                    new Date().getFullYear();
                                                                                                                                                                                                                                                                                                                                                    