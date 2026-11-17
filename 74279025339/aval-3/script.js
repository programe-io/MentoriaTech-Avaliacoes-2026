
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("🏫 Seja bem-vindo ao site da Escola Iraci Barros Pinto!");
\});


// APRESENTAÇÃO DA ESCOLA
function conhecerEscola() {
    alert(
        "💙 CETI Professora Iraci Barros Pinto!\\n\\n" +
        "Localizada em Santa Luz - Piauí.\\n" +
        "Uma escola dedicada à educação, ao conhecimento e ao futuro dos estudantes!"
    );
\}


// MENSAGEM PARA OS ESTUDANTES
function mensagemAluno() {
    alert(
        "🎓 Querido estudante!\\n\\n" +
        "Acredite no seu potencial, valorize seus estudos " +
        "e nunca desista dos seus sonhos!\\n\\n" +
        "O futuro começa com a educação!"
    );
\}


// MOSTRAR CARACTERÍSTICAS DA ESCOLA
function caracteristicas() {

    alert(
        "📚 CARACTERÍSTICAS DA ESCOLA\\n\\n" +
        "• Educação pública\\n" +
        "• Ensino Médio\\n" +
        "• Formação profissional\\n" +
        "• Incentivo à tecnologia\\n" +
        "• Formação cidadã\\n" +
        "• Desenvolvimento dos estudantes"
    );

\}


// PESQUISA DE INFORMAÇÕES
function pesquisarInformacao() {

    let pesquisa = prompt("O que você deseja conhecer sobre a escola?");

    if (pesquisa && pesquisa.trim() !== "") {

        alert("🔎 Você pesquisou: " + pesquisa);

    \} else {

        alert("Digite uma informação para pesquisar!");

    \}

\}


// MODO ESCURO
function mudarTema() {

    document.body.classList.toggle("tema-escuro");

\}


// DATA ATUAL
function mostrarData() {

    let hoje = new Date();

    alert(
        "📅 Hoje é: " +
        hoje.toLocaleDateString("pt-BR")
    );

\}


// INTERAÇÃO COM OS CARTÕES
const cartoes = document.querySelectorAll(".card");

cartoes.forEach(function(cartao) {

    cartao.addEventListener("click", function() {

        let titulo = cartao.querySelector("h3").textContent;

        alert("📖 Você selecionou: " + titulo);

    \});

\});


// MENSAGEM FINAL
function mensagemFinal() {

    alert(
        "💙 Escola Iraci Barros Pinto!\\n\\n" +
        "Educação, respeito e conhecimento " +
        "construindo um futuro melhor!"
    );
$0