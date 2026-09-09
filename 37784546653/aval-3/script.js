// Array para guardar as pessoas
let pessoas = [];


// =================================
// ADICIONAR PESSOA
// =================================

function adicionarPessoa() {

    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const mensagem = document.getElementById("mensagem");


    // Verificar se os campos foram preenchidos

    if (nome.trim() === "") {

        mensagem.textContent = "Digite o nome.";

        return;
    }

    if (isNaN(peso) || peso <= 0) {

        mensagem.textContent = "Digite um peso válido.";

        return;
    }

    if (isNaN(altura) || altura <= 0) {

        mensagem.textContent = "Digite uma altura válida.";

        return;
    }


    // Calcular IMC

    const imc = peso / (altura * altura);


    // Descobrir situação

    let situacao;

    if (imc < 18.5) {

        situacao = "Baixo peso";

    } else if (imc < 25) {

        situacao = "Normal";

    } else {

        situacao = "Sobrepeso";
    }


    // Criar objeto

    const pessoa = {

        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        situacao: situacao
    };


    // Adicionar ao array

    pessoas.push(pessoa);


    // Limpar formulário

    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    mensagem.textContent = "";


    // Atualizar tabela

    mostrarPessoas();
}


// =================================
// MOSTRAR PESSOAS
// =================================

function mostrarPessoas() {

    const tabela = document.getElementById("tabelaPessoas");

    tabela.innerHTML = "";


    pessoas.forEach(function(pessoa, index) {

        let classe = "";

        if (pessoa.situacao === "Normal") {

            classe = "normal";

        } else if (pessoa.situacao === "Sobrepeso") {

            classe = "sobrepeso";

        } else {

            classe = "baixo-peso";
        }


        tabela.innerHTML += `

            <tr>

                <td>${pessoa.nome}</td>

                <td>${pessoa.peso.toFixed(1)} kg</td>

                <td>${pessoa.altura.toFixed(2)} m</td>

                <td>${pessoa.imc.toFixed(1)}</td>

                <td class="${classe}">
                    ${pessoa.situacao}
                </td>

                <td>

                    <button
                        class="excluir"
                        onclick="excluirPessoa(${index})">

                        Excluir

                    </button>

                </td>

            </tr>

        `;
    });
}


// =================================
// EXCLUIR PESSOA
// =================================

function excluirPessoa(index) {

    pessoas.splice(index, 1);

    mostrarPessoas();
}
