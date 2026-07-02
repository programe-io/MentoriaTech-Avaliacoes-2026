// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo à MotoMax!");
};

// Exibe detalhes da moto selecionada
function verMoto(nome) {
    alert("Você selecionou a moto: " + nome);
}

// Mostra a data e hora atual
function mostrarData() {
    const data = new Date();
    document.getElementById("data").innerHTML =
        "Última visita: " + data.toLocaleString("pt-BR");
}