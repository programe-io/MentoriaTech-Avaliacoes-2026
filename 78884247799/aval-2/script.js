// ===== Imagens desenhadas em SVG =====
const svgAbobora =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
  '<rect x="55" y="8" width="10" height="22" rx="4" fill="#2d6a1f"/>' +
  '<ellipse cx="60" cy="72" rx="52" ry="42" fill="#f77f00" stroke="#a84f00" stroke-width="4"/>' +
  '<ellipse cx="38" cy="72" rx="16" ry="40" fill="none" stroke="#a84f00" stroke-width="3"/>' +
  '<ellipse cx="82" cy="72" rx="16" ry="40" fill="none" stroke="#a84f00" stroke-width="3"/>' +
  '<polygon points="35,60 50,60 42,46" fill="#1a1a1a"/>' +
  '<polygon points="70,60 85,60 77,46" fill="#1a1a1a"/>' +
  '<path d="M32 82 L45 94 L53 84 L60 96 L68 84 L76 94 L88 82 L80 105 L40 105 Z" fill="#1a1a1a"/>' +
  "</svg>";

const svgFantasma =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
  '<path d="M20 110 L20 55 Q20 12 60 12 Q100 12 100 55 L100 110 L86 98 L73 110 L60 98 L47 110 L34 98 Z" fill="#f2f2f2" stroke="#999" stroke-width="3"/>' +
  '<ellipse cx="45" cy="52" rx="8" ry="11" fill="#1a1a1a"/>' +
  '<ellipse cx="75" cy="52" rx="8" ry="11" fill="#1a1a1a"/>' +
  '<ellipse cx="60" cy="76" rx="9" ry="12" fill="#1a1a1a"/>' +
  "</svg>";

function imagem(svg, alt) {
  const img = document.createElement("img");
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  img.alt = alt;
  img.style.cssText = "width:90px;height:90px;";
  return img;
}

// ===== Estrutura da seção =====
const secao = document.createElement("section");
secao.style.cssText =
  "margin-top:35px;padding:20px;background:#1a1a1a;" +
  "border:4px solid #f77f00;border-radius:14px;color:#e0e1dd;";

const cabecalho = document.createElement("div");
cabecalho.style.cssText = "text-align:center;";

const imgs = document.createElement("div");
imgs.style.cssText = "display:flex;justify-content:center;gap:20px;";
imgs.append(
  imagem(svgAbobora, "Abóbora de Halloween"),
  imagem(svgFantasma, "Fantasma")
);

const titulo = document.createElement("h2");
titulo.textContent = "Halloween: 31 de outubro";
titulo.style.cssText =
  "color:#f77f00;text-transform:uppercase;letter-spacing:2px;margin:12px 0 6px;";

const contagem = document.createElement("p");
contagem.style.cssText = "font-size:1.2rem;font-weight:bold;color:#ffd166;";

cabecalho.append(imgs, titulo, contagem);
secao.appendChild(cabecalho);

// ===== Cards de conteúdo =====
function criarCard(emoji, tituloCard, textos) {
  const card = document.createElement("article");
  card.style.cssText =
    "margin-top:16px;padding:16px;background:#2b2b2b;" +
    "border-left:8px solid #f77f00;border-bottom:3px solid #6b4a1f;" +
    "border-radius:10px;";
  const h3 = document.createElement("h3");
  h3.textContent = emoji + " " + tituloCard;
  h3.style.cssText = "color:#f77f00;margin-bottom:8px;";
  card.appendChild(h3);
  textos.forEach(function (t) {
    const p = document.createElement("p");
    p.textContent = t;
    p.style.cssText = "line-height:1.5;margin-top:6px;";
    card.appendChild(p);
  });
  secao.appendChild(card);
}

criarCard("📜", "A história", [
  "O Halloween nasceu há cerca de 2 mil anos, com o festival celta chamado Samhain, na Irlanda e na Grã-Bretanha. Ele marcava o fim da colheita e a chegada do inverno.",
  "Os celtas acreditavam que, nessa noite, a fronteira entre o mundo dos vivos e o dos mortos ficava fraca. Por isso acendiam fogueiras e usavam fantasias para afastar os espíritos.",
  "Depois, a Igreja Católica instituiu o Dia de Todos os Santos em 1º de novembro. A noite anterior ficou conhecida como All Hallows' Eve, que deu origem ao nome Halloween."
]);

criarCard("🎃", "Por que abóbora?", [
  "Uma lenda irlandesa conta a história de Jack, um homem esperto que enganou o diabo e ficou vagando com uma lanterna. Daí vem o jack-o'-lantern.",
  "Na Irlanda, as lanternas eram feitas de nabos. Quando os imigrantes irlandeses chegaram aos Estados Unidos, passaram a usar abóboras, que eram mais fáceis de esculpir."
]);

criarCard("🎉", "Como se comemora hoje", [
  "Crianças e adultos se fantasiam de monstros, bruxas, vampiros e personagens.",
  "Nos Estados Unidos, as crianças passam de casa em casa pedindo doces com a frase \"doces ou travessuras\" (trick or treat).",
  "As casas são decoradas com abóboras esculpidas, teias de aranha e luzes laranjas. Também são comuns festas à fantasia e maratonas de filmes de terror.",
  "No Brasil, a data ganhou festas, fantasias e eventos em escolas. No dia 31 de outubro também se comemora o Dia do Saci, que valoriza o folclore brasileiro."
]);

// ===== Botão =====
const botao = document.createElement("button");
botao.textContent = "👻 Invocar fantasmas";
botao.style.cssText =
  "display:block;margin:22px auto 0;background:#f77f00;color:#000;" +
  "border:3px solid #fff;border-radius:10px;padding:12px 22px;" +
  "font-size:1rem;font-weight:bold;";
secao.appendChild(botao);

document.body.appendChild(secao);

// ===== Contagem regressiva =====
function diasParaHalloween() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let alvo = new Date(hoje.getFullYear(), 9, 31);
  if (hoje > alvo) {
    alvo = new Date(hoje.getFullYear() + 1, 9, 31);
  }
  return Math.round((alvo - hoje) / 86400000);
}

const dias = diasParaHalloween();
contagem.textContent =
  dias === 0
    ? "🎉 É HOJE! Feliz Halloween!"
    : "🦇 Faltam " + dias + " dias!";

// ===== Animação =====
const bichos = ["👻", "🎃", "🦇", "🕷️", "💀"];

botao.addEventListener("click", function () {
  for (let i = 0; i < 12; i++) {
    const bicho = document.createElement("span");
    bicho.textContent = bichos[Math.floor(Math.random() * bichos.length)];
    bicho.style.cssText =
      "position:fixed;bottom:-50px;font-size:2rem;pointer-events:none;" +
      "left:" + Math.random() * 90 + "vw;";
    document.body.appendChild(bicho);

    bicho.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-110vh)", opacity: 0 }
      ],
      { duration: 2000 + Math.random() * 2000, delay: i * 120 }
    ).onfinish = function () {
      bicho.remove();
    };
  }
});