
/* ==========================================
   1. VARIÁVEIS
========================================== */

// let: variável que pode mudar
let nome = "João";
let idade = 15;

// const: variável que não pode ser reatribuída
const escola = "Minha Escola";

// var: declaração antiga de variável
var cidade = "Piripiri";

console.log(nome);
console.log(idade);
console.log(escola);
console.log(cidade);

/* ==========================================
   2. TIPOS DE DADOS
========================================== */

let texto = "Olá, mundo!";
let numero = 100;
let decimal = 7.5;
let booleano = true;
let vazio = null;
let indefinido;
let simbolo = Symbol("id");
let numeroGrande = 12345678901234567890n;

console.log(typeof texto);
console.log(typeof numero);
console.log(typeof booleano);
console.log(indefinido);

/* ==========================================
   3. OPERADORES ARITMÉTICOS
========================================== */

let a = 10;
let b = 3;

console.log(a + b); // Adição
console.log(a - b); // Subtração
console.log(a * b); // Multiplicação
console.log(a / b); // Divisão
console.log(a % b); // Resto
console.log(a ** b); // Potência

/* ==========================================
   4. OPERADORES DE COMPARAÇÃO
========================================== */

console.log(10 == "10");  // true
console.log(10 === "10"); // false
console.log(10 != 5);
console.log(10 !== "10");
console.log(10 > 5);
console.log(10 < 5);
console.log(10 >= 10);
console.log(5 <= 10);

/* ==========================================
   5. OPERADORES LÓGICOS
========================================== */

let temIdade = true;
let temAutorizacao = false;

console.log(temIdade && temAutorizacao);
console.log(temIdade || temAutorizacao);
console.log(!temIdade);

/* ==========================================
   6. CONDICIONAIS
========================================== */

// if e else
let nota = 8;

if (nota >= 7) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

// else if
if (nota >= 9) {
    console.log("Excelente");
} else if (nota >= 7) {
    console.log("Bom");
} else {
    console.log("Precisa melhorar");
}

// Operador ternário
let resultado = nota >= 7 ? "Aprovado" : "Reprovado";
console.log(resultado);

// switch
let dia = 2;

switch (dia) {
    case 1:
        console.log("Segunda-feira");
        break;
    case 2:
        console.log("Terça-feira");
        break;
    default:
        console.log("Outro dia");
}

/* ==========================================
   7. LAÇOS DE REPETIÇÃO
========================================== */

// for
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// while
let contador = 1;

while (contador <= 3) {
    console.log(contador);
    contador++;
}

// do...while
let numeroContagem = 1;

do {
    console.log(numeroContagem);
    numeroContagem++;
} while (numeroContagem <= 3);

// for...of: percorre valores
for (const letra of "HTML") {
    console.log(letra);
}

// for...in: percorre chaves de objetos
const pessoa = {
    nome: "Ana",
    idade: 16
};

for (const chave in pessoa) {
    console.log(chave, pessoa[chave]);
}

/* ==========================================
   8. FUNÇÕES
========================================== */

// Função tradicional
function saudacao() {
    return "Olá!";
}

console.log(saudacao());

// Função com parâmetros
function somar(x, y) {
    return x + y;
}

console.log(somar(5, 3));

// Função anônima
const multiplicar = function(x, y) {
    return x * y;
};

console.log(multiplicar(4, 2));

// Arrow function
const subtrair = (x, y) => x - y;

console.log(subtrair(10, 4));

// Parâmetro padrão
function apresentar(nomeUsuario = "Visitante") {
    return `Olá, ${nomeUsuario}!`;
}

console.log(apresentar());

/* ==========================================
   9. ARRAYS
========================================== */

const frutas = ["Maçã", "Banana", "Uva"];

console.log(frutas[0]);
console.log(frutas.length);

frutas.push("Laranja"); // Adiciona no final
frutas.pop();           // Remove do final
frutas.unshift("Pera"); // Adiciona no início
frutas.shift();         // Remove do início

console.log(frutas.includes("Banana"));
console.log(frutas.indexOf("Uva"));

frutas.forEach(function(fruta) {
    console.log(fruta);
});

const frutasMaiusculas = frutas.map(
    fruta => fruta.toUpperCase()
);

const frutasLongas = frutas.filter(
    fruta => fruta.length > 4
);

const totalLetras = frutas.reduce(
    (total, fruta) => total + fruta.length,
    0
);

console.log(frutasMaiusculas);
console.log(frutasLongas);
console.log(totalLetras);

/* ==========================================
   10. OBJETOS
========================================== */

const aluno = {
    nome: "Carlos",
    idade: 15,
    curso: "Programação",

    apresentar() {
        return `Meu nome é ${this.nome}`;
    }
};

console.log(aluno.nome);
console.log(aluno["curso"]);
console.log(aluno.apresentar());

aluno.idade = 16;
aluno.nota = 9;

console.log(Object.keys(aluno));
console.log(Object.values(aluno));
console.log(Object.entries(aluno));

/* ==========================================
   11. STRINGS
========================================== */

let frase = "Aprendendo JavaScript";

console.log(frase.length);
console.log(frase.toUpperCase());
console.log(frase.toLowerCase());
console.log(frase.includes("JavaScript"));
console.log(frase.startsWith("Aprendendo"));
console.log(frase.slice(0, 10));
console.log(frase.replace("JavaScript", "HTML"));
console.log("  Olá  ".trim());

let nomeCompleto = "João" + " " + "Silva";
console.log(nomeCompleto);

// Template literals
console.log(`Olá, ${nome}! Você tem ${idade} anos.`);

/* ==========================================
   12. MATEMÁTICA
========================================== */

console.log(Math.round(4.6));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.abs(-10));
console.log(Math.max(2, 8, 5));
console.log(Math.min(2, 8, 5));
console.log(Math.sqrt(81));
console.log(Math.pow(2, 3));
console.log(Math.random());

// Número aleatório inteiro entre 1 e 10
console.log(Math.floor(Math.random() * 10) + 1);

/* ==========================================
   13. DATAS
========================================== */

const agora = new Date();

console.log(agora);
console.log(agora.getFullYear());
console.log(agora.getMonth() + 1);
console.log(agora.getDate());
console.log(agora.getHours());
console.log(agora.getMinutes());

/* ==========================================
   14. TRATAMENTO DE ERROS
========================================== */

try {
    let resultadoDivisao = 10 / 0;
    console.log(resultadoDivisao);

    // Exemplo de erro:
    // throw new Error("Ocorreu um problema");
} catch (erro) {
    console.log("Erro:", erro.message);
} finally {
    console.log("Execução finalizada.");
}

/* ==========================================
   15. DOM: ACESSAR ELEMENTOS HTML
========================================== */

// Execute após o HTML carregar.
document.addEventListener("DOMContentLoaded", function() {

    const titulo = document.getElementById("titulo");

    const elementos = document.getElementsByClassName("item");

    const paragrafos = document.getElementsByTagName("p");

    const primeiroBotao = document.querySelector("button");

    const todosBotoes = document.querySelectorAll("button");

    console.log(titulo);
    console.log(elementos);
    console.log(paragrafos);
    console.log(primeiroBotao);
    console.log(todosBotoes);

});

/* ==========================================
   16. ALTERAR O HTML PELO JAVASCRIPT
========================================== */

// Exemplo: execute quando o elemento existir.
const exemploTitulo = document.getElementById("titulo");

if (exemploTitulo) {
    exemploTitulo.textContent = "Novo título";
    exemploTitulo.style.color = "blue";
    exemploTitulo.style.fontSize = "30px";
    exemploTitulo.classList.add("destaque");
    exemploTitulo.classList.remove("destaque");
    exemploTitulo.classList.toggle("ativo");
    exemploTitulo.setAttribute("title", "Meu título");
}

/* ==========================================
   17. EVENTOS
========================================== */

// onclick
function clicarBotao() {
    alert("Você clicou no botão!");
}

// addEventListener
const botao = document.getElementById("meubotao");

if (botao) {
    botao.addEventListener("click", function() {
        console.log("Botão clicado!");
    });

    botao.addEventListener("mouseover", function() {
        console.log("Mouse sobre o botão!");
    });

    botao.addEventListener("mouseout", function() {
        console.log("Mouse saiu do botão!");
    });

    botao.addEventListener("keydown", function(evento) {
        console.log("Tecla pressionada:", evento.key);
    });
}

// Outros eventos comuns:
// input, change, submit, focus, blur,
// keydown, keyup, load, resize e scroll.

/* ==========================================
   18. FORMULÁRIOS E VALIDAÇÃO
========================================== */

const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const campoNome = document.getElementById("nome");
        const campoEmail = document.getElementById("email");

        if (!campoNome || !campoEmail) {
            return;
        }

        if (campoNome.value.trim() === "") {
            alert("Digite seu nome.");
            campoNome.focus();
            return;
        }

        if (!campoEmail.checkValidity()) {
            alert("Digite um e-mail válido.");
            campoEmail.focus();
            return;
        }

        alert("Formulário validado!");
    });
}

/* ==========================================
   19. CRIAR E REMOVER ELEMENTOS
========================================== */

const novoParagrafo = document.createElement("p");

novoParagrafo.textContent = "Parágrafo criado com JavaScript.";

const area = document.getElementById("conteudo");

if (area) {
    area.appendChild(novoParagrafo);

    // Para remover:
    // novoParagrafo.remove();
}

/* ==========================================
   20. TEMPORIZADORES
========================================== */

// Executa uma vez após 2 segundos
setTimeout(function() {
    console.log("Executado após 2 segundos.");
}, 2000);

// Executa repetidamente a cada 3 segundos
// Descomente para testar:
// const temporizador = setInterval(function() {
//     console.log("Executando...");
// }, 3000);

// Para interromper:
// clearInterval(temporizador);

/* ==========================================
   21. JSON
========================================== */

const usuario = {
    nome: "Maria",
    idade: 16
};

const usuarioJSON = JSON.stringify(usuario);
console.log(usuarioJSON);

const usuarioObjeto = JSON.parse(usuarioJSON);
console.log(usuarioObjeto.nome);

/* ==========================================
   22. ARMAZENAMENTO LOCAL
========================================== */

// LocalStorage guarda dados no navegador.
localStorage.setItem("nomeUsuario", "Maria");

const nomeSalvo = localStorage.getItem("nomeUsuario");
console.log(nomeSalvo);

// Remover uma informação:
// localStorage.removeItem("nomeUsuario");

// Apagar todos os dados do site:
// localStorage.clear();

// SessionStorage dura apenas durante a sessão da aba.
sessionStorage.setItem("tema", "claro");

/* ==========================================
   23. PROMISES E ASYNC/AWAIT
========================================== */

const promessa = new Promise(function(resolve, reject) {
    const sucesso = true;

    if (sucesso) {
        resolve("Operação concluída!");
    } else {
        reject(new Error("A operação falhou."));
    }
});

promessa
    .then(resultado => console.log(resultado))
    .catch(erro => console.error(erro))
    .finally(() => console.log("Promise finalizada."));

async function executar() {
    try {
        const resultado = await promessa;
        console.log(resultado);
    } catch (erro) {
        console.error(erro);
    }
}

executar();

/* ==========================================
   24. FETCH: BUSCAR DADOS DE UMA API
========================================== */

async function buscarDados() {
    try {
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os dados.");
        }

        const dados = await resposta.json();

        console.log(dados);
    } catch (erro) {
        console.error("Falha:", erro.message);
    }
}

// Para executar a consulta:
// buscarDados();

/* ==========================================
   25. CLASSES E OBJETOS
========================================== */

class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Sou ${this.nome} e tenho ${this.idade} anos.`;
    }
}

const pessoa1 = new Pessoa("Lucas", 15);
console.log(pessoa1.apresentar());

/* ==========================================
   26. DESESTRUTURAÇÃO E SPREAD
========================================== */

const cores = ["azul", "preto", "branco"];

const [primeiraCor, segundaCor] = cores;

console.log(primeiraCor, segundaCor);

const novasCores = [...cores, "roxo"];
console.log(novasCores);

const dadosPessoa = {
    nome: "Ana",
    idade: 17
};

const { nome: nomePessoa, idade: idadePessoa } = dadosPessoa;

console.log(nomePessoa, idadePessoa);

/* ==========================================
   27. OPERADORES MODERNOS
========================================== */

const nomeAlternativo = null;

console.log(nomeAlternativo ?? "Visitante");

const configuracao = {};

console.log(configuracao.usuario?.nome);

/* ==========================================
   28. CONSOLE E DEPURAÇÃO
========================================== */

console.log("Mensagem comum");
console.info("Informação");
console.warn("Aviso");
console.error("Mensagem de erro");
console.table([
    { nome: "Ana", nota: 9 },
    { nome: "João", nota: 8 }
]);

/* ==========================================
   29. EXEMPLO: MUDAR A COR DA PÁGINA
========================================== */

const botaoCor = document.getElementById("botaoCor");

if (botaoCor) {
    botaoCor.addEventListener("click", function() {
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === "lightblue"
                ? "white"
                : "lightblue";
    });
}

/* ==========================================
   30. EXEMPLO: CONTADOR
========================================== */

let contadorCliques = 0;

const botaoContador = document.getElementById("contador");
const textoContador = document.getElementById("valorContador");

if (botaoContador && textoContador) {
    botaoContador.addEventListener("click", function() {
        contadorCliques++;
        textoContador.textContent = contadorCliques;
    });
}
