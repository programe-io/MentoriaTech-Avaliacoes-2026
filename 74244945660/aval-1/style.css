
/* CONFIGURAÇÕES GERAIS */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #f2f4f8;
    color: #333;
}

.container {
    width: 90%;
    max-width: 1100px;
    margin: 40px auto;
}

/* CABEÇALHO */

.header {
    margin-bottom: 30px;
}

.header h1 {
    color: #172b4d;
    font-size: 30px;
    margin-bottom: 8px;
}

.header p {
    color: #777;
}

/* CARDS */

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
    border-left: 5px solid #2874c7;
}

.card h3 {
    font-size: 15px;
    color: #777;
    margin-bottom: 12px;
}

.card p {
    font-size: 30px;
    font-weight: bold;
    color: #172b4d;
}

/* FORMULÁRIO */

.form-section,
.tasks-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.form-section h2,
.tasks-section h2 {
    margin-bottom: 20px;
    color: #172b4d;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
}

.form-group label {
    font-weight: bold;
    font-size: 14px;
}

input,
textarea,
select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
}

input:focus,
textarea:focus,
select:focus {
    border-color: #2874c7;
}

textarea {
    resize: vertical;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

/* BOTÕES */

button {
    border: none;
    background: #2874c7;
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

button:hover {
    background: #1c5797;
}

.btn-cancelar {
    background: #777;
    margin-left: 8px;
}

.btn-cancelar:hover {
    background: #555;
}

.hidden {
    display: none !important;
}

/* CABEÇALHO DA LISTA */

.tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.tasks-header h2 {
    margin-bottom: 0;
}

.tasks-header input {
    max-width: 300px;
}

/* FILTROS */

.filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.filtro {
    background: #e8edf4;
    color: #444;
}

.filtro:hover,
.filtro.active {
    background: #2874c7;
    color: white;
}

/* LISTA DE TAREFAS */

.lista-tarefas {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.tarefa {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    border: 1px solid #eee;
    padding: 18px;
    border-radius: 8px;
    transition: 0.3s;
}

.tarefa:hover {
    background: #f8faff;
}

.tarefa.concluida {
    opacity: 0.65;
}

.tarefa.concluida .tarefa-titulo {
    text-decoration: line-through;
}

.tarefa-info {
    flex: 1;
    min-width: 0;
}

.tarefa-titulo {
    font-size: 17px;
    font-weight: bold;
    color: #172b4d;
    margin-bottom: 8px;
    overflow-wrap: anywhere;
}

.tarefa-descricao {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.tarefa-detalhes {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 12px;
}

/* PRIORIDADES */

.prioridade {
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: bold;
}

.baixa {
    background: #d8f5df;
    color: #22753b;
}

.media {
    background: #fff0c9;
    color: #946400;
}

.alta {
    background: #ffdddd;
    color: #b32626;
}

.prazo-vencido {
    color: #c62828;
    font-weight: bold;
}

/* AÇÕES */

.acoes {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.btn-concluir {
    background: #269b59;
}

.btn-editar {
    background: #e69b25;
}

.btn-excluir {
    background: #d64545;
}

.btn-concluir:hover {
    background: #197a43;
}

.btn-editar:hover {
    background: #bd7a12;
}

.btn-excluir:hover {
    background: #a92e2e;
}

/* MENSAGEM VAZIA */

.mensagem-vazia {
    text-align: center;
    padding: 30px;
    color: #999;
}

/* RESPONSIVIDADE */

@media (max-width: 700px) {

    .container {
        width: 94%;
        margin: 20px auto;
    }

    .cards {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .tasks-header {
        flex-direction: column;
        align-items: stretch;
    }

    .tasks-header input {
        max-width: 100%;
    }

    .tarefa {
        flex-direction: column;
        align-items: stretch;
    }

    .acoes button {
        flex: 1;
    }

    .header h1 {
        font-size: 24px;
    }
}
