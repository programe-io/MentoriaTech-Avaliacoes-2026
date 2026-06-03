// Barra de rolagem dinâmica baseada na leitura do artigo
window.addEventListener('scroll', function() {
    const barra = document.getElementById('barra-progresso');
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const posicaoAtual = window.scrollY;
    
    if (alturaTotal > 0) {
        const porcentagem = (posicaoAtual / alturaTotal) * 100;
        barra.style.width = porcentagem + '%';
    }
});

// Banco de dados interno de citações marcantes do dorama
const botao = document.getElementById('btnFrase');
const caixaFrase = document.getElementById('caixaFrase');
const textoFrase = document.getElementById('fraseTexto');

const frases = [
    "“Eu pedi para você parar.” – Yeon Shi-eun",
    "“Vocês não têm discernimento próprio? Só fazem o que mandam?” – Yeon Shi-eun",
    "“Por que pessoas como você sempre acham que podem pisar nos outros?” – Ahn Soo-ho",
    "“Eu só queria ser tratado como igual... só isso.” – Oh Beom-seok"
];

botao.addEventListener('click', function() {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    caixaFrase.classList.remove('escondido');
    textoFrase.innerHTML = frases[indiceAleatorio];
});