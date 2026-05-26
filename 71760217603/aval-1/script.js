// Banco de dados dos episódios e seus respectivos roteiros
const episodes = [
    {
        title: "Ep. 01 - Guaribas (Piauí)",
        duration: "8:30",
        script: `🎵 [00:00] - Vinheta de Abertura (Fade under)
Gegi: Fala, pessoal! Está no ar mais um PodGegi! O podcast que vasculha os cantos mais intrigantes do nosso Brasil. E hoje vamos direto para o interior do Piauí: Guaribas!

🗺️ [01:00] - Introdução: Onde fica e o que é Guaribas?
Gegi: Guaribas ficou mundialmente conhecida em 2003 por ser a cidade-piloto do programa Fome Zero. Hoje estou aqui com nosso convidado especialista para entender essa transformação.
Convidado: Valeu, Gegi! Guaribas fica no sul piauiense, cercado por uma natureza exuberante, mas que por muito tempo sofreu com o isolamento geográfico.

📊 [02:30] - Bloco 1: O Berço do Fome Zero e a Transformação
Gegi: Cara, por que Guaribas foi a escolhida na época?
Convidado: Tinha um dos menores IDHs do país. Não havia asfalto, faltava água e energia. O projeto mudou a circulação de renda e o comércio local floresceu.

🌿 [05:00] - Bloco 2: Cultura e Natureza
Gegi: Mas a região vai além da política, né?
Convidado: Sim! Fica perto do Parque Nacional Serra da Capivara. É terra de agricultura familiar e uma forte produção de mel de caatinga.

🏁 [07:30] - Encerramento
Gegi: O tempo voa! Curtiu conhecer Guaribas? Siga o PodGegi nas redes e até a próxima!`
    },
    {
        title: "Ep. 02 - CETI Paulo Freire",
        duration: "8:30",
        script: `🎵 [00:00] - Vinheta de Abertura (Estilo Synthwave)
Gegi: Fala galera conectada no PodQuest! Está começando mais um episódio do PodGegi. Hoje vamos poisear a nossa nave em uma instituição transformadora: o CETI Paulo Freire!

🏫 [01:00] - O Modelo de Tempo Integral
Gegi: Os CETIs são Centros Estaduais de Tempo Integral. A galera estuda, almoça e faz projetos o dia todo. Bem-vindo, Diretor!
Convidado: Olá, Gegi! O tempo integral traz um tempo pedagógico estendido com muito mais oportunidades para o jovem.

📚 [02:30] - A Filosofia Freiriana na Prática
Gegi: Como vocês trazem o legado de Paulo Freire para o dia a dia?
Convidado: Focamos no Protagonismo Juvenil. Os alunos lideram clubes, fazem iniciação científica e constroem seu "Projeto de Vida" para planejar o futuro pós-escola.

🚀 [05:00] - Conquistas e o Clima Escolar
Gegi: Passar o dia todo juntos deve criar uma grande família.
Convidado: Com certeza. Eles dividem lazer, refeições e focam no ENEM. O foco em cooperação gera recordes de aprovações e prêmios em feiras de ciências.

🏁 [07:30] - Mensagem Final
Convidado: Como diria Paulo Freire: "Se a educação sozinha não transforma a sociedade, sem ela tampouco a sociedade muda".
Gegi: Fechou com chave de ouro! Siga o PodQuest e até o próximo episódio!`
    }
];

let currentEpisodeIndex = 0;
let isPlaying = false;
let progressInterval;
let currentProgress = 0;

// Função responsável por carregar o roteiro selecionado na tela
function loadEpisode(index) {
    currentEpisodeIndex = index;
    const ep = episodes[index];
    
    // Atualiza os elementos de texto no HTML
    document.getElementById('script-title').innerText = ep.title;
    document.getElementById('script-body').innerText = ep.script;
    document.getElementById('player-title').innerText = ep.title;
    document.getElementById('totalTime').innerText = ep.duration;
    
    // Atualiza o visual dos cards para destacar o selecionado
    const cards = document.querySelectorAll('.ep-card');
    cards.forEach((card, i) => {
        if(i === index) card.classList.add('active');
        else card.classList.remove('active');
    });

    // Zera o player se o usuário mudar de episódio
    resetPlayer();
}

// Controla a simulação de Play e Pause do áudio
function togglePlay() {
    const btn = document.getElementById('playBtn');
    if (!isPlaying) {
        isPlaying = true;
        btn.innerText = "⏸";
        // Faz a barra de progresso avançar progressivamente
        progressInterval = setInterval(() => {
            if (currentProgress < 100) {
                currentProgress += 0.5;
                document.getElementById('progressBar').style.width = currentProgress + "%";
            } else {
                resetPlayer();
            }
        }, 100);
    } else {
        isPlaying = false;
        btn.innerText = "▶";
        clearInterval(progressInterval);
    }
}

// Reseta a barra e o botão para o estado inicial
function resetPlayer() {
    isPlaying = false;
    clearInterval(progressInterval);
    currentProgress = 0;
    document.getElementById('progressBar').style.width = "0%";
    document.getElementById('playBtn').innerText = "▶";
}

// Permite avançar ou voltar a barra clicando diretamente nela
function seek(event) {
    const bar = event.currentTarget;
    const clickX = event.offsetX;
    const width = bar.clientWidth;
    currentProgress = (clickX / width) * 100;
    document.getElementById('progressBar').style.width = currentProgress + "%";
}

// Força o carregamento do primeiro episódio assim que a página abre
window.onload = () => {
    loadEpisode(0);
};