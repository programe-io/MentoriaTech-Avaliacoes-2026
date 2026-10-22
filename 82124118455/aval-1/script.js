
function mostrarDetalhes(modelo) {
    const mensagens = {
        "Moto Esportiva":
            "Ideal para quem gosta de desempenho, design esportivo e adrenalina. Compare potência, consumo e segurança antes de escolher.",

        "Moto de Aventura":
            "Indicada para quem busca conforto e versatilidade em diferentes estradas. Confira ergonomia, autonomia e equipamentos.",

        "Moto Urbana":
            "Uma opção para a rotina na cidade. Considere economia de combustível, manutenção e conforto."
    };

    alert(mensagens[modelo] || "Confira nossos modelos de motos!");
}

function entrarEmContato() {
    alert(
        "Obrigado pelo interesse na MotoSpeed! " +
        "Este é um site demonstrativo. Configure um canal de contato " +
        "para receber mensagens dos visitantes."
    );
}
