function mostrarMensagem(){

    const mensagens = [

    "Continue construindo seus sonhos, um bloco de cada vez.",

    "Os maiores desafios escondem as maiores recompensas.",

    "Cada erro é uma oportunidade para construir melhor.",

    "Quem nunca desiste sempre encontra seu diamante.",

    "A criatividade é o bloco mais valioso que existe.",

    "O verdadeiro jogador não desiste; ele reconstrói.",

    "A vida é como o Minecraft: você cria o seu próprio mundo."

    ];

    let sorteio = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").innerHTML = mensagens[sorteio];

    }

    
}