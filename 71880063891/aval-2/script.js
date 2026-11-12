
/* CONFIGURAÇÕES GERAIS */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #eef2f7;
    color: #333;
    min-height: 100vh;
    padding: 40px 15px;
}

/* CONTAINER PRINCIPAL */

.container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

/* TÍTULO */

h1 {
    text-align: center;
    color: #2563eb;
    margin-bottom: 12px;
}

.descricao {
    text-align: center;
    color: #777;
    margin-bottom: 25px;
}

/* FORMULÁRIO */

#form-tarefa {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

#input-titulo {
    flex: 1;
    min-width: 0;
    padding: 13px;
    border: 1px solid #ccc;
    border-radius: 7px;
    font-size: 15px;
}

#input-titulo:focus {
    outline: none;
    border-color: #2563eb;
}

/* BOTÃO */

button {
    padding: 13px 18px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
}

button:hover {
    background-color: #1d4ed8;
}

/* LISTA */

#lista-tarefas {
    list-style: none;
}

#lista-tarefas li {
    background-color: #f5f7fb;
    padding: 15px;
    margin-bottom: 12px;
    border-left: 4px solid #2563eb;
    border-radius: 6px;
    overflow-wrap: anywhere;
}

/* TAREFAS CONCLUÍDAS */

#lista-tarefas li.concluida {
    text-decoration: line-through;
    color: #888;
    border-left-color: #16a34a;
}

/* RESPONSIVIDADE */

@media (max-width: 480px) {

    .container {
        padding: 20px;
    }

    #form-tarefa {
        flex-direction: column;
    }

    #form-tarefa button {
        width: 100%;
    }

}
