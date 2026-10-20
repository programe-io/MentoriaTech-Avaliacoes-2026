
function mostrarInfo(tipo) {
    let mensagem = "";

    if (tipo === "Esportivo") {
        mensagem = "🏎️ Carros esportivos priorizam desempenho, potência e design.";
    } else if (tipo === "SUV") {
        mensagem = "🚙 SUVs oferecem espaço interno, conforto e versatilidade.";
    } else if (tipo === "Elétrico") {
        mensagem = "⚡ Carros elétricos utilizam motores alimentados por baterias.";
    }

    alert(mensagem);
}
