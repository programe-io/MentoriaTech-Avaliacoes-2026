let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

let pessoas = [
    { id: gerarCodigo(), nome: "Maria Silva", idade: 30, altura: 1.65, peso: 60 },
    { id: gerarCodigo(), nome: "Joao Souza", idade: 45, altura: 1.80, peso: 95 },
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

 
    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

   
    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade + " anos"));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 2)));


    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    return tr;
}

/* Funções de Negócio */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
    if (imc < 25)   return { texto: "Peso normal", classe: "normal" };
    if (imc < 30)   return { texto: "Sobrepeso", classe: "sobrepeso" };
    if (imc < 35)   return { texto: "Obesidade grau I", classe: "obesidade" };
    if (imc < 40)   return { texto: "Obesidade grau II", classe: "obesidade" };
    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

/* Fim das Funções de Negócio */

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
