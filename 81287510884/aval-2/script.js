// BANCO DE MATÉRIAS E QUESTÕES

const materias = [
    {
        nome: "Matemática",
        icone: "📐",
        descricao: "Números, cálculos, formas geométricas e raciocínio lógico.",
        assuntos: [
            {
                nome: "Geometria",
                descricao: "Estude formas geométricas, áreas, perímetros e figuras.",
                perguntas: [
                    {
                        pergunta: "Quantos lados possui um hexágono?",
                        opcoes: ["4 lados", "5 lados", "6 lados", "8 lados"],
                        correta: 2,
                        explicacao: "Um hexágono é um polígono que possui seis lados."
                    },
                    {
                        pergunta: "Qual é a fórmula da área de um retângulo?",
                        opcoes: [
                            "Base × altura",
                            "Base + altura",
                            "Base ÷ altura",
                            "Base - altura"
                        ],
                        correta: 0,
                        explicacao: "A área do retângulo é calculada multiplicando a base pela altura."
                    },
                    {
                        pergunta: "Quantos graus possui um ângulo reto?",
                        opcoes: ["45°", "90°", "180°", "360°"],
                        correta: 1,
                        explicacao: "Um ângulo reto possui exatamente 90 graus."
                    }
                ]
            },
            {
                nome: "Álgebra",
                descricao: "Equações, expressões algébricas e incógnitas.",
                perguntas: [
                    {
                        pergunta: "Quanto vale x na equação 2x = 10?",
                        opcoes: ["2", "4", "5", "10"],
                        correta: 2,
                        explicacao: "Dividindo os dois lados por 2, encontramos x = 5."
                    },
                    {
                        pergunta: "Qual é o resultado de 3x + 2x?",
                        opcoes: ["5x", "6x", "5x²", "x"],
                        correta: 0,
                        explicacao: "Somamos os coeficientes: 3 + 2 = 5."
                    }
                ]
            },
            {
                nome: "Porcentagem",
                descricao: "Descontos, aumentos e cálculos percentuais.",
                perguntas: [
                    {
                        pergunta: "Quanto é 50% de 200?",
                        opcoes: ["50", "100", "150", "200"],
                        correta: 1,
                        explicacao: "50% representa a metade. Metade de 200 é 100."
                    },
                    {
                        pergunta: "Quanto é 10% de 500?",
                        opcoes: ["5", "10", "50", "100"],
                        correta: 2,
                        explicacao: "10% de 500 é 500 × 0,10 = 50."
                    }
                ]
            }
        ]
    },

    {
        nome: "Português",
        icone: "📖",
        descricao: "Gramática, interpretação textual e literatura.",
        assuntos: [
            {
                nome: "Interpretação de texto",
                descricao: "Compreensão, interpretação e identificação de ideias.",
                perguntas: [
                    {
                        pergunta: "O que é a ideia principal de um texto?",
                        opcoes: [
                            "A informação central apresentada",
                            "A quantidade de palavras",
                            "O nome do autor",
                            "A última palavra"
                        ],
                        correta: 0,
                        explicacao: "A ideia principal representa o assunto central do texto."
                    },
                    {
                        pergunta: "O que significa interpretar um texto?",
                        opcoes: [
                            "Copiar todas as frases",
                            "Compreender seus sentidos e informações",
                            "Contar os parágrafos",
                            "Ler somente o título"
                        ],
                        correta: 1,
                        explicacao: "Interpretar é compreender as informações explícitas e implícitas."
                    }
                ]
            },
            {
                nome: "Gramática",
                descricao: "Classes gramaticais, verbos, substantivos e adjetivos.",
                perguntas: [
                    {
                        pergunta: "Qual das alternativas é um substantivo?",
                        opcoes: ["Bonito", "Correr", "Casa", "Rapidamente"],
                        correta: 2,
                        explicacao: "Casa é um substantivo, pois nomeia um lugar ou construção."
                    },
                    {
                        pergunta: "Qual palavra é um adjetivo?",
                        opcoes: ["Felicidade", "Bonito", "Correr", "Mesa"],
                        correta: 1,
                        explicacao: "Bonito é um adjetivo porque caracteriza algo ou alguém."
                    }
                ]
            },
            {
                nome: "Figuras de linguagem",
                descricao: "Metáfora, comparação, ironia e outras figuras.",
                perguntas: [
                    {
                        pergunta: "Qual figura de linguagem aparece em 'Ele é uma fera'?",
                        opcoes: ["Metáfora", "Comparação", "Hipérbole", "Ironia"],
                        correta: 0,
                        explicacao: "A metáfora estabelece uma relação de sentido sem usar conectivos comparativos."
                    },
                    {
                        pergunta: "Qual figura utiliza um exagero intencional?",
                        opcoes: ["Metonímia", "Hipérbole", "Eufemismo", "Antítese"],
                        correta: 1,
                        explicacao: "A hipérbole é utilizada para intensificar uma ideia por meio do exagero."
                    }
                ]
            }
        ]
    },

    {
        nome: "História",
        icone: "🏛️",
        descricao: "Civilizações, acontecimentos históricos e sociedades.",
        assuntos: [
            {
                nome: "História do Brasil",
                descricao: "Colonização, independência e formação brasileira.",
                perguntas: [
                    {
                        pergunta: "Em que ano ocorreu a Independência do Brasil?",
                        opcoes: ["1500", "1822", "1889", "1922"],
                        correta: 1,
                        explicacao: "A Independência do Brasil foi proclamada em 7 de setembro de 1822."
                    },
                    {
                        pergunta: "Quem foi o primeiro imperador do Brasil?",
                        opcoes: [
                            "Dom Pedro I",
                            "Dom Pedro II",
                            "Getúlio Vargas",
                            "Tiradentes"
                        ],
                        correta: 0,
                        explicacao: "Dom Pedro I foi o primeiro imperador do Brasil."
                    }
                ]
            },
            {
                nome: "Idade Antiga",
                descricao: "Egito, Grécia, Roma e primeiras civilizações.",
                perguntas: [
                    {
                        pergunta: "Qual civilização construiu as pirâmides de Gizé?",
                        opcoes: ["Romana", "Grega", "Egípcia", "Persa"],
                        correta: 2,
                        explicacao: "As pirâmides de Gizé foram construídas no Egito Antigo."
                    },
                    {
                        pergunta: "Onde surgiu a democracia na Antiguidade?",
                        opcoes: ["Atenas", "Roma", "Egito", "China"],
                        correta: 0,
                        explicacao: "A democracia surgiu na cidade-estado grega de Atenas."
                    }
                ]
            }
        ]
    },

    {
        nome: "Geografia",
        icone: "🌎",
        descricao: "Planeta Terra, países, clima, população e relevo.",
        assuntos: [
            {
                nome: "Geografia física",
                descricao: "Relevo, clima, vegetação e recursos naturais.",
                perguntas: [
                    {
                        pergunta: "Qual é o maior oceano do planeta?",
                        opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
                        correta: 3,
                        explicacao: "O Oceano Pacífico é o maior oceano da Terra."
                    },
                    {
                        pergunta: "Qual camada da Terra é a mais externa?",
                        opcoes: ["Núcleo", "Crosta", "Manto", "Núcleo interno"],
                        correta: 1,
                        explicacao: "A crosta terrestre é a camada mais externa do planeta."
                    }
                ]
            },
            {
                nome: "Geopolítica",
                descricao: "Países, continentes, economia e relações internacionais.",
                perguntas: [
                    {
                        pergunta: "Quantos continentes são geralmente considerados no modelo de seis continentes?",
                        opcoes: ["4", "5", "6", "8"],
                        correta: 2,
                        explicacao: "No modelo de seis continentes, são considerados América, África, Europa, Ásia, Oceania e Antártida."
                    },
                    {
                        pergunta: "Qual é a capital da Argentina?",
                        opcoes: ["Santiago", "Buenos Aires", "Lima", "Montevidéu"],
                        correta: 1,
                        explicacao: "Buenos Aires é a capital da Argentina."
                    }
                ]
            }
        ]
    },

    {
        nome: "Ciências",
        icone: "🔬",
        descricao: "Seres vivos, corpo humano, natureza e meio ambiente.",
        assuntos: [
            {
                nome: "Biologia",
                descricao: "Células, seres vivos, ecossistemas e genética.",
                perguntas: [
                    {
                        pergunta: "Qual organela é responsável pela respiração celular?",
                        opcoes: ["Ribossomo", "Mitocôndria", "Lisossomo", "Núcleo"],
                        correta: 1,
                        explicacao: "A mitocôndria participa da produção de energia pela respiração celular."
                    },
                    {
                        pergunta: "Qual é a unidade básica dos seres vivos?",
                        opcoes: ["Órgão", "Tecido", "Célula", "Sistema"],
                        correta: 2,
                        explicacao: "A célula é a unidade estrutural e funcional básica dos seres vivos."
                    }
                ]
            },
            {
                nome: "Corpo humano",
                descricao: "Órgãos, sistemas e funcionamento do organismo.",
                perguntas: [
                    {
                        pergunta: "Qual órgão bombeia o sangue pelo corpo?",
                        opcoes: ["Pulmão", "Coração", "Rim", "Estômago"],
                        correta: 1,
                        explicacao: "O coração bombeia o sangue através do sistema circulatório."
                    },
                    {
                        pergunta: "Qual sistema é responsável pelas trocas gasosas?",
                        opcoes: ["Digestório", "Nervoso", "Respiratório", "Muscular"],
                        correta: 2,
                        explicacao: "O sistema respiratório realiza as trocas gasosas entre o organismo e o ambiente."
                    }
                ]
            }
        ]
    },

    {
        nome: "Inglês",
        icone: "🌐",
        descricao: "Vocabulário, tradução, gramática e interpretação.",
        assuntos: [
            {
                nome: "Vocabulário",
                descricao: "Palavras e expressões comuns da língua inglesa.",
                perguntas: [
                    {
                        pergunta: "O que significa a palavra 'Apple'?",
                        opcoes: ["Banana", "Maçã", "Laranja", "Uva"],
                        correta: 1,
                        explicacao: "Apple significa maçã em português."
                    },
                    {
                        pergunta: "Como se diz 'Bom dia' em inglês?",
                        opcoes: ["Good night", "Goodbye", "Good morning", "Good evening"],
                        correta: 2,
                        explicacao: "Good morning significa bom dia."
                    }
                ]
            },
            {
                nome: "Verbo to be",
                descricao: "Aprenda o uso de am, is e are.",
                perguntas: [
                    {
                        pergunta: "Qual alternativa completa: 'She ___ happy'?",
                        opcoes: ["am", "is", "are", "be"],
                        correta: 1,
                        explicacao: "She é usado com is: She is happy."
                    },
                    {
                        pergunta: "Qual alternativa completa: 'They ___ students'?",
                        opcoes: ["is", "am", "are", "be"],
                        correta: 2,
                        explicacao: "They é usado com are: They are students."
                    }
                ]
            }
        ]
    },

    {
        nome: "Física",
        icone: "⚡",
        descricao: "Movimento, energia, força e fenômenos naturais.",
        assuntos: [
            {
                nome: "Cinemática",
                descricao: "Velocidade, distância, tempo e movimento.",
                perguntas: [
                    {
                        pergunta: "Qual é a fórmula da velocidade média?",
                        opcoes: [
                            "Distância ÷ tempo",
                            "Tempo × distância",
                            "Massa × aceleração",
                            "Distância + tempo"
                        ],
                        correta: 0,
                        explicacao: "A velocidade média é calculada dividindo o deslocamento pelo intervalo de tempo."
                    },
                    {
                        pergunta: "Qual é a unidade de velocidade no SI?",
                        opcoes: ["Metro", "Segundo", "m/s", "Quilograma"],
                        correta: 2,
                        explicacao: "A unidade de velocidade no Sistema Internacional é metro por segundo (m/s)."
                    }
                ]
            },
            {
                nome: "Energia",
                descricao: "Tipos de energia e suas transformações.",
                perguntas: [
                    {
                        pergunta: "Qual é a unidade de energia no SI?",
                        opcoes: ["Newton", "Joule", "Watt", "Metro"],
                        correta: 1,
                        explicacao: "O joule (J) é a unidade de energia no Sistema Internacional."
                    },
                    {
                        pergunta: "A energia armazenada em uma bateria é principalmente:",
                        opcoes: [
                            "Química",
                            "Sonora",
                            "Nuclear",
                            "Eólica"
                        ],
                        correta: 0,
                        explicacao: "Uma bateria armazena energia química que pode ser convertida em elétrica."
                    }
                ]
            }
        ]
    },

    {
        nome: "Química",
        icone: "🧪",
        descricao: "Elementos químicos, matéria, misturas e reações.",
        assuntos: [
            {
                nome: "Tabela periódica",
                descricao: "Elementos, símbolos e organização dos átomos.",
                perguntas: [
                    {
                        pergunta: "Qual é o símbolo químico do oxigênio?",
                        opcoes: ["Ox", "O", "Og", "O2"],
                        correta: 1,
                        explicacao: "O símbolo químico do elemento oxigênio é O."
                    },
                    {
                        pergunta: "Qual elemento possui o símbolo H?",
                        opcoes: ["Hélio", "Hidrogênio", "Hafnio", "Hólmio"],
                        correta: 1,
                        explicacao: "H é o símbolo químico do hidrogênio."
                    }
                ]
            },
            {
                nome: "Matéria e misturas",
                descricao: "Estados físicos, substâncias e separação de misturas.",
                perguntas: [
                    {
                        pergunta: "Quais são os três estados físicos mais comuns da matéria?",
                        opcoes: [
                            "Quente, frio e morno",
                            "Sólido, líquido e gasoso",
                            "Claro, escuro e transparente",
                            "Forte, fraco e médio"
                        ],
                        correta: 1,
                        explicacao: "Os três estados físicos mais comuns são sólido, líquido e gasoso."
                    },
                    {
                        pergunta: "A água com sal completamente dissolvido é:",
                        opcoes: [
                            "Mistura homogênea",
                            "Mistura heterogênea",
                            "Substância simples",
                            "Elemento químico"
                        ],
                        correta: 0,
                        explicacao: "A água com sal dissolvido apresenta uma única fase visível, sendo uma mistura homogênea."
                    }
                ]
            }
        ]
    }
];


// ELEMENTOS E VARIÁVEIS

const inicio = document.getElementById("inicio");
const materiasSection = document.getElementById("materias");
const assuntosSection = document.getElementById("assuntos");
const quizSection = document.getElementById("quiz");

const subjectGrid = document.getElementById("subjectGrid");
const topicGrid = document.getElementById("topicGrid");

let materiaAtual = null;
let assuntoAtual = null;
let perguntasAtuais = [];
let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;


// CONTROLE DAS TELAS

function esconderTelas() {
    inicio.classList.add("hidden");
    materiasSection.classList.add("hidden");
    assuntosSection.classList.add("hidden");
    quizSection.classList.add("hidden");
}

function voltarInicio() {
    esconderTelas();
    inicio.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarMaterias() {
    esconderTelas();
    materiasSection.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    carregarMaterias();
}

function voltarAssuntos() {
    esconderTelas();
    assuntosSection.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// MOSTRAR MATÉRIAS

function carregarMaterias(lista = materias) {
    subjectGrid.innerHTML = "";

    if (lista.length === 0) {
        subjectGrid.innerHTML = "<p>Nenhuma matéria encontrada.</p>";
        return;
    }

    lista.forEach(materia => {
        const card = document.createElement("div");
        card.className = "subject-card";

        card.innerHTML = `
            <div class="subject-icon">${materia.icone}</div>
            <h3>${materia.nome}</h3>
            <p>${materia.descricao}</p>
            <button type="button">Explorar matéria →</button>
        `;

        card.addEventListener("click", () => {
            abrirMateria(materia);
        });

        subjectGrid.appendChild(card);
    });
}


// PESQUISAR MATÉRIAS

function pesquisarMaterias() {
    const busca = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filtradas = materias.filter(materia =>
        materia.nome.toLowerCase().includes(busca)
    );

    carregarMaterias(filtradas);
}


// ABRIR MATÉRIA E MOSTRAR ASSUNTOS

function abrirMateria(materia) {
    materiaAtual = materia;

    esconderTelas();
    assuntosSection.classList.remove("hidden");

    document.getElementById("subjectTag").textContent =
        materia.nome.toUpperCase();

    document.getElementById("subjectTitle").textContent =
        "Assuntos de " + materia.nome;

    document.getElementById("subjectDescription").textContent =
        materia.descricao;

    topicGrid.innerHTML = "";

    materia.assuntos.forEach(assunto => {
        const card = document.createElement("div");
        card.className = "topic-card";

        card.innerHTML = `
            <h3>📘 ${assunto.nome}</h3>
            <p>${assunto.descricao}</p>
            <button type="button">Acessar questões →</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            iniciarQuiz(assunto);
        });

        topicGrid.appendChild(card);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// EMBARALHAR PERGUNTAS

function embaralhar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


// INICIAR QUIZ

function iniciarQuiz(assunto) {
    assuntoAtual = assunto;

    // Embaralha perguntas e alternativas
    perguntasAtuais = embaralhar(assunto.perguntas).map(pergunta => {
        const alternativas = pergunta.opcoes.map((texto, indice) => ({
            texto,
            correta: indice === pergunta.correta
        }));

        return {
            ...pergunta,
            alternativas: embaralhar(alternativas)
        };
    });

    perguntaAtual = 0;
    pontos = 0;
    respondeu = false;

    esconderTelas();
    quizSection.classList.remove("hidden");

    document.getElementById("quizSubject").textContent =
        materiaAtual.nome + " - " + assunto.nome;

    document.getElementById("questionArea").classList.remove("hidden");
    document.getElementById("resultArea").classList.add("hidden");

    mostrarPergunta();

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// MOSTRAR PERGUNTA

function mostrarPergunta() {
    respondeu = false;

    const pergunta = perguntasAtuais[perguntaAtual];

    document.getElementById("questionCounter").textContent =
        `Questão ${perguntaAtual + 1} de ${perguntasAtuais.length}`;

    document.getElementById("progress").style.width =
        `${(perguntaAtual / perguntasAtuais.length) * 100}%`;

    document.getElementById("questionText").textContent =
        pergunta.pergunta;

    document.getElementById("feedback").textContent = "";

    const options = document.getElementById("answerOptions");
    options.innerHTML = "";

    document.getElementById("nextButton").disabled = true;

    pergunta.alternativas.forEach((alternativa, indice) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent =
            `${String.fromCharCode(65 + indice)}) ${alternativa.texto}`;

        button.addEventListener("click", () => {
            selecionarResposta(alternativa, button);
        });

        options.appendChild(button);
    });
}


// SELECIONAR RESPOSTA

function selecionarResposta(alternativaSelecionada, botao) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntasAtuais[perguntaAtual];
    const botoes = document.querySelectorAll(".answer-option");

    botoes.forEach((button, indice) => {
        button.disabled = true;

        if (pergunta.alternativas[indice].correta) {
            button.classList.add("correct");
        }
    });

    const feedback = document.getElementById("feedback");

    if (alternativaSelecionada.correta) {
        pontos++;

        feedback.textContent = "✅ Resposta correta! Muito bem!";
        feedback.style.color = "var(--success)";
    } else {
        botao.classList.add("wrong");

        const respostaCorreta = pergunta.alternativas.find(
            alternativa => alternativa.correta
        );

        feedback.textContent =
            `❌ Resposta incorreta. ${pergunta.explicacao}`;

        feedback.style.color = "var(--danger)";
    }

    document.getElementById("nextButton").disabled = false;
}


// PRÓXIMA PERGUNTA

function proximaQuestao() {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntasAtuais.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}


// MOSTRAR RESULTADO

function mostrarResultado() {
    document.getElementById("questionArea").classList.add("hidden");
    document.getElementById("resultArea").classList.remove("hidden");

    document.getElementById("progress").style.width = "100%";

    document.getElementById("questionCounter").textContent =
        "Quiz finalizado!";

    document.getElementById("scoreText").textContent =
        `${pontos}/${perguntasAtuais.length}`;

    const porcentagem = (pontos / perguntasAtuais.length) * 100;

    let mensagem = "";

    if (porcentagem === 100) {
        mensagem = "🏆 Excelente! Você acertou todas as questões!";
    } else if (porcentagem >= 70) {
        mensagem = "👏 Muito bem! Você demonstrou um ótimo conhecimento.";
    } else if (porcentagem >= 50) {
        mensagem = "👍 Bom trabalho! Continue praticando.";
    } else {
        mensagem = "📚 Continue estudando! A prática ajuda a melhorar.";
    }

    document.getElementById("resultMessage").textContent = mensagem;
}


// REINICIAR QUIZ

function reiniciarQuiz() {
    iniciarQuiz(assuntoAtual);
}


// TEMA CLARO E ESCURO

function alternarTema() {
    document.body.classList.toggle("dark");

    const estaEscuro = document.body.classList.contains("dark");

    document.getElementById("themeButton").textContent =
        estaEscuro ? "☀️" : "🌙";
}


// CARREGAR O SITE

carregarMaterias();