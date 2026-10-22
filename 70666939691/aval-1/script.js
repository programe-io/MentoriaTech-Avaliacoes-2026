<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Controle de Estoque</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f6f9;
            color: #333;
        }
        h1, h2 {
            color: #2c3e50;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #2980b9;
            color: white;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .status-ok {
            background-color: #2ecc71;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        .status-low {
            background-color: #e67e22;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 500px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], input[type="number"], select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #27ae60;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        button:hover {
            background-color: #219653;
        }
    </style>
</head>
<body>

    <h1>📦 Painel de Controle de Estoque</h1>
    <p>Gerenciamento dinâmico de mercadorias e insumos.</p>

    <!-- Tabela de Produtos -->
    <h2>Produtos Cadastrados</h2>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="tabela-estoque">
            <!-- Os itens iniciais e novos serão inseridos aqui pelo JavaScript -->
        </tbody>
    </table>

    <!-- Formulário de Cadastro -->
    <h2>Cadastrar Novo Item</h2>
    <form id="form-cadastro">
        <div class="form-group">
            <label for="nome">Nome do Produto:</label>
            <input type="text" id="nome" required placeholder="Ex: Monitor 24 Polegadas">
        </div>

        <div class="form-group">
            <label for="categoria">Categoria:</label>
            <select id="categoria">
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Perifericos">Perifericos</option>
                <option value="Móveis">Móveis de Escritório</option>
            </select>
        </div>

        <div class="form-group">
            <label for="qtd">Quantidade Inicial:</label>
            <input type="number" id="qtd" min="0" required placeholder="0">
        </div>

        <div class="form-group">
            <label for="preco">Preço Unitário (R\$):</label>
            <input type="number" id="preco" step="0.01" min="0" required placeholder="0.00">
        </div>

        <button type="submit">Adicionar ao Estoque</button>
    </form>

    <!-- Lógica em JavaScript para tornar o sistema dinâmico -->
    <script>
        // Banco de dados fictício inicial (Array de Objetos)
        const estoque = [
            { codigo: 1001, nome: "Notebook Intel i7 16GB", categoria: "Eletrônicos", qtd: 15, preco: 4500.00 },
            { codigo: 1002, nome: "Mouse Sem Fio Ergonômico", categoria: "Perifericos", qtd: 3, preco: 120.00 },
            { codigo: 1003, nome: "Teclado Mecânico RGB", categoria: "Perifericos", qtd: 22, preco: 350.00 }
        ];

        let proximoCodigo = 1004;

        // Função responsável por renderizar a tabela na tela
        function renderizarTabela() {
            const tbody = document.getElementById("tabela-estoque");
            tbody.innerHTML = ""; // Limpa a tabela antes de redesenhar

            estoque.forEach(produto => {
                const tr = document.createElement("tr");

                // Define o badge com base na quantidade em estoque
                const statusBadge = produto.qtd <= 5 
                    ? '<span class="status-low">Estoque Baixo</span>' 
                    : '<span class="status-ok">Disponível</span>';

                // Formata o preço para a moeda brasileira
                const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                tr.innerHTML = `
                    <td>#${produto.codigo}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.qtd}</td>
                    <td>${precoFormatado}</td>
                    <td>${statusBadge}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Evento que escuta o envio do formulário
        document.getElementById("form-cadastro").addEventListener("submit", function(event) {
            event.preventDefault(); // Impede a página de recarregar

            // Captura os valores inseridos pelo usuário
            const nomeInput = document.getElementById("nome").value;
            const categoriaInput = document.getElementById("categoria").value;
            const qtdInput = parseInt(document.getElementById("qtd").value);
            const precoInput = parseFloat(document.getElementById("preco").value);

            // Cria um novo objeto de produto
            const novoProduto = {
                codigo: proximoCodigo++,
                nome: nomeInput,
                categoria: categoriaInput,
                qtd: qtdInput,
                preco: precoInput
            };

            // Adiciona o produto ao array e atualiza a interface gráfica
            estoque.push(novoProduto);
            renderizarTabela();

            // Reseta os campos do formulário
            document.getElementById("form-cadastro").reset();
        });

        // Executa a renderização inicial dos produtos ao carregar a página
        renderizarTabela();
    </script>
</body>
</html>
