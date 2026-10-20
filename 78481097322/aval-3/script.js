
function mostrarInfo(tipo) {
    let mensagem = "";

    if (tipo === "Esportiva") {
        mensagem = "🏍️ Motos esportivas possuem design aerodinâmico e são projetadas para desempenho.";
    } else if (tipo === "Scooter") {
        mensagem = "🛵 Scooters são práticas para deslocamentos urbanos e geralmente possuem câmbio automático.";
    } else if (tipo === "Trail") {
        mensagem = "🏁 Motos trail são versáteis e podem ser usadas em diferentes tipos de terreno.";
    }

    alert(mensagem);
}
