// Imagem padrão SVG caso a imagem falhe ou não seja informada

const placeholderImg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><rect width="45" height="45" fill="%23e9ecef"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%236c757d">Foto</text></svg>';



// Dados Iniciais do Estoque

let products = [

    { id: 1, img: placeholderImg, name: 'Esfoliante Facial Exfoliating Scrub', desc: 'Renova a textura da pele com microesferas.', price: 39.90, qty: 15 },

    { id: 2, img: placeholderImg, name: 'Gel Facial Hidratante Matte', desc: 'Fórmula leve de rápida absorção para pele oleosa.', price: 45.00, qty: 22 },

    { id: 3, img: placeholderImg, name: 'Ampola de Crescimento Capilar', desc: 'Fortalecimento e estímulo intensivo dos fios.', price: 25.00, qty: 40 },

    { id: 4, img: placeholderImg, name: 'Sérum Anti-idade Ácido Hialurônico', desc: 'Reduz linhas de expressão e hidrata profundamente.', price: 89.90, qty: 8 },

    { id: 5, img: placeholderImg, name: 'Protetor Solar Facial FPS 50', desc: 'Toque seco com alta proteção UVA/UVB.', price: 59.90, qty: 18 }

];



function renderTable() {

    const list = document.getElementById('inventory-list');

    list.innerHTML = '';



    products.forEach(product => {

        const tr = document.createElement('tr');

        tr.innerHTML = `

            <td><img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.onerror=null; this.src='${placeholderImg}';"></td>

            <td><strong>${product.name}</strong></td>

            <td>${product.desc}</td>

            <td>R$ ${product.price.toFixed(2)}</td>

            <td>

                <div class="stock-control">

                    <button class="btn-qty" onclick="updateQty(${product.id}, -1)">-</button>

                    <span class="qty-value">${product.qty}</span>

                    <button class="btn-qty" onclick="updateQty(${product.id}, 1)">+</button>

                </div>

            </td>

            <td>

                <button onclick="removeProduct(${product.id})" style="color: #dc3545; background: none; border: none; cursor: pointer;">Remover</button>

            </td>

        `;

        list.appendChild(tr);

    });



    updateTotals();

}



function updateQty(id, change) {

    const product = products.find(p => p.id === id);

    if (product) {

        if (product.qty + change >= 0) {

            product.qty += change;

            renderTable();

        }

    }

}



function removeProduct(id) {

    products = products.filter(p => p.id !== id);

    renderTable();

}



function updateTotals() {

    const totalItems = products.reduce((acc, p) => acc + p.qty, 0);

    const totalValue = products.reduce((acc, p) => acc + (p.price * p.qty), 0);



    document.getElementById('stat-total-items').textContent = totalItems;

    document.getElementById('stat-total-value').textContent = `R$ ${totalValue.toFixed(2)}`;

}



document.getElementById('product-form').addEventListener('submit', function(e) {

    e.preventDefault();



    const imgInput = document.getElementById('p-img').value.trim();



    const newProduct = {

        id: Date.now(),

        img: imgInput !== '' ? imgInput : placeholderImg,

        name: document.getElementById('p-name').value,

        desc: document.getElementById('p-desc').value,

        price: parseFloat(document.getElementById('p-price').value),

        qty: parseInt(document.getElementById('p-qty').value)

    };



    products.push(newProduct);

    renderTable();

    this.reset();

});



// Renderização Inicial

renderTable()