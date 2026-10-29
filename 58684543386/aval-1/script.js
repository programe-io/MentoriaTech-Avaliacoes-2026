const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".cartao");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "Todos";

function filterArticles() {
  const search = searchInput.value.toLowerCase();
  let visibleCards = 0;

  cards.forEach(card => {
    const category = card.dataset.category;
    const content = card.textContent.toLowerCase();

    const matchesCategory =
      selectedCategory === "Todos" || category === selectedCategory;

    const matchesSearch = content.includes(search);
    const visible = matchesCategory && matchesSearch;

    card.hidden = !visible;

    if (visible) visibleCards++;
  });

  emptyMessage.hidden = visibleCards > 0;
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(button => button.classList.remove("ativo"));
    filter.classList.add("ativo");

    selectedCategory = filter.dataset.category;
    filterArticles();
  });
});

searchInput.addEventListener("input", filterArticles);

document.querySelectorAll(".ler").forEach(button => {
  button.addEventListener("click", () => {
    const title = button.dataset.title;
    document.getElementById("mensagem").value =
      "Olá! Gostaria de saber mais sobre: " + title;

    document.getElementById("contato").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  document.getElementById("formMessage").textContent =
    "Mensagem preparada com sucesso! Este formulário é uma demonstração.";

  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();