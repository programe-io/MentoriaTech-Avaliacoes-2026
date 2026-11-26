
/* CONFIGURAÇÕES GERAIS */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #f1f4f8;
    color: #333;
}

.container {
    width: 90%;
    max-width: 1150px;
    margin: 35px auto;
}

/* CABEÇALHO */

header {
    margin-bottom: 30px;
}

header h1 {
    font-size: 30px;
    color: #17365d;
    margin-bottom: 8px;
}

header p {
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
    border-left: 5px solid #2584c7;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.card h3 {
    font-size: 14px;
    color: #777;
    margin-bottom: 15px;
}

.card p {
    font-size: 26px;
    font-weight: bold;
    color: #17365d;
}

/* FORMULÁRIO */

.form-section,
.historico,
.resultado {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

h2 {
    color: #17365d;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
}

.form-group label {
    font-size: 14px;
    font-weight: bold;
}

input {
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    width: 100%;
}

input:focus {
    border-color: #2584c7;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

/* BOTÕES */

button {
    background: #2584c7;
    color: white;
    border: none;
    padding: 13px 22px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

button:hover {
    background: #17649d;
}

/* RESULTADO */

.resultado-box {
    background: #edf5fc;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
}

.resultado-box h3 {
    font-size: 45px;
    color: #17365d;
    margin: 15px 0;
}

.resultado-box span {
    display: inline-block;
    padding: 9px 18px;
    border-radius: 20px;
    font-weight: bold;
    background: #dceaf7;
    color: #17365d;
    margin-bottom: 15px;
}

.resultado-box p {
    color: #555;
}

/* HISTÓRICO */

.historico-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.historico-header input {
    max-width: 300px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
}

th {
    background: #edf2f8;
    color: #17365d;
}

tr:hover {
    background: #f8faff;
}

/* BOTÃO EXCLUIR */

.btn-excluir {
    background: #d64545;
    padding: 8px 12px;
}

.btn-excluir:hover {
    background: #a92e2e;
}

/* CLASSIFICAÇÕES */

.abaixo {
    color: #2874c7;
    font-weight: bold;
}

.normal {
    color: #269b59;
    font-weight: bold;
}

.sobrepeso {
    color: #d58b18;
    font-weight: bold;
}

.obesidade {
    color: #d64545;
    font-weight: bold;
}

/* OUTROS */

.hidden {
    display: none !important;
}

.mensagem-vazia {
    text-align: center;
    padding: 25px;
    color: #999;
}

footer {
    text-align: center;
    padding: 25px;
    color: #888;
    font-size: 13px;
    line-height: 1.8;
}

/* RESPONSIVIDADE */

@media (max-width: 750px) {

    .cards {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .historico-header {
        flex-direction: column;
        align-items: stretch;
    }

    .historico-header input {
        max-width: 100%;
    }

    header h1 {
        font-size: 24px;
    }

}
