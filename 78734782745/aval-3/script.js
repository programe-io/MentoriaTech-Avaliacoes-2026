const questoes = [
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["São Paulo", "Brasília", "Rio de Janeiro"],
        correta: 1
    \},
    {
        pergunta: "Quanto é 5 + 5?",
        opcoes: ["10", "15", "20"],
        correta: 0
    \}
];

let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    const q = questoes[indiceAtual];
    document.getElementById("pergunta").textContent = q.pergunta;
    
    const divRespostas = document.getElementById("respostas");
    divRespostas.innerHTML = "";
    
    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.classList.add("opcao");
        btn.onclick = () => verificarResposta(index);
        divRespostas.appendChild(btn);
    \});
\}

function verificarResposta(escolha) {
    const q = questoes[indiceAtual];
    if (escolha === q.correta) {
        pontuacao++;
    \}
    indiceAtual++;
    
    if (indiceAtual < questoes.length) {
        carregarPergunta();
    \} else {
        mostrarResultado();
    \}
\}

function mostrarResultado() {
    document.getElementById("pergunta").textContent = "Fim do Quiz!";
    document.getElementById("respostas").innerHTML = `Você acertou \${pontuacao\} de \${questoes.length\} perguntas!`;
\}

carregarPergunta();$0