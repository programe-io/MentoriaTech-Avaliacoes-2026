function mostrarInfo(dorama) {
    let mensagem = "";

    switch (dorama) {
        case "Beleza Verdadeira":
            mensagem = "Um dorama sobre beleza, autoestima e amor!";
            break;

        case "O Amor Mora ao Lado":
            mensagem = "Uma história emocionante sobre amizade e romance!";
            break;

        case "Meu Demônio Favorito":
            mensagem = "Um romance fantástico entre uma herdeira e um demônio!";
            break;

        case "Pretendente Surpresa":
            mensagem = "Uma comédia romântica cheia de surpresas!";
            break;

        default:
            mensagem = "Dorama não encontrado.";
    }

    alert(mensagem);
}