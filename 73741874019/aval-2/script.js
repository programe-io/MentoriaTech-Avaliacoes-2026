
/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* CONFIGURAÇÕES GERAIS */
body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f1f4f9;
    color: #333;
}

/* CABEÇALHO */
.cabecalho {
    background: #263b80;
    color: white;
    padding: 30px 20px;
    text-align: center;
}

.cabecalho h1 {
    margin-bottom: 10px;
    font-size: 28px;
}

.cabecalho p {
    color: #dce3ff;
}

/* CONTAINER */
.container {
    width: 90%;
    max-width: 1100px;
    margin: 30px auto;
}

/* RESUMO */
.resumo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 25px;
}

.card-resumo {
    background: white;
    padding: 25px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.06);
}

.card-resumo span {
    color: #777;
    font-size: 14px;
}

.card-resumo h2 {
    font-size: 30px;
    color: #263b80;
    margin-top: 10px;
}

/* CARTÕES */
.card {
    background: white;
    padding: 25px;
    margin-bottom: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.06);
}

.card h2 {
    color: #263b80;
    margin-bottom: 20px;
}

/* FORMULÁRIO */
.campo {
    margin-bottom: 18px;
}

.campo label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.campo input,
.campo select,
.topo-lista input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
}

.campo input:focus,
.campo select:focus,
.topo-lista input:focus {
    outline: none;
    border-color: #263b80;
}

/* BOTÕES */
button {
    border: none;
    padding: 11px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s;
}

button:hover {
    opacity: 0.85;
}

#btnSalvar {
    background: #263b80;
    color: white;
}

.btn-cancelar {
    background: #777;
    color: white;
    margin-left: 5px;
}

.botoes-formulario {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

/* TOPO DA LISTA */
.topo-lista {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.topo-lista h2 {
    margin: 0;
}

.topo-lista input {
    max-width: 300px;
}

/* FILTROS */
.filtros {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.filtro {
    background: #e6eaf5;
    color: #263b80;
}

.filtro.ativo {
    background: #263b80;
    color: white;
}

/* TAREFAS */
.lista-tarefas {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.tarefa {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 17px;
    border: 1px solid #e1e4ec;
    border-radius: 8px;
    background: #fff;
}

.tarefa-info {
    flex: 1;
    min-width: 0;
}

.tarefa-info h3 {
    margin-bottom: 8px;
    overflow-wrap: anywhere;
}

.tarefa-info p {
    color: #777;
    font-size: 13px;
    margin-top: 5px;
}

/* TAREFA CONCLUÍDA */
.tarefa.concluida {
    background: #f0faf3;
}

.tarefa.concluida h3 {
    text-decoration: line-through;
    color: #888;
}

/* PRIORIDADES */
.prioridade {
    display: inline-block;
    padding: 5px 9px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
}

.baixa {
    background: #d9f5df;
    color: #24783a;
}

.media {
    background: #fff0c2;
    color: #8a6500;
}

.alta {
    background: #ffdddd;
    color: #b52a2a;
}

/* AÇÕES */
.acoes {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.btn-concluir {
    background: #218838;
    color: white;
}

.btn-editar {
    background: #e0a800;
    color: #222;
}

.btn-excluir {
    background: #dc3545;
    color: white;
}

/* LISTA VAZIA */
.vazio {
    text-align: center;
    color: #888;
    padding: 30px 10px;
}

/* RODAPÉ */
footer {
    text-align: center;
    padding: 25px;
    background: #263b80;
    color: white;
    margin-top: 40px;
}

/* RESPONSIVIDADE */
@media (max-width: 700px) {

    .resumo {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .topo-lista {
        flex-direction: column;
        align-items: stretch;
    }

    .topo-lista input {
        max-width: 100%;
    }

    .tarefa {
        flex-direction: column;
        align-items: stretch;
    }

    .acoes {
        width: 100%;
    }

    .acoes button {
        flex: 1;
    }

    .cabecalho h1 {
        font-size: 23px;
    }

    .card {
        padding: 18px;
    }
}
