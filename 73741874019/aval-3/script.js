
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f0f4f8;
    color: #333;
}

header {
    background: linear-gradient(135deg, #075985, #0e7490);
    color: white;
    text-align: center;
    padding: 35px 15px;
}

header h1 {
    margin-bottom: 10px;
    font-size: 30px;
}

.container {
    max-width: 1000px;
    margin: 30px auto;
    padding: 15px;
}

.card {
    background: white;
    padding: 25px;
    margin-bottom: 22px;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0,0,0,0.07);
}

.card h2 {
    color: #075985;
    font-size: 20px;
    margin-bottom: 22px;
    border-bottom: 2px solid #e0f2fe;
    padding-bottom: 12px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
}

.campo {
    display: flex;
    flex-direction: column;
}

label {
    display: block;
    font-weight: bold;
    margin: 15px 0 8px;
    font-size: 14px;
}

input, select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 7px;
    font-size: 14px;
    outline: none;
    background: #fff;
    font-family: Arial, sans-serif;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #0284c7;
    box-shadow: 0 0 0 2px #e0f2fe;
}

textarea {
    resize: vertical;
}

.botoes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin: 25px 0;
}

button {
    border: none;
    padding: 14px 22px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: white;
    transition: 0.3s;
}

button:hover {
    opacity: 0.85;
    transform: translateY(-2px);
}

.salvar {
    background: #16a34a;
}

.imprimir {
    background: #0284c7;
}

.limpar {
    background: #dc2626;
}

footer {
    background: #075985;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
}

@media (max-width: 650px) {
    .grid {
        grid-template-columns: 1fr;
    }

    header h1 {
        font-size: 24px;
    }

    .card {
        padding: 18px;
    }

    .botoes {
        flex-direction: column;
    }

    button {
        width: 100%;
    }
}

@media print {
    body {
        background: white;
    }

    header, footer, .botoes {
        display: none;
    }

    .container {
        margin: 0;
        max-width: 100%;
    }

    .card {
        box-shadow: none;
        border: 1px solid #ddd;
        break-inside: avoid;
    }

    input, textarea, select {
        border: 1px solid #aaa;
    }
}
