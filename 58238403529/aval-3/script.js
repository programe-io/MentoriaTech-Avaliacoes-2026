/* =========================================
   CONFIGURAÇÃO
========================================= */

let pessoas =
    JSON.parse(
        localStorage.getItem("pessoasIMC")
    ) || [];

let pessoaEditando = null;


/* =========================================
   ELEMENTOS
========================================= */

const form =
    document.getElementById("formPessoa");

const tabela =
    document.getElementById("tabela");

const busca =
    document.getElementById("busca");

const filtro =
    document.getElementById("filtro");

const modal =
    document.getElementById("modal");

const themeBtn =
    document.getElementById("themeBtn");


/* =========================================
   CÁLCULO DO IMC
========================================= */

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


/* =========================================
   CLASSIFICAÇÃO
========================================= */

function obterStatus(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
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


    return {
        texto: "Obesidade",
        classe: "obesidade"
    };

}


/* =========================================
   SALVAR NO LOCALSTORAGE
========================================= */

function salvarDados() {

    localStorage.setItem(
        "pessoasIMC",
        JSON.stringify(pessoas)
    );

}


/* =========================================
   ADICIONAR PESSOA
========================================= */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const peso =
            Number(
                document
                    .getElementById("peso")
                    .value
            );


        const altura =
            Number(
                document
                    .getElementById("altura")
                    .value
            );


        if (!nome) {

            alert("Digite o nome.");

            return;

        }


        if (
            !peso ||
            peso <= 0 ||
            peso > 500
        ) {

            alert("Informe um peso válido.");

            return;

        }


        if (
            !altura ||
            altura < 0.5 ||
            altura > 2.5
        ) {

            alert("Informe uma altura válida.");

            return;

        }


        const novaPessoa = {

            id: Date.now(),

            nome: nome,

            peso: peso,

            altura: altura

        };


        pessoas.push(novaPessoa);

        salvarDados();

        form.reset();

        renderizar();


        document
            .getElementById("nome")
            .focus();

    }
);


/* =========================================
   RENDERIZAR TABELA
========================================= */

function renderizar() {

    tabela.innerHTML = "";


    const termo =
        busca.value
            .toLowerCase()
            .trim();


    const statusFiltro =
        filtro.value;


    const lista =
        pessoas.filter(
            pessoa => {

                const imc =
                    calcularIMC(
                        pessoa.peso,
                        pessoa.altura
                    );


                const status =
                    obterStatus(imc);


                const correspondeNome =
                    pessoa.nome
                        .toLowerCase()
                        .includes(termo);


                const correspondeFiltro =
                    statusFiltro === "todos" ||
                    status.classe === statusFiltro;


                return (
                    correspondeNome &&
                    correspondeFiltro
                );

            }
        );


    if (lista.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="empty"
                >

                    <div class="empty-icon">
                        📭
                    </div>

                    <h3>
                        Nenhum registro encontrado
                    </h3>

                    <p>
                        Adicione uma pessoa ou altere os filtros.
                    </p>

                </td>

            </tr>

        `;

        atualizarEstatisticas();

        return;

    }


    lista.forEach(
        pessoa => {

            const imc =
                calcularIMC(
                    pessoa.peso,
                    pessoa.altura
                );


            const status =
                obterStatus(imc);


            const inicial =
                pessoa.nome
                    .charAt(0)
                    .toUpperCase();


            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>

                    <div class="person">

                        <div class="avatar">
                            ${inicial}
                        </div>

                        <div>

                            <div class="person-name">
                                ${escaparHTML(pessoa.nome)}
                            </div>

                            <div class="person-info">
                                Registro #${pessoa.id}
                            </div>

                        </div>

                    </div>

                </td>


                <td>
                    ${pessoa.peso.toFixed(1)} kg
                </td>


                <td>
                    ${pessoa.altura.toFixed(2)} m
                </td>


                <td>
                    <span class="imc">
                        ${imc.toFixed(2)}
                    </span>
                </td>


                <td>

                    <span
                        class="status ${status.classe}"
                    >
                        ${status.texto}
                    </span>

                </td>


                <td>

                    <div class="actions">

                        <button
                            class="action-btn btn-edit"
                            title="Editar"
                            onclick="editarPessoa(${pessoa.id})"
                        >
                            ✏️
                        </button>


                        <button
                            class="action-btn btn-danger"
                            title="Excluir"
                            onclick="excluirPessoa(${pessoa.id})"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            tabela.appendChild(linha);

        }
    );


    atualizarEstatisticas();

}


/* =========================================
   ESTATÍSTICAS
========================================= */

function atualizarEstatisticas() {

    let normal = 0;
    let sobrepeso = 0;
    let obesidade = 0;


    pessoas.forEach(
        pessoa => {

            const imc =
                calcularIMC(
                    pessoa.peso,
                    pessoa.altura
                );


            const status =
                obterStatus(imc);


            if (status.classe === "normal") {
                normal++;
            }


            if (status.classe === "sobrepeso") {
                sobrepeso++;
            }


            if (status.classe === "obesidade") {
                obesidade++;
            }

        }
    );


    document
        .getElementById("totalPessoas")
        .textContent =
            pessoas.length;


    document
        .getElementById("totalNormal")
        .textContent =
            normal;


    document
        .getElementById("totalSobrepeso")
        .textContent =
            sobrepeso;


    document
        .getElementById("totalObesidade")
        .textContent =
            obesidade;

}


/* =========================================
   EXCLUIR
========================================= */

function excluirPessoa(id) {

    const pessoa =
        pessoas.find(
            p => p.id === id
        );


    if (!pessoa) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja realmente excluir "${pessoa.nome}"?`
        );


    if (!confirmar) {
        return;
    }


    pessoas =
        pessoas.filter(
            p => p.id !== id
        );


    salvarDados();

    renderizar();

}


/* =========================================
   EDITAR
========================================= */

function editarPessoa(id) {

    const pessoa =
        pessoas.find(
            p => p.id === id
        );


    if (!pessoa) {
        return;
    }


    pessoaEditando = id;


    document
        .getElementById("editNome")
        .value =
            pessoa.nome;


    document
        .getElementById("editPeso")
        .value =
            pessoa.peso;


    document
        .getElementById("editAltura")
        .value =
            pessoa.altura;


    modal.classList.add("active");

}


/* =========================================
   SALVAR EDIÇÃO
========================================= */

function salvarEdicao() {

    const nome =
        document
            .getElementById("editNome")
            .value
            .trim();


    const peso =
        Number(
            document
                .getElementById("editPeso")
                .value
        );


    const altura =
        Number(
            document
                .getElementById("editAltura")
                .value
        );


    if (!nome) {

        alert("Digite o nome.");

        return;

    }


    if (
        !peso ||
        peso <= 0 ||
        peso > 500
    ) {

        alert("Informe um peso válido.");

        return;

    }


    if (
        !altura ||
        altura < 0.5 ||
        altura > 2.5
    ) {

        alert("Informe uma altura válida.");

        return;

    }


    const pessoa =
        pessoas.find(
            p => p.id === pessoaEditando
        );


    if (pessoa) {

        pessoa.nome = nome;

        pessoa.peso = peso;

        pessoa.altura = altura;

    }


    salvarDados();

    fecharModal();

    renderizar();

}


/* =========================================
   FECHAR MODAL
========================================= */

function fecharModal() {

    modal.classList.remove("active");

    pessoaEditando = null;

}


/* =========================================
   EVENTOS DO MODAL
========================================= */

document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        fecharModal
    );


document
    .getElementById("cancelModal")
    .addEventListener(
        "click",
        fecharModal
    );


document
    .getElementById("saveEdit")
    .addEventListener(
        "click",
        salvarEdicao
    );


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            fecharModal();

        }

    }
);


/* =========================================
   BUSCA
========================================= */

busca.addEventListener(
    "input",
    renderizar
);


/* =========================================
   FILTRO
========================================= */

filtro.addEventListener(
    "change",
    renderizar
);


/* =========================================
   TEMA
========================================= */

function alternarTema() {

    document
        .body
        .classList
        .toggle("dark");


    const dark =
        document
            .body
            .classList
            .contains("dark");


    localStorage.setItem(
        "temaIMC",
        dark ? "dark" : "light"
    );


    themeBtn.textContent =
        dark ? "☀️" : "🌙";

}


themeBtn.addEventListener(
    "click",
    alternarTema
);


/* =========================================
   CARREGAR TEMA
========================================= */

function carregarTema() {

    const tema =
        localStorage.getItem(
            "temaIMC"
        );


    if (tema === "dark") {

        document
            .body
            .classList
            .add("dark");


        themeBtn.textContent = "☀️";

    }

}


/* =========================================
   ESCAPAR HTML
========================================= */

function escaparHTML(texto) {

    const div =
        document.createElement("div");


    div.textContent = texto;


    return div.innerHTML;

}


/* =========================================
   TECLA ESC PARA FECHAR MODAL
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            fecharModal();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

carregarTema();

renderizar();