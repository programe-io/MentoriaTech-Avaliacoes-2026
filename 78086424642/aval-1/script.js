let categoriaAtual = "todas";

function buscarReceitas() { mostrarReceitas(); }

function filtrar(categoria) { categoriaAtual = categoria; mostrarReceitas();

document.getElementById("receitas").scrollIntoView({ behavior: "smooth" }); }

function mostrarReceitas() { const busca = document.getElementById("busca") .value.toLowerCase().trim();

const cards = document.querySelectorAll(".card"); let encontrados = 0;

cards.forEach(function(card) { const nome = card.dataset.nome; const categoria = card.dataset.categoria;

const combinaNome = nome.includes(busca);
const combinaCategoria =
  categoriaAtual === "todas" ||
  categoria === categoriaAtual;

if (combinaNome && combinaCategoria) {
  card.style.display = "";
  encontrados++;
} else {
  card.style.display = "none";
}


});

document.getElementById("mensagem").textContent = encontrados === 0 ? "Ops! Não encontramos essa receita. Tente outra busca. 🍓" : ""; }

function favoritar(botao) { botao.classList.toggle("ativo");

if (botao.classList.contains("ativo")) { botao.textContent = "♥"; botao.setAttribute("aria-label", "Remover dos favoritos"); } else { botao.textContent = "♡"; botao.setAttribute("aria-label", "Adicionar aos favoritos"); } }

function verReceita(titulo, texto) { document.getElementById("tituloReceita").textContent = titulo; document.getElementById("textoReceita").textContent = texto; document.getElementById("modal").style.display = "flex"; }

function fecharReceita() { document.getElementById("modal").style.display = "none"; }

function fecharFora(evento) { if (evento.target.id === "modal") { fecharReceita(); } }

document.addEventListener("keydown", function(evento) { if (evento.key === "Escape") { fecharReceita(); } });