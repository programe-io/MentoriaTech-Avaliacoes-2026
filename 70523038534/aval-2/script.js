function mostrarMensagem(){

    const mensagens = [

        "Sempre verifique a fonte antes de compartilhar!",

        "Uma notícia falsa pode prejudicar milhares de pessoas.",

        "Desconfie de títulos sensacionalistas.",

        "Informação correta salva vidas.",

        "Combater Fake News é responsabilidade de todos."

    ];

    let sorteio = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").innerHTML = mensagens[sorteio];

}