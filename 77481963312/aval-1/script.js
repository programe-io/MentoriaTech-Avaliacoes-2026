const fases = [

{
texto:"Maria gosta de ler livros de aventura. Todos os dias ela lê antes de dormir. Seu livro favorito conta a história de um explorador em busca de tesouros.",

pergunta:"Qual é o tipo de livro preferido de Maria?",

opcoes:[
"Romance",
"Aventura",
"Terror",
"Comédia"
],

resposta:1

},

{
texto:"João plantou uma árvore. Todos os dias ele regava a planta e cuidava dela. Depois de alguns meses ela começou a dar frutos.",

pergunta:"O que João fazia todos os dias?",

opcoes:[
"Jogava bola",
"Regava a planta",
"Vendia frutas",
"Cortava a árvore"
],

resposta:1

},

{
texto:"Ana visitou um zoológico. Ela viu vários animais. O que mais chamou sua atenção foi a girafa por causa do pescoço comprido.",

pergunta:"Qual animal chamou mais atenção de Ana?",

opcoes:[
"Macaco",
"Elefante",
"Girafa",
"Leão"
],

resposta:2

}

];

let fase = 0;
let pontos = 0;

const texto = document.getElementById("texto");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const resultado = document.getElementById("resultado");
const pontuacao = document.getElementById("pontuacao");

function mostrarPergunta(){

resultado.innerHTML="";

let atual=fases[fase];

texto.innerHTML=atual.texto;

pergunta.innerHTML=atual.pergunta;

opcoes.innerHTML="";

atual.opcoes.forEach((opcao,index)=>{

let botao=document.createElement("button");

botao.innerHTML=opcao;

botao.onclick=function(){

verificar(index);

}

opcoes.appendChild(botao);

});

}

function verificar(escolha){

if(escolha===fases[fase].resposta){

resultado.innerHTML="✅ Você acertou!";

pontos+=10;

}else{

resultado.innerHTML="❌ Você errou!";

}

pontuacao.innerHTML="Pontos: "+pontos;

fase++;

setTimeout(function(){

if(fase<fases.length){

mostrarPergunta();

}else{

fim();

}

},1200);

}

function fim(){

texto.innerHTML="<h2>Parabéns!</h2>";

pergunta.innerHTML="Você concluiu o jogo!";

opcoes.innerHTML="";

resultado.innerHTML="🏆 Sua pontuação final foi: "+pontos+" pontos.";

}

mostrarPergunta();