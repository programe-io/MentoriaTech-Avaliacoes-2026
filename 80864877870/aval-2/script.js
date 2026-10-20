
const opportunities = [
  {
    title: "Erasmus for Young Entrepreneurs",
    organization: "Comissão Europeia",
    icon: "🤝",
    category: "Empreendedorismo",
    country: "Europa",
    type: "Intercâmbio empresarial",
    description: "Aprenda com empreendedores experientes em outro país participante do programa e desenvolva suas habilidades de gestão.",
    requirements: "Novos empreendedores ou pessoas planejando iniciar um negócio, conforme os critérios do programa.",
    url: "https://www.erasmus-entrepreneurs.eu/"
  },
  {
    title: "Y Combinator",
    organization: "Aceleradora internacional",
    icon: "🚀",
    category: "Startup",
    country: "Estados Unidos",
    type: "Aceleração de startups",
    description: "Programa de aceleração para empresas em estágio inicial, com orientação, rede de contatos e possibilidade de investimento.",
    requirements: "Fundadores de startups que atendam aos critérios da seleção. O investimento tem condições próprias.",
    url: "https://www.ycombinator.com/apply"
  },
  {
    title: "Startup Chile",
    organization: "Ecossistema de inovação chileno",
    icon: "🇨🇱",
    category: "Startup",
    country: "Chile",
    type: "Aceleração",
    description: "Conheça programas de aceleração para desenvolver negócios inovadores e ampliar sua rede internacional.",
    requirements: "Empreendedores e startups que atendam às regras da chamada vigente.",
    url: "https://startupchile.org/"
  },
  {
    title: "MIT Solve",
    organization: "MIT",
    icon: "🌱",
    category: "Impacto",
    country: "Global / remoto",
    type: "Desafios de inovação",
    description: "Apresente soluções para desafios sociais e ambientais e concorra às oportunidades de apoio oferecidas em cada desafio.",
    requirements: "Equipes com soluções inovadoras que cumpram os critérios da chamada escolhida.",
    url: "https://solve.mit.edu/challenges"
  },
  {
    title: "EducationUSA",
    organization: "Rede de orientação educacional",
    icon: "🎓",
    category: "Bolsas",
    country: "Estados Unidos",
    type: "Orientação educacional",
    description: "Descubra como se candidatar a universidades americanas e pesquisar oportunidades de auxílio financeiro.",
    requirements: "Os critérios acadêmicos e financeiros variam conforme a universidade e a bolsa.",
    url: "https://educationusa.org.br/"
  },
  {
    title: "Erasmus+",
    organization: "União Europeia",
    icon: "🌍",
    category: "Bolsas",
    country: "Europa",
    type: "Formação e mobilidade",
    description: "Explore oportunidades de educação, cooperação e mobilidade internacional oferecidas por diferentes ações do programa.",
    requirements: "A elegibilidade depende da modalidade, da instituição participante e das regras aplicáveis.",
    url: "https://erasmus-plus.ec.europa.eu/"
  }
];

const grid = document.getElementById("opportunityGrid");
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");
const searchButton = document.getElementById("searchButton");
const resultCount = document.getElementById("resultCount");
const filters = document.getElementById("categoryFilters");
const dialog = document.getElementById("detailsDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

let selectedCategory = "Todas";

function renderOpportunities() {
  const term = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const selectedCountry = countryFilter.value;

  const filtered = opportunities.filter((item) => {
    const text = [
      item.title,
      item.organization,
      item.category,
      item.country,
      item.type,
      item.description
    ].join(" ").toLocaleLowerCase("pt-BR");

    const matchesTerm = text.includes(term);
    const matchesCategory =
      selectedCategory === "Todas" ||
      item.category === selectedCategory;
    const matchesCountry =
      !selectedCountry || item.country === selectedCountry;

    return matchesTerm && matchesCategory && matchesCountry;
  });

  resultCount.textContent =
    `${filtered.length} oportunidade${filtered.length !== 1 ? "s" : ""}`;

  grid.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent =
      "Nenhuma oportunidade encontrada. Tente outros termos ou filtros.";
    grid.appendChild(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "opportunity-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const icon = document.createElement("div");
    icon.className = "card-icon";
    icon.textContent = item.icon;

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = item.category;

    top.append(icon, category);

    const heading = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title;

    const organization = document.createElement("p");
    organization.className = "organization";
    organization.textContent = item.organization;

    heading.append(title, organization);

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.description;

    const meta = document.createElement("div");
    meta.className = "card-meta";

    const destination = document.createElement("span");
    destination.textContent = `📍 ${item.country}`;

    const type = document.createElement("span");
    type.textContent = item.type;

    meta.append(destination, type);

    const bottom = document.createElement("div");
    bottom.className = "card-bottom";

    const note = document.createElement("small");
    note.textContent = "Consulte os requisitos";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Saiba mais ↗";
    button.addEventListener("click", () => showDetails(item));

    bottom.append(note, button);
    card.append(top, heading, description, meta, bottom);
    grid.appendChild(card);
  });
}

function showDetails(item) {
  dialogContent.replaceChildren();

  const icon = document.createElement("div");
  icon.className = "dialog-icon";
  icon.textContent = item.icon;

  const title = document.createElement("h2");
  title.textContent = item.title;

  const organization = document.createElement("p");
  organization.className = "organization";
  organization.textContent = item.organization;

  const description = document.createElement("p");
  description.className = "dialog-description";
  description.textContent = item.description;

  const info = document.createElement("div");
  info.className = "dialog-info";
  info.textContent =
    `Destino: ${item.country}\n` +
    `Categoria: ${item.category}\n` +
    `Tipo: ${item.type}\n\n` +
    `Requisitos: ${item.requirements}`;

  const link = document.createElement("a");
  link.className = "btn-primary dialog-link";
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Acessar site oficial ↗";

  const disclaimer = document.createElement("p");
  disclaimer.className = "dialog-description";
  disclaimer.textContent =
    "Consulte o site oficial para confirmar prazos, requisitos, " +
    "custos e disponibilidade de inscrições. Nem todos os programas " +
    "oferecem bolsas integrais.";

  dialogContent.append(
    icon, title, organization, description, info, link, disclaimer
  );

  dialog.showModal();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  filters.querySelectorAll("[data-category]").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("active", active);
    filter.setAttribute("aria-pressed", String(active));
  });

  renderOpportunities();
});

searchButton.addEventListener("click", renderOpportunities);
searchInput.addEventListener("input", renderOpportunities);
countryFilter.addEventListener("change", renderOpportunities);

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderOpportunities();
