// =====================================
// BOTÃO "EXPLORAR"
// =====================================

const botaoExplorar =
    document.getElementById("botaoExplorar");

const mensagem =
    document.getElementById("mensagem");


botaoExplorar.addEventListener("click", function () {

    mensagem.textContent =
        "🐝 🦋 🐞 🐜 Vamos conhecer o incrível mundo dos insetos!";

});


// =====================================
// INFORMAÇÕES DOS INSETOS
// =====================================

const informacoes = {

    abelha:
        "🐝 As abelhas são importantes polinizadoras e vivem em colônias organizadas.",

    borboleta:
        "🦋 As borboletas passam por diferentes fases durante sua metamorfose.",

    joaninha:
        "🐞 Muitas joaninhas ajudam no controle de pequenos insetos que podem prejudicar plantas.",

    formiga:
        "🐜 As formigas vivem em sociedades organizadas e trabalham em conjunto."
};


// =====================================
// BOTÕES "SAIBA MAIS"
// =====================================

const botoesInfo =
    document.querySelectorAll(".botaoInfo");


botoesInfo.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const inseto =
            botao.getAttribute("data-inseto");

        alert(informacoes[inseto]);

    });

});


// =====================================
// CURIOSIDADES
// =====================================

const curiosidades = [

    "🐝 Algumas abelhas vivem em colônias com milhares de indivíduos.",

    "🦋 As borboletas passam por uma transformação chamada metamorfose.",

    "🐜 As formigas utilizam sinais químicos para se comunicar.",

    "🐞 A joaninha pertence ao grupo dos besouros.",

    "🦗 Muitos insetos possuem estruturas especializadas para saltar ou voar."

];


const botaoCuriosidade =
    document.getElementById("botaoCuriosidade");


const curiosidadeTexto =
    document.getElementById("curiosidadeTexto");


let indice = 0;


botaoCuriosidade.addEventListener("click", function () {

    curiosidadeTexto.textContent =
        curiosidades[indice];

    indice++;

    if (indice >= curiosidades.length) {
        indice = 0;
    }

});