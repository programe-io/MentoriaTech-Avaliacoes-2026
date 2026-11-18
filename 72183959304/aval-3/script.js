let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

let pessoas = [
    { id: gerarCodigo(), nome: "Maria Silva", idade: 30, altura: 1.65, peso: 60 },
    { id: gerarCodigo(), nome: "João Souza", idade: 45, altura: 1.80, peso: 95 }
];

const tabelaPessoas = document.getElementById("tabela-pessoas");

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}
function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(pessoa.altura));
    tr.appendChild(criarCelula(pessoa.peso));

    return tr;
    function calcularImc(peso,altura)
    return peso/(altura*altura)
}
function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(pessoa.altura));
    tr.appendChild(criarCelula(pessoa.peso));

    return tr;
}

function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }

    pessoas.forEach((pessoa) => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }

    pessoas.forEach((pessoa) => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}
render();