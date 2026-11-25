const form = document.getElementById("form-pessoa");
const tabela = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");
const cancelar = document.getElementById("btn-cancelar");
const titulo = document.getElementById("titulo-form");

let pessoas = [];
let editando = null;

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificar(imc) {
    if (imc < 18.5) return ["Abaixo do peso", "abaixo"];
    if (imc < 25) return ["Normal", "normal"];
    if (imc < 30) return ["Sobrepeso", "sobrepeso"];
    return ["Obesidade", "obesidade"];
}

function mostrarPessoas() {
    tabela.innerHTML = "";

    if (pessoas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhuma pessoa cadastrada.
                </td>
            </tr>`;
        return;
    }

    pessoas.forEach((pessoa, index) => {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const [classificacao, classe] = classificar(imc);

        tabela.innerHTML += `
            <tr class="${editando === index ? "em-edicao" : ""}">
                <td>${pessoa.nome}</td>
                <td>${pessoa.idade}</td>
                <td>${pessoa.altura.toFixed(2)} m</td>
                <td>${pessoa.peso.toFixed(1)} kg</td>
                <td>${imc.toFixed(2)}</td>
                <td><span class="selo ${classe}">${classificacao}</span></td>
                <td class="acoes">
                    <button onclick="editarPessoa(${index})">Editar</button>
                    <button class="remover" onclick="removerPessoa(${index})">Excluir</button>
                </td>
            </tr>`;
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("input-nome").value.trim();
    const idade = Number(document.getElementById("input-idade").value);
    const altura = Number(document.getElementById("input-altura").value);
    const peso = Number(document.getElementById("input-peso").value);

    if (!nome || !idade || !altura || !peso ||
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 2 || peso > 500) {

        erro.textContent = "Preencha todos os campos corretamente.";
        erro.hidden = false;
        return;
    }

    erro.hidden = true;

    const pessoa = { nome, idade, altura, peso };

    if (editando === null) {
        pessoas.push(pessoa);
    } else {
        pessoas[editando] = pessoa;
    }

    form.reset();
    editando = null;
    titulo.textContent = "Nova pessoa";
    cancelar.hidden = true;

    mostrarPessoas();
});

function editarPessoa(index) {
    const pessoa = pessoas[index];

    document.getElementById("input-nome").value = pessoa.nome;
    document.getElementById("input-idade").value = pessoa.idade;
    document.getElementById("input-altura").value = pessoa.altura;
    document.getElementById("input-peso").value = pessoa.peso;

    editando = index;
    titulo.textContent = "Editar pessoa";
    cancelar.hidden = false;

    mostrarPessoas();
}

function removerPessoa(index) {
    pessoas.splice(index, 1);

    if (editando === index) {
        cancelarEdicao();
    } else if (editando !== null && editando > index) {
        editando--;
    }

    mostrarPessoas();
}

function cancelarEdicao() {
    form.reset();
    editando = null;
    titulo.textContent = "Nova pessoa";
    cancelar.hidden = true;
    erro.hidden = true;
    mostrarPessoas();
}

cancelar.addEventListener("click", cancelarEdicao);

mostrarPessoas();