1
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productQty = document.getElementById('product-qty');
const productPrice = document.getElementById('product-price');
const productCategory = document.getElementById('product-category');
const productList = document.getElementById('product-list');

const statTotalItems = document.getElementById('stat-total-items');
const statTotalValue = document.getElementById('stat-total-value');
const statCritical = document.getElementById('stat-critical');

// Carregar produtos salvos ou iniciar array vazio
let products = JSON.parse(localStorage.getItem('nexus_products')) || [];

function saveAndRender() {
    localStorage.setItem('nexus_products', JSON.stringify(products));
        renderInventory();
        }

        function renderInventory() {
            productList.innerHTML = '';
                
                    let totalItemsCount = 0;
                        let totalInventoryValue = 0;
                            let criticalCount = 0;

                                products.forEach((prod, index) => {
                                        const itemTotal = prod.qty * prod.price;
                                                totalItemsCount += Number(prod.qty);
                                                        totalInventoryValue += itemTotal;

                                                                if (Number(prod.qty) <= 3) {
                                                                            criticalCount++;
                                                                                    }

                                                                                            const tr = document.createElement('tr');
                                                                                                    
                                                                                                            tr.innerHTML = `
                                                                                                                        <td>${escapeHtml(prod.name)}</td>
                                                                                                                                    <td><span class="badge">${prod.category}</span></td>
                                                                                                                                                <td class="${prod.qty <= 3 ? 'low-stock' : ''}">${prod.qty}</td>
                                                                                                                                                            <td>R$ ${Number(prod.price).toFixed(2)}</td>
                                                                                                                                                                        <td>R$ ${itemTotal.toFixed(2)}</td>
                                                                                                                                                                                    <td>
                                                                                                                                                                                                    <button class="btn-delete" onclick="deleteProduct(${index})">Remover</button>
                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                        `;
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                        productList.appendChild(tr);
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                // Atualizar Dashboard
                                                                                                                                                                                                                                                    statTotalItems.textContent = totalItemsCount;
                                                                                                                                                                                                                                                        statTotalValue.textContent = `R$ ${totalInventoryValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                                                                                                                                                                                                                                                            statCritical.textContent = criticalCount;
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                            function addProduct(e) {
                                                                                                                                                                                                                                                                e.preventDefault();
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                        const name = productName.value.trim();
                                                                                                                                                                                                                                                                            const qty = parseInt(productQty.value);
                                                                                                                                                                                                                                                                                const price = parseFloat(productPrice.value);
                                                                                                                                                                                                                                                                                    const category = productCategory.value;

                                                                                                                                                                                                                                                                                        if (!name || isNaN(qty) || isNaN(price)) return;

                                                                                                                                                                                                                                                                                            products.push({ name, qty, price, category });

                                                                                                                                                                                                                                                                                                productForm.reset();
                                                                                                                                                                                                                                                                                                    saveAndRender();
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                    function deleteProduct(index) {
                                                                                                                                                                                                                                                                                                        products.splice(index, 1);
                                                                                                                                                                                                                                                                                                            saveAndRender();
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            // Proteção básica contra XSS
                                                                                                                                                                                                                                                                                                            function escapeHtml(text) {
                                                                                                                                                                                                                                                                                                                const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
                                                                                                                                                                                                                                                                                                                    return text.replace(/[&<>"']/g, m => map[m]);
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    productForm.addEventListener('submit', addProduct);

                                                                                                                                                                                                                                                                                                                    // Render inicial
                                                                                                                                                                                                                                                                                                                    renderInventory();