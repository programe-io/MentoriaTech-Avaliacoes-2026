
// ==========================================
// PROJETO: PROGRAMAÇÃO ESTRUTURADA
// SISTEMA DE ESTUDOS E AVALIAÇÃO
// ==========================================

// 1. BANCO DE QUESTÕES

const questoes = [
    {
        pergunta: "1. O que é programação estruturada?",
        opcoes: [
            "Uma linguagem de programação",
            "Uma metodologia de organização do código",
            "Um sistema operacional",
            "Um programa de edição",
            "Um tipo de computador"
        ],
        correta: 1
    },
    {
        pergunta: "2. Qual é o principal objetivo da programação estruturada?",
        opcoes: [
            "Deixar o código mais complicado",
            "Eliminar todas as linguagens",
            "Organizar e facilitar a compreensão do código",
            "Aumentar o tamanho dos programas",
            "Substituir os computadores"
        ],
        correta: 2
    },
    {
        pergunta: "3. Quais são as três estruturas fundamentais?",
        opcoes: [
            "HTML, CSS e JavaScript",
            "Entrada, saída e memória",
            "Sequência, decisão e repetição",
            "Internet, rede e servidor",
            "Texto, imagem e vídeo"
        ],
        correta: 2
    },
    {
        pergunta: "4. O que representa a estrutura de sequência?",
        opcoes: [
            "Execução de comandos em ordem",
            "Repetição infinita",
            "Escolha aleatória",
            "Exclusão de dados",
            "Criação de imagens"
        ],
        correta: 0
    },
    {
        pergunta: "5. Qual estrutura permite escolher entre caminhos diferentes?",
        opcoes: [
            "Sequência",
            "Decisão",
            "Repetição",
            "Impressão",
            "Armazenamento"
        ],
        correta: 1
    },
    {
        pergunta: "6. Qual comando é utilizado para decisões em C?",
        opcoes: [
            "printf",
            "include",
            "if",
            "return",
            "break"
        ],
        correta: 2
    },
    {
        pergunta: "7. Para que serve uma estrutura de repetição?",
        opcoes: [
            "Apagar o programa",
            "Executar comandos várias vezes",
            "Desligar o computador",
            "Criar imagens",
            "Formatar textos"
        ],
        correta: 1
    },
    {
        pergunta: "8. Qual é um exemplo de estrutura de repetição?",
        opcoes: [
            "if",
            "else",
            "for",
            "printf",
            "return"
        ],
        correta: 2
    },
    {
        pergunta: "9. O que é modularização?",
        opcoes: [
            "Dividir o programa em módulos menores",
            "Excluir todas as funções",
            "Aumentar os erros",
            "Desorganizar o código",
            "Trocar o sistema operacional"
        ],
        correta: 0
    },
    {
        pergunta: "10. O que é uma função?",
        opcoes: [
            "Um componente físico",
            "Um bloco de código que realiza uma tarefa",
            "Um navegador",
            "Um tipo de monitor",
            "Um arquivo de imagem"
        ],
        correta: 1
    },
    {
        pergunta: "11. Qual linguagem permite aplicar programação estruturada?",
        opcoes: [
            "Somente HTML",
            "Somente CSS",
            "C",
            "Somente Photoshop",
            "Nenhuma linguagem"
        ],
        correta: 2
    },
    {
        pergunta: "12. Qual vantagem a programação estruturada oferece?",
        opcoes: [
            "Dificulta a manutenção",
            "Aumenta a desorganização",
            "Facilita a identificação de erros",
            "Impede a criação de funções",
            "Elimina a lógica"
        ],
        correta: 2
    },
    {
        pergunta: "13. O que significa manutenção de software?",
        opcoes: [
            "Corrigir e melhorar um programa",
            "Desligar a internet",
            "Comprar um computador",
            "Excluir todos os arquivos",
            "Trocar o teclado"
        ],
        correta: 0
    },
    {
        pergunta: "14. O que é recursão?",
        opcoes: [
            "Uma variável global",
            "Uma função que chama a si mesma",
            "Um comando de impressão",
            "Uma estrutura HTML",
            "Uma operação de soma"
        ],
        correta: 1
    },
    {
        pergunta: "15. Por que organizar o código é importante?",
        opcoes: [
            "Para dificultar o trabalho",
            "Para aumentar o tamanho do arquivo",
            "Para facilitar a leitura, manutenção e compreensão",
            "Para impedir alterações",
            "Para eliminar os algoritmos"
        ],
        correta: 2
    }
];

// 2. IDENTIFICAR ELEMENTOS DO HTML

const formulario = document.getElementById("quizForm");
const resultado = document.getElementById("resultado");

// 3. CARREGAR AS QUESTÕES

function carregarQuestoes() {

    formulario.innerHTML = "";

    questoes.forEach((questao, indice) => {

        const div = document.createElement("div");

        div.classList.add("questao");

        let conteudo = `<h3>${questao.pergunta}</h3>`;

        questao.opcoes.forEach((opcao, alternativa) => {

            conteudo += `
                <label>
                    <input
                        type="radio"
                        name="q${indice}"
                        value="${alternativa}"
                    >
                    ${String.fromCharCode(65 + alternativa)})
                    ${opcao}
                </label>
            `;

        });

        div.innerHTML = conteudo;

        formulario.appendChild(div);

    });

}

// 4. CORRIGIR A AVALIAÇÃO

function corrigirQuiz() {

    let acertos = 0;
    let respondidas = 0;

    questoes.forEach((questao, indice) => {

        const resposta = document.querySelector(
            `input[name="q${indice}"]:checked`
        );

        if (resposta) {

            respondidas++;

            if (Number(resposta.value) === questao.correta) {
                acertos++;
            }

        }

    });

    // Verificar se todas foram respondidas

    if (respondidas !== questoes.length) {

        resultado.innerHTML = `
            <h3>⚠️ Atenção!</h3>
            Você respondeu ${respondidas} de 15 questões.
            Responda todas antes de finalizar.
        `;

        return;
    }

    // Calcular nota e percentual

    const nota = (acertos / 15) * 10;
    const percentual = (acertos / 15) * 100;
    const erros = 15 - acertos;

    let mensagem;

    if (nota >= 9) {
        mensagem = "🏆 Excelente! Você domina o conteúdo!";
    } else if (nota >= 7) {
        mensagem = "👏 Muito bom! Continue assim!";
    } else if (nota >= 5) {
        mensagem = "📚 Bom esforço! Continue estudando!";
    } else {
        mensagem = "💡 Revise o conteúdo e tente novamente!";
    }

    // Mostrar resultado

    resultado.innerHTML = `
        <h3>📊 Resultado da avaliação</h3>

        <p>Acertos: ${acertos} de 15</p>
        <p>Erros: ${erros}</p>
        <p>Nota final: ${nota.toFixed(1)} / 10</p>
        <p>Percentual: ${percentual.toFixed(1)}%</p>

        <h3>${mensagem}</h3>

        <button type="button" onclick="mostrarGabarito()">
            Ver gabarito
        </button>

        <button type="button" onclick="refazerQuiz()">
            Refazer avaliação
        </button>

        <div id="gabarito"></div>
    `;

    // Bloquear as alternativas após finalizar

    document.querySelectorAll(
        '#quizForm input[type="radio"]'
    ).forEach(input => {
        input.disabled = true;
    });

    resultado.scrollIntoView({
        behavior: "smooth"
    });

}

// 5. MOSTRAR GABARITO

function mostrarGabarito() {

    const gabarito = document.getElementById("gabarito");

    let conteudo = "<h3>📖 Gabarito das questões</h3>";

    questoes.forEach((questao, indice) => {

        const resposta = document.querySelector(
            `input[name="q${indice}"]:checked`
        );

        const acertou =
            Number(resposta.value) === questao.correta;

        const letra = String.fromCharCode(
            65 + questao.correta
        );

        conteudo += `
            <div class="questao">

                <strong>
                    ${acertou ? "✅ Resposta correta" : "❌ Resposta incorreta"}
                </strong>

                <p>${questao.pergunta}</p>

                <p>
                    Alternativa correta:
                    <strong>${letra}) ${questao.opcoes[questao.correta]}</strong>
                </p>

            </div>
        `;

    });

    gabarito.innerHTML = conteudo;

    gabarito.scrollIntoView({
        behavior: "smooth"
    });

}

// 6. REFAZER A AVALIAÇÃO

function refazerQuiz() {

    carregarQuestoes();

    resultado.innerHTML = "";

    window.scrollTo({
        top: document.getElementById("quiz").offsetTop,
        behavior: "smooth"
    });

}

// 7. INICIALIZAR O PROJETO

carregarQuestoes();

