<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle de IMC</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="header">
        <div class="container">
            <h1>⚖️ Controle de IMC</h1>
            <p>Sistema de cadastro e acompanhamento do Índice de Massa Corporal</p>
        </div>
    </header>

    <main class="container">

        <!-- INDICADORES -->
        <section class="dashboard">

            <div class="card indicador">
                <h3>Pessoas cadastradas</h3>
                <p id="totalPessoas">0</p>
            </div>

            <div class="card indicador">
                <h3>IMC médio</h3>
                <p id="imcMedio">0.00</p>
            </div>

            <div class="card indicador">
                <h3>Último cadastro</h3>
                <p id="ultimoCadastro">Nenhum</p>
            </div>

        </section>

        <!-- FORMULÁRIO -->
        <section class="card">

            <h2 id="tituloFormulario">Cadastrar Pessoa</h2>

            <form id="formIMC">

                <input type="hidden" id="idPessoa">

                <div class="form-grid">

                    <div class="campo">
                        <label for="nome">Nome completo</label>
                        <input type="text" id="nome"
                               placeholder="Digite o nome"
                               required>
                    </div>

                    <div class="campo">
                        <label for="idade">Idade</label>
                        <input type="number" id="idade"
                               placeholder="Digite a idade"
                               min="1" max="120"
                               required>
                    </div>

                    <div class="campo">
                        <label for="peso">Peso (kg)</label>
                        <input type="number" id="peso"
                               placeholder="Ex: 75.5"
                               min="1" step="0.1"
                               required>
                    </div>

                    <div class="campo">
                        <label for="altura">Altura (m)</label>
                        <input type="number" id="altura"
                               placeholder="Ex: 1.75"
                               min="0.5" max="2.5"
                               step="0.01"
                               required>
                    </div>

                </div>

                <div class="botoes-form">

                    <button type="submit" id="btnSalvar">
                        💾 Salvar Cadastro
                    </button>

                    <button type="button" id="btnCancelar"
                            class="btn-cancelar"
                            onclick="cancelarEdicao()"
                            hidden>
                        Cancelar
                    </button>

                </div>

            </form>

        </section>

        <!-- PESQUISA -->
        <section class="card pesquisa">

            <h2>Registros cadastrados</h2>

            <input type="text" id="pesquisa"
                   placeholder="🔎 Pesquisar por nome...">

        </section>

        <!-- TABELA -->
        <section class="card tabela-container">

            <table>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Peso</th>
                        <th>Altura</th>
                        <th>IMC</th>
                        <th>Classificação</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody id="listaPessoas">
                </tbody>

            </table>

        </section>

    </main>

    <footer>
        <p>Projeto Prático CRUD de IMC | HTML, CSS e JavaScript</p>
    </footer>

    <script src="script.js"></script>

</body>
</html>