// 1. Barra de progresso de leitura dinamicamente calculada
window.addEventListener('scroll', function() {
    const barra = document.getElementById('barra-progresso');
    // Altura total da página disponível para rolar
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    // Posição atual do scroll
    const posicaoAtual = window.scrollY;
    
    if (alturaTotal > 0) {
        const porcentagem = (posicaoAtual / alturaTotal) * 100;
        barra.style.width = porcentagem + '%';
    }
});

// 2. Sistema de Fatos Históricos melhorado (evita repetições bobas)
const botao = document.getElementById('btnSaberMais');
const caixaFato = document.getElementById('caixaFato');
const textoFato = document.getElementById('fatoTexto');

const fatos = [
    "A Censura Prévia impedia que notícias sobre torturas, greves e crises econômicas fossem publicadas.",
    "O movimento das 'Diretas Já' reuniu milhões de pessoas nas ruas, mas a emenda Dante de Oliveira foi rejeitada, mantendo a eleição de 1985 indireta.",
    "Durante o 'Milagre Econômico' (1969-1973), o PIB brasileiro crescia perto de 10% ao ano, porém à custa de arrocho salarial e aumento da dívida externa.",
    "A Lei da Anistia de 1979 permitiu que exilados políticos retornassem ao Brasil, mas também perdoou agentes do estado envolvidos em abusos.",
    "Ao longo dos 21 anos, o regime teve cinco generais na presidência: Castelo Branco, Costa e Silva, Médici, Geisel e Figueiredo."
];

let ultimoIndice = -1;

botao.addEventListener('click', function() {
    let indiceAleatorio;
    
    // Garante que o fato sorteado não seja o mesmo que acabou de ser visto
    do {
        indiceAleatorio = Math.floor(Math.random() * fatos.length);
    } while (indiceAleatorio === ultimoIndice);
    
    ultimoIndice = indiceAleatorio;

    // Torna a caixinha visível caso ela esteja oculta
    caixaFato.classList.remove('escondido');
    
    // Atualiza o texto
    textoFato.innerHTML = `<strong>Fato Histórico:</strong> ${fatos[indiceAleatorio]}`;
});