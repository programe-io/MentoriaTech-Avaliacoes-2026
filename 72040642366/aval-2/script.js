```javascript
// ========================================
// JAVASCRIPT - PROJETO COMPLETO
// ========================================


// ========================================
// 1. VARIÁVEIS
// ========================================

let nome = "João";
let idade = 16;
let estudante = true;

const cidade = "Teresina";

console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Cidade:", cidade);
console.log("É estudante?", estudante);


// ========================================
// 2. FUNÇÕES
// ========================================

function apresentar(nome, idade) {
    return `Olá, ${nome}! Você tem ${idade} anos.`;
}

console.log(apresentar(nome, idade));


// ========================================
// 3. FUNÇÃO DE SOMA
// ========================================

function somar(a, b) {
    return a + b;
}

let resultado = somar(10, 20);

console.log("Resultado:", resultado);


// ========================================
// 4. FUNÇÃO DE SUBTRAÇÃO
// ========================================

function subtrair(a, b) {
    return a - b;
}

console.log("Subtração:", subtrair(50, 20));


// ========================================
// 5. FUNÇÃO DE MULTIPLICAÇÃO
// ========================================

function multiplicar(a, b) {
    return a * b;
}

console.log("Multiplicação:", multiplicar(5, 10));


// ========================================
// 6. FUNÇÃO DE DIVISÃO
// ========================================

function dividir(a, b) {

    if (b === 0) {
        return "Não é possível dividir por zero.";
    }

    return a / b;
}

console.log("Divisão:", dividir(100, 5));


// ========================================
// 7. IF / ELSE
// ========================================

if (idade >= 18) {

    console.log("Você é maior de idade.");

} else {

    console.log("Você é menor de idade.");

}


// ========================================
// 8. SWITCH
// ========================================

let dia = 3;

switch (dia) {

    case 1:
        console.log("Domingo");
        break;

    case 2:
        console.log("Segunda-feira");
        break;

    case 3:
        console.log("Terça-feira");
        break;

    case 4:
        console.log("Quarta-feira");
        break;

    case 5:
        console.log("Quinta-feira");
        break;

    case 6:
        console.log("Sexta-feira");
        break;

    case 7:
        console.log("Sábado");
        break;

    default:
        console.log("Dia inválido.");
}


// ========================================
// 9. LOOP FOR
// ========================================

for (let i = 1; i <= 10; i++) {

    console.log("Número:", i);

}


// ========================================
// 10. LOOP WHILE
// ========================================

let contador = 1;

while (contador <= 5) {

    console.log("Contador:", contador);

    contador++;

}


// ========================================
// 11. ARRAYS
// ========================================

let frutas = [
    "Maçã",
    "Banana",
    "Laranja",
    "Uva",
    "Manga"
];

console.log(frutas);

console.log("Primeira fruta:", frutas[0]);
console.log("Quantidade:", frutas.length);


// ========================================
// 12. ADICIONAR ELEMENTO
// ========================================

frutas.push("Abacaxi");

console.log(frutas);


// ========================================
// 13. REMOVER ELEMENTO
// ========================================

frutas.pop();

console.log(frutas);


// ========================================
// 14. PERCORRER ARRAY
// ========================================

frutas.forEach(function(fruta) {

    console.log("Fruta:", fruta);

});


// ========================================
// 15. OBJETO
// ========================================

const usuario = {

    nome: "João",

    idade: 16,

    cidade: "Teresina",

    estudante: true

};

console.log(usuario.nome);
console.log(usuario.idade);
console.log(usuario.cidade);


// ========================================
// 16. FUNÇÃO DENTRO DE OBJETO
// ========================================

const pessoa = {

    nome: "Maria",

    falar: function() {

        console.log("Olá! Meu nome é " + this.nome);

    }

};

pessoa.falar();


// ========================================
// 17. MANIPULAÇÃO DO HTML
// ========================================

const titulo = document.querySelector("h1");

if (titulo) {

    titulo.textContent = "Meu site com JavaScript";

}


// ========================================
// 18. ALTERAR CSS
// ========================================

if (titulo) {

    titulo.style.fontSize = "40px";
    titulo.style.textAlign = "center";

}


// ========================================
// 19. BOTÃO
// ========================================

const botao = document.querySelector("#botao");

if (botao) {

    botao.addEventListener("click", function() {

        alert("Você clicou no botão!");

    });

}


// ========================================
// 20. CONTADOR
// ========================================

let numero = 0;

const contadorElemento =
    document.querySelector("#contador");

const botaoMais =
    document.querySelector("#mais");

const botaoMenos =
    document.querySelector("#menos");


if (botaoMais) {

    botaoMais.addEventListener("click", function() {

        numero++;

        if (contadorElemento) {
            contadorElemento.textContent = numero;
        }

    });

}


if (botaoMenos) {

    botaoMenos.addEventListener("click", function() {

        numero--;

        if (contadorElemento) {
            contadorElemento.textContent = numero;
        }

    });

}


// ========================================
// 21. RESETAR CONTADOR
// ========================================

const botaoReset =
    document.querySelector("#reset");

if (botaoReset) {

    botaoReset.addEventListener("click", function() {

        numero = 0;

        if (contadorElemento) {
            contadorElemento.textContent = numero;
        }

    });

}


// ========================================
// 22. MODO ESCURO
// ========================================

const botaoTema =
    document.querySelector("#tema");

if (botaoTema) {

    botaoTema.addEventListener("click", function() {

        document.body.classList.toggle("dark");

    });

}


// ========================================
// 23. RELÓGIO
// ========================================

function atualizarRelogio() {

    const agora = new Date();

    const horas =
        String(agora.getHours()).padStart(2, "0");

    const minutos =
        String(agora.getMinutes()).padStart(2, "0");

    const segundos =
        String(agora.getSeconds()).padStart(2, "0");

    const relogio =
        document.querySelector("#relogio");

    if (relogio) {

        relogio.textContent =
            `${horas}:${minutos}:${segundos}`;

    }

}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();


// ========================================
// 24. LISTA DE TAREFAS
// ========================================

const inputTarefa =
    document.querySelector("#tarefa");

const botaoTarefa =
    document.querySelector("#adicionar");

const listaTarefas =
    document.querySelector("#lista");


if (botaoTarefa) {

    botaoTarefa.addEventListener("click", function() {

        const texto = inputTarefa.value.trim();

        if (texto === "") {

            alert("Digite uma tarefa.");

            return;

        }

        const item =
            document.createElement("li");

        item.textContent = texto;

        item.addEventListener("click", function() {

            item.classList.toggle("concluida");

        });

        listaTarefas.appendChild(item);

        inputTarefa.value = "";

    });

}


// ========================================
// 25. VALIDAÇÃO DE FORMULÁRIO
// ========================================

const formulario =
    document.querySelector("#formulario");


if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome =
            document.querySelector("#nome").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        if (nome === "") {

            alert("Digite seu nome.");

            return;

        }

        if (email === "") {

            alert("Digite seu e-mail.");

            return;

        }

        alert(
            `Formulário enviado! Obrigado, ${nome}.`
        );

        formulario.reset();

    });

}


// ========================================
// 26. RANDOM - NÚMERO ALEATÓRIO
// ========================================

function numeroAleatorio(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

console.log(
    "Número aleatório:",
    numeroAleatorio(1, 100)
);


// ========================================
// 27. VERIFICAR NÚMERO PAR OU ÍMPAR
// ========================================

function verificarNumero(numero) {

    if (numero % 2 === 0) {

        return "Número par.";

    } else {

        return "Número ímpar.";

    }

}

console.log(verificarNumero(10));
console.log(verificarNumero(7));


// ========================================
// 28. CALCULAR MÉDIA
// ========================================

function calcularMedia(n1, n2, n3) {

    const media = (n1 + n2 + n3) / 3;

    return media;

}

const media =
    calcularMedia(8, 7, 9);

console.log("Média:", media);


// ========================================
// 29. SITUAÇÃO DO ALUNO
// ========================================

function verificarNota(nota) {

    if (nota >= 7) {

        return "Aprovado";

    } else if (nota >= 5) {

        return "Recuperação";

    } else {

        return "Reprovado";

    }

}

console.log(
    "Situação:",
    verificarNota(8)
);


// ========================================
// 30. DATA ATUAL
// ========================================

const dataAtual = new Date();

console.log("Data:", dataAtual);


// ========================================
// 31. LOCAL STORAGE
// ========================================

localStorage.setItem(
    "nomeUsuario",
    "João"
);

const nomeSalvo =
    localStorage.getItem("nomeUsuario");

console.log(
    "Nome salvo:",
    nomeSalvo
);


// ========================================
// 32. REMOVER DADOS
// ========================================

// localStorage.removeItem("nomeUsuario");


// ========================================
// 33. CONSOLE
// ========================================

console.log("JavaScript funcionando!");
console.warn("Mensagem de aviso.");
console.error("Exemplo de mensagem de erro.");


// =====================
```
