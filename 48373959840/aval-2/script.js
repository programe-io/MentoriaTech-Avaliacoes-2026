
"use strict";

/* ==================================================
   1. VARIÁVEIS E CONSTANTES
================================================== */

let nome = "João";
let idade = 15;
let ativo = true;

const PI = 3.14159;
const curso = "JavaScript";

var variavelAntiga = "Evite var em código novo";

console.log(nome, idade, ativo, PI, curso);


/* ==================================================
   2. TIPOS DE DADOS
================================================== */

const texto = "Olá, mundo!";
const numero = 100;
const decimal = 10.5;
const booleano = true;
const indefinido = undefined;
const vazio = null;
const simbolo = Symbol("id");
const numeroGrande = 12345678901234567890n;

console.log(typeof texto);
console.log(typeof numero);
console.log(typeof booleano);
console.log(typeof indefinido);
console.log(typeof vazio); // "object", comportamento histórico

const lista = [1, 2, 3];
const objeto = { nome: "Maria" };

console.log(Array.isArray(lista));


/* ==================================================
   3. OPERADORES ARITMÉTICOS
================================================== */

let a = 10;
let b = 3;

console.log(a + b);  // Soma
console.log(a - b);  // Subtração
console.log(a * b);  // Multiplicação
console.log(a / b);  // Divisão
console.log(a % b);  // Resto
console.log(a ** b); // Potência

a++;
b--;

console.log(a, b);


/* ==================================================
   4. OPERADORES DE COMPARAÇÃO
================================================== */

console.log(10 > 5);
console.log(10 < 5);
console.log(10 >= 10);
console.log(5 <= 8);

console.log(10 === 10);  // Igualdade estrita
console.log(10 !== "10"); // Diferença estrita

console.log(true && true);   // E
console.log(true || false);  // OU
console.log(!true);          // NÃO

const resultado = idade >= 18 ? "Adulto" : "Menor de idade";
console.log(resultado);

const valorPadrao = null ?? "Valor padrão";
console.log(valorPadrao);


/* ==================================================
   5. CONDIÇÕES
================================================== */

function verificarNota(nota) {
    if (nota >= 7) {
        return "Aprovado";
    } else if (nota >= 5) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

console.log(verificarNota(8));

function verificarDia(dia) {
    switch (dia) {
        case 1:
            return "Domingo";
        case 2:
            return "Segunda-feira";
        case 3:
            return "Terça-feira";
        default:
            return "Outro dia";
    }
}

console.log(verificarDia(2));


/* ==================================================
   6. LAÇOS DE REPETIÇÃO
================================================== */

// FOR
for (let i = 0; i < 5; i++) {
    console.log("FOR:", i);
}

// WHILE
let contador = 0;

while (contador < 3) {
    console.log("WHILE:", contador);
    contador++;
}

// DO WHILE
let numeroTeste = 0;

do {
    console.log("DO WHILE:", numeroTeste);
    numeroTeste++;
} while (numeroTeste < 2);

// FOR OF: valores de um iterável
for (const fruta of ["Maçã", "Uva", "Banana"]) {
    console.log(fruta);
}

// FOR IN: chaves de um objeto
const pessoa = { nome: "Ana", idade: 16 };

for (const chave in pessoa) {
    console.log(chave, pessoa[chave]);
}

// BREAK E CONTINUE
for (let i = 0; i < 10; i++) {
    if (i === 3) continue;
    if (i === 7) break;
    console.log(i);
}


/* ==================================================
   7. FUNÇÕES
================================================== */

// Declaração de função
function somar(x, y) {
    return x + y;
}

console.log(somar(5, 3));

// Expressão de função
const multiplicar = function(x, y) {
    return x * y;
};

console.log(multiplicar(4, 2));

// Arrow function
const dividir = (x, y) => {
    if (y === 0) throw new Error("Divisão por zero");
    return x / y;
};

console.log(dividir(10, 2));

// Parâmetro padrão
function saudar(pessoaNome = "Visitante") {
    return `Olá, ${pessoaNome}!`;
}

console.log(saudar());

// REST: quantidade variável de argumentos
function somarTodos(...valores) {
    return valores.reduce((total, valor) => total + valor, 0);
}

console.log(somarTodos(1, 2, 3, 4));

// CALLBACK
function executar(funcao) {
    return funcao();
}

console.log(executar(() => "Executado!"));


/* ==================================================
   8. STRINGS E TEXTOS
================================================== */

const mensagem = "Aprender JavaScript é útil";

console.log(mensagem.length);
console.log(mensagem.toUpperCase());
console.log(mensagem.toLowerCase());
console.log(mensagem.includes("JavaScript"));
console.log(mensagem.startsWith("Aprender"));
console.log(mensagem.endsWith("útil"));
console.log(mensagem.indexOf("JavaScript"));
console.log(mensagem.slice(0, 8));
console.log(mensagem.replace("útil", "interessante"));
console.log("  texto  ".trim());
console.log("a,b,c".split(","));
console.log("Java".concat("Script"));

const usuario = "Maria";
console.log(`Olá, ${usuario}!`);

console.log("Olá\nMundo");
console.log("Texto".repeat(3));


/* ==================================================
   9. NÚMEROS E MATEMÁTICA
================================================== */

console.log(Number("123"));
console.log(Number.isNaN(NaN));
console.log(Number.isInteger(10));
console.log(Number.parseInt("42px", 10));
console.log(Number.parseFloat("3.14"));
console.log((3.14159).toFixed(2));

console.log(Math.round(4.6));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.abs(-10));
console.log(Math.max(1, 8, 3));
console.log(Math.min(1, 8, 3));
console.log(Math.sqrt(25));
console.log(Math.pow(2, 3));
console.log(Math.random());

// Número aleatório inteiro entre min e max
function aleatorioInteiro(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(aleatorioInteiro(1, 10));


/* ==================================================
   10. ARRAYS
================================================== */

const frutas = ["Maçã", "Banana", "Uva"];

console.log(frutas[0]);
console.log(frutas.length);

frutas.push("Laranja");  // Adiciona ao final
frutas.pop();            // Remove do final
frutas.unshift("Pera");  // Adiciona no início
frutas.shift();          // Remove do início

console.log(frutas.includes("Uva"));
console.log(frutas.indexOf("Banana"));

frutas.forEach(fruta => console.log(fruta));

const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const encontrado = numeros.find(n => n > 3);
const indice = numeros.findIndex(n => n === 3);
const soma = numeros.reduce((total, n) => total + n, 0);
const existePar = numeros.some(n => n % 2 === 0);
const todosPositivos = numeros.every(n => n > 0);

console.log(dobrados, pares, encontrado, indice);
console.log(soma, existePar, todosPositivos);

console.log([...numeros].sort((x, y) => y - x));
console.log([...numeros].reverse());
console.log(numeros.slice(1, 3));

const copia = [...numeros];
const combinacao = [...numeros, ...[6, 7]];

console.log(copia, combinacao);

const matriz = [
    [1, 2],
    [3, 4]
];

console.log(matriz[0][1]);
console.log(matriz.flat());

const semDuplicados = [...new Set([1, 1, 2, 3, 3])];
console.log(semDuplicados);


/* ==================================================
   11. OBJETOS
================================================== */

const aluno = {
    nome: "Carlos",
    idade: 16,
    curso: "Informática",

    apresentar() {
        return `Sou ${this.nome} e estudo ${this.curso}.`;
    }
};

console.log(aluno.nome);
console.log(aluno["idade"]);
console.log(aluno.apresentar());

aluno.nota = 9;
aluno.idade = 17;
delete aluno.nota;

console.log(Object.keys(aluno));
console.log(Object.values(aluno));
console.log(Object.entries(aluno));

const copiaAluno = { ...aluno, cidade: "Piripiri" };
console.log(copiaAluno);

const { nome: nomeAluno, curso: cursoAluno } = aluno;
console.log(nomeAluno, cursoAluno);

const { nome: nomeParametro } = aluno;
console.log(nomeParametro);


/* ==================================================
   12. SPREAD E DESESTRUTURAÇÃO
================================================== */

const primeiro = [1, 2];
const segundo = [3, 4];

console.log([...primeiro, ...segundo]);

const configuracao = {
    tema: "claro",
    idioma: "pt-BR"
};

const novaConfiguracao = {
    ...configuracao,
    tema: "escuro"
};

console.log(novaConfiguracao);

const [primeiroValor, segundoValor] = [10, 20];
console.log(primeiroValor, segundoValor);

function mostrarDados({ nome, idade }) {
    console.log(nome, idade);
}

mostrarDados({ nome: "Ana", idade: 15 });


/* ==================================================
   13. MAP E SET
================================================== */

const mapa = new Map();

mapa.set("nome", "João");
mapa.set("idade", 15);

console.log(mapa.get("nome"));
console.log(mapa.has("idade"));
console.log(mapa.size);

mapa.delete("idade");

const conjunto = new Set([1, 2, 2, 3]);

conjunto.add(4);

console.log(conjunto.has(3));
console.log([...conjunto]);

conjunto.delete(1);


/* ==================================================
   14. DATAS E HORÁRIOS
================================================== */

const agora = new Date();

console.log(agora);
console.log(agora.getFullYear());
console.log(agora.getMonth() + 1);
console.log(agora.getDate());
console.log(agora.getDay());
console.log(agora.getHours());
console.log(agora.getMinutes());
console.log(agora.getSeconds());
console.log(agora.toISOString());

const dataEspecifica = new Date("2026-10-22T12:00:00");
console.log(dataEspecifica);

const dataFormatada = new Intl.DateTimeFormat("pt-BR").format(agora);
console.log(dataFormatada);

const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format(1500);

console.log(moeda);


/* ==================================================
   15. TRATAMENTO DE ERROS
================================================== */

try {
    const resultadoErro = dividir(10, 0);
    console.log(resultadoErro);
} catch (erro) {
    console.error("Erro:", erro.message);
} finally {
    console.log("Operação finalizada.");
}

function validarIdade(valor) {
    if (valor < 0) {
        throw new Error("A idade não pode ser negativa.");
    }

    return true;
}


/* ==================================================
   16. CLASSES E OBJETOS
================================================== */

class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Meu nome é ${this.nome}.`;
    }
}

const pessoa1 = new Pessoa("João", 15);
console.log(pessoa1.apresentar());

class Estudante extends Pessoa {
    constructor(nome, idade, curso) {
        super(nome, idade);
        this.curso = curso;
    }

    estudar() {
        return `${this.nome} está estudando ${this.curso}.`;
    }
}

const estudante1 = new Estudante("Maria", 16, "Programação");
console.log(estudante1.estudar());

class Contador {
    #valor = 0;

    incrementar() {
        this.#valor++;
        return this.#valor;
    }
}

const contadorPrivado = new Contador();
console.log(contadorPrivado.incrementar());


/* ==================================================
   17. HERANÇA E POLIMORFISMO
================================================== */

class Animal {
    falar() {
        return "Som de animal";
    }
}

class Cachorro extends Animal {
    falar() {
        return "Au au!";
    }
}

class Gato extends Animal {
    falar() {
        return "Miau!";
    }
}

const animais = [new Cachorro(), new Gato()];

animais.forEach(animal => {
    console.log(animal.falar());
});


/* ==================================================
   18. DOM: SELECIONAR ELEMENTOS HTML
================================================== */

function exemplosDOM() {
    const porId = document.getElementById("titulo");
    const primeiroParagrafo = document.querySelector("p");
    const botoes = document.querySelectorAll("button");
    const caixas = document.getElementsByClassName("card");
    const paragrafos = document.getElementsByTagName("p");

    console.log(porId);
    console.log(primeiroParagrafo);
    console.log(botoes.length);
    console.log(caixas.length);
    console.log(paragrafos.length);
}


/* ==================================================
   19. DOM: ALTERAR CONTEÚDO E ESTILOS
================================================== */

function alterarElemento(elemento) {
    if (!elemento) return;

    elemento.textContent = "Novo texto";
    elemento.style.color = "blue";
    elemento.style.backgroundColor = "#dbeafe";

    elemento.classList.add("ativo");
    elemento.classList.remove("inativo");
    elemento.classList.toggle("destaque");

    console.log(elemento.classList.contains("ativo"));
}

function criarParagrafo() {
    const paragrafo = document.createElement("p");

    paragrafo.textContent = "Parágrafo criado com JavaScript.";
    document.body.appendChild(paragrafo);

    return paragrafo;
}

function removerElemento(elemento) {
    elemento?.remove();
}

function adicionarClasse(elemento, classe) {
    elemento?.classList.add(classe);
}


/* ==================================================
   20. EVENTOS JAVASCRIPT
================================================== */

function configurarEventos() {
    const botao = document.getElementById("meubotao");
    const mensagem = document.getElementById("mensagem");
    const caixa = document.getElementById("caixa");
    const campo = document.getElementById("campo");

    // Clique
    botao?.addEventListener("click", () => {
        if (mensagem) {
            mensagem.textContent = "Você clicou no botão!";
        }
    });

    // Mouse sobre o elemento
    caixa?.addEventListener("mouseover", () => {
        caixa.style.backgroundColor = "lightblue";
    });

    caixa?.addEventListener("mouseout", () => {
        caixa.style.backgroundColor = "";
    });

    // Teclado
    campo?.addEventListener("keydown", event => {
        console.log("Tecla:", event.key);
    });

    // Mudança de valor
    campo?.addEventListener("change", event => {
        console.log("Novo valor:", event.target.value);
    });

    // Digitação
    campo?.addEventListener("input", event => {
        console.log("Digitando:", event.target.value);
    });

    // Foco
    campo?.addEventListener("focus", () => {
        console.log("Campo selecionado");
    });

    campo?.addEventListener("blur", () => {
        console.log("Campo perdeu o foco");
    });

    // Duplo clique
    botao?.addEventListener("dblclick", () => {
        console.log("Duplo clique");
    });
}


/* ==================================================
   21. FORMULÁRIOS E VALIDAÇÃO
================================================== */

function configurarFormulario() {
    const formulario = document.getElementById("formulario");
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const resultado = document.getElementById("resultado");

    formulario?.addEventListener("submit", event => {
        event.preventDefault();

        const nome = campoNome?.value.trim() ?? "";
        const email = campoEmail?.value.trim() ?? "";

        if (nome.length < 2) {
            if (campoNome) {
                campoNome.setCustomValidity("Digite um nome válido.");
                campoNome.reportValidity();
                campoNome.setCustomValidity("");
            }
            return;
        }

        if (!email || !campoEmail?.validity.valid) {
            campoEmail?.reportValidity();
            return;
        }

        if (resultado) {
            resultado.textContent = `Formulário preenchido por ${nome}.`;
        }
    });
}


/* ==================================================
   22. CRIAR E MANIPULAR ELEMENTOS
================================================== */

function criarLista(itens) {
    const lista = document.createElement("ul");

    itens.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });

    return lista;
}

function criarBotao(texto, aoClicar) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", aoClicar);

    return botao;
}

function clonarModelo() {
    const modelo = document.getElementById("modelo");

    if (!modelo) return null;

    const copia = modelo.content.cloneNode(true);
    document.body.appendChild(copia);

    return true;
}


/* ==================================================
   23. TEMPORIZADORES
================================================== */

// Executa uma vez após um intervalo
function executarDepois() {
    setTimeout(() => {
        console.log("Passaram dois segundos.");
    }, 2000);
}

// Executa repetidamente
function executarRepetidamente() {
    let contador = 0;

    const identificador = setInterval(() => {
        contador++;
        console.log(contador);

        if (contador >= 5) {
            clearInterval(identificador);
        }
    }, 1000);
}


/* ==================================================
   24. PROMISES
================================================== */

function buscarDadoSimulado() {
    return new Promise((resolve, reject) => {
        const sucesso = true;

        if (sucesso) {
            resolve("Dados recebidos.");
        } else {
            reject(new Error("Não foi possível receber os dados."));
        }
    });
}

buscarDadoSimulado()
    .then(dado => console.log(dado))
    .catch(erro => console.error(erro.message))
    .finally(() => console.log("Promise finalizada."));


/* ==================================================
   25. ASYNC E AWAIT
================================================== */

async function executarAsync() {
    try {
        const resultadoAsync = await buscarDadoSimulado();
        console.log(resultadoAsync);
    } catch (erro) {
        console.error(erro.message);
    }
}


/* ==================================================
   26. FETCH E API
================================================== */

// Exemplo: consultar uma API pública
async function buscarUsuarios() {
    try {
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const usuarios = await resposta.json();

        console.log(usuarios);
        return usuarios;
    } catch (erro) {
        console.error("Erro ao consultar API:", erro.message);
        return [];
    }
}

// Exemplo de envio JSON
async function enviarDados(url, dados) {
    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        return await resposta.json();
    } catch (erro) {
        console.error(erro.message);
        throw erro;
    }
}


/* ==================================================
   27. JSON
================================================== */

const objetoJSON = {
    nome: "João",
    idade: 15,
    tecnologias: ["HTML", "CSS", "JavaScript"]
};

const textoJSON = JSON.stringify(objetoJSON);
console.log(textoJSON);

const objetoConvertido = JSON.parse(textoJSON);
console.log(objetoConvertido.nome);


/* ==================================================
   28. ARMAZENAMENTO LOCAL
================================================== */

// localStorage persiste os dados no navegador.
function salvarLocal(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function lerLocal(chave) {
    const valor = localStorage.getItem(chave);

    if (valor === null) return null;

    try {
        return JSON.parse(valor);
    } catch {
        return null;
    }
}

function removerLocal(chave) {
    localStorage.removeItem(chave);
}

// sessionStorage dura durante a sessão da aba.
function salvarSessao(chave, valor) {
    sessionStorage.setItem(chave, valor);
}


/* ==================================================
   29. EXPRESSÕES REGULARES
================================================== */

const somenteNumeros = /^\d+$/;
const formatoData = /^\d{4}-\d{2}-\d{2}$/;

console.log(somenteNumeros.test("12345"));
console.log(formatoData.test("2026-10-22"));

const frase = "HTML, CSS, JavaScript";
console.log(frase.match(/\w+/g));
console.log(frase.replace(/CSS/, "Python"));


/* ==================================================
   30. ITERADORES E GERADORES
================================================== */

function* gerarNumeros() {
    yield 1;
    yield 2;
    yield 3;
}

for (const numeroGerado of gerarNumeros()) {
    console.log(numeroGerado);
}

const iteravel = {
    inicio: 1,
    fim: 3,

    *[Symbol.iterator]() {
        for (let i = this.inicio; i <= this.fim; i++) {
            yield i;
        }
    }
};

console.log([...iteravel]);


/* ==================================================
   31. RECURSÃO
================================================== */

function fatorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Informe um inteiro não negativo.");
    }

    if (n <= 1) return 1;

    return n * fatorial(n - 1);
}

console.log(fatorial(5));


/* ==================================================
   32. SET, MAP E OPERAÇÕES
================================================== */

const conjuntoA = new Set([1, 2, 3]);
const conjuntoB = new Set([3, 4, 5]);

const uniao = new Set([...conjuntoA, ...conjuntoB]);

const intersecao = new Set(
    [...conjuntoA].filter(x => conjuntoB.has(x))
);

const diferenca = new Set(
    [...conjuntoA].filter(x => !conjuntoB.has(x))
);

console.log([...uniao]);
console.log([...intersecao]);
console.log([...diferenca]);


/* ==================================================
   33. MÓDULOS JAVASCRIPT
================================================== */

// Em um arquivo módulo, por exemplo calculos.js:
// export const somar = (a, b) => a + b;
// export default function saudar() {
//     return "Olá!";
// }

// Em outro arquivo módulo:
// import saudar, { somar } from "./calculos.js";
// console.log(somar(2, 3));
// console.log(saudar());

// No HTML, carregue módulos com:
// <script type="module" src="script.js"></script>


/* ==================================================
   34. WEB STORAGE E JSON: EXEMPLO PRÁTICO
================================================== */

function salvarPreferencias(tema) {
    try {
        localStorage.setItem("preferencias", JSON.stringify({ tema }));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar:", erro.message);
        return false;
    }
}

function carregarPreferencias() {
    try {
        const dados = localStorage.getItem("preferencias");
        return dados ? JSON.parse(dados) : { tema: "claro" };
    } catch {
        return { tema: "claro" };
    }
}


/* ==================================================
   35. SCROLL E JANELA
================================================== */

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function irParaElemento(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function obterDimensoesJanela() {
    return {
        largura: window.innerWidth,
        altura: window.innerHeight
    };
}


/* ==================================================
   36. CLIPBOARD
================================================== */

async function copiarTexto(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        return true;
    } catch (erro) {
        console.error("Falha ao copiar:", erro.message);
        return false;
    }
}


/* ==================================================
   37. EVENTOS DE JANELA
================================================== */

window.addEventListener("resize", () => {
    console.log("Dimensões atualizadas:", obterDimensoesJanela());
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML carregado e analisado.");
});


/* ==================================================
   38. CANVAS: DESENHO
================================================== */

function desenharCanvas() {
    const canvas = document.getElementById("meuCanvas");

    if (!canvas) return;

    const contexto = canvas.getContext("2d");

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    contexto.fillStyle = "#2563eb";
    contexto.fillRect(10, 10, 100, 50);

    contexto.beginPath();
    contexto.arc(150, 35, 20, 0, Math.PI * 2);
    contexto.fillStyle = "#dc2626";
    contexto.fill();
}


/* ==================================================
   39. ACESSIBILIDADE E INTERAÇÃO
================================================== */

function alternarVisibilidade(id) {
    const elemento = document.getElementById(id);

    if (!elemento) return;

    const oculto = elemento.hidden;
    elemento.hidden = !oculto;
}

function atualizarTexto(id, texto) {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = texto;
    }
}


/* ==================================================
   40. UTILITÁRIOS
================================================== */

const utilitarios = {
    somar: (a, b) => a + b,
    subtrair: (a, b) => a - b,
    multiplicar: (a, b) => a * b,

    media(valores) {
        if (valores.length === 0) return 0;

        return valores.reduce((soma, n) => soma + n, 0)
            / valores.length;
    },

    inverter(texto) {
        return [...texto].reverse().join("");
    },

    capitalizar(texto) {
        if (!texto) return "";

        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }
};

console.log(utilitarios.somar(2, 3));
console.log(utilitarios.media([7, 8, 9]));
console.log(utilitarios.inverter("JavaScript"));
console.log(utilitarios.capitalizar("programação"));


/* ==================================================
   41. INICIALIZAÇÃO DA PÁGINA
================================================== */

function iniciarAplicacao() {
    configurarEventos();
    configurarFormulario();
    desenharCanvas();

    console.log("Aplicação JavaScript iniciada.");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAplicacao, {
        once: true
    });
} else {
    iniciarAplicacao();
}
