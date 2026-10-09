const historias = [
    {
        titulo: "O que existe no escuro?",
        texto: "Toda noite, às 03:00, alguém bate três vezes na porta do meu quarto. O problema é que moro sozinho. E hoje... as batidas vieram de dentro do guarda-roupa.",
        icone: "🌑"
    },
    {
        titulo: "A foto de família",
        texto: "Tirei uma foto da minha família na sala. Quando olhei a imagem, havia uma mulher atrás de nós. Perguntei quem era. Minha mãe ficou pálida e disse: 'Ela morreu antes de você nascer.'",
        icone: "📸"
    },
    {
        titulo: "Não olhe para trás",
        texto: "Eu estava sozinho em casa quando ouvi passos atrás de mim. Parei. Os passos também pararam. Comecei a correr. Então meu celular vibrou com uma mensagem do meu próprio número: 'Não adianta correr. Eu já estou aí.'",
        icone: "📱"
    },
    {
        titulo: "O passageiro",
        texto: "O motorista do aplicativo perguntou por que eu havia escolhido aquele endereço. Respondi que era minha casa. Ele olhou pelo retrovisor e sussurrou: 'Mas foi exatamente aqui que deixei você ontem... antes do acidente.'",
        icone: "🚗"
    },
    {
        titulo: "A voz no quarto",
        texto: "Quando criança, eu ouvia minha mãe me chamar durante a noite. Um dia, perguntei por que ela fazia isso. Ela respondeu: 'Eu nunca entro no seu quarto depois que você dorme.' Naquela noite, a voz chamou novamente.",
        icone: "🚪"
    }
];

const botao = document.getElementById("botao-historia");
const titulo = document.getElementById("titulo-historia");
const texto = document.getElementById("texto-historia");
const icone = document.getElementById("icone");

let ultimaHistoria = 0;

botao.addEventListener("click", function () {
    let indice;

    // Escolhe uma história diferente da anterior
    do {
        indice = Math.floor(Math.random() * historias.length);
    } while (indice === ultimaHistoria);

    ultimaHistoria = indice;

    const historia = historias[indice];

    titulo.textContent = historia.titulo;
    texto.textContent = historia.texto;
    icone.textContent = historia.icone;
});