
// ARRAY PRINCIPAL
let alunos = [
    {
        id: 1,
        nome: "Ana Silva",
        idade: 20,
        curso: "Informática"
    },
    {
        id: 2,
        nome: "Pedro Santos",
        idade: 22,
        curso: "Programação"
    },
    {
        id: 3,
        nome: "Carlos Souza",
        idade: 19,
        curso: "Administração"
    }
];

// CONTROLE DE EDIÇÃO
let idEditando = null;


// FUNÇÃO RENDER
function render() {

    const lista = document.getElementById("listaAlunos");
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    // LIMPAR CONTAINER
    lista.innerHTML = "";

    // FILTRAR ALUNOS
    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(pesquisa) ||
        aluno.curso.toLowerCase().includes(pesquisa)
    );

    // VERIFICAR SE EXISTEM ALUNOS
    if (alunosFiltrados.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                Nenhum aluno encontrado.
            </div>
        `;

    } else {

        // PERCORRER ARRAY
        alunosFiltrados.forEach(aluno => {

            lista.innerHTML += `
                <div class="aluno">

                    <div class="aluno-info">

                        <h3>${aluno.nome}</h3>

                        <p>Idade: ${aluno.idade} anos</p>

                        <p>Curso: ${aluno.curso}</p>

                    </div>

                    <div class="acoes">

                        <button
                            class="editar"
                            onclick="editarAluno(${aluno.id})">
                            Editar
                        </button>

                        <button
                            class="excluir"
                            onclick="excluirAluno(${aluno.id})">
                            Excluir
                        </button>

                    </div>

                </div>
            `;

        });

    }

    // ATUALIZAR CONTADORES
    document.getElementById("totalAlunos").textContent =
        alunos.length;

    document.getElementById("totalCadastrados").textContent =
        alunosFiltrados.length;

}


// ADICIONAR ALUNO
function adicionarAluno() {

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const curso = document.getElementById("curso").value.trim();

    // VALIDAR CAMPOS
    if (nome === "" || idade <= 0 || curso === "") {

        alert("Preencha todos os campos corretamente!");
        return;

    }

    if (idEditando !== null) {

        // MODIFICAR ALUNO EXISTENTE
        alunos = alunos.map(aluno => {

            if (aluno.id === idEditando) {

                return {
                    ...aluno,
                    nome: nome,
                    idade: idade,
                    curso: curso
                };

            }

            return aluno;

        });

        idEditando = null;

        document.getElementById("btnSalvar").textContent =
            "Adicionar aluno";

    } else {

        // INSERIR NOVO ALUNO
        const novoAluno = {
            id: Date.now(),
            nome: nome,
            idade: idade,
            curso: curso
        };

        alunos.push(novoAluno);

    }

    // LIMPAR CAMPOS
    limparCampos();

    // ATUALIZAR TELA
    render();

}


// EXCLUIR ALUNO
function excluirAluno(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este aluno?"
    );

    if (!confirmar) return;

    alunos = alunos.filter(aluno => aluno.id !== id);

    render();

}


// EDITAR ALUNO
function editarAluno(id) {

    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) return;

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;

    idEditando = id;

    document.getElementById("btnSalvar").textContent =
        "Salvar alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";

}


// RENDERIZAÇÃO INICIAL
render();
