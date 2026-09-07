// =====================================
// SISTEMA DE CADASTRO DE ALUNOS
// =====================================


// Lista onde os alunos serão armazenados

let alunos = [];


// =====================================
// FUNÇÃO PARA CADASTRAR ALUNO
// =====================================

function cadastrarAluno() {


    // Pegando os valores dos campos

    let nome = document.getElementById("nome").value;

    let turma = document.getElementById("turma").value;

    let idade = document.getElementById("idade").value;


    // Verificando se os campos estão vazios

    if (nome === "" || turma === "" || idade === "") {

        alert("⚠️ Preencha todos os campos!");

        return;

    }


    // Criando o objeto aluno

    let aluno = {

        nome: nome,

        turma: turma,

        idade: idade

    };


    // Adicionando o aluno à lista

    alunos.push(aluno);


    // Limpando os campos

    document.getElementById("nome").value = "";

    document.getElementById("turma").value = "";

    document.getElementById("idade").value = "";


    // Atualizando a lista

    atualizarLista();


    // Mensagem de sucesso

    alert("✅ Aluno cadastrado com sucesso!");

}


// =====================================
// FUNÇÃO PARA ATUALIZAR A LISTA
// =====================================

function atualizarLista() {


    let lista = document.getElementById("listaAlunos");


    // Limpando a lista

    lista.innerHTML = "";


    // Verificando se existem alunos

    if (alunos.length === 0) {

        lista.innerHTML = `

            <p class="mensagem">

                Nenhum aluno cadastrado ainda.

            </p>

        `;

    }


    // Percorrendo todos os alunos

    alunos.forEach(function(aluno, index) {


        lista.innerHTML += `

            <div class="aluno">

                <div class="dados-aluno">

                    <strong>👤 ${aluno.nome}</strong>

                    <br>

                    📚 Turma: ${aluno.turma}

                    <br>

                    🎂 Idade: ${aluno.idade} anos

                </div>


                <button 
                    class="excluir"
                    onclick="excluirAluno(${index})"
                >

                    🗑️ Excluir

                </button>

            </div>

        `;

    });


    // Atualizando o total de alunos

    document.getElementById("total").innerText = alunos.length;

}


// =====================================
// FUNÇÃO PARA EXCLUIR ALUNO
// =====================================

function excluirAluno(index) {


    let confirmar = confirm(
        "Deseja realmente excluir este aluno?"
    );


    if (confirmar) {


        // Remove o aluno da lista

        alunos.splice(index, 1);


        // Atualiza a tela

        atualizarLista();


        alert("🗑️ Aluno excluído com sucesso!");

    }

}