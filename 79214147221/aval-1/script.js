// Banco de dados estatísticos do Neymar Jr
const dadosStats = {
    santos: {
        jogos: "225",
        gols: "136",
        assistencias: "48",
        titulos: "Libertadores (2011), Copa do Brasil (2010), Tri-Campeão Paulista"
    },
    barca: {
        jogos: "186",
        gols: "105",
        assistencias: "76",
        titulos: "Champions League (14/15), Mundial de Clubes (2015), Bi-Campeão da La Liga"
    },
    psg: {
        jogos: "173",
        gols: "118",
        assistencias: "77",
        titulos: "5x Campeão da Ligue 1, 3x Copa da França"
    },
    selecao: {
        jogos: "128",
        gols: "79",
        assistencias: "57",
        titulos: "Copa das Confederações (2013), Ouro Olímpico Rio (2016)"
    }
};

function mostrarStats(time) {
    // 1. Controla os estados de ativo nos botões
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Captura o botão clicado de forma segura e elegante
    const botaoClicado = Array.from(botoes).find(btn => btn.getAttribute('onclick').includes(time));
    if (botaoClicado) botaoClicado.classList.add('active');

    // 2. Localiza o contêiner de exibição
    const container = document.getElementById('stats-display');
    const info = dadosStats[time];

    // 3. Renderiza os cards modernos no lugar da lista antiga simples
    container.innerHTML = `
        <div class="card-stat">
            <span class="num">${info.jogos}</span>
            <span class="label">Partidas</span>
        </div>
        <div class="card-stat">
            <span class="num">${info.gols}</span>
            <span class="label">Gols</span>
        </div>
        <div class="card-stat">
            <span class="num">${info.assistencias}</span>
            <span class="label">Assistências</span>
        </div>
        <div class="card-stat completo">
            <span class="label" style="color: #dfb034;">Conquistas de Destaque</span>
            <p>${info.titulos}</p>
        </div>
    `;
}

// Inicializa mostrando o primeiro clube ao carregar a página
window.onload = function() {
    mostrarStats('santos');
};