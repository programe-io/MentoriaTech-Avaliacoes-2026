// Mensagem ao carregar a página
window.onload = function() {
    console.log("Página carregada com sucesso!");
\};

// Função para mostrar alerta
function mostrarMensagem() {
    alert("Você clicou no botão!");
\}

// Mudar cor do fundo ao clicar
function mudarCor() {
    const cores = ["#f4f4f4", "#dfe6e9", "#ffeaa7", "#fab1a0", "#81ecec"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    document.body.style.backgroundColor = corAleatoria;
\}$0