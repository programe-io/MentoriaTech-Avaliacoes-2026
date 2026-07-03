const questions = [

{
question:"Qual é o",
answers:["São Paulo","Brasília","Salvador","Rio de Janeiro"],
correct:1
},

{
question:"Quanto é 8 × 7?",
answers:["54","56","64","48"],
correct:1
},

{
question:"Qual linguagem é responsável pela interatividade de um site?",
answers:["CSS","HTML","JavaScript","Python"],
correct:2
},

{
question:"Qual é o maior planeta do Sistema Solar?",
answers:["Terra","Marte","Júpiter","Saturno"],
correct:2
},

{
question:"Quantos continentes existem?",
answers:["5","6","7","8"],
correct:2
}

];

let currentQuestion=0;
let score=0;

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const nextBtn=document.getElementById("nextBtn");

function loadQuestion(){

nextBtn.style.display="none";

question.textContent=questions[currentQuestion].question;

answers.innerHTML="";

questions[currentQuestion].answers.forEach((answer,index)=>{

const button=document.createElement("button");

button.innerText=answer;

button.classList.add("answer");

button.onclick=()=>selectAnswer(index);

answers.appendChild(button);

});

}

function selectAnswer(index){

const buttons=document.querySelectorAll(".answer");

buttons.forEach(btn=>btn.disabled=true);

if(index===questions[currentQuestion].correct){

buttons[index].classList.add("correct");

score++;

}else{

buttons[index].classList.add("wrong");

buttons[questions[currentQuestion].correct].classList.add("correct");

}

nextBtn.style.display="inline-block";

}

nextBtn.onclick=()=>{

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}else{

document.getElementById("quiz").classList.add("hidden");

document.getElementById("result").classList.remove("hidden");

document.getElementById("score").innerHTML=
`Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br><br>Pontuação: <strong>${Math.round(score/questions.length*100)}%</strong>`;

}

};

loadQuestion();