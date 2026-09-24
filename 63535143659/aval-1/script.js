const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const search = document.getElementById("search");
const noResults = document.getElementById("noResults");
let currentCategory = "Todos";

function renderCards(){
  const term = search.value.toLowerCase().trim();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = currentCategory === "Todos" || card.dataset.category === currentCategory;
    const matchesSearch = card.dataset.title.toLowerCase().includes(term);
    card.style.display = matchesCategory && matchesSearch ? "block" : "none";
    if(matchesCategory && matchesSearch) visible++;
  });
  noResults.style.display = visible ? "none" : "block";
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderCards();
  });
});

search.addEventListener("input", renderCards);

document.querySelectorAll(".like").forEach(button => {
  button.addEventListener("click", () => {
    const number = button.querySelector("b");
    let count = Number(number.textContent);
    button.classList.toggle("liked");
    count += button.classList.contains("liked") ? 1 : -1;
    number.textContent = count;
    button.firstChild.textContent = button.classList.contains("liked") ? "♥ " : "♡ ";
  });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const closeModal = () => modal.classList.remove("show");

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", (event) => {
    if(event.target.closest(".like")) return;
    modalTitle.textContent = card.dataset.title;
    modal.classList.add("show");
  });
});

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("closeModal2").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });

document.getElementById("subscribe").addEventListener("click", () => {
  const email = document.getElementById("email");
  const msg = document.getElementById("subscribeMsg");
  if(!email.value.includes("@")){
    msg.textContent = "Digite um e-mail válido.";
    msg.style.color = "#d64d71";
    return;
  }
  msg.textContent = "Inscrição realizada! 💖";
  msg.style.color = "#46a06b";
  email.value = "";
});
