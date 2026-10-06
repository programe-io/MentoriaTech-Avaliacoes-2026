const motos = [
    { id: 1, name: "Yamaha MT-09 Tracer", year: 2023, cc: "850cc", price: 58900, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Honda CB 650R Neo Sports", year: 2024, cc: "650cc", price: 54500, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Kawasaki Ninja 400 ABS", year: 2022, cc: "400cc", price: 36000, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80" }
];

const motosGrid = document.getElementById('motosGrid');

function renderMotos() {
    motosGrid.innerHTML = motos.map(m => `
        <div class="moto-card">
            <img src="${m.image}" alt="${m.name}">
            <div class="moto-info">
                <h3>${m.name}</h3>
                <div class="price">R$ ${m.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <ul>
                    <li><i class="fa-solid fa-calendar"></i> Ano: ${m.year}</li>
                    <li><i class="fa-solid fa-gauge-high"></i> Motor: ${m.cc}</li>
                </ul>
                <button class="contact-moto-btn" onclick="interesseMoto('${m.name}')">Tenho Interesse</button>
            </div>
        </div>
    `).join('');
}

window.interesseMoto = function(nome) {
    alert(`Obrigado pelo interesse na ${nome}! Um de nossos consultores comerciais entrará em contato via WhatsApp.`);
};

window.calcularFinanciamento = function() {
    const valor = parseFloat(document.getElementById('valorMoto').value);
    const entrada = parseFloat(document.getElementById('valorEntrada').value);
    const meses = parseInt(document.getElementById('parcelas').value);
    const resultadoDiv = document.getElementById('resultadoSimulacao');

    if (isNaN(valor) || isNaN(entrada)) {
        alert("Preencha os valores corretamente.");
        return;
    }

    const valorFinanciado = valor - entrada;
    const taxaJurosMensal = 0.018; // 1.8% ao mês simulado
    
    // Fórmula de prestação Price
    const parcela = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow(1 + taxaJurosMensal, -meses));

    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `Simulação: ${meses}x de <strong>R$ ${parcela.toFixed(2).replace('.', ',')}</strong> (Taxa estimada de 1.8% a.m.)`;
};

document.addEventListener('DOMContentLoaded', renderMotos);