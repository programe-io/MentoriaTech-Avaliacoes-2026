const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");

const botaoAdicionar = document.getElementById("btnAdicionar");
const tabela = document.getElementById("tabela");


// Quando clicar no botão
botaoAdicionar.addEventListener("click", adicionarPessoa);


// Também permite apertar Enter
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});


function adicionarPessoa() {

    // Pega os valores dos campos
    const nomePessoa = nome.value.trim();
    const pesoPessoa = Number(peso.value);
    const alturaPessoa = Number(altura.value);


    // Verifica se os campos foram preenchidos
    if (nomePessoa === "") {
        alert("Digite o nome.");
        nome.focus();
        return;
    }

    if (pesoPessoa <= 0 || isNaN(pesoPessoa)) {
        alert("Digite um peso válido.");
        peso.focus();
        return;
    }

    if (alturaPessoa <= 0 || isNaN(alturaPessoa)) {
        alert("Digite uma altura válida.");
        altura.focus();
        return;
    }


    // Calcula o IMC
    const imc = pesoPessoa / (alturaPessoa * alturaPessoa);


    // Descobre a situação
    let situacao;
    let classe;


    if (imc < 18.5) {

        situacao = "Baixo peso";
        classe = "baixo-peso";

    } else if (imc < 25) {

        situacao = "Normal";
        classe = "normal";

    } else if (imc < 30) {

        situacao = "Sobrepeso";
        classe = "sobrepeso";

    } else {

        situacao = "Obesidade";
        classe = "obesidade";

    }


    // Remove a mensagem inicial
    const mensagem = document.getElementById("mensagem");

    if (mensagem) {
        mensagem.remove();
    }


    // Cria uma nova linha
    const linha = document.createElement("tr");


    linha.innerHTML = `
        <td>${nomePessoa}</td>

        <td>${pesoPessoa.toFixed(1)} kg</td>

        <td>${alturaPessoa.toFixed(2)} m</td>

        <td>${imc.toFixed(1)}</td>

        <td>
            <span class="status ${classe}">
                ${situacao}
            </span>
        </td>

        <td>
            <button class="btn-excluir">
                Excluir
            </button>
        </td>
    `;


    // Adiciona a linha na tabela
    tabela.appendChild(linha);


    // Botão excluir
    const botaoExcluir = linha.querySelector(".btn-excluir");

    botaoExcluir.addEventListener("click", function() {

        linha.remove();

        verificarTabela();

    });


    // Limpa os campos
    nome.value = "";
    peso.value = "";
    altura.value = "";

    nome.focus();
}


// Verifica se a tabela está vazia
function verificarTabela() {

    const linhas = tabela.querySelectorAll("tr");

    if (linhas.length === 0) {

        tabela.innerHTML = `
            <tr id="mensagem">
                <td colspan="6">
                    Nenhuma pessoa cadastrada.
                </td>
            </tr>
        `;

    }

}