
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    color: #1e293b;
}

header {
    background: #172554;
    color: white;
    padding: 30px;
    text-align: center;
}

header h1 {
    margin-bottom: 8px;
}

.container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 20px;
}

.dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 10px #00000010;
}

.card h3 {
    font-size: 15px;
    color: #64748b;
}

.card p {
    font-size: 27px;
    font-weight: bold;
    color: #2563eb;
    margin-top: 12px;
}

.form-section,
.products-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 3px 10px #00000010;
}

h2 {
    margin-bottom: 20px;
}

form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

input {
    width: 100%;
    padding: 13px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 15px;
}

input:focus {
    outline: 2px solid #93c5fd;
    border-color: #2563eb;
}

button {
    border: none;
    padding: 12px 18px;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

button:hover {
    opacity: 0.85;
}

.cancelar {
    background: #64748b;
}

[hidden] {
    display: none !important;
}

#pesquisa {
    margin-bottom: 20px;
    max-width: 400px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
}

th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

th {
    background: #eff6ff;
    color: #1e40af;
}

.acoes {
    display: flex;
    gap: 6px;
}

.btn-editar {
    background: #0891b2;
}

.btn-excluir {
    background: #dc2626;
}

.btn-entrada {
    background: #16a34a;
}

.vazio {
    text-align: center;
    color: #64748b;
    padding: 25px;
}

footer {
    text-align: center;
    padding: 25px;
    color: #64748b;
}

@media (max-width: 768px) {
    .dashboard {
        grid-template-columns: 1fr;
    }

    form {
        grid-template-columns: 1fr;
    }

    .container {
        padding: 12px;
    }

    .form-section,
    .products-section {
        padding: 16px;
    }
}
