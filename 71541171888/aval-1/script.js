let alunos = [];

function cadastrarAluno() {

    let nome = document.getElementById("nomeAluno").value.trim();

    if(nome === ""){
        alert("Digite um nome.");
        return;
    }

    alunos.push({
        nome: nome,
        resolvidas: 0
    });

    document.getElementById("nomeAluno").value = "";

    atualizarTela();
}

function resolverQuestao() {

    let indice = document.getElementById("alunoSelecionado").value;

    if(indice === ""){
        alert("Selecione um aluno.");
        return;
    }

    alunos[indice].resolvidas++;

    atualizarTela();
}

function atualizarTela() {

    let lista = document.getElementById("listaAlunos");
    let select = document.getElementById("alunoSelecionado");

    lista.innerHTML = "";
    select.innerHTML = "";

    alunos.forEach((aluno, index) => {

        lista.innerHTML += `
            <li>
                ${aluno.nome} - ${aluno.resolvidas} questões
            </li>
        `;

        select.innerHTML += `
            <option value="${index}">
                ${aluno.nome}
            </option>
        `;
    });

    atualizarRanking();
}

function atualizarRanking() {

    let ranking = [...alunos];

    ranking.sort((a, b) => b.resolvidas - a.resolvidas);

    let tabela = document.getElementById("rankingBody");

    tabela.innerHTML = "";

    ranking.forEach((aluno, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.resolvidas}</td>
            </tr>
        `;
    });

    document.getElementById("primeiroLugar").innerHTML =
        ranking[0]
        ? `🥇<br>${ranking[0].nome}<br>${ranking[0].resolvidas} questões`
        : "1º Lugar";

    document.getElementById("segundoLugar").innerHTML =
        ranking[1]
        ? `🥈<br>${ranking[1].nome}<br>${ranking[1].resolvidas} questões`
        : "2º Lugar";

    document.getElementById("terceiroLugar").innerHTML =
        ranking[2]
        ? `🥉<br>${ranking[2].nome}<br>${ranking[2].resolvidas} questões`
        : "3º Lugar";
}