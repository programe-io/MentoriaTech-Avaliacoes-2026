let impacto = 0;

function contar(){

    impacto += 25;

    if(impacto > 100){
        impacto = 100;
    }

    document.getElementById("numero").innerHTML = impacto + "%";
}


const perguntas = [

{
pergunta:"Qual é a principal causa da poluição do ar?",

respostas:[
"Plantas",
"Queima de combustíveis fósseis",
"Chuvas"
],

correta:1
},

{
pergunta:"Qual material demora centenas de anos para se decompor?",

respostas:[
"Plástico",
"Papel",
"Folhas"
],

correta:0
},

{
pergunta:"Qual atitude ajuda o meio ambiente?",

respostas:[
"Jogar lixo nos rios",
"Reciclar materiais",
"Queimar lixo"
],

correta:1
}

];

let indice = 0;
let pontos = 0;

function carregarPergunta(){

    if(indice >= perguntas.length){

        document.getElementById("pergunta").innerHTML =
        "Quiz Finalizado!";

        document.getElementById("respostas").innerHTML="";

        document.getElementById("resultado").innerHTML =
        "Você acertou "+pontos+" de "+perguntas.length+" perguntas.";

        return;
    }

    document.getElementById("pergunta").innerHTML =
    perguntas[indice].pergunta;

    let respostas = "";

    perguntas[indice].respostas.forEach((resposta,i)=>{

        respostas +=
        `<button onclick="responder(${i})">${resposta}</button>`;

    });

    document.getElementById("respostas").innerHTML = respostas;

}

function responder(opcao){

    if(opcao == perguntas[indice].correta){

        pontos++;

        alert("Resposta Correta!");

    }else{

        alert("Resposta Errada!");

    }

}

function proximaPergunta(){

    indice++;

    carregarPergunta();

}

carregarPergunta();