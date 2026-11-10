
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cadastro de Pessoas</title>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #eef2f7;
    padding: 30px 15px;
}

.container {
    max-width: 900px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px #0001;
}

h1 {
    color: #1e40af;
    text-align: center;
    margin-bottom: 10px;
}

.subtitulo {
    text-align: center;
    color: #777;
    margin-bottom: 30px;
}

.formulario {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.campo {
    display: flex;
    flex-direction: column;
}

.campo label {
    margin-bottom: 7px;
    font-weight: bold;
}

.campo input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 7px;
    outline: none;
}

.campo input:focus {
    border-color: #2563eb;
}

button {
    padding: 13px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    font-weight: bold;
}

.cadastrar {
    grid-column: span 2;
    background: #2563eb;
    color: white;
}

.cadastrar:hover {
    background: #1d4ed8;
}

h2 {
    margin: 35px 0 15px;
    color: #1e40af;
}

.pessoa {
    background: #f8fafc;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.excluir {
    background: #dc2626;
    color: white;
}

@media(max-width: 600px) {
    .formulario {
        grid-template-columns: 1fr;
    }

    .cadastrar {
        grid-column: span 1;
    }

    .pessoa {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
</head>

<body>

<div class="container">

    <h1>Cadastro de Pessoas</h1>
    <p class="subtitulo">Sistema de gerenciamento de pessoas</p>

    <form class="formulario" id="formulario">

        <div class="campo">
            <label>Nome completo</label>
            <input type="text" id="nome" required>
        </div>

        <div class="campo">
            <label>CPF</label>
            <input type="text" id="cpf" required>
        </div>

        <div class="campo">
            <label>Data de nascimento</label>
            <input type="date" id="nascimento" required>
        </div>

        <div class="campo">
            <label>E-mail</label>
            <input type="email" id="email" required>
        </div>

        <div class="campo">
            <label>Telefone</label>
            <input type="tel" id="telefone" required>
        </div>

        <div class="campo">
            <label>Endereço</label>
            <input type="text" id="endereco" required>
        </div>

        <button class="cadastrar" type="submit">
            Cadastrar Pessoa
        </button>

    </form>

    <h2>Pessoas cadastradas</h2>

    <div id="lista">
        <p>Nenhuma pessoa cadastrada.</p>
    </div>

</div>

<script>
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

let pessoas = [];

function mostrarPessoas() {
    lista.innerHTML = "";

    if (pessoas.length === 0) {
        lista.innerHTML = "<p>Nenhuma pessoa cadastrada.</p>";
        return;
    }

    pessoas.forEach((pessoa, indice) => {
        const item = document.createElement("div");
        item.className = "pessoa";

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = pessoa.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `CPF: ${pessoa.cpf} | E-mail: ${pessoa.email}`;

        informacoes.append(nome, detalhes);

        const botao = document.createElement("button");
        botao.className = "excluir";
        botao.textContent = "Excluir";

        botao.addEventListener("click", () => {
            pessoas.splice(indice, 1);
            mostrarPessoas();
        });

        item.append(informacoes, botao);
        lista.appendChild(item);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const pessoa = {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        nascimento: document.getElementById("nascimento").value,
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        endereco: document.getElementById("endereco").value.trim()
    };

    pessoas.push(pessoa);

    mostrarPessoas();
    formulario.reset();

    alert("Pessoa cadastrada com sucesso!");
});
</script>

</body>
</html>
