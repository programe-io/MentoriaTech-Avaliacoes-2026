
const botoesDetalhes = document.querySelectorAll(".detalhes");

botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const item = botao.dataset.item;

        const mensagens = {
            "Craques da Bola":
                "O futebol é feito de habilidade, treino, talento e trabalho em equipe!",
            "Grandes Estádios":
                "Os estádios recebem torcedores e partidas que ficam marcadas na história!",
            "Futebol Brasileiro":
                "O Brasil conquistou cinco Copas do Mundo masculinas: 1958, 1962, 1970, 1994 e 2002."
        };

        alert(item + "\n\n" + mensagens[item]);
    });
});

const botaoNoticias = document.getElementById("botaoNoticias");

botaoNoticias.addEventListener("click", () => {
    const curiosidades = [
        "O Brasil é o único país que participou de todas as edições da Copa do Mundo masculina até 2022.",
        "Uma partida oficial de futebol normalmente tem dois tempos de 45 minutos.",
        "O futebol é praticado por milhões de pessoas em todo o mundo.",
        "A primeira Copa do Mundo masculina aconteceu em 1930, no Uruguai."
    ];

    const indice = Math.floor(Math.random() * curiosidades.length);

    alert("⚽ CURIOSIDADE DO FUTEBOL\n\n" + curiosidades[indice]);
});

const botaoTorcida = document.getElementById("botaoTorcida");

botaoTorcida.addEventListener("click", () => {
    alert(
        "⚽ GOOOOOL!\n\n" +
        "Vista a camisa, reúna a torcida e viva a emoção do futebol!\n" +
        "Futebol Total: paixão que nunca acaba!"
    );
});

console.log("Futebol Total carregado com sucesso!");
