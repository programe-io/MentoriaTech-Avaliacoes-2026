```javascript
const perguntas = [

    // MATEMÁTICA
    {
        materia: "Matemática",
        nivel: "Fácil",
        pergunta: "Quanto é 8 + 7?",
        opcoes: ["12", "15", "16", "14"],
        resposta: "15"
    },
    {
        materia: "Matemática",
        nivel: "Médio",
        pergunta: "Quanto é 12 × 8?",
        opcoes: ["86", "96", "108", "92"],
        resposta: "96"
    },
    {
        materia: "Matemática",
        nivel: "Difícil",
        pergunta: "Qual é a raiz quadrada de 144?",
        opcoes: ["10", "11", "12", "14"],
        resposta: "12"
    },

    // PORTUGUÊS
    {
        materia: "Português",
        nivel: "Fácil",
        pergunta: "Qual palavra está escrita corretamente?",
        opcoes: ["Caza", "Casa", "Cassa", "Kasa"],
        resposta: "Casa"
    },
    {
        materia: "Português",
        nivel: "Médio",
        pergunta: "Qual é o sinônimo de 'feliz'?",
        opcoes: ["Triste", "Alegre", "Bravo", "Cansado"],
        resposta: "Alegre"
    },
    {
        materia: "Português",
        nivel: "Difícil",
        pergunta: "Qual é a classe gramatical da palavra 'rapidamente'?",
        opcoes: ["Substantivo", "Adjetivo", "Advérbio", "Verbo"],
        resposta: "Advérbio"
    },

    // HISTÓRIA
    {
        materia: "História",
        nivel: "Fácil",
        pergunta: "Quem descobriu o Brasil segundo a versão tradicional ensinada nas escolas?",
        opcoes: [
            "Pedro Álvares Cabral",
            "Dom Pedro II",
            "Tiradentes",
            "Getúlio Vargas"
        ],
        resposta: "Pedro Álvares Cabral"
    },
    {
        materia: "História",
        nivel: "Médio",
        pergunta: "Em que ano ocorreu a Independência do Brasil?",
        opcoes: ["1500", "1822", "1889", "1808"],
        resposta: "1822"
    },
    {
        materia: "História",
        nivel: "Difícil",
        pergunta: "Qual acontecimento marcou o início da Revolução Francesa?",
        opcoes: [
            "Queda da Bastilha",
            "Independência dos EUA",
            "Revolução Industrial",
            "Tratado de Versalhes"
        ],
        resposta: "Queda da Bastilha"
    },

    // GEOGRAFIA
    {
        materia: "Geografia",
        nivel: "Fácil",
        pergunta: "Qual é o maior país da América do Sul?",
        opcoes: ["Argentina", "Brasil", "Chile", "Peru"],
        resposta: "Brasil"
    },
    {
        materia: "Geografia",
        nivel: "Médio",
        pergunta: "Qual é o maior oceano do planeta?",
        opcoes: [
            "Atlântico",
            "Índico",
            "Pacífico",
            "Ártico"
        ],
        resposta: "Pacífico"
    },
    {
        materia: "Geografia",
        nivel: "Difícil",
        pergunta: "Qual linha imaginária divide a Terra em hemisfério Norte e Sul?",
        opcoes: [
            "Meridiano de Greenwich",
            "Trópico de Capricórnio",
            "Linha do Equador",
            "Trópico de Câncer"
        ],
        resposta: "Linha do Equador"
    },

    // CIÊNCIAS
    {
        materia: "Ciências",
        nivel: "Fácil",
        pergunta: "Qual órgão bombeia o sangue pelo corpo?",
        opcoes: ["Pulmão", "Cérebro", "Coração", "Estômago"],
        resposta: "Coração"
    },
    {
        materia: "Ciências",
        nivel: "Médio",
        pergunta: "Qual gás é essencial para a respiração humana?",
        opcoes: ["Oxigênio", "Hélio", "Nitrogênio", "Hidrogênio"],
        resposta: "Oxigênio"
    },
    {
        materia: "Ciências",
        nivel: "Difícil",
        pergunta: "Qual organela é responsável pela produção de energia na célula?",
        opcoes: [
            "Núcleo",
            "Ribossomo",
            "Mitocôndria",
            "Lisossomo"
        ],
        resposta: "Mitocôndria"
    },

    // INGLÊS
    {
        materia: "Inglês",
        nivel: "Fácil",
        pergunta: "O que significa 'Hello'?",
        opcoes: ["Tchau", "Obrigado", "Olá", "Desculpa"],
        resposta: "Olá"
    },
    {
        materia: "Inglês",
        nivel: "Médio",
        pergunta: "O que significa 'I am happy'?",
        opcoes: [
            "Eu estou triste",
            "Eu estou feliz",
            "Eu estou cansado",
            "Eu estou bravo"
        ],
        resposta: "Eu estou feliz"
    },
    {
        materia: "Inglês",
        nivel: "Difícil",
        pergunta: "Qual é o passado de 'go'?",
        opcoes: ["Goed", "Gone", "Went", "Going"],
        resposta: "Went"
    },

    // TECNOLOGIA
    {
        materia: "Tecnologia",
        nivel: "Fácil",
        pergunta: "O que significa HTML?",
        opcoes: [
            "HyperText Markup Language",
            "High Technology Machine Language",
            "Home Tool Markup Language",
            "Hyperlink Text Machine"
        ],
        resposta: "HyperText Markup Language"
    },
    {
        materia: "Tecnologia",
        nivel: "Médio",
        pergunta: "Qual linguagem é usada para adicionar interatividade a páginas web?",
        opcoes: ["HTML", "CSS", "JavaScript", "SQL"],
        resposta: "JavaScript"
    },
    {
        materia: "Tecnologia",
        nivel: "Difícil",
        pergunta: "Qual estrutura de dados funciona no modelo LIFO?",
        opcoes: [
            "Fila",
            "Pilha",
            "Árvore",
            "Tabela"
        ],
        resposta: "Pilha"
    }
];


let perguntaAtual = 0;
let respostas = {};

function iniciarQuiz() {

    perguntaAtual = 0;
    respostas = {};

    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("quiz").classList.remove("escondido");

    mostrarPergunta();
}


function mostrarPergunta() {

    const p = perguntas[perguntaAtual];

    document.getElementById("numero").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("materia").textContent =
        `${p.materia} • ${p.nivel}`;

    document.getElementById("pergunta").textContent =
        p.pergunta;

    const opcoes = document.getElementById("opcoes");

    opcoes.innerHTML = "";

    p.opcoes.forEach(opcao => {

        const div = document.createElement("div");

        div.classList.add("opcao");

        div.textContent = opcao;

        div.onclick = () => selecionarOpcao(div, opcao);

        opcoes.appendChild(div);
    });

    document.getElementById("proxima").disabled = true;

    const porcentagem =
        ((perguntaAtual) / perguntas.length) * 100;

    document.getElementById("progresso").style.width =
        porcentagem + "%";
}


function selecionarOpcao(elemento, resposta) {

    document.querySelectorAll(".opcao").forEach(opcao => {
        opcao.classList.remove("selecionada");
    });

    elemento.classList.add("selecionada");

    respostas[perguntaAtual] = resposta;

    document.getElementById("proxima").disabled = false;
}


function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();
    }
}


function classificacao(porcentagem) {

    if (porcentagem >= 90) {
        return "🏆 Excelente";
    }

    if (porcentagem >= 80) {
        return "🥇 Muito bom";
    }

    if (porcentagem >= 70) {
        return "🥈 Bom";
    }

    if (porcentagem >= 60) {
        return "🥉 Regular";
    }

    return "📚 Precisa melhorar";
}


function mostrarResultado() {

    document.getElementById("quiz").classList.add("escondido");
    document.getElementById("resultado").classList.remove("escondido");

    let resultados = {};

    perguntas.forEach((p, index) => {

        if (!resultados[p.materia]) {
            resultados[p.materia] = {
                total: 0,
                acertos: 0
            };
        }

        resultados[p.materia].total++;

        if (respostas[index] === p.resposta) {
            resultados[p.materia].acertos++;
        }
    });


    let ranking = [];

    for (let materia in resultados) {

        const dados = resultados[materia];

        const porcentagem =
            (dados.acertos / dados.total) * 100;

        ranking.push({
            materia: materia,
            acertos: dados.acertos,
            total: dados.total,
            porcentagem: porcentagem
        });
    }


    ranking.sort((a, b) =>
        b.porcentagem - a.porcentagem
    );


    const melhor = ranking[0];

    document.getElementById("melhorMateria").innerHTML = `
        <h3>🌟 Sua maior habilidade</h3>
        <p><strong>${melhor.materia}</strong></p>
        <p>${melhor.acertos}/${melhor.total} acertos (${melhor.porcentagem}%)</p>
        <p>${classificacao(melhor.porcentagem)}</p>
    `;


    const rankingDiv = document.getElementById("ranking");

    rankingDiv.innerHTML = "";

    ranking.forEach((item, index) => {

        rankingDiv.innerHTML += `
            <div class="resultado-materia">

                <div class="nome-materia">
                    ${index + 1}º - ${item.materia}
                </div>

                <div class="nota">
                    ${item.acertos}/${item.total} acertos
                    — ${item.porcentagem.toFixed(0)}%
                    — ${classificacao(item.porcentagem)}
                </div>

            </div>
        `;
    });
}


function reiniciar() {

    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");

}
```
