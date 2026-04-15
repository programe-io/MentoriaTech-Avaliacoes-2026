// BANCO DE DADOS LOCAL
let userAccount = {
    balance: 50000.00,
    portfolio: []
};

const assets = [
    { id: 'AAPL', name: 'Apple Inc.', price: 185.20, type: 'Stock' },
    { id: 'TSLA', name: 'Tesla Motors', price: 242.50, type: 'Stock' },
    { id: 'BTC', name: 'Bitcoin', price: 64200.0, type: 'Cripto' },
    { id: 'ETH', name: 'Ethereum', price: 3450.0, type: 'Cripto' },
    { id: 'NVDA', name: 'Nvidia Corp', price: 480.10, type: 'Stock' },
    { id: 'AMZN', name: 'Amazon', price: 145.30, type: 'Stock' },
    { id: 'SOL', name: 'Solana', price: 98.40, type: 'Cripto' },
];

let currentAsset = assets[2]; // Começa com BTC

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderMarket();
    initChart();
    updateUI();
});

// NAVEGAÇÃO
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`page-${id}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// RENDERIZAR MERCADO DE COMPRA
function renderMarket() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = '';
    assets.forEach(asset => {
        grid.innerHTML += `
            <div class="asset-card">
                <small>${asset.type}</small>
                <h3>${asset.id}</h3>
                <p>$ ${asset.price.toFixed(2)}</p>
                <button onclick="buyAsset('${asset.id}')">COMPRAR</button>
            </div>
        `;
    });
}

// LOGICA DE INVESTIMENTO (HOLD)
function buyAsset(assetId) {
    const asset = assets.find(a => a.id === assetId);
    if (userAccount.balance >= asset.price) {
        userAccount.balance -= asset.price;
        
        const existing = userAccount.portfolio.find(p => p.id === assetId);
        if (existing) {
            existing.qty += 1;
        } else {
            userAccount.portfolio.push({ id: asset.id, qty: 1, avgPrice: asset.price });
        }
        
        alert(`Sucesso! Você agora é dono de 1 cota de ${asset.name}`);
        updateUI();
        renderPortfolio();
    } else {
        alert("Saldo insuficiente!");
    }
}

// RENDERIZAR CARTEIRA
function renderPortfolio() {
    const container = document.getElementById('portfolio-items');
    container.innerHTML = '';
    userAccount.portfolio.forEach(item => {
        container.innerHTML += `
            <tr>
                <td><b>${item.id}</b></td>
                <td>${item.qty}</td>
                <td>$ ${item.avgPrice.toFixed(2)}</td>
                <td>$ ${(item.qty * item.avgPrice).toFixed(2)}</td>
            </tr>
        `;
    });
}

// MOTOR DE TRADING (QUICK TRADE)
function executeQuickTrade(dir) {
    const amt = parseFloat(document.getElementById('trade-amount').value);
    if (userAccount.balance >= amt) {
        userAccount.balance -= amt;
        updateUI();
        alert(`Ordem de ${dir} em ${currentAsset.id} aberta com $${amt}`);
    }
}

function updateUI() {
    document.getElementById('balance-val').innerText = `$ ${userAccount.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

// GRÁFICO REALISTA
let chart;
function initChart() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: { labels: Array(20).fill(''), datasets: [{ data: Array(20).fill(64000), borderColor: '#00ff88', tension: 0.3, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#222' } }, x: { display: false } } }
    });

    setInterval(() => {
        const last = chart.data.datasets[0].data[19];
        const next = last + (Math.random() * 40 - 20);
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(next);
        chart.update('none');
        document.getElementById('live-price-display').innerText = `$ ${next.toFixed(2)}`;
    }, 800);
}