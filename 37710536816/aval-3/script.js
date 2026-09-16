const form = document.getElementById("formPessoa");

const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");

const tabela = document.getElementById("tabelaPessoas");

const mensagem = document.getElementById("mensagem");

const totalPessoas = document.getElementById("totalPessoas");

const estadoVazio = document.getElementById("estadoVazio");

const btnLimparTudo = document.getElementById("btnLimparTudo");


let pessoas = carregarDados();


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}


function adicionarPessoa(nome, peso, altura) {

    const imc = calcularIMC(peso, altura);

    const classificacao = classificarIMC(imc);

    const pessoa = {
        id: Date.now(),
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        situacao: classificacao.texto,
        classe: classificacao.classe
    };

    pessoas.push(pessoa);

    salvarDados();

    renderizarTabela();
}


function renderizarTabela() {

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = document.createElement("tr");


        const tdNome = document.createElement("td");
        tdNome.textContent = pessoa.nome;


        const tdPeso = document.createElement("td");
        tdPeso.textContent = `${pessoa.peso.toFixed(1)} kg`;


        const tdAltura = document.createElement("td");
        tdAltura.textContent = `${pessoa.altura.toFixed(2)} m`;


        const tdIMC = document.createElement("td");
        tdIMC.textContent = pessoa.imc.toFixed(1);


        const tdSituacao = document.createElement("td");

        const status = document.createElement("span");

        status.textContent = pessoa.situacao;

        status.classList.add(
            "status",
            pessoa.classe
        );

        tdSituacao.appendChild(status);


        const tdAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.classList.add("btn-excluir");

        botaoExcluir.addEventListener("click", function() {
            excluirPessoa(pessoa.id);
        });

        tdAcao.appendChild(botaoExcluir);


        linha.appendChild(tdNome);
        linha.appendChild(tdPeso);
        linha.appendChild(tdAltura);
        linha.appendChild(tdIMC);
        linha.appendChild(tdSituacao);
        linha.appendChild(tdAcao);


        tabela.appendChild(linha);
    });


    atualizarInterface();
}


function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvarDados();

    renderizarTabela();

    mostrarMensagem(
        "Registro removido com sucesso.",
        "sucesso"
    );
}


function atualizarInterface() {

    totalPessoas.textContent = pessoas.length;

    if (pessoas.length === 0) {
        estadoVazio.style.display = "block";
        btnLimparTudo.style.display = "none";
    } else {
        estadoVazio.style.display = "none";
        btnLimparTudo.style.display = "block";
    }
}


function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = `mensagem ${tipo}`;

    setTimeout(function() {
        mensagem.textContent = "";
        mensagem.className = "mensagem";
    }, 3000);
}


function salvarDados() {

    localStorage.setItem(
        "pessoasIMC",
        JSON.stringify(pessoas)
    );
}


function carregarDados() {

    const dados = localStorage.getItem("pessoasIMC");

    if (dados) {
        return JSON.parse(dados);
    }

    return [];
}


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const nome = nomeInput.value.trim();

    const peso = Number(pesoInput.value);

    const altura = Number(alturaInput.value);


    if (nome.length < 2) {

        mostrarMensagem(
            "Digite um nome válido.",
            "erro"
        );

        return;
    }


    if (peso <= 0) {

        mostrarMensagem(
            "Digite um peso válido.",
            "erro"
        );

        return;
    }


    if (altura < 0.5 || altura > 2.5) {

        mostrarMensagem(
            "Digite uma altura válida.",
            "erro"
        );

        return;
    }


    adicionarPessoa(
        nome,
        peso,
        altura
    );


    form.reset();

    nomeInput.focus();


    mostrarMensagem(
        "Pessoa cadastrada com sucesso!",
        "sucesso"
    );
});


btnLimparTudo.addEventListener("click", function() {

    const confirmar = confirm(
        "Deseja realmente apagar todos os registros?"
    );

    if (!confirmar) {
        return;
    }


    pessoas = [];

    salvarDados();

    renderizarTabela();


    mostrarMensagem(
        "Todos os registros foram removidos.",
        "sucesso"
    );
});


renderizarTabela();