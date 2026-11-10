* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    color: #333;
}

.container {
    width: 90%;
    max-width: 850px;
    margin: 40px auto;
}

header {
    background-color: #2563eb;
    color: white;
    text-align: center;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 25px;
}

header h1 {
    margin-bottom: 10px;
}

.formulario,
.lista {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 25px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

h2 {
    margin-bottom: 20px;
    color: #2563eb;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-weight: bold;
}

input,
select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
}

button {
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #2563eb;
    color: white;
    font-size: 15px;
    cursor: pointer;
    margin-top: 8px;
}

button:hover {
    opacity: 0.85;
}

.tarefa {
    background-color: #f8fafc;
    border-left: 5px solid #2563eb;
    padding: 18px;
    border-radius: 8px;
    margin-bottom: 15px;
}

.tarefa h3 {
    color: #2563eb;
    margin-bottom: 10px;
}

.tarefa p {
    margin-bottom: 7px;
}

.acoes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
}

.acoes select {
    flex: 1;
    min-width: 100px;
}

.acoes button {
    margin-top: 0;
}

.botao-alterar {
    background-color: #f59e0b;
}

.botao-concluir {
    background-color: #16a34a;
}

.sucesso {
    color: #15803d;
    background-color: #dcfce7;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 15px;
}

.erro {
    color: #b91c1c;
    background-color: #fee2e2;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 15px;
}

@media (max-width: 600px) {
    .container {
        width: 95%;
        margin: 20px auto;
    }

    .acoes {
        flex-direction: column;
    }

    .acoes button,
    .acoes select {
        width: 100%;
    }
}