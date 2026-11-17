
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao nosso livro de receitas!");
\});

// MENSAGEM ESPECIAL
function mensagemEspecial() {
    alert("❤️ Família reunida é amor, alegria e comida gostosa!");
\}

// DICAS DE COZINHA
function mostrarDica() {
    const dicas = [
        "Lave bem os alimentos antes de preparar! 🥗",
        "Tempere o frango com antecedência para ficar mais saboroso! 🍗",
        "Organize os ingredientes antes de começar! 👩‍🍳",
        "Prepare tudo com muito carinho! ❤️",
        "Não esqueça de colocar a mesa para a família! 🍽️"
    ];

    const numero = Math.floor(Math.random() * dicas.length);

    document.querySelector("#resultadoDica").textContent = dicas[numero];
\}

// TEMPO DE PREPARO
function mostrarTempo() {
    document.querySelector("#tempo").textContent =
        "⏰ Tempo de preparo: aproximadamente 1 hora e 30 minutos.";
\}

// MARCAR INGREDIENTES
document.querySelectorAll(".ingrediente").forEach(function(item) {
    item.addEventListener("change", function() {
        item.parentElement.style.textDecoration =
            item.checked ? "line-through" : "none";
    \});
\});

// CONTADOR DE INGREDIENTES
function contarIngredientes() {
    const marcados = document.querySelectorAll(
        ".ingrediente:checked"
    ).length;

    document.querySelector("#contador").textContent =
        marcados + " ingredientes separados!";
\}

document.querySelectorAll(".ingrediente").forEach(function(item) {
    item.addEventListener("change", contarIngredientes);
\});$0