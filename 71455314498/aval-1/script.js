<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Estoque (JS Puro)</title>
</head>
<body>
    <script>
        // ==========================================
        // 1. ESTADO DA APLICAÇÃO (Dados)
        // ==========================================
        let estoque = [
            { id: 1, nome: "Notebook Dell", categoria: "Eletrônicos", quantidade: 5, preco: 3500.00 },
            { id: 2, nome: "Monitor 24\"", categoria: "Eletrônicos", quantidade: 12, preco: 850.00 }
        ];

        // ==========================================
        // 2. CSS INJETADO VIA JAVASCRIPT
        // ==========================================
        const style = document.createElement('style');
        style.textContent = `
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
            body { background: #f4f7f6; color: #333; padding: 20px; }
            .container { max-width: 900px; margin: 0 auto; }
            h1 { text-align: center; margin-bottom: 20px; color: #2c3e50; }
            .cards { display: flex; gap: 15px; margin-bottom: 20px; }
            .card { flex: 1; background: #fff; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .card h3 { font-size: 12px; color: #7f8c8d; text-transform: uppercase; }
            .card p { font-size: 20px; font-weight: bold; color: #2c3e50; margin-top: 5px; }
            .form-card, .table-card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px; }
            .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 15px; }
            input { padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; }
            button { background: #27ae60; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; }
            button:hover { background: #219150; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
            th { background: #f8f9fa; }
            .btn-delete { background: #e74c3c; width: auto; padding: 5px 10px; font-size: 12px; }
            .btn-delete:hover { background: #c0392b; }
        `;
        document.head.appendChild(style);

        // ==========================================
        // 3. CONSTRUÇÃO DA INTERFACE (DOM via JS)
        // ==========================================
        const container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);

        // Título
        const h1 = document.createElement('h1');
        h1.innerText = '📦 Sistema de Estoque (JavaScript Engine)';
        container.appendChild(h1);

        // Dashboard (Cards)
        const cardsDiv = document.createElement('div');
        cardsDiv.className = 'cards';
        
        const cardItens = criarCard('Total de Itens', '0');
        const cardQtd = criarCard('Qtd. Total', '0');
        const cardValor = criarCard('Valor em Estoque', 'R$ 0,00');

        cardsDiv.appendChild(cardItens.element);
        cardsDiv.appendChild(cardQtd.element);
        cardsDiv.appendChild(cardValor.element);
        container.appendChild(cardsDiv);

        // Formulário
        const formCard = document.createElement('div');
        formCard.className = 'form-card';
        formCard.innerHTML = '<h2>Cadastrar Produto</h2><br>';
        
        const formGrid = document.createElement('div');
        formGrid.className = 'form-grid';

        const inputNome = criarInput('text', 'Nome do Produto');
        const inputCategoria = criarInput('text', 'Categoria');
        const inputQtd = criarInput('number', 'Quantidade');
        const inputPreco = criarInput('number', 'Preço (R$)');

        formGrid.appendChild(inputNome);
        formGrid.appendChild(inputCategoria);
        formGrid.appendChild(inputQtd);
        formGrid.appendChild(inputPreco);

        const btnAdicionar = document.createElement('button');
        btnAdicionar.innerText = 'Adicionar ao Estoque';
        
        formCard.appendChild(formGrid);
        formCard.appendChild(btnAdicionar);
        container.appendChild(formCard);

        // Tabela
        const tableCard = document.createElement('div');
        tableCard.className = 'table-card';
        tableCard.innerHTML = `
            <h2>Produtos em Estoque</h2>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Qtd.</th>
                        <th>Preço Unit.</th>
                        <th>Subtotal</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody id="tbody-estoque"></tbody>
            </table>
        `;
        container.appendChild(tableCard);

        // ==========================================
        // 4. FUNÇÕES AUXILIARES & LÓGICA DE NEGÓCIO
        // ==========================================
        function criarCard(titulo, valorInicial) {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `<h3>${titulo}</h3><p>${valorInicial}</p>`;
            return { element: el, valorEl: el.querySelector('p') };
        }

        function criarInput(tipo, placeholder) {
            const input = document.createElement('input');
            input.type = tipo;
            input.placeholder = placeholder;
            return input;
        }

        function formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function renderizar() {
            const tbody = document.getElementById('tbody-estoque');
            tbody.innerHTML = '';

            let totalQtd = 0;
            let totalValor = 0;

            if (estoque.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
            } else {
                estoque.forEach(prod => {
                    const subtotal = prod.quantidade * prod.preco;
                    totalQtd += prod.quantidade;
                    totalValor += subtotal;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${prod.nome}</strong></td>
                        <td>${prod.categoria}</td>
                        <td>${prod.quantidade}</td>
                        <td>${formatarMoeda(prod.preco)}</td>
                        <td>${formatarMoeda(subtotal)}</td>
                        <td></td>
                    `;

                    const btnDeletar = document.createElement('button');
                    btnDeletar.className = 'btn-delete';
                    btnDeletar.innerText = 'Excluir';
                    btnDeletar.onclick = () => removerProduto(prod.id);

                    tr.children[5].appendChild(btnDeletar);
                    tbody.appendChild(tr);
                });
            }

            // Atualiza indicadores do topo
            cardItens.valorEl.innerText = estoque.length;
            cardQtd.valorEl.innerText = totalQtd;
            cardValor.valorEl.innerText = formatarMoeda(totalValor);
        }

        function adicionarProduto() {
            const nome = inputNome.value.trim();
            const categoria = inputCategoria.value.trim();
            const quantidade = parseInt(inputQtd.value);
            const preco = parseFloat(inputPreco.value);

            if (!nome || !categoria || isNaN(quantidade) || isNaN(preco)) {
                alert('Preencha todos os campos corretamente!');
                return;
            }

            estoque.push({
                id: Date.now(),
                nome,
                categoria,
                quantidade,
                preco
            });

            // Limpa formulário
            inputNome.value = '';
            inputCategoria.value = '';
            inputQtd.value = '';
            inputPreco.value = '';

            renderizar();
        }

        function removerProduto(id) {
            estoque = estoque.filter(prod => prod.id !== id);
            renderizar();
        }

        // Vincular evento do botão
        btnAdicionar.onclick = adicionarProduto;

        // Renderização Inicial
        renderizar();
    </script>
</body>
</html>