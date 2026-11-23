
document.addEventListener("DOMContentLoaded", function() {

    // REFERÊNCIAS DO HTML
    const formPessoa = document.getElementById("formPessoa");
    const inputNome = document.getElementById("nome");
    const inputIdade = document.getElementById("idade");
    const inputAltura = document.getElementById("altura");
    const inputPeso = document.getElementById("peso");
    const mensagemDeErro = document.getElementById("erro");
    const listaPessoas = document.getElementById("listaPessoas");

    // ARMAZENAMENTO
    const chavePessoas = "pessoas";

    let pessoas = carregarPessoas();
    let proximoId = 1;

    // CALCULAR IMC
    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    // CLASSIFICAR IMC
    function classificarIMC(imc) {

        if (imc < 18.5) {
            return { texto: "Abaixo do peso", classe: "amarelo" };
        }

        if (imc < 25) {
            return { texto: "Peso normal", classe: "verde" };
        }

        if (imc < 30) {
            return { texto: "Sobrepeso", classe: "amarelo" };
        }

        if (imc < 35) {
            return { texto: "Obesidade I", classe: "vermelho" };
        }

        if (imc < 40) {
            return { texto: "Obesidade II", classe: "vermelho" };
        }

        return { texto: "Obesidade III", classe: "vermelho" };
    }

    // FORMATAR
    function formatar(valor, casas) {
        return valor.toFixed(casas);
    }

    // CRIAR CÉLULA
    function criarCelula(valor) {
        const td = document.createElement("td");
        td.textContent = valor;
        return td;
    }

    // CRIAR LINHA DA TABELA
    function criarLinha(pessoa) {

        const tr = document.createElement("tr");

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const classificacao = classificarIMC(imc);

        tr.appendChild(criarCelula(pessoa.id));
        tr.appendChild(criarCelula(pessoa.nome));
        tr.appendChild(criarCelula(pessoa.idade));
        tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
        tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " KG"));
        tr.appendChild(criarCelula(formatar(imc, 1)));

        // CLASSIFICAÇÃO
        const tdClassificacao = document.createElement("td");

        const selo = document.createElement("span");

        selo.classList.add("selo", classificacao.classe);
        selo.textContent = classificacao.texto;

        tdClassificacao.appendChild(selo);
        tr.appendChild(tdClassificacao);

        // BOTÃO APAGAR
        const tdAcao = document.createElement("td");
        const botaoApagar = document.createElement("button");

        botaoApagar.textContent = "Apagar";
        botaoApagar.classList.add("btn-apagar");
        botaoApagar.type = "button";

        botaoApagar.addEventListener("click", function() {
            apagarPessoa(pessoa.id);
        });

        tdAcao.appendChild(botaoApagar);
        tr.appendChild(tdAcao);

        return tr;
    }

    // RENDERIZAR TABELA
    function render() {

        listaPessoas.innerHTML = "";

        pessoas.forEach(function(pessoa) {

            const linha = criarLinha(pessoa);

            listaPessoas.appendChild(linha);

        });

    }

    // LER FORMULÁRIO
    function lerFormulario() {

        return {
            nome: inputNome.value.trim(),
            idade: Number(inputIdade.value),
            altura: Number(inputAltura.value),
            peso: Number(inputPeso.value)
        };

    }

    // VALIDAR DADOS
    function validarDados(dados) {

        if (dados.nome.length < 2) {
            return "Informe o nome com no mínimo duas letras.";
        }

        if (
            !Number.isInteger(dados.idade) ||
            dados.idade < 1 ||
            dados.idade > 120
        ) {
            return "A idade deve ser um número inteiro entre 1 e 120.";
        }

        if (
            !Number.isFinite(dados.altura) ||
            dados.altura < 0.5 ||
            dados.altura > 2.5
        ) {
            return "A altura deve estar entre 0.5 e 2.5 metros.";
        }

        if (
            !Number.isFinite(dados.peso) ||
            dados.peso < 2 ||
            dados.peso > 500
        ) {
            return "O peso deve estar entre 2 e 500 kg.";
        }

        return "";
    }

    // MOSTRAR ERRO
    function mostrarErro(mensagem) {
        mensagemDeErro.textContent = mensagem;
        mensagemDeErro.hidden = false;
    }

    // LIMPAR ERRO
    function limparErro() {
        mensagemDeErro.textContent = "";
        mensagemDeErro.hidden = true;
    }

    // ADICIONAR PESSOA
    function adicionarPessoa(dados) {

        pessoas.push({
            id: proximoId++,
            nome: dados.nome,
            idade: dados.idade,
            altura: dados.altura,
            peso: dados.peso
        });

    }

    // SALVAR NO LOCALSTORAGE
    function salvar() {

        localStorage.setItem(
            chavePessoas,
            JSON.stringify(pessoas)
        );

    }

    // CARREGAR PESSOAS
    function carregarPessoas() {

        const dadosSalvos = localStorage.getItem(chavePessoas);

        if (dadosSalvos === null) {
            return [];
        }

        try {

            const dados = JSON.parse(dadosSalvos);

            if (!Array.isArray(dados)) {
                return [];
            }

            return dados.filter(function(pessoa) {
                return pessoa &&
                    Number.isInteger(pessoa.id) &&
                    typeof pessoa.nome === "string" &&
                    Number.isInteger(pessoa.idade) &&
                    Number.isFinite(pessoa.altura) &&
                    Number.isFinite(pessoa.peso);
            });

        } catch (erro) {

            console.error("Erro ao carregar pessoas:", erro);
            return [];

        }
    }

    // AJUSTAR CONTADOR
    function ajustarContador() {

        let maior = 0;

        pessoas.forEach(function(pessoa) {

            if (pessoa.id > maior) {
                maior = pessoa.id;
            }

        });

        proximoId = maior + 1;
    }

    // APAGAR PESSOA
    function apagarPessoa(id) {

        const listaAnterior = pessoas;

        pessoas = pessoas.filter(function(pessoa) {
            return pessoa.id !== id;
        });

        try {
            salvar();
            render();
        } catch (erro) {
            pessoas = listaAnterior;
            mostrarErro("Não foi possível apagar o cadastro.");
            render();
        }

    }

    // EVENTO DE CADASTRO
    formPessoa.addEventListener("submit", function(e) {

        e.preventDefault();

        const dados = lerFormulario();

        const erro = validarDados(dados);

        if (erro !== "") {
            mostrarErro(erro);
            return;
        }

        limparErro();

        const tamanhoAnterior = pessoas.length;

        adicionarPessoa(dados);

        try {

            salvar();

            // ATUALIZAR A TABELA
            render();

            // LIMPAR OS CAMPOS
            formPessoa.reset();

            // VOLTAR AO CAMPO NOME
            inputNome.focus();

        } catch (erro) {

            pessoas.pop();
            proximoId--;

            mostrarErro("Não foi possível salvar o cadastro.");

        }

    });

    // INICIALIZAR A APLICAÇÃO
    ajustarContador();
    render();

});

