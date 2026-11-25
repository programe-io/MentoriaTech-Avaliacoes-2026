// 1. REFERÊNCIAS DO HTML

const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const listaPessoas = document.getElementById("listaPessoas");
const mensagemDeErro = document.getElementById("erro");

// 2. VARIÁVEIS DO SISTEMA

const chavePessoas = "pessoas";

let pessoas = [];
let proximoId = 1;

// 3. FUNÇÃO DE CALCULAR IMC

function calcularIMC(peso, altura) {
return peso / (altura * altura);
}

// 4. FUNÇÃO DE CLASSIFICAR IMC

function classificarIMC(imc) {

if (imc < 18.5) {
    return {
            texto: "Abaixo do peso",
                    classe: "abaixo"
                        };
                        }

                        if (imc < 25) {
                            return {
                                    texto: "Peso normal",
                                            classe: "normal"
                                                };
                                                }

                                                if (imc < 30) {
                                                    return {
                                                            texto: "Sobrepeso",
                                                                    classe: "sobrepeso"
                                                                        };
                                                                        }

                                                                        return {
                                                                            texto: "Obesidade",
                                                                                classe: "obesidade"
                                                                                };

                                                                                }

                                                                                // 5. FUNÇÃO DE FORMATAR VALORES

                                                                                function formatar(valor, casas) {
                                                                                return valor.toFixed(casas);
                                                                                }

                                                                                // 6. FUNÇÃO DE LER FORMULÁRIO

                                                                                function lerFormulario() {

                                                                                return {
                                                                                    nome: inputNome.value.trim(),
                                                                                        idade: Number(inputIdade.value),
                                                                                            altura: Number(inputAltura.value),
                                                                                                peso: Number(inputPeso.value)
                                                                                                };

                                                                                                }

                                                                                                // 7. FUNÇÃO DE VALIDAR DADOS

                                                                                                function validarDados(dados) {

                                                                                                if (dados.nome.length < 2) {
                                                                                                    return "Informe o nome com no mínimo duas letras.";
                                                                                                    }

                                                                                                    if (
                                                                                                        !Number.isInteger(dados.idade) ||
                                                                                                            dados.idade < 1 ||
                                                                                                                dados.idade > 120
                                                                                                                ) {
                                                                                                                    return "A idade deve ser um número inteiro entre 1 e 120.";
                                                                                                                    }

                                                                                                                    if (
                                                                                                                        !Number.isFinite(dados.altura) ||
                                                                                                                            dados.altura < 0.5 ||
                                                                                                                                dados.altura > 2.5
                                                                                                                                ) {
                                                                                                                                    return "A altura deve estar entre 0,5 e 2,5 metros.";
                                                                                                                                    }

                                                                                                                                    if (
                                                                                                                                        !Number.isFinite(dados.peso) ||
                                                                                                                                            dados.peso < 2 ||
                                                                                                                                                dados.peso > 500
                                                                                                                                                ) {
                                                                                                                                                    return "O peso deve estar entre 2 e 500 kg.";
                                                                                                                                                    }

                                                                                                                                                    return "";

                                                                                                                                                    }

                                                                                                                                                    // 8. MOSTRAR MENSAGEM DE ERRO

                                                                                                                                                    function mostrarErro(mensagem) {

                                                                                                                                                    mensagemDeErro.textContent = mensagem;
                                                                                                                                                    mensagemDeErro.hidden = false;

                                                                                                                                                    }

                                                                                                                                                    // 9. LIMPAR MENSAGEM DE ERRO

                                                                                                                                                    function limparErro() {

                                                                                                                                                    mensagemDeErro.textContent = "";
                                                                                                                                                    mensagemDeErro.hidden = true;

                                                                                                                                                    }

                                                                                                                                                    // 10. FUNÇÃO DE ADICIONAR PESSOA

                                                                                                                                                    function adicionarPessoa(dados) {

                                                                                                                                                    const pessoa = {
                                                                                                                                                        id: proximoId++,
                                                                                                                                                            nome: dados.nome,
                                                                                                                                                                idade: dados.idade,
                                                                                                                                                                    altura: dados.altura,
                                                                                                                                                                        peso: dados.peso
                                                                                                                                                                        };

                                                                                                                                                                        pessoas.push(pessoa);

                                                                                                                                                                        }

                                                                                                                                                                        // 11. FUNÇÃO DE CRIAR LINHA

                                                                                                                                                                        function criarLinha(pessoa) {

                                                                                                                                                                        const linha = document.createElement("tr");

                                                                                                                                                                        const imc = calcularIMC(pessoa.peso, pessoa.altura);

                                                                                                                                                                        const classificacao = classificarIMC(imc);

                                                                                                                                                                        // Código
                                                                                                                                                                        const tdId = document.createElement("td");
                                                                                                                                                                        tdId.textContent = pessoa.id;

                                                                                                                                                                        // Nome
                                                                                                                                                                        const tdNome = document.createElement("td");
                                                                                                                                                                        tdNome.textContent = pessoa.nome;

                                                                                                                                                                        // Idade
                                                                                                                                                                        const tdIdade = document.createElement("td");
                                                                                                                                                                        tdIdade.textContent = pessoa.idade;

                                                                                                                                                                        // Altura
                                                                                                                                                                        const tdAltura = document.createElement("td");
                                                                                                                                                                        tdAltura.textContent = formatar(pessoa.altura, 2) + " m";

                                                                                                                                                                        // Peso
                                                                                                                                                                        const tdPeso = document.createElement("td");
                                                                                                                                                                        tdPeso.textContent = formatar(pessoa.peso, 1) + " kg";

                                                                                                                                                                        // IMC
                                                                                                                                                                        const tdIMC = document.createElement("td");
                                                                                                                                                                        tdIMC.textContent = formatar(imc, 1);

                                                                                                                                                                        // Classificação
                                                                                                                                                                        const tdClassificacao = document.createElement("td");

                                                                                                                                                                        const selo = document.createElement("span");

                                                                                                                                                                        selo.classList.add("selo", classificacao.classe);

                                                                                                                                                                        selo.textContent = classificacao.texto;

                                                                                                                                                                        tdClassificacao.appendChild(selo);

                                                                                                                                                                        // Botão excluir
                                                                                                                                                                        const tdAcoes = document.createElement("td");

                                                                                                                                                                        const botaoExcluir = document.createElement("button");

                                                                                                                                                                        botaoExcluir.textContent = "Excluir";
                                                                                                                                                                        botaoExcluir.classList.add("excluir");

                                                                                                                                                                        botaoExcluir.addEventListener("click", function() {
                                                                                                                                                                            excluirPessoa(pessoa.id);
                                                                                                                                                                            });

                                                                                                                                                                            tdAcoes.appendChild(botaoExcluir);

                                                                                                                                                                            // Adicionar colunas na linha
                                                                                                                                                                            linha.appendChild(tdId);
                                                                                                                                                                            linha.appendChild(tdNome);
                                                                                                                                                                            linha.appendChild(tdIdade);
                                                                                                                                                                            linha.appendChild(tdAltura);
                                                                                                                                                                            linha.appendChild(tdPeso);
                                                                                                                                                                            linha.appendChild(tdIMC);
                                                                                                                                                                            linha.appendChild(tdClassificacao);
                                                                                                                                                                            linha.appendChild(tdAcoes);

                                                                                                                                                                            return linha;

                                                                                                                                                                            }

                                                                                                                                                                            // 12. FUNÇÃO DE RENDERIZAR

                                                                                                                                                                            function render() {

                                                                                                                                                                            listaPessoas.innerHTML = "";

                                                                                                                                                                            pessoas.forEach(function(pessoa) {

                                                                                                                                                                                const linha = criarLinha(pessoa);

                                                                                                                                                                                    listaPessoas.appendChild(linha);

                                                                                                                                                                                    });

                                                                                                                                                                                    }

                                                                                                                                                                                    // 13. SALVAR NO LOCALSTORAGE

                                                                                                                                                                                    function salvar() {

                                                                                                                                                                                    localStorage.setItem(
                                                                                                                                                                                        chavePessoas,
                                                                                                                                                                                            JSON.stringify(pessoas)
                                                                                                                                                                                            );

                                                                                                                                                                                            }

                                                                                                                                                                                            // 14. CARREGAR PESSOAS SALVAS

                                                                                                                                                                                            function carregarPessoas() {

                                                                                                                                                                                            const dadosSalvos = localStorage.getItem(chavePessoas);

                                                                                                                                                                                            if (dadosSalvos === null) {
                                                                                                                                                                                                return [];
                                                                                                                                                                                                }

                                                                                                                                                                                                try {

                                                                                                                                                                                                    const dados = JSON.parse(dadosSalvos);

                                                                                                                                                                                                        if (Array.isArray(dados)) {
                                                                                                                                                                                                                return dados;
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                        return [];

                                                                                                                                                                                                                        } catch (erro) {

                                                                                                                                                                                                                            console.error("Erro ao carregar os dados:", erro);

                                                                                                                                                                                                                                return [];

                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                // 15. AJUSTAR CONTADOR DE CÓDIGO

                                                                                                                                                                                                                                function ajustarContador() {

                                                                                                                                                                                                                                let maior = 0;

                                                                                                                                                                                                                                pessoas.forEach(function(pessoa) {

                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                            Number.isInteger(pessoa.id) &&
                                                                                                                                                                                                                                                    pessoa.id > maior
                                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                                                maior = pessoa.id;
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                    proximoId = maior + 1;

                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    // 16. EXCLUIR PESSOA

                                                                                                                                                                                                                                                                    function excluirPessoa(id) {

                                                                                                                                                                                                                                                                    pessoas = pessoas.filter(function(pessoa) {

                                                                                                                                                                                                                                                                        return pessoa.id !== id;

                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                        salvar();

                                                                                                                                                                                                                                                                        render();

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        // 17. EVENTO DE ENVIO DO FORMULÁRIO

                                                                                                                                                                                                                                                                        formPessoa.addEventListener("submit", function(event) {

                                                                                                                                                                                                                                                                        event.preventDefault();

                                                                                                                                                                                                                                                                        // Ler os dados
                                                                                                                                                                                                                                                                        const dados = lerFormulario();

                                                                                                                                                                                                                                                                        // Validar os dados
                                                                                                                                                                                                                                                                        const erro = validarDados(dados);

                                                                                                                                                                                                                                                                        if (erro !== "") {

                                                                                                                                                                                                                                                                            mostrarErro(erro);

                                                                                                                                                                                                                                                                                return;

                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                // Limpar mensagem
                                                                                                                                                                                                                                                                                limparErro();

                                                                                                                                                                                                                                                                                // Adicionar pessoa
                                                                                                                                                                                                                                                                                adicionarPessoa(dados);

                                                                                                                                                                                                                                                                                // Salvar informações
                                                                                                                                                                                                                                                                                salvar();

                                                                                                                                                                                                                                                                                // Atualizar tabela
                                                                                                                                                                                                                                                                                render();

                                                                                                                                                                                                                                                                                // Limpar formulário
                                                                                                                                                                                                                                                                                formPessoa.reset();

                                                                                                                                                                                                                                                                                // Voltar para o campo nome
                                                                                                                                                                                                                                                                                inputNome.focus();

                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                // 18. CARREGAMENTO INICIAL

                                                                                                                                                                                                                                                                                pessoas = carregarPessoas();

                                                                                                                                                                                                                                                                                ajustarContador();

                                                                                                                                                                                                                                                                                render();