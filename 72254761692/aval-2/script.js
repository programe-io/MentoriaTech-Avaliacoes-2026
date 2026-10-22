// ---------- Estatísticas dos dados de exemplo ----------
const dados = [7, 8, 6, 9, 10, 5, 7, 8, 9, 6];
const n = dados.length;
const soma = dados.reduce((a, b) => a + b, 0);
const media = soma / n;

const ordenados = [...dados].sort((a, b) => a - b);
const mediana = n % 2 === 0
  ? (ordenados[n / 2 - 1] + ordenados[n / 2]) / 2
  : ordenados[Math.floor(n / 2)];

const variancia = dados.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);
const desvio = Math.sqrt(variancia);
const minimo = Math.min(...dados);
const maximo = Math.max(...dados);

document.getElementById('stat-media').textContent = media.toFixed(2);
document.getElementById('stat-mediana').textContent = mediana.toFixed(2);
document.getElementById('stat-variancia').textContent = variancia.toFixed(2);
document.getElementById('stat-desvio').textContent = desvio.toFixed(2);
document.getElementById('stat-min').textContent = minimo;
document.getElementById('stat-max').textContent = maximo;

// ---------- Tabela de frequência ----------
const freq = {};
dados.forEach(v => freq[v] = (freq[v] || 0) + 1);
const tbody = document.getElementById('tabela-freq');
Object.keys(freq).sort((a, b) => a - b).forEach(v => {
  const fr = (freq[v] / n * 100).toFixed(1);
  tbody.innerHTML += `<tr><td>${v}</td><td>${freq[v]}</td><td>${fr}%</td></tr>`;
});

// ---------- Formulário ----------
const form = document.getElementById('meuForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Formulário enviado com sucesso! (demonstração)');
});

// ---------- Gráficos com Chart.js ----------
const trimestres = ['1º Tri', '2º Tri', '3º Tri', '4º Tri'];
const vendasTri = [120, 150, 180, 210];

new Chart(document.getElementById('graficoBarras'), {
  type: 'bar',
  data: {
    labels: trimestres,
    datasets: [{
      label: 'Vendas (milhares R$)',
      data: vendasTri,
      backgroundColor: ['#2a5298', '#3b6bc4', '#4f83d6', '#6a9ae8']
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
const vendasMes = [35, 42, 38, 50, 47, 55];

new Chart(document.getElementById('graficoLinhas'), {
  type: 'line',
  data: {
    labels: meses,
    datasets: [{
      label: 'Vendas mensais (milhares R$)',
      data: vendasMes,
      borderColor: '#1e3c72',
      backgroundColor: 'rgba(42,82,152,0.15)',
      tension: 0.35,
      fill: true,
      pointBackgroundColor: '#1e3c72'
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});

new Chart(document.getElementById('graficoPizza'), {
  type: 'doughnut',
  data: {
    labels: ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'],
    datasets: [{
      data: [40, 25, 18, 10, 7],
      backgroundColor: ['#1e3c72', '#2a5298', '#4f83d6', '#8ab4f8', '#c2d4f0']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  }
});