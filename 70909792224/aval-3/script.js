<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de IMC</title>
    <style>
        /* Estilização básica inspirada na aula */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #f4f6f9;
            color: #333;
            padding: 20px;
        }

        main {
            max-width: 900px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        .card {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .card h2 {
            margin-bottom: 15px;
            font-size: 1.2rem;
            color: #34495e;
        }

        .input-group {
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
        }

        .input-group label {
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .input-group input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
        }

        .botoes {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        button {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }

        #salvar {
            background-color: #27ae60;
            color: white;
        }

        #cancelar {
            background-color: #e74c3c;
            color: white;
        }

        #erro {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table th, table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
            font-size: 0.9rem;
        }

        table th {
            background-color: #f8f9fa;
        }

        .vazio {
            font-style: italic;
            color: #777;
        }
    </style>
</head>
<body>

    <main>
        <h1>Sistema de Gestão de Controle de IMC</h1>

        <!-- Card do Formulário -->
        <section class="card">
            <h2>Cadastrar Paciente</h2>
            <form id="form-pessoa">
                <div class="input-group">
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome completo" maxlength="50">
                </div>

                <div class="input-group">
                    <label for="idade">Idade</label>
                    <input type="number" id="idade" min="1" max="120" placeholder="Ex: 25">
                </div>

                <div class="input-group">
                    <label for="altura">Altura (m)</label>
                    <input type="number" id="altura" step="0.01" min="0.5" max="2.5" placeholder="Ex: 1.75">
                </div>

                <div class="input-group">
                    <label for="peso">Peso (kg)</label>
                    <input type="number" id="peso" step="0.1" min="2" max="500" placeholder="Ex: 70.5">
                </div>

                <div class="botoes">
                    <button type="button" id="salvar">Salvar</button>
                    <button type="button" id="cancelar">Cancelar</button>
                </div>

                <div id="erro"></div>
            </form>
        </section>

        <!-- Card da Tabela -->
        <section class="card">
            <h2>Pacientes Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>IMC</th>
                        <th>Classificação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela-pessoas">
                    <!-- Conteúdo gerado dinamicamente via JS -->
                    <tr>
                        <td colspan="7" class="vazio">Nenhuma pessoa cadastrada ainda</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

</body>
</html>
