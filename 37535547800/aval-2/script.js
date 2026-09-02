let tarefas = [
    {
        codigo: 1,
        titulo: "Estudar HTML",
        prioridade: 1,
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Revisar JavaScript",
        prioridade: 2,
        concluida: true
    },
    {
        codigo: 3,
        titulo: "Organizar tarefas",
        prioridade: 3,
        concluida: false
    }
];


function listarTarefas() {

    let lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";


    if (tarefas.length == 0) {

        lista.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;

    }


    for (let i = 0; i < tarefas.length; i++) {

        let tarefa = tarefas[i];


        let div =
            document.createElement("div");

        div.className = "tarefa";


        if (tarefa.concluida == true) {

            div.classList.add("concluida");

        }


        let titulo =
            document.createElement("h3");

        titulo.textContent =
            tarefa.titulo;


        let codigo =
            document.createElement("p");

        codigo.innerHTML =
            "<strong>Código:</strong> " +
            tarefa.codigo;


        let prioridade =
            document.createElement("p");

        prioridade.innerHTML =
            "<strong>Prioridade:</strong> " +
            tarefa.prioridade;


        let status =
            document.createElement("p");

        if (tarefa.concluida == true) {

            status.innerHTML =
                "<strong>Status:</strong> Concluída";

        } else {

            status.innerHTML =
                "<strong>Status:</strong> Pendente";

        }


        let botao =
            document.createElement("button");

        botao.textContent =
            "Marcar como concluída";


        botao.onclick = function() {

            concluirTarefa(tarefa.codigo);

        };


        div.appendChild(titulo);

        div.appendChild(codigo);

        div.appendChild(prioridade);

        div.appendChild(status);


        if (tarefa.concluida == false) {

            div.appendChild(botao);

        }


        lista.appendChild(div);

    }

}


function cadastrarTarefa(event) {

    event.preventDefault();


    let codigo =
        Number(document.getElementById("codigo").value);


    let titulo =
        document.getElementById("titulo").value.trim();


    let prioridade =
        Number(document.getElementById("prioridade").value);


    /*
    Regra:
    O título precisa ter no mínimo 5 caracteres.
    */

    if (titulo.length < 5) {

        alert(
            "O título deve ter no mínimo 5 caracteres."
        );

        return;

    }


    /*
    Regra:
    A prioridade precisa ser 1, 2 ou 3.
    */

    if (prioridade < 1 || prioridade > 3) {

        alert(
            "A prioridade deve ser um valor entre 1 e 3."
        );

        return;

    }


    /*
    Verifica se o código já existe.
    */

    let codigoExiste = false;


    for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].codigo == codigo) {

            codigoExiste = true;

        }

    }


    if (codigoExiste == true) {

        alert(
            "Esse código já está cadastrado."
        );

        return;

    }


    /*
    Cria uma nova tarefa.
    */

    let tarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    /*
    Adiciona a tarefa ao array.
    */

    tarefas.push(tarefa);


    alert(
        "Tarefa cadastrada com sucesso!"
    );


    /*
    Limpa os campos do formulário.
    */

    document
        .getElementById("formTarefa")
        .reset();


    /*
    Atualiza a lista.
    */

    listarTarefas();

}


function concluirTarefa(codigo) {

    for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].codigo == codigo) {

            tarefas[i].concluida = true;

        }

    }


    listarTarefas();

}


function alterarPrioridade() {

    let codigo =
        Number(
            document.getElementById("codigoAlterar").value
        );


    let novaPrioridade =
        Number(
            document.getElementById("novaPrioridade").value
        );


    /*
    Verifica se a nova prioridade
    está entre 1 e 3.
    */

    if (novaPrioridade < 1 || novaPrioridade > 3) {

        alert(
            "A prioridade deve ser um valor entre 1 e 3."
        );

        return;

    }


    let encontrada = false;


    for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].codigo == codigo) {

            tarefas[i].prioridade =
                novaPrioridade;

            encontrada = true;

        }

    }


    if (encontrada == true) {

        alert(
            "Prioridade alterada com sucesso!"
        );


        document
            .getElementById("codigoAlterar")
            .value = "";


        document
            .getElementById("novaPrioridade")
            .value = "";


        listarTarefas();

    } else {

        alert(
            "Tarefa não encontrada."
        );

    }

}


/*
Quando o formulário for enviado,
a função cadastrarTarefa será executada.
*/

document
    .getElementById("formTarefa")
    .addEventListener(
        "submit",
        cadastrarTarefa
    );


/*
Mostra as tarefas quando a página abre.
*/

listarTarefas();