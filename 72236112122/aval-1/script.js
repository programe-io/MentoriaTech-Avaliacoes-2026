// Carrega os dados salvos
let pesos = JSON.parse(localStorage.getItem('registroPesos')) || [];

// Salva os dados no navegador
function salvarPesos() {
    localStorage.setItem('registroPesos', JSON.stringify(pesos));
}

// Adiciona um novo registro
function adicionarPeso() {
    const input = document.getElementById('peso');
    const valor = parseFloat(input.value);

    if (!valor || valor <= 0 || valor > 300) {
        alert('Por favor, insira um peso válido!');
        return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    
    pesos.unshift({
        peso: valor,
        data: dataFormatada,
        id: Date.now()
    });

    salvarPesos();
    atualizarTela();
    input.value = '';
}

// Remove um registro
function removerPeso(id) {
    if (confirm('Excluir este registro?')) {
        pesos = pesos.filter(item => item.id !== id);
        salvarPesos();
        atualizarTela();
    }
}

// Atualiza toda a interface
function atualizarTela() {
    const lista = document.getElementById('listaPesos');
    const maiorEl = document.getElementById('maior');
    const menorEl = document.getElementById('menor');
    const mediaEl = document.getElementById('media');

    if (pesos.length === 0) {
        lista.innerHTML = '<li class="vazio">Nenhum peso registrado ainda.</li>';
        maiorEl.textContent = '-';
        menorEl.textContent = '-';
        mediaEl.textContent = '-';
        return;
    }

    // Cálculos
    const valores = pesos.map(item => item.peso);
    const maior = Math.max(...valores).toFixed(1);
    const menor = Math.min(...valores).toFixed(1);
    const media = (valores.reduce((a,b) => a+b, 0) / valores.length).toFixed(1);

    maiorEl.textContent = maior + ' kg';
    menorEl.textContent = menor + ' kg';
    mediaEl.textContent = media + ' kg';

    // Lista
    lista.innerHTML = pesos.map(item => `
        <li>
            <div>
                <span class="peso">${item.peso.toFixed(1)} kg</span>
                <span class="data">${item.data}</span>
            </div>
            <button onclick="removerPeso(${item.id})">🗑️</button>
        </li>
    `).join('');
}

// Inicializa ao carregar a página
atualizarTela();