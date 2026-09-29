/* ---------- Dados das eras ---------- */
const eras = [
  {
    nome: "Triássico",
    data: "252–201 milhões de anos",
    txt: "Clima quente e seco, com um único supercontinente, a Pangeia. Os primeiros dinossauros surgiram aqui, ainda pequenos e ágeis.",
    dinos: [
      { n: "Coelophysis", s: "Coelophysis bauri", d: "Carnívoro", t: "3 m", l: "América do Norte" },
      { n: "Plateosaurus", s: "Plateosaurus engelhardti", d: "Herbívoro", t: "8 m", l: "Europa" },
      { n: "Staurikosaurus", s: "Staurikosaurus pricei", d: "Carnívoro", t: "2 m", l: "Brasil" }
    ]
  },
  {
    nome: "Jurássico",
    data: "201–145 milhões de anos",
    txt: "A Pangeia se separa e o clima fica úmido, com florestas densas. É a época dos grandes herbívoros de pescoço longo.",
    dinos: [
      { n: "Allosaurus", s: "Allosaurus fragilis", d: "Carnívoro", t: "8,5 m", l: "América do Norte" },
      { n: "Stegosaurus", s: "Stegosaurus stenops", d: "Herbívoro", t: "9 m", l: "América do Norte" },
      { n: "Brachiosaurus", s: "Brachiosaurus altithorax", d: "Herbívoro", t: "22 m", l: "América do Norte" }
    ]
  },
  {
    nome: "Cretáceo",
    data: "145–66 milhões de anos",
    txt: "Surgem as plantas com flores e os continentes ficam mais parecidos com os de hoje. Termina com a grande extinção.",
    dinos: [
      { n: "Tyrannosaurus rex", s: "Tyrannosaurus rex", d: "Carnívoro", t: "12 m", l: "América do Norte" },
      { n: "Triceratops", s: "Triceratops horridus", d: "Herbívoro", t: "9 m", l: "América do Norte" },
      { n: "Velociraptor", s: "Velociraptor mongoliensis", d: "Carnívoro", t: "2 m", l: "Ásia" }
    ]
  }
];

/* ---------- Abas das eras ---------- */
const tabs = document.querySelector(".tabs");
const info = document.getElementById("eraInfo");
const cards = document.getElementById("eraCards");

function mostrarEra(i) {
  // Marca a aba escolhida
  tabs.querySelectorAll("button").forEach((botao, j) => {
    botao.setAttribute("aria-selected", j === i);
  });

  // Atualiza o texto da era
  const era = eras[i];
  info.innerHTML = `<strong>${era.nome}</strong> · ${era.data}<br>${era.txt}`;

  // Atualiza os cartões dos dinossauros
  cards.innerHTML = era.dinos.map(d => `
    <article class="card">
      <h3>${d.n}</h3>
      <p class="sci">${d.s}</p>
      <dl>
        <dt>Dieta</dt><dd>${d.d}</dd>
        <dt>Tamanho</dt><dd>${d.t}</dd>
        <dt>Onde viveu</dt><dd>${d.l}</dd>
      </dl>
    </article>`).join("");
}

// Cria um botão para cada era
eras.forEach((era, i) => {
  const botao = document.createElement("button");
  botao.setAttribute("role", "tab");
  botao.textContent = era.nome;
  botao.addEventListener("click", () => mostrarEra(i));
  tabs.appendChild(botao);
});

mostrarEra(0); // Começa pelo Triássico

/* ---------- Barras de tamanho ---------- */
// [nome, comprimento em metros, é o ser humano?]
const tamanhos = [
  ["Ser humano", 1.7, true],
  ["Velociraptor", 2],
  ["Coelophysis", 3],
  ["Allosaurus", 8.5],
  ["Triceratops", 9],
  ["T. rex", 12],
  ["Brachiosaurus", 22]
];

const barras = document.getElementById("bars");
const MAIOR = 26; // Referência para a escala (em metros)

barras.innerHTML = tamanhos.map(([nome, metros, humano]) => `
  <div class="row">
    <span>${nome}</span>
    <div class="bar${humano ? " human" : ""}" data-w="${(metros / MAIOR) * 88}">
      <b>${String(metros).replace(".", ",")} m</b>
    </div>
  </div>`).join("");

// Anima as barras quando a seção aparece na tela
const observador = new IntersectionObserver(entradas => {
  if (entradas[0].isIntersecting) {
    barras.querySelectorAll(".bar").forEach(b => {
      b.style.width = b.dataset.w + "%";
    });
    observador.disconnect();
  }
});
observador.observe(barras);

/* ---------- Quiz ---------- */
const resposta = document.getElementById("fb");

document.querySelectorAll(".quiz button").forEach(botao => {
  botao.addEventListener("click", () => {
    const correta = botao.dataset.ok === "1";
    botao.classList.add(correta ? "ok" : "no");
    resposta.textContent = correta
      ? "Correto! As aves descendem de pequenos dinossauros carnívoros."
      : "Quase. Crocodilos e lagartos são répteis, mas não descendem dos dinossauros. Tente outra opção.";
  });
});