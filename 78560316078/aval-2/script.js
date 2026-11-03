
let animais = JSON.parse(localStorage.getItem("animais")) || [];
let registros = JSON.parse(localStorage.getItem("registros")) || [];

const formAnimal = document.getElementById("formAnimal");
const listaAnimais = document.getElementById("listaAnimais");
const busca = document.getElementById("busca");

function salvar() {
    localStorage.setItem("animais", JSON.stringify(animais));
    localStorage.setItem("registros", JSON.stringify(registros));
}

function atualizar() {
    document.getElementById("total").textContent = animais.length;

    document.getElementById("especies").textContent =
        new Set(animais.map(a => a.especie)).size;

    document.getElementById("alimentacoes").textContent =
        registros.length;

    mostrarAnimais();
    atualizarSelect();
    mostrarAlimentacao();
}

formAnimal.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const especie = document.getElementById("especie").value;
    const idade = document.getElementById("idade").value;

    animais.push({
        id: Date.now(),
        nome: nome,
        especie: especie,
        idade: idade
    });

    salvar();
    atualizar();
    formAnimal.reset();

    alert("Animal cadastrado com sucesso! 🐄");
});

function mostrarAnimais() {
    listaAnimais.innerHTML = "";

    const pesquisa = busca.value.toLowerCase();

    const encontrados = animais.filter(a =>
        a.nome.toLowerCase().includes(pesquisa) ||
        a.especie.toLowerCase().includes(pesquisa)
    );

    if (encontrados.length === 0) {
        listaAnimais.innerHTML = "<p>Nenhum animal encontrado.</p>";
    }

    encontrados.forEach(animal => {
        const div = document.createElement("div");
        div.className = "animal";

        const info = document.createElement("span");
        info.textContent =
            `🐾 ${animal.nome} | ${animal.especie} | ${animal.idade} anos`;

        const botao = document.createElement("button");
        botao.textContent = "Excluir";

        botao.addEventListener("click", function() {
            if (confirm("Deseja excluir este animal?")) {
                animais = animais.filter(a => a.id !== animal.id);

                registros = registros.filter(
                    r => r.animalId !== animal.id
                );

                salvar();
                atualizar();
            }
        });

        div.appendChild(info);
        div.appendChild(botao);
        listaAnimais.appendChild(div);
    });
}

busca.addEventListener("input", mostrarAnimais);

function atualizarSelect() {
    const select = document.getElementById("animalAlimentado");

    select.innerHTML = '<option value="">Selecione o animal</option>';

    animais.forEach(animal => {
        const opcao = document.createElement("option");
        opcao.value = animal.id;
        opcao.textContent = animal.nome;
        select.appendChild(opcao);
    });
}

document.getElementById("formAlimentacao")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const animalId = Number(
        document.getElementById("animalAlimentado").value
    );

    const comida = document.getElementById("comida").value;

    const animal = animais.find(a => a.id === animalId);

    if (!animal) return;

    registros.push({
        animalId: animalId,
        nome: animal.nome,
        comida: comida,
        data: new Date().toLocaleDateString("pt-BR")
    });

    salvar();
    atualizar();

    this.reset();

    alert("Alimentação registrada! 🍃");
});

function mostrarAlimentacao() {
    const lista = document.getElementById("listaAlimentacao");

    lista.innerHTML = "";

    registros.slice().reverse().forEach(registro => {
        const div = document.createElement("div");
        div.className = "registro";

        const texto = document.createElement("p");
        texto.textContent =
            `🐄 ${registro.nome} recebeu ${registro.comida} - ${registro.data}`;

        div.appendChild(texto);
        lista.appendChild(div);
    });
}

atualizar();
