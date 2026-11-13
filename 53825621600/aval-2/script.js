
function lerMais(artigo) {

    const noticias = {
        crescimento: {
            titulo: "O crescimento do mundo gamer",
            texto: "O mercado de games cresce constantemente. Hoje, milhões de pessoas jogam em computadores, consoles e celulares. Os jogos também movimentam campeonatos, comunidades e grandes eventos."
        },

        evolucao: {
            titulo: "A evolução dos videogames",
            texto: "Os videogames evoluíram muito. Os gráficos, a inteligência artificial e as experiências online transformaram a maneira como jogamos."
        },

        esports: {
            titulo: "O universo dos jogos competitivos",
            texto: "Os esportes eletrônicos reúnem jogadores profissionais e fãs em campeonatos de diversos jogos. Estratégia, treino e trabalho em equipe são fundamentais."
        }
    };

    const noticia = noticias[artigo];

    if (noticia) {
        alert(noticia.titulo + "\n\n" + noticia.texto);
    }
}
