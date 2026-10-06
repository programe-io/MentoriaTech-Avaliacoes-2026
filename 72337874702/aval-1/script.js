// Banco de Dados Inicial (Mock Realista Maison Élise)
let products = [
    {
        id: 1,
        name: "Vestido Midi Romântico Renda",
        category: "Vestidos",
        size: "M",
        color: "Rosa Claro",
        price: 249.90,
        stock: 8,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Cardigan Tricô Aveludado",
        category: "Blusas & Tricô",
        size: "P",
        color: "Blush",
        price: 179.90,
        stock: 3,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Calça Wide Leg Alfaiatura",
        category: "Jeans & Calças",
        size: "G",
        color: "Off-White",
        price: 219.90,
        stock: 12,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Jaqueta Jeans Oversized Detalhes",
        category: "Casacos & Jaquetas",
        size: "M",
        color: "Azul Denim",
        price: 289.90,
        stock: 4,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Conjunto Blazer & Shorts Alfaiataria",
        category: "Conjuntos",
        size: "P",
        color: "Rosa Antigo",
        price: 349.90,
        stock: 6,
        image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=600&q=80"
    }
];

let categoryChartInstance = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderTable(products);
    initChart();
});

// Alternar Dark Mode
function toggleDarkMode() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        themeIcon.className = "fa-solid fa-moon";
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        themeIcon.className = "fa-solid fa-sun";
    }
}

// Renderizar Dashboard & KPIs
function renderDashboard() {
    const totalPieces = products.reduce((acc, p) => acc + Number(p.stock), 0);
    const totalValue = products.reduce((acc, p) => acc + (Number(p.stock) * Number(p.price)), 0);
    const lowStockCount = products.filter(p => Number(p.stock) < 5).length;
    const uniqueCategories = [...new Set(products.map(p => p.category))].length;

    document.getElementById('kpiTotalPieces').innerText = totalPieces;
    document.getElementById('kpiTotalValue').innerText = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('kpiLowStock').innerText = lowStockCount;
    document.getElementById('kpiCategories').innerText = uniqueCategories;

    renderHighlights();
    if (categoryChartInstance) updateChart();
}

// Renderizar Destaques Rápidos
function renderHighlights() {
    const container = document.getElementById('quickHighlights');
    container.innerHTML = '';

    const sorted = [...products].sort((a, b) => b.price - a.price).slice(0, 3);
    sorted.forEach(p => {
        container.innerHTML += `
            <div class="flex items-center space-x-3 p-3 rounded-xl bg-rose-50/40 dark:bg-zinc-800/40 border border-rose-100 dark:border-zinc-800">
                <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-grow min-w-0">
                    <h4 class="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">${p.name}</h4>
                    <p class="text-xs text-rose-600 dark:text-rose-400 font-medium">${Number(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <span class="text-xs px-2 py-1 bg-white dark:bg-zinc-700 rounded-md font-medium text-zinc-600 dark:text-zinc-300">${p.stock} un</span>
            </div>
        `;
    });
}

// Renderizar Tabela de Produtos
function renderTable(list) {
    const tbody = document.getElementById('productTableBody');
    const emptyState = document.getElementById('emptyState');
    tbody.innerHTML = '';

    if (list.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    list.forEach(p => {
        const isLow = p.stock < 5;
        tbody.innerHTML += `
            <tr class="hover:bg-rose-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                <td class="py-4 px-6">
                    <div class="flex items-center space-x-3">
                        <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-xl object-cover border border-rose-200 dark:border-zinc-700 shadow-sm">
                        <div>
                            <span class="font-semibold text-zinc-800 dark:text-zinc-200 block">${p.name}</span>
                            <span class="text-xs text-zinc-400">ID: #${p.id}</span>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4 text-zinc-600 dark:text-zinc-300 font-medium">${p.category}</td>
                <td class="py-4 px-4">
                    <span class="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-lg text-xs font-bold">${p.size}</span>
                </td>
                <td class="py-4 px-4 text-zinc-600 dark:text-zinc-300">${p.color}</td>
                <td class="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200">${Number(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td class="py-4 px-4 text-center">
                    <div class="inline-flex items-center space-x-2 bg-rose-50 dark:bg-zinc-800 px-3 py-1 rounded-xl border border-rose-200 dark:border-zinc-700">
                        <button onclick="adjustStock(${p.id}, -1)" class="text-rose-600 hover:text-rose-800 font-bold px-1" title="Diminuir Estoque">-</button>
                        <span class="font-bold ${isLow ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-800 dark:text-zinc-200'}">${p.stock}</span>
                        <button onclick="adjustStock(${p.id}, 1)" class="text-rose-600 hover:text-rose-800 font-bold px-1" title="Aumentar Estoque">+</button>
                    </div>
                    ${isLow ? '<span class="block text-[10px] text-amber-600 font-medium mt-0.5"><i class="fa-solid fa-triangle-exclamation"></i> Baixo</span>' : ''}
                </td>
                <td class="py-4 px-6 text-right space-x-2">
                    <button onclick="editProduct(${p.id})" class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-zinc-800 text-rose-600 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-zinc-700 transition-colors" title="Editar Peça">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="deleteProduct(${p.id})" class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" title="Excluir Peça">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// Filtros combinados
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    const size = document.getElementById('sizeFilter').value;

    const filtered = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query) || p.color.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const matchesCat = cat === "" || p.category === cat;
        const matchesSize = size === "" || p.size === size;
        return matchesQuery && matchesCat && matchesSize;
    });

    renderTable(filtered);
}

// Ajuste Rápido de Estoque (+/-)
function adjustStock(id, amount) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.stock = Math.max(0, product.stock + amount);
        renderDashboard();
        filterProducts();
        showToast(`Estoque de "${product.name}" atualizado!`, "fa-circle-check");
    }
}

// Modal Controls
function openNewProductModal() {
    document.getElementById('modalTitle').innerText = "Nova Peça no Estoque";
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    
    document.getElementById('productImage').value = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80";

    const modal = document.getElementById('productModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modalContainer').classList.remove('scale-95');
    }, 10);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('opacity-0');
    document.getElementById('modalContainer').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Salvar (Criar ou Atualizar)
function saveProduct(event) {
    event.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const size = document.getElementById('productSize').value;
    const color = document.getElementById('productColor').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const image = document.getElementById('productImage').value;

    if (id) {
        const product = products.find(p => p.id == id);
        if (product) {
            product.name = name;
            product.category = category;
            product.size = size;
            product.color = color;
            product.price = price;
            product.stock = stock;
            product.image = image;
            showToast(`Peça "${name}" atualizada com sucesso!`, "fa-pen-to-square");
        }
    } else {
        const newProduct = {
            id: Date.now(),
            name,
            category,
            size,
            color,
            price,
            stock,
            image
        };
        products.push(newProduct);
        showToast(`Peça "${name}" cadastrada com sucesso!`, "fa-circle-plus");
    }

    closeProductModal();
    renderDashboard();
    filterProducts();
}

// Editar Peça
function editProduct(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('modalTitle').innerText = "Editar Peça";
    document.getElementById('productId').value = p.id;
    document.getElementById('productName').value = p.name;
    document.getElementById('productCategory').value = p.category;
    document.getElementById('productSize').value = p.size;
    document.getElementById('productColor').value = p.color;
    document.getElementById('productPrice').value = p.price;
    document.getElementById('productStock').value = p.stock;
    document.getElementById('productImage').value = p.image;

    const modal = document.getElementById('productModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modalContainer').classList.remove('scale-95');
    }, 10);
}

// Excluir Peça
function deleteProduct(id) {
    if (confirm("Tem certeza que deseja remover esta peça do estoque da Maison Élise?")) {
        products = products.filter(p => p.id !== id);
        renderDashboard();
        filterProducts();
        showToast("Peça removida do estoque.", "fa-trash");
    }
}

// Gráfico com Chart.js
function initChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    const categories = {};
    products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + Number(p.stock);
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#e87d8f',
                    '#f2aeb9',
                    '#d9526a',
                    '#f8d2d9',
                    '#a32f44'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

function updateChart() {
    const categories = {};
    products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + Number(p.stock);
    });

    categoryChartInstance.data.labels = Object.keys(categories);
    categoryChartInstance.data.datasets[0].data = Object.values(categories);
    categoryChartInstance.update();
}

// Toast Feedback Notification
function showToast(message, iconClass) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    document.getElementById('toastIcon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}