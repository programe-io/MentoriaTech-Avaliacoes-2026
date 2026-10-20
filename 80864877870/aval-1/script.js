
const initialBusinesses = [
  {
    name: "Sabores do Sertão",
    category: "Gastronomia",
    city: "Teresina",
    description: "Comida regional feita com carinho e ingredientes locais.",
    emoji: "🍲",
    color: "#f3dfb8"
  },
  {
    name: "Raízes do Piauí",
    category: "Artesanato",
    city: "Parnaíba",
    description: "Artesanato autoral inspirado na cultura piauiense.",
    emoji: "🧶",
    color: "#e8d9cb"
  },
  {
    name: "Flor de Mandacaru",
    category: "Moda",
    city: "Picos",
    description: "Moda criativa com identidade e personalidade.",
    emoji: "👒",
    color: "#e8d9d1"
  },
  {
    name: "Tech Nordeste",
    category: "Tecnologia",
    city: "Teresina",
    description: "Soluções digitais para transformar pequenos negócios.",
    emoji: "💻",
    color: "#d7e5dc"
  },
  {
    name: "Café da Praça",
    category: "Gastronomia",
    city: "Oeiras",
    description: "Café especial, quitutes regionais e boas conversas.",
    emoji: "☕",
    color: "#eadbc8"
  },
  {
    name: "Mãos da Terra",
    category: "Artesanato",
    city: "Campo Maior",
    description: "Peças artesanais que celebram os saberes da nossa terra.",
    emoji: "🏺",
    color: "#e7d8b8"
  }
];

const storageKey = "empreende-piaui-businesses";

let businesses;

try {
  const saved = localStorage.getItem(storageKey);
  businesses = saved ? JSON.parse(saved) : initialBusinesses;
  if (!Array.isArray(businesses)) businesses = initialBusinesses;
} catch {
  businesses = initialBusinesses;
}

let activeCategory = "Todos";

const grid = document.getElementById("businessGrid");
const search = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function contactURL(contact) {
  const value = String(contact || "").trim();

  if (/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(value)) {
    return value;
  }

  const username = value.replace(/^@/, "");

  if (/^[a-zA-Z0-9._]{1,30}$/.test(username)) {
    return `https://www.instagram.com/${username}/`;
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length >= 10 && digits.length <= 13) {
    return `https://wa.me/${digits}`;
  }

  return "";
}

function renderBusinesses() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");

  const filtered = businesses.filter(business => {
    const matchesCategory =
      activeCategory === "Todos" ||
      business.category === activeCategory;

    const searchable = [
      business.name,
      business.category,
      business.city,
      business.description
    ].join(" ").toLocaleLowerCase("pt-BR");

    return matchesCategory && searchable.includes(term);
  });

  grid.innerHTML = filtered.map((business, index) => {
    const name = escapeHTML(business.name);
    const category = escapeHTML(business.category);
    const city = escapeHTML(business.city);
    const description = escapeHTML(business.description);
    const emoji = escapeHTML(business.emoji || "🌵");
    const color = /^#[0-9a-f]{6}$/i.test(business.color || "")
      ? business.color
      : "#e8e8d8";

    const url = contactURL(business.contact);
    const action = url
      ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Conhecer ↗</a>`
      : `<span>Negócio local ✳</span>`;

    return `
      <article class="business-card">
        <div class="card-art" style="background:${color}">
          ${emoji}
        </div>
        <div class="card-body">
          <span class="card-category">${category}</span>
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="card-footer">
            <span>📍 ${city}, PI</span>
            ${action}
          </div>
        </div>
      </article>
    `;
  }).join("");

  emptyMessage.hidden = filtered.length !== 0;
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderBusinesses();
});

search.addEventListener("input", renderBusinesses);

document.getElementById("searchBtn").addEventListener("click", () => {
  renderBusinesses();
  document.getElementById("negocios").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("businessForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const business = {
    name: String(data.get("name")).trim(),
    category: String(data.get("category")),
    city: String(data.get("city")).trim(),
    description: String(data.get("description")).trim(),
    contact: String(data.get("contact") || "").trim(),
    emoji: {
      Gastronomia: "🍲",
      Moda: "👕",
      Artesanato: "🧶",
      Tecnologia: "💻",
      Serviços: "🛠️"
    }[String(data.get("category"))] || "🌵",
    color: "#e2e8d8"
  };

  if (!business.name || !business.city || !business.description) {
    return;
  }

  businesses.unshift(business);

  let saved = false;

  try {
    localStorage.setItem(storageKey, JSON.stringify(businesses));
    saved = true;
  } catch {
    // O negócio aparece nesta sessão, mas pode não ser salvo.
  }

  activeCategory = "Todos";
  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "Todos"
    );
  });

  search.value = "";
  renderBusinesses();

  document.getElementById("formMessage").textContent = saved
    ? "Negócio cadastrado neste navegador com sucesso!"
    : "Negócio adicionado à lista desta sessão. O armazenamento não está disponível.";

  form.reset();

  document.getElementById("negocios").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderBusinesses();
