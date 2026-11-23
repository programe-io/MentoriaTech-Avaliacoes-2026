
// ======================================
// 1. ARRAY DE PESSOAS
// ======================================

let pessoas = JSON.parse(
    localStorage.getItem("pessoas")
) || [];

let contadorCodigo = Math.max(
    Number(localStorage.getItem("contadorCodigo")) || 0,
    ...pessoas.map(pessoa => pessoa.codigo)
);

let pessoaEmEdicao = null;


// ======================================
// 2. REFERÊNCIAS HTML
// ======================================

const tabelaPessoas =
    document.getElementById("tabelaPessoas");

const formPessoa =
    document.getElementById("formPessoa");

const campoNome =
    document.getElementById("nome");

const campoIdade =
    document.getElementById("idade");

const campoAltura =
    document.getElementById("altura");

const campoPeso =
    document.getElementById("peso");

const campoErro =
    document.getElementById("erro");


// ======================================
// 3. GERAR CÓDIGO
// ======================================

function gerarCodigo() {

    contadorCodigo++;

    localStorage.setItem(
        "contadorCodigo",
        contadorCodigo
    );

    return contadorCodigo;
}


// ======================================
// 4. SALVAR DADOS
// ======================================

function salvarDados() {

    localStorage.setItem(
        "pessoas",
        JSON.stringify(pessoas)
    );
}


// ======================================
// 5. VALIDAR DADOS
// ======================================

function validarPessoa(nome, idade, altura, peso) {

    if (typeof nome !== "string" ||
        nome.trim().length < 3) {

        throw new Error(
            "O nome deve possuir pelo menos 3 caracteres."
        );
    }

    if (!Number.isInteger(idade) ||
        idade < 1 || idade > 120) {

        throw new Error(
            "Informe uma idade entre 1 e 120 anos."
        );
    }

    if (!Number.isFinite(altura) ||
        altura < 0.5 || altura > 2.5) {

        throw new Error(
            "Informe uma altura válida em metros."
        );
    }

    if (!Number.isFinite(peso) ||
        peso < 1 || peso > 500) {

        throw new Error(
            "Informe um peso válido em quilogramas."
        );
    }
}


// ======================================
// 6. CADASTRAR PESSOA
// ======================================

function cadastrarPessoa(nome, idade, altura, peso) {

    validarPessoa(nome, idade, altura, peso);

    const novaPessoa = {

        codigo: gerarCodigo(),

        nome: nome.trim(),

        idade: idade,

        altura: altura,

        peso: peso,

        imc: calcularIMC(peso, altura)

    };

    pessoas.push(novaPessoa);

    salvarDados();

    render();
}


// ======================================
// 7. CALCULAR IMC
// ======================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);
}


// ======================================
// 8. CLASSIFICAR IMC
// ======================================

function classificarIMC(imc, idade) {

    // A classificação adulta não deve ser
    // aplicada a crianças e adolescentes.

    if (idade < 20) {

        return {
            texto: "Avaliação por idade",
            classe: ""
        };

    }

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };

    } else if (imc < 25) {

        return {
            texto: "Peso normal",
            classe: "normal"
        };

    } else if (imc < 30) {

        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };

    } else if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    } else if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    } else {

        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        };

    }
}


// ======================================
// 9. FORMATAR NÚMEROS
// ======================================

function formatar(valor, casas = 2) {

    return valor.toLocaleString("pt-BR", {

        minimumFractionDigits: casas,

        maximumFractionDigits: casas

    });

}


// ======================================
// 10. CRIAR CÉLULA
// ======================================

function criarCelula(conteudo, classe = "") {

    const td = document.createElement("td");

    td.textContent = conteudo;

    if (classe) {
        td.className = classe;
    }

    return td;
}


// ======================================
// 11. CRIAR LINHA
// ======================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.codigo;

    const classificacao = classificarIMC(
        pessoa.imc,
        pessoa.idade
    );

    tr.appendChild(
        criarCelula(pessoa.codigo)
    );

    tr.appendChild(
        criarCelula(pessoa.nome)
    );

    tr.appendChild(
        criarCelula(pessoa.idade)
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.altura))
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso))
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.imc))
    );

    tr.appendChild(
        criarCelula(
            classificacao.texto,
            classificacao.classe
        )
    );

    // COLUNA DE AÇÕES

    const tdAcoes = document.createElement("td");

    const btnEditar = document.createElement("button");

    btnEditar.textContent = "Editar";

    btnEditar.className = "btn-editar";

    btnEditar.addEventListener("click", () => {
        editarPessoa(pessoa.codigo);
    });

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.className = "btn-excluir";

    btnExcluir.addEventListener("click", () => {
        excluirPessoa(pessoa.codigo);
    });

    tdAcoes.appendChild(btnEditar);

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ======================================
// 12. RENDERIZAR TABELA
// ======================================

function render() {

    tabelaPessoas.innerHTML = "";

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .trim()
        .toLowerCase();

    const pessoasFiltradas = pessoas.filter(
        pessoa => pessoa.nome.toLowerCase().includes(pesquisa)
    );

    if (pessoasFiltradas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 8;

        td.className = "vazio";

        td.textContent = pessoas.length === 0
            ? "Nenhuma pessoa cadastrada ainda."
            : "Nenhum paciente encontrado.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

    } else {

        pessoasFiltradas.forEach(pessoa => {

            tabelaPessoas.appendChild(
                criarLinha(pessoa)
            );

        });

    }

    atualizarResumo();

}


// ======================================
// 13. ATUALIZAR INDICADORES
// ======================================

function atualizarResumo() {

    document.getElementById("totalPessoas")
        .textContent = pessoas.length;

    // Média calculada somente para adultos.

    const adultos = pessoas.filter(
        pessoa => pessoa.idade >= 20
    );

    const media = adultos.length > 0
        ? adultos.reduce(
            (total, pessoa) => total + pessoa.imc,
            0
        ) / adultos.length
        : 0;

    document.getElementById("imcMedio")
        .textContent = formatar(media);

}


// ======================================
// 14. BUSCAR PESSOA
// ======================================

function buscarPessoa(codigo) {

    const pessoa = pessoas.find(
        pessoa => pessoa.codigo === codigo
    );

    if (!pessoa) {

        throw new Error(
            "Paciente não encontrado."
        );

    }

    return pessoa;
}


// ======================================
// 15. EDITAR PESSOA
// ======================================

function editarPessoa(codigo) {

    try {

        const pessoa = buscarPessoa(codigo);

        pessoaEmEdicao = codigo;

        campoNome.value = pessoa.nome;

        campoIdade.value = pessoa.idade;

        campoAltura.value = pessoa.altura;

        campoPeso.value = pessoa.peso;

        document.getElementById("tituloFormulario")
            .textContent = "Editar paciente";

        document.getElementById("btnSalvar")
            .textContent = "Atualizar paciente";

        campoErro.textContent = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (erro) {

        campoErro.textContent = erro.message;

    }

}


// ======================================
// 16. EXCLUIR PESSOA
// ======================================

function excluirPessoa(codigo) {

    if (!confirm("Deseja excluir este paciente?")) {
        return;
    }

    pessoas = pessoas.filter(
        pessoa => pessoa.codigo !== codigo
    );

    salvarDados();

    render();

    if (pessoaEmEdicao === codigo) {
        cancelarEdicao();
    }

}


// ======================================
// 17. CANCELAR EDIÇÃO
// ======================================

function cancelarEdicao() {

    pessoaEmEdicao = null;

    formPessoa.reset();

    campoErro.textContent = "";

    document.getElementById("tituloFormulario")
        .textContent = "Cadastrar paciente";

    document.getElementById("btnSalvar")
        .textContent = "Salvar paciente";

}


// ======================================
// 18. EVENTO DO FORMULÁRIO
// ======================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const nome = campoNome.value;

        const idade = Number(campoIdade.value);

        const altura = Number(campoAltura.value);

        const peso = Number(campoPeso.value);

        validarPessoa(nome, idade, altura, peso);

        if (pessoaEmEdicao !== null) {

            const pessoa = buscarPessoa(pessoaEmEdicao);

            pessoa.nome = nome.trim();

            pessoa.idade = idade;

            pessoa.altura = altura;

            pessoa.peso = peso;

            pessoa.imc = calcularIMC(peso, altura);

        } else {

            cadastrarPessoa(nome, idade, altura, peso);

        }

        salvarDados();

        cancelarEdicao();

        render();

    } catch (erro) {

        campoErro.textContent = erro.message;

    }

});


// ======================================
// 19. EVENTO CANCELAR
// ======================================

document.getElementById("btnCancelar")
    .addEventListener("click", cancelarEdicao);


// ======================================
// 20. PESQUISAR PACIENTES
// ======================================

document.getElementById("pesquisa")
    .addEventListener("input", render);


// ======================================
// 21. INICIALIZAR SISTEMA
// ======================================

render();
