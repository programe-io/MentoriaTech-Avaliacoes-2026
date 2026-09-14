// Gerenciador do Estado da Aplicação
const StockManager = {
    items: JSON.parse(localStorage.getItem('stock_pro_data')) || [],

    // Salva no LocalStorage
    save() {
        localStorage.setItem('stock_pro_data', JSON.stringify(this.items));
        this.render();
    },

    // Adiciona novo item
    add(item) {
        this.items.push(item);
        this.save();
    },

    // Remove item por id
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    },

    // Ajusta a quantidade em estoque
    updateQuantity(id, change) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            const newQty = item.quantity + change;
            if (newQty >= 0) {
                item.quantity = newQty;
                this.save();
            }
        }
    },

    // Recalcula indicadores das métricas
    updateMetrics() {
        const totalTypes = this.items.length;
        const totalUnits = this.items.reduce((acc, item) => acc + item.quantity, 0);
        const totalValue = this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const lowStock = this.items.filter(item => item.quantity <= 5).length;

        document.getElementById('metricTotalTypes').innerText = totalTypes;
        document.getElementById('metricTotalUnits').innerText = totalUnits;
        document.getElementById('metricTotalValue').innerText = this.formatCurrency(totalValue);
        document.getElementById('metricLowStock').innerText = lowStock;
    },

    // Formatação de Moeda
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    },

    // Renderiza a tabela e atualiza os cards
    render(filterTerm = '') {
        const tbody = document.getElementById('stockTableBody');
        tbody.innerHTML = '';

        const filteredItems = this.items.filter(item => 
            item.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(filterTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(filterTerm.toLowerCase())
        );

        if (filteredItems.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Nenhum produto encontrado.</td></tr>`;
            this.updateMetrics();
            return;
        }

        filteredItems.forEach(item => {
            const totalItemValue = item.quantity * item.price;
            const isLowStock = item.quantity <= 5;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><code>${item.code}</code></td>
                <td>
                    <strong>${item.title}</strong>
                    ${isLowStock ? '<span class="badge-low" title="Estoque Baixo">Baixo</span>' : ''}
                </td>
                <td>${item.category}</td>
                <td>${this.formatCurrency(item.price)}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn-ctrl" onclick="StockManager.updateQuantity('${item.id}', -1)">-</button>
                        <span style="min-width: 24px; text-align: center; line-height: 28px;">${item.quantity}</span>
                        <button class="btn-ctrl" onclick="StockManager.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </td>
                <td>${this.formatCurrency(totalItemValue)}</td>
                <td>
                    <button class="btn-remove" onclick="StockManager.remove('${item.id}')">Excluir</button>
                </td>
            `;

            tbody.appendChild(row);
        });

        this.updateMetrics();
    }
};

// Event Listeners
document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newItem = {
        id: Date.now().toString(),
        code: document.getElementById('code').value.trim(),
        title: document.getElementById('title').value.trim(),
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };

    StockManager.add(newItem);
    e.target.reset();
});

// Evento de busca/filtro em tempo real
document.getElementById('searchInput').addEventListener('input', (e) => {
    StockManager.render(e.target.value);
});

// Inicialização da interface ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    StockManager.render();
});