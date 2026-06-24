const perguntas = [
{
nivel:"Fácil",
pergunta:"Quem é o líder dos Pogues?",
opcoes:["JJ Maybank","John B","Pope","Rafe"],
correta:1
},
{
nivel:"Fácil",
pergunta:"Qual o nome da família rica da série?",
opcoes:["Heyward","Cameron","Maybank","Carrera"],
correta:1
},
{
nivel:"Fácil",
pergunta:"Quem é o melhor amigo de John B?",
opcoes:["Ward","JJ","Topper","Shoupe"],
correta:1
},
{
nivel:"Médio",
pergunta:"Qual personagem se apaixona por John B?",
opcoes:["Kiara","Sarah","Cleo","Wheezie"],
correta:1
},
{
nivel:"Médio",
pergunta:"Qual é o grupo dos personagens pobres?",
opcoes:["Kooks","Pogues","Camerons","Sharks"],
correta:1
},
{
nivel:"Médio",
pergunta:"Quem é o pai de Sarah Cameron?",
opcoes:["Big John","Ward Cameron","Rafe","Kelce"],
correta:1
},
{
nivel:"Difícil",
pergunta:"Qual personagem se torna aliado dos Pogues mais tarde?",
opcoes:["Topper","Rafe","Cleo","Ward"],
correta:2
},
{
nivel:"Difícil",
pergunta:"Qual o nome do pai de John B?",
opcoes:["Big John","Ward","Luke","Heyward"],
correta:0
},
{
nivel:"Difícil",
pergunta:"Quem é o principal antagonista da série?",
opcoes:["JJ","Ward Cameron","Pope","Kiara"],
correta:1
}
];

let atual = 0;
let pontos = 0;

function carregar(){
    const q = perguntas[atual];

    document.getElementById("nivel").innerText = "Nível: " + q.nivel;
    document.getElementById("pergunta").innerText = q.pergunta;

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.onclick = () => verificar(index);
        opcoesDiv.appendChild(btn);
    });
}

function verificar(escolha){
    if(escolha === perguntas[atual].correta){
        pontos++;
        document.getElementById("resultado").innerText = "✔️ Correto!";
    } else {
        document.getElementById("resultado").innerText = "❌ Errado!";
    }

    document.getElementById("pontuacao").innerText = "Pontuação: " + pontos;

    atual++;

    if(atual < perguntas.length){
        setTimeout(carregar, 800);
    } else {
        document.getElementById("pergunta").innerText = "Fim do Quiz!";
        document.getElementById("opcoes").innerHTML = "";
    }
}

carregar();

function toggleHistoria(){

const historia = document.getElementById("textoHistoria");
const botao = document.getElementById("botaoHistoria");

if(historia.style.display === "block"){
    historia.style.display = "none";
    botao.innerHTML = "📖 Ver História da Série";
}
else{
    historia.style.display = "block";
    botao.innerHTML = "❌ Fechar História";
}

}