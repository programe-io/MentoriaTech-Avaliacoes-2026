
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("form-pessoa");
    const nome = document.getElementById("input-nome");
    const idade = document.getElementById("input-idade");
    const altura = document.getElementById("input-altura");
    const peso = document.getElementById("input-peso");

    const tabela = document.getElementById("tabela-pessoas");
    const erro = document.getElementById("erro");
    const titulo = document.getElementById("titulo-fora");
    const botaoSalvar = document.getElementById("btn-salvar");
    const botaoCancelar = document.getElementById("btn-cancelar");

    let pessoas = JSON.parse(localStorage.getItem("pessoasIMC")) || [];
    let indiceEdicao = null;

    function salvarDados() {
        localStorage.setItem("pessoasIMC", JSON.stringify(pessoas));
    }

    function calcularIMC(p, a) {
        return p / (a * a);
    }

    function classificarIMC(imc) {
        if (imc < 18.5) return "Abaixo do peso";
        if (imc < 25) return "Peso normal";
        if (imc < 30) return "Sobrepeso";
        return "Obesidade";
    }

    function mostrarErro(mensagem) {
        erro.textContent = mensagem;
        erro.hidden = false;
    }

    function limparFormulario() {
        formulario.reset();
        erro.hidden = true;
        titulo.textContent = "Nova pessoa";
        botaoSalvar.textContent = "Salvar";
        botaoCancelar.hidden = true;
        indiceEdicao = null;
    }

    function listarPessoas() {
        tabela.innerHTML = "";

        pessoas.forEach(function(pessoa, indice) {
            const linha = document.createElement("tr");

            [
                pessoa.nome,
                pessoa.idade,
                pessoa.altura.toFixed(2) + " m",
                pessoa.peso.toFixed(1) + " kg",
                pessoa.imc.toFixed(2),
                pessoa.classificacao
            ].forEach(function(valor) {
                const coluna = document.createElement("td");
                coluna.textContent = valor;
                linha.appendChild(coluna);
            });

            const acoes = document.createElement("td");

            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.type = "button";
            editar.addEventListener("click", function() {
                editarPessoa(indice);
            });

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.type = "button";
            excluir.addEventListener("click", function() {
                excluirPessoa(indice);
            });

            acoes.appendChild(editar);
            acoes.appendChild(excluir);
            linha.appendChild(acoes);

            tabela.appendChild(linha);
        });
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nomeValor = nome.value.trim();
        const idadeValor = Number(idade.value);
        const alturaValor = Number(altura.value);
        const pesoValor = Number(peso.value);

        erro.hidden = true;

        if (nomeValor.length < 2) {
            mostrarErro("Digite um nome válido.");
            return;
        }

        if (!Number.isInteger(idadeValor) || idadeValor < 1 || idadeValor > 120) {
            mostrarErro("Digite uma idade válida.");
            return;
        }

        if (!Number.isFinite(alturaValor) || alturaValor < 0.5 || alturaValor > 2.5) {
            mostrarErro("Digite uma altura válida.");
            return;
        }

        if (!Number.isFinite(pesoValor) || pesoValor < 2 || pesoValor > 500) {
            mostrarErro("Digite um peso válido.");
            return;
        }

        const imc = calcularIMC(pesoValor, alturaValor);

        const pessoa = {
            nome: nomeValor,
            idade: idadeValor,
            altura: alturaValor,
            peso: pesoValor,
            imc: imc,
            classificacao: classificarIMC(imc)
        };

        if (indiceEdicao === null) {
            pessoas.push(pessoa);
        } else {
            pessoas[indiceEdicao] = pessoa;
        }

        try {
            salvarDados();
            listarPessoas();
            limparFormulario();
        } catch (e) {
            mostrarErro("Não foi possível salvar os dados.");
        }
    });

    function editarPessoa(indice) {
        const pessoa = pessoas[indice];

        nome.value = pessoa.nome;
        idade.value = pessoa.idade;
        altura.value = pessoa.altura;
        peso.value = pessoa.peso;

        indiceEdicao = indice;
        titulo.textContent = "Editar pessoa";
        botaoSalvar.textContent = "Atualizar";
        botaoCancelar.hidden = false;
    }

    function excluirPessoa(indice) {
        pessoas.splice(indice, 1);
        salvarDados();
        listarPessoas();
    }

    botaoCancelar.addEventListener("click", limparFormulario);

    listarPessoas();

});
