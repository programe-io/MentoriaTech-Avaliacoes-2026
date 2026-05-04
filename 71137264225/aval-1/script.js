// Mensagem de boas-vindas ao carregar a página
window.onload = function() {
    alert("Bem-vindo ao meu site!");
    mostrarHora();
};

// Função para mudar o texto
function mudarTexto() {
    const texto = document.getElementById("texto");
    texto.innerHTML = "Valeu por visitar meu site 😎";
}

// Função para mostrar a hora atual
function mostrarHora() {
    const horaElemento = document.getElementById("hora");
    
    setInterval(() => {
        const agora = new Date();
        const hora = agora.toLocaleTimeString();
        horaElemento.innerHTML = "Hora atual: " + hora;
    }, 1000);
}