
const victor = {
    nome: "Victor Matheus",
    estilo: "Masculino 😎",
    cor: "Azul e Preto",

    gostos: [
        "🎮 Jogar no celular",
        "📱 Mexer no celular",
        "🗣️ Conversar com meus amigos",
        "🤝 Fazer amizades"
    ],

    apresentar: function() {
        console.log("Olá, eu sou " + this.nome + "!");
        console.log("Esse sou eu 😎");

        console.log("Eu gosto de:");
        this.gostos.forEach(gosto => {
            console.log(gosto);
        });
    }
};

victor.apresentar();
