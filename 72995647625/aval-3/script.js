function mostrarOferta(){

    const ofertas = [

        "🎉 Tênis Esportivo com 20% de desconto!",

        "👞 Sapato Social em até 10x sem juros!",

        "🥾 Bota com frete grátis para todo o Brasil!",

        "🔥 Promoção: leve 2 pares e ganhe 15% de desconto!",

        "⭐ Oferta especial válida somente hoje!"

    ];

    let numero = Math.floor(Math.random() * ofertas.length);

    document.getElementById("mensagem").innerHTML = ofertas[numero];

}