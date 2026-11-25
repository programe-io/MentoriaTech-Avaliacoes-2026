
const formulario = document.getElementById("form-pessoa");

const nome = document.getElementById("input-nome");
const idade = document.getElementById("input-idade");
const altura = document.getElementById("input-altura");
const peso = document.getElementById("input-peso");

const tabela = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");

let pessoas = [];

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nomePessoa = nome.value.trim();
    const idadePessoa = Number(idade.value);
    const alturaPessoa = Number(altura.value);
    const pesoPessoa = Number(peso.value);

    // Validar os dados
    if (nomePessoa === "") {
        mostrarErro("Digite o nome da pessoa.");
        nome.focus();
        return;
    }

    if (!Number.isInteger(idadePessoa) ||
        idadePessoa < 1 || idadePessoa > 120) {
        mostrarErro("Digite uma idade válida.");
        idade.focus();
        return;
    }

    if (!Number.isFinite(alturaPessoa) ||
        alturaPessoa < 0.5 || alturaPessoa > 2.5) {
        mostrarErro("Digite uma altura válida.");
        altura.focus();
        return;
    }

    if (!Number.isFinite(pesoPessoa) ||
        pesoPessoa < 2 || pesoPessoa > 500) {
        mostrarErro("Digite um peso válido.");
        peso.focus();
        return;
    }

    // Criar cadastro
    const pessoa = {
        nome: nomePessoa,
        idade: idadePessoa,
        altura: alturaPessoa,
        peso: pesoPessoa
    };

    // Adicionar pessoa à lista
    pessoas.push(pessoa);

    // Atualizar tabela
    atualizarTabela();

    // Limpar formulário
    formulario.reset();

    erro.hidden = true;
});

function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

function atualizarTabela() {

    tabela.innerHTML = "";

    if (pessoas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhuma pessoa cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    pessoas.forEach(function(pessoa, indice) {

        const imc = pessoa.peso /
            (pessoa.altura * pessoa.altura);

        let classificacao = "";
        let classe = "";

        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
            classe = "abaixo";
        } else if (imc < 25) {
            classificacao = "Peso normal";
            classe = "normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
            classe = "sobrepeso";
        } else {
            classificacao = "Obesidade";
            classe = "obesidade";
        }

        const linha = document.createElement("tr");

        const valores = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            imc.toFixed(2)
        ];

        valores.forEach(function(valor) {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo " + classe;
        selo.textContent = classificacao;

        colunaClassificacao.appendChild(selo);
        linha.appendChild(colunaClassificacao);

        const colunaAcoes = document.createElement("td");
        colunaAcoes.className = "acoes";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "remover";

        botaoExcluir.addEventListener("click", function() {
            pessoas.splice(indice, 1);
            atualizarTabela();
        });

        colunaAcoes.appendChild(botaoExcluir);
        linha.appendChild(colunaAcoes);

        tabela.appendChild(linha);
    });
}

// Mostrar tabela vazia ao abrir a página
atualizarTabela();
