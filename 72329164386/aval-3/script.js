
// ==================================
// VARIÁVEIS DO SISTEMA
// ==================================

let pessoas = JSON.parse(
    localStorage.getItem("pessoas")
) || [];

let contador = Number(
    localStorage.getItem("contador")
) || 1;

let pessoaEditando = null;

// Elementos HTML
const formulario = document.getElementById("form-pessoa");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");
const pesquisa = document.getElementById("pesquisa");


// ==================================
// GERAR CÓDIGO
// ==================================

function gerarCodigo() {
    localStorage.setItem("contador", contador + 1);
    return contador++;
}


// ==================================
// SALVAR NO NAVEGADOR
// ==================================

function salvarDados() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
}


// ==================================
// CALCULAR IMC
// ==================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// ==================================
// CLASSIFICAR IMC
// ==================================

function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "baixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade"
    };
}


// ==================================
// FORMATAR NÚMEROS
// ==================================

function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}


// ==================================
// CRIAR CÉLULA
// ==================================

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}


// ==================================
// CRIAR LINHA
// ==================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade + " anos"));
    tr.appendChild(criarCelula(formatar(pessoa.altura) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso) + " kg"));
    tr.appendChild(criarCelula(formatar(imc)));

    const tdClassificacao = criarCelula(classificacao.texto);

    tdClassificacao.classList.add(
        "classificacao",
        classificacao.classe
    );

    tr.appendChild(tdClassificacao);

    // Botões de ação
    const tdAcoes = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "editar";

    btnEditar.addEventListener("click", function() {
        editarPessoa(pessoa.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "excluir";

    btnExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.append(btnEditar, btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ==================================
// RENDERIZAR TABELA
// ==================================

function render() {

    tabelaPessoas.innerHTML = "";

    const termo = pesquisa.value.trim().toLowerCase();

    const filtradas = pessoas.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(termo)
    );

    if (filtradas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 8;
        td.className = "vazio";

        td.textContent = pessoas.length === 0
            ? "Nenhuma pessoa cadastrada ainda"
            : "Nenhum paciente encontrado";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    filtradas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}


// ==================================
// CADASTRAR PACIENTE
// ==================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (nome.length < 3) {
        erro.textContent = "O nome deve ter pelo menos 3 caracteres.";
        return;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        erro.textContent = "Informe uma idade válida.";
        return;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        erro.textContent = "Informe uma altura válida.";
        return;
    }

    if (!Number.isFinite(peso) || peso < 1 || peso > 500) {
        erro.textContent = "Informe um peso válido.";
        return;
    }

    erro.textContent = "";

    if (pessoaEditando !== null) {

        const pessoa = pessoas.find(p => p.id === pessoaEditando);

        if (pessoa) {
            pessoa.nome = nome;
            pessoa.idade = idade;
            pessoa.altura = altura;
            pessoa.peso = peso;
        }

        pessoaEditando = null;

    } else {

        const pessoa = {
            id: gerarCodigo(),
            nome: nome,
            idade: idade,
            altura: altura,
            peso: peso
        };

        pessoas.push(pessoa);
    }

    salvarDados();
    render();
    atualizarEstatisticas();

    formulario.reset();

});


// ==================================
// EDITAR PACIENTE
// ==================================

function editarPessoa(id) {

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("idade").value = pessoa.idade;
    document.getElementById("altura").value = pessoa.altura;
    document.getElementById("peso").value = pessoa.peso;

    pessoaEditando = id;

    document.querySelector(".btn-salvar").textContent =
        "Salvar alterações";

    document.querySelector(".card h2").textContent =
        "Editar paciente";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==================================
// EXCLUIR PACIENTE
// ==================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(p => p.id !== id);

    if (pessoaEditando === id) {
        pessoaEditando = null;
        formulario.reset();
    }

    salvarDados();
    render();
    atualizarEstatisticas();
}


// ==================================
// CANCELAR EDIÇÃO
// ==================================

formulario.addEventListener("reset", function() {

    pessoaEditando = null;

    erro.textContent = "";

    document.querySelector(".btn-salvar").textContent =
        "Salvar paciente";

    document.querySelector(".card h2").textContent =
        "Cadastro de Pacientes";
});


// ==================================
// PESQUISAR PACIENTE
// ==================================

pesquisa.addEventListener("input", render);


// ==================================
// ATUALIZAR ESTATÍSTICAS
// ==================================

function atualizarEstatisticas() {

    document.getElementById("total").textContent =
        pessoas.length;

    if (pessoas.length === 0) {
        document.getElementById("media").textContent = "0,00";
        return;
    }

    let soma = 0;

    pessoas.forEach(function(pessoa) {
        soma += calcularIMC(pessoa.peso, pessoa.altura);
    });

    const media = soma / pessoas.length;

    document.getElementById("media").textContent =
        formatar(media);
}


// ==================================
// INICIAR SISTEMA
// ==================================

render();
atualizarEstatisticas();
