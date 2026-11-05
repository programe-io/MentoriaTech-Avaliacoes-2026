
// NAVEGAÇÃO ENTRE AS PÁGINAS
function mostrarPagina(nome) {
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('ativa');
    });

    document.getElementById(nome).classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CRONOGRAMA
function adicionarTarefa() {
    const campo = document.getElementById('tarefa');
    const data = document.getElementById('dataTarefa');

    if (campo.value.trim() === '') {
        alert('Digite uma tarefa!');
        return;
    }

    const li = document.createElement('li');
    const texto = document.createElement('span');
    texto.textContent = campo.value + (data.value ? ' - ' + data.value : '');

    const concluir = document.createElement('button');
    concluir.textContent = 'Concluir ✓';
    concluir.onclick = () => {
        texto.style.textDecoration = 'line-through';
        texto.style.opacity = '0.5';
    };

    const excluir = document.createElement('button');
    excluir.textContent = 'Excluir ✕';
    excluir.className = 'secundario';
    excluir.onclick = () => li.remove();

    li.append(texto, concluir, excluir);
    document.getElementById('listaTarefas').appendChild(li);

    campo.value = '';
    data.value = '';
}

// ANOTAÇÕES COM SALVAMENTO
let notas = JSON.parse(localStorage.getItem('notasStudyVerse')) || [];

function salvarNota() {
    const titulo = document.getElementById('tituloNota').value.trim();
    const texto = document.getElementById('textoNota').value.trim();

    if (!titulo || !texto) {
        alert('Preencha o título e o conteúdo!');
        return;
    }

    notas.push({ titulo, texto });
    localStorage.setItem('notasStudyVerse', JSON.stringify(notas));

    document.getElementById('tituloNota').value = '';
    document.getElementById('textoNota').value = '';

    mostrarNotas();
}

function mostrarNotas() {
    const lista = document.getElementById('listaNotas');
    lista.replaceChildren();

    notas.forEach((nota, indice) => {
        const caixa = document.createElement('div');
        caixa.className = 'nota';

        const titulo = document.createElement('h3');
        titulo.textContent = '📌 ' + nota.titulo;

        const conteudo = document.createElement('p');
        conteudo.textContent = nota.texto;

        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir anotação';
        excluir.className = 'secundario';

        excluir.onclick = () => {
            notas.splice(indice, 1);
            localStorage.setItem('notasStudyVerse', JSON.stringify(notas));
            mostrarNotas();
        };

        caixa.append(titulo, conteudo, excluir);
        lista.appendChild(caixa);
    });
}

mostrarNotas();

// CALCULADORA
function calcular() {
    const n1 = Number(document.getElementById('numero1').value);
    const n2 = Number(document.getElementById('numero2').value);
    const op = document.getElementById('operacao').value;

    if (document.getElementById('numero1').value === '' ||
        document.getElementById('numero2').value === '') {
        alert('Digite os dois números!');
        return;
    }

    let resultado;

    if (op === '+') resultado = n1 + n2;
    if (op === '-') resultado = n1 - n2;
    if (op === '*') resultado = n1 * n2;

    if (op === '/') {
        if (n2 === 0) {
            document.getElementById('resultado').textContent =
                'Não é possível dividir por zero!';
            return;
        }
        resultado = n1 / n2;
    }

    document.getElementById('resultado').textContent =
        'Resultado: ' + resultado;
}

// POMODORO
let tempo = 25 * 60;
let intervalo = null;

function atualizarRelogio() {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    document.getElementById('relogio').textContent =
        String(minutos).padStart(2, '0') + ':' +
        String(segundos).padStart(2, '0');
}

function iniciarPomodoro() {
    if (intervalo !== null) return;

    intervalo = setInterval(() => {
        if (tempo > 0) {
            tempo--;
            atualizarRelogio();
        } else {
            clearInterval(intervalo);
            intervalo = null;
            alert('Parabéns! Você completou seu tempo de estudo!');
        }
    }, 1000);
}

function pausarPomodoro() {
    clearInterval(intervalo);
    intervalo = null;
}

function resetarPomodoro() {
    pausarPomodoro();
    tempo = 25 * 60;
    atualizarRelogio();
}

atualizarRelogio();

// FLASHCARDS
const cartoes = [
    {
        pergunta: 'O que é fotossíntese?',
        resposta: 'É o processo pelo qual as plantas produzem seu alimento utilizando luz solar.'
    },
    {
        pergunta: 'Quanto é 9 × 9?',
        resposta: '81!'
    },
    {
        pergunta: 'O que é um substantivo?',
        resposta: 'É a palavra que dá nome aos seres, objetos, lugares e sentimentos.'
    },
    {
        pergunta: 'Qual é o planeta conhecido como planeta vermelho?',
        resposta: 'Marte!'
    },
    {
        pergunta: 'O que é HTML?',
        resposta: 'É uma linguagem de marcação usada para estruturar páginas da internet.'
    }
];

let cartaoAtual = 0;
let mostrandoResposta = false;

function virarCartao() {
    mostrandoResposta = !mostrandoResposta;

    document.getElementById('perguntaFlash').textContent =
        mostrandoResposta
        ? cartoes[cartaoAtual].resposta
        : cartoes[cartaoAtual].pergunta;
}

function proximoCartao() {
    cartaoAtual = (cartaoAtual + 1) % cartoes.length;
    mostrandoResposta = false;
    document.getElementById('perguntaFlash').textContent =
        cartoes[cartaoAtual].pergunta;
}

// QUIZ
const perguntas = [
    {
        pergunta: 'Qual é o resultado de 8 × 7?',
        opcoes: ['54', '56', '64', '48'],
        correta: 1
    },
    {
        pergunta: 'Qual é a capital do Brasil?',
        opcoes: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
        correta: 2
    },
    {
        pergunta: 'Qual planeta é conhecido como planeta vermelho?',
        opcoes: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
        correta: 1
    },
    {
        pergunta: 'Qual linguagem estrutura uma página web?',
        opcoes: ['HTML', 'Excel', 'Photoshop', 'Word'],
        correta: 0
    },
    {
        pergunta: 'Quanto é 100 dividido por 4?',
        opcoes: ['20', '30', '25', '40'],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

function carregarQuiz() {
    const pergunta = perguntas[perguntaAtual];

    document.getElementById('perguntaQuiz').textContent =
        pergunta.pergunta;

    document.getElementById('feedback').textContent = '';

    const alternativas = document.getElementById('alternativas');
    alternativas.replaceChildren();

    respondeu = false;

    pergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('button');
        botao.textContent = opcao;

        botao.onclick = () => responder(indice);

        alternativas.appendChild(botao);
    });

    document.getElementById('pontuacao').textContent =
        'Pontuação: ' + pontos;
}

function responder(indice) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[perguntaAtual].correta;

    if (indice === correta) {
        pontos++;
        document.getElementById('feedback').textContent =
            '🎉 Parabéns! Resposta correta!';
    } else {
        document.getElementById('feedback').textContent =
            '❌ Resposta incorreta! A correta era: ' +
            perguntas[perguntaAtual].opcoes[correta];
    }

    document.getElementById('pontuacao').textContent =
        'Pontuação: ' + pontos;

    document.querySelectorAll('#alternativas button').forEach(botao => {
        botao.disabled = true;
    });
}

function proximaPergunta() {
    if (!respondeu) {
        alert('Responda à pergunta antes de continuar!');
        return;
    }

    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {
        document.getElementById('perguntaQuiz').textContent =
            '🏆 Quiz finalizado!';

        document.getElementById('alternativas').replaceChildren();

        document.getElementById('feedback').textContent =
            'Você acertou ' + pontos + ' de ' +
            perguntas.length + ' perguntas!';

        document.getElementById('pontuacao').textContent =
            'Parabéns por participar!';

        pontos = 0;
        perguntaAtual = 0;

        const botao = document.createElement('button');
        botao.textContent = 'Jogar novamente';
        botao.onclick = carregarQuiz;

        document.getElementById('alternativas').appendChild(botao);
        return;
    }

    carregarQuiz();
}

// INICIAR O QUIZ
carregarQuiz();

// ===============================
// 🌙 MODO ESCURO
// ===============================

function alternarTema() {
    document.body.classList.toggle('escuro');

    const escuro = document.body.classList.contains('escuro');

    localStorage.setItem('temaStudyVerse', escuro ? 'escuro' : 'claro');

    document.getElementById('botaoTema').textContent =
        escuro ? '☀️' : '🌙';
}

if (localStorage.getItem('temaStudyVerse') === 'escuro') {
    document.body.classList.add('escuro');
    document.getElementById('botaoTema').textContent = '☀️';
}


// ===============================
// 📚 MATÉRIAS
// ===============================

function abrirMateria(materia) {
    const conteudo = document.getElementById('conteudoMateria');

    const mensagens = {
        'Matemática': 'Pratique operações, frações, equações e geometria.',
        'Português': 'Estude interpretação de texto, gramática e redação.',
        'Geografia': 'Explore continentes, países, mapas e meio ambiente.',
        'História': 'Conheça civilizações, acontecimentos e personagens históricos.',
        'Ciências': 'Descubra o corpo humano, a natureza e a tecnologia.',
        'Inglês': 'Aprenda novas palavras e pratique frases em inglês.'
    };

    conteudo.innerHTML = `
        <h2>📖 ${materia}</h2>
        <p>${mensagens[materia]}</p>
        <p>💡 Dica: escreva um resumo sobre o assunto no seu caderno!</p>
    `;
}


// ===============================
// 📊 CALCULADORA DE MÉDIAS
// ===============================

function calcularMedia() {
    const campos = ['nota1', 'nota2', 'nota3'];

    const notas = campos.map(id =>
        document.getElementById(id).value
    );

    if (notas.some(n => n.trim() === '')) {
        alert('Preencha todas as notas!');
        return;
    }

    const valores = notas.map(Number);

    if (valores.some(n => n < 0 || n > 10)) {
        alert('As notas devem estar entre 0 e 10!');
        return;
    }

    const media = valores.reduce((a, b) => a + b, 0) / 3;

    let mensagem = '';

    if (media >= 7) {
        mensagem = '🎉 Você atingiu a média!';
    } else if (media >= 5) {
        mensagem = '📚 Continue estudando para melhorar!';
    } else {
        mensagem = '💪 Vale a pena revisar os conteúdos!';
    }

    document.getElementById('mediaResultado').textContent =
        'Média: ' + media.toFixed(2) + ' | ' + mensagem;
}


// ===============================
// 🎯 SISTEMA DE METAS
// ===============================

let metas = JSON.parse(localStorage.getItem('metasStudyVerse')) || [];

function salvarMetas() {
    localStorage.setItem('metasStudyVerse', JSON.stringify(metas));
}

function adicionarMeta() {
    const campo = document.getElementById('nomeMeta');
    const nome = campo.value.trim();

    if (!nome) {
        alert('Digite uma meta!');
        return;
    }

    metas.push({
        nome: nome,
        concluida: false
    });

    campo.value = '';
    salvarMetas();
    mostrarMetas();
}

function concluirMeta(indice) {
    metas[indice].concluida = !metas[indice].concluida;
    salvarMetas();
    mostrarMetas();
}

function mostrarMetas() {
    const lista = document.getElementById('listaMetas');
    lista.replaceChildren();

    metas.forEach((meta, indice) => {
        const item = document.createElement('div');
        item.className = 'nota';

        const texto = document.createElement('span');
        texto.textContent = (meta.concluida ? '✅ ' : '🎯 ') + meta.nome;

        if (meta.concluida) {
            texto.style.textDecoration = 'line-through';
        }

        const botao = document.createElement('button');
        botao.textContent = meta.concluida ? 'Desfazer' : 'Concluir';
        botao.onclick = () => concluirMeta(indice);

        item.append(texto, botao);
        lista.appendChild(item);
    });

    const concluidas = metas.filter(m => m.concluida).length;

    document.getElementById('progressoMetas').textContent =
        concluidas + ' de ' + metas.length + ' metas concluídas';
}

mostrarMetas();


// ===============================
// 🎲 DESAFIOS ALEATÓRIOS
// ===============================

const desafios = [
    'Leia 5 páginas de um livro hoje. 📖',
    'Resolva 5 exercícios de matemática. ➗',
    'Aprenda 5 palavras novas em inglês. 🇺🇸',
    'Faça um resumo de uma matéria. ✍️',
    'Revise o conteúdo da última aula. 🧠',
    'Estude durante um período de foco. ⏳',
    'Pesquise uma curiosidade científica. 🔬',
    'Organize suas atividades da semana. 📅',
    'Explique um conteúdo que você aprendeu. 🎓'
];

function novoDesafio() {
    const sorteado = desafios[
        Math.floor(Math.random() * desafios.length)
    ];

    document.getElementById('desafioDiario').textContent = sorteado;
}
