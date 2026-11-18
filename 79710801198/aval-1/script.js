// Banco de dados das casas de Hogwarts
const casas = [
    {
        nome: "Grifinória",
        icone: "🦁",
        corFundo: "#4a0e0e",
        corCartao: "#740001",
        corTexto: "#eeba30",
        descricao: "Onde habitam os corações indômitos. Ousadia, sangue-frio e nobreza destacam os alunos da Grifinória."
    },
    {
        nome: "Sonserina",
        icone: "🐍",
        corFundo: "#0d2618",
        corCartao: "#1a472a",
        corTexto: "#aaaaaa",
        descricao: "Você fará grandes amigos aqui. Pessoas astutas que usam quaisquer meios para atingir os fins que colimaram."
    },
    {
        nome: "Corvinal",
        icone: "🦅",
        corFundo: "#081226",
        corCartao: "#0e1a40",
        corTexto: "#946b2d",
        descricao: "A casa dos que têm a mente sempre alerta, onde os homens de grande espírito e saber sempre encontrarão companheiros."
    },
    {
        nome: "Lufa-Lufa",
        icone: "🦡",
        corFundo: "#4d3e00",
        corCartao: "#ecb939",
        corTexto: "#111111",
        descricao: "Onde eles são justos e leais. Pacientes, sinceros e sem medo da dor do trabalho."
    }
];

// Função principal que realiza o sorteio
function sortearCasa() {
    const inputNome = document.getElementById("nome-bruxo");
    const nomeBruxo = inputNome.value.trim();

    // Verifica se o campo não está vazio
    if (nomeBruxo === "") {
        alert("Por favor, diga seu nome ao Chapéu Seletor primeiro!");
        inputNome.focus();
        return;
    }

    // Escolhe uma casa aleatoriamente
    const indiceAleatorio = Math.floor(Math.random() * casas.length);
    const casaEscolhida = casas[indiceAleatorio];

    // Atualiza os textos na tela
    document.getElementById("mensagem-boas-vindas").innerText = `Hmm, difícil... muito difícil, ${nomeBruxo}. Mas já sei onde colocar você:`;
    document.getElementById("icone-casa").innerText = casaEscolhida.icone;
    document.getElementById("nome-casa").innerText = casaEscolhida.nome;
    document.getElementById("descricao-casa").innerText = casaEscolhida.descricao;

    // Aplica as cores da casa escolhida no site
    aplicarTemaDaCasa(casaEscolhida);

    // Exibe a área de resultado e reinicia a animação CSS
    const divResultado = document.getElementById("resultado");
    divResultado.style.display = "none";
    void divResultado.offsetWidth; // Truque para reiniciar a animação
    divResultado.style.display = "block";
}

// Função auxiliar para alterar as cores
function aplicarTemaDaCasa(casa) {
    document.body.style.backgroundColor = casa.corFundo;
    
    const cartao = document.getElementById("cartao");
    cartao.style.backgroundColor = casa.corCartao;
    cartao.style.color = casa.corTexto;
    
    document.getElementById("nome-casa").style.color = casa.corTexto;
}

// Permite acionar o sorteio pressionando a tecla "Enter" dentro do campo de texto
document.getElementById("nome-bruxo").addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        sortearCasa();
    }
});
