/* ==========================================================================
   1. CONTROLE DE NAVEGAÇÃO (SISTEMA DE ABAS INTERATIVAS)
   ========================================================================== */

/**
 * Altera a aba ativa escondendo as outras seções e destacando o botão clicado
 * @param {string} tabId - O ID da seção de conteúdo que deve ser exibida
 */
function switchTab(tabId) {
    // Esconde todas as seções de conteúdo
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    // Remove o destaque visual de todos os botões de aba
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Exibe a seção clicada e destaca o botão correspondente
    document.getElementById(tabId).classList.add('active');
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}


/* ==========================================================================
   2. BANCO DE DADOS DO QUIZ (EXTRAÍDO DO MATERIAL DIDÁTICO)
   ========================================================================== */

const questions = [
    {
        q: "Qual era o principal objetivo inicial da ARPANET na década de 1960?",
        options: [
            "Permitir streaming de vídeo em alta velocidade.",
            "Criar uma rede comercial para conectar lojas e empresas.",
            "Garantir a comunicação descentralizada entre centros de pesquisa e militares."
        ],
        answer: 2 // Índice da resposta correta (terceira opção)
    },
    {
        q: "Por que a maior parte do tráfego internacional ocorre por cabos submarinos e não por satélites?",
        options: [
            "Porque os cabos oferecem maior velocidade e menor latência.",
            "Porque os satélites não funcionam em dias nublados.",
            "Porque os cabos submarinos são imunes a danos físicos."
        ],
        answer: 0 // Índice da resposta correta (primeira opção)
    },
    {
        q: "No modelo Cliente-Servidor da Web, qual é o papel do 'Cliente'?",
        options: [
            "Armazenar e fornecer o conteúdo dos sites na rede.",
            "O dispositivo usado pelo usuário (com um navegador) para fazer requisições.",
            "Gerenciar os cabos de fibra óptica do oceano."
        ],
        answer: 1 // Índice da resposta correta (segunda opção)
    },
    {
        q: "Quais foram as três tecnologias fundamentais criadas por Tim Berners-Lee?",
        options: [
            "TCP, IP e ARPANET.",
            "HTML, HTTP e URL.",
            "Data centers, Roteadores e Satélites."
        ],
        answer: 1 // Índice da resposta correta (segunda opção)
    }
];


/* ==========================================================================
   3. LÓGICA E GERENCIAMENTO DO QUIZ DOS CONCEITOS
   ========================================================================== */

// Variáveis de controle de estado
let currentQuestionIndex = 0;
let score = 0;

// Mapeamento dos elementos do DOM utilizados pelo Quiz
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const nextBtn = document.getElementById('next-btn');
const scoreBox = document.getElementById('score-box');

/**
 * Carrega e renderiza a pergunta atual na tela
 */
function loadQuestion() {
    // Reseta o estado dos elementos de controle
    nextBtn.style.display = 'none';
    optionsBox.innerHTML = '';
    
    // Atualiza o painel de pontuação em tempo real
    scoreBox.textContent = `Pontuação: ${score} de ${questions.length}`;

    // Verifica se o usuário chegou ao final do quiz
    if (currentQuestionIndex >= questions.length) {
        exibirFimDoQuiz();
        return;
    }

    // Obtém os dados da questão atual
    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.q}`;

    // Cria os botões de resposta dinamicamente no HTML
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        // Define o evento de clique para validar a escolha do usuário
        btn.onclick = () => selectOption(btn, index);
        optionsBox.appendChild(btn);
    });
}

/**
 * Processa a escolha do usuário e injeta as classes CSS de acerto ou erro
 * @param {HTMLElement} selectedBtn - O botão que o usuário clicou
 * @param {number} selectedIndex - O índice da alternativa selecionada
 */
function selectOption(selectedBtn, selectedIndex) {
    let correctAnswer = questions[currentQuestionIndex].answer;
    const allButtons = document.querySelectorAll('.option-btn');

    // Bloqueia todos os botões para impedir cliques múltiplos na mesma pergunta
    allButtons.forEach(btn => btn.disabled = true);

    // Validação da resposta
    if (selectedIndex === correctAnswer) {
        selectedBtn.classList.add('correct'); // Aplica estilo verde de sucesso
        score++;
    } else {
        selectedBtn.classList.add('wrong'); // Aplica estilo vermelho de erro
        allButtons[correctAnswer].classList.add('correct'); // Mostra a alternativa certa
    }

    // Torna visível o botão para avançar e atualiza o placar parcial
    nextBtn.style.display = 'block';
    scoreBox.textContent = `Pontuação: ${score} de ${questions.length}`;
}

/**
 * Avança o índice do array e carrega a próxima tela do simulado
 */
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

/**
 * Altera a interface de exibição ao finalizar todas as perguntas do conteúdo
 */
function exibirFimDoQuiz() {
    questionText.textContent = "🎉 Quiz Concluído!";
    optionsBox.innerHTML = `
        <p style='margin-top: 1rem;'>
            Parabéns! Você finalizou o estudo dirigido com <strong>${score}</strong> acertos de um total de ${questions.length}.
        </p>
    `;
    scoreBox.textContent = "";
}


/* ==========================================================================
   4. INICIALIZAÇÃO AUTOMÁTICA
   ========================================================================== */

// Dispara o carregamento da primeira pergunta assim que o script é lido
loadQuestion();
