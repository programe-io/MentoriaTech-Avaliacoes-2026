
const brands = [
  {
    name: "Nike",
    category: "Esportivo",
    description: "Tênis, roupas e inovação para o esporte.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    url: "https://www.nike.com.br/"
  },
  {
    name: "Adidas",
    category: "Esportivo",
    description: "Esporte e cultura urbana em um só lugar.",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=700&q=80",
    url: "https://www.adidas.com.br/"
  },
  {
    name: "Louis Vuitton",
    category: "Luxo",
    description: "Moda, acessórios e artigos de luxo.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    url: "https://www.louisvuitton.com/"
  },
  {
    name: "Apple",
    category: "Tecnologia",
    description: "Tecnologia, design e criatividade.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80",
    url: "https://www.apple.com/br/"
  },
  {
    name: "Puma",
    category: "Streetwear",
    description: "Estilo esportivo com atitude urbana.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",
    url: "https://br.puma.com/"
  },
  {
    name: "Gucci",
    category: "Luxo",
    description: "Moda e acessórios de luxo com identidade.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    url: "https://www.gucci.com/"
  }
];

const grid = document.getElementById("brand-grid");
const search = document.getElementById("search");
const count = document.getElementById("brand-count");
const emptyMessage = document.getElementById("empty-message");

let activeCategory = "Todas";

function renderBrands() {
  const query = search.value.trim().toLowerCase();

  const filtered = brands.filter(brand => {
    const matchesCategory =
      activeCategory === "Todas" ||
      brand.category === activeCategory;

    const matchesSearch =
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query) ||
      brand.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  count.textContent = `${filtered.length} marca${filtered.length !== 1 ? "s" : ""}`;

  emptyMessage.hidden = filtered.length !== 0;

  grid.innerHTML = filtered.map(brand => `
    <article class="brand-card">
      <img
        src="${brand.image}"
        alt="Imagem ilustrativa: ${brand.name}"
        loading="lazy"
      >
      <div class="brand-info">
        <span class="brand-type">${brand.category}</span>
        <h3>${brand.name}</h3>
        <p>${brand.description}</p>
        <a
          class="brand-link"
          href="${brand.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar site oficial ↗
        </a>
      </div>
    </article>
  `).join("");
}

document.querySelector(".category-list").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".category").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderBrands();
});

search.addEventListener("input", renderBrands);

document.getElementById("year").textContent =
  new Date().getFullYear();

renderBrands();
