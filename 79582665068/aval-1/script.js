
const filmes = {

    interestelar: {
        titulo: "Interestelar",
        imagem: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        sinopse: "Em um futuro em que a Terra enfrenta uma crise ambiental, um grupo de astronautas viaja pelo espaço em busca de um planeta habitável para garantir a sobrevivência da humanidade.",
        diretor: "Christopher Nolan",
        elenco: "Matthew McConaughey, Anne Hathaway e Jessica Chastain",
        ano: "2014",
        duracao: "2h 49min",
        genero: "Ficção científica e aventura",
        classificacao: "10 anos"
    },

    oppenheimer: {
        titulo: "Oppenheimer",
        imagem: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        sinopse: "O filme conta a história de J. Robert Oppenheimer, físico que liderou o desenvolvimento da primeira bomba atômica durante a Segunda Guerra Mundial.",
        diretor: "Christopher Nolan",
        elenco: "Cillian Murphy, Emily Blunt e Robert Downey Jr.",
        ano: "2023",
        duracao: "3h",
        genero: "Drama e história",
        classificacao: "16 anos"
    },

    batman: {
        titulo: "Batman: O Cavaleiro das Trevas",
        imagem: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        sinopse: "Batman enfrenta o Coringa, um criminoso que espalha o caos em Gotham City e coloca a cidade em perigo.",
        diretor: "Christopher Nolan",
        elenco: "Christian Bale, Heath Ledger e Aaron Eckhart",
        ano: "2008",
        duracao: "2h 32min",
        genero: "Ação e suspense",
        classificacao: "12 anos"
    }

};

// Função para mostrar detalhes

function detalhes(id) {

    const filme = filmes[id];

    if (!filme) return;

    document.getElementById("titulo-filme").textContent = filme.titulo;

    document.getElementById("imagem-filme").src = filme.imagem;

    document.getElementById("sinopse").textContent = filme.sinopse;

    document.getElementById("diretor").textContent = filme.diretor;

    document.getElementById("elenco").textContent = filme.elenco;

    document.getElementById("ano").textContent = filme.ano;

    document.getElementById("duracao").textContent = filme.duracao;

    document.getElementById("genero").textContent = filme.genero;

    document.getElementById("classificacao").textContent = filme.classificacao;

    document.getElementById("detalhes-filme").style.display = "block";

    document.getElementById("detalhes-filme").scrollIntoView({
        behavior: "smooth"
    });
}

// Função para fechar os detalhes

function fecharDetalhes() {

    document.getElementById("detalhes-filme").style.display = "none";

}
