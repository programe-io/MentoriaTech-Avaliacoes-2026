// Espera o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    // Criar um botão dinamicamente
    const botao = document.createElement("button");
    botao.textContent = "Clique aqui";
    document.querySelector("main").appendChild(botao);

    // Criar um parágrafo para mostrar mensagens
    const mensagem = document.createElement("p");
    document.querySelector("main").appendChild(mensagem);

    // Evento de clique
    botao.addEventListener("click", function () {
        mensagem.textContent = "Você clicou no botão! 🎉";
        mensagem.style.color = "#ff3c00";
    \});

    // Mostrar hora atual
    const hora = document.createElement("p");
    document.querySelector("main").appendChild(hora);

    function atualizarHora() {
        const agora = new Date();
        hora.textContent = "Hora atual: " + agora.toLocaleTimeString();
    \}

    setInterval(atualizarHora, 1000);
    atualizarHora();
\});$0