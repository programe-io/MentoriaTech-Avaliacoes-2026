let contadorCodigo = 0;
const CHAVE_PESSOAS = "pessoas";


function gerarCodigo() {
    return ++contadorCodigo;
    }

    let pessoas = [];


    const tabelaPessoas = document.getElementById("tabela-pessoas");
    const formPessoa = document.getElementById("form-pessoa");
    const inputNome = document.getElementById("input-nome");
    const inputIdade = document.getElementById("input-idade");
    const inputAltura = document.getElementById("input-altura");
    const inputPeso = document.getElementById("input-peso");
    const mensagemErro = document.getElementById("erro");



    function lerFormulario() {
        return {
                nome: inputNome.value.trim(),
                        idade: Number(inputIdade.value),
                                altura: Number(inputAltura.value),
                                        peso: Number(inputPeso.value)
                                            };
                                            }

                                            function adicionarPessoa(dados) {
                                                pessoas.push({
                                                        id: gerarCodigo(),
                                                                nome: dados.nome,
                                                                        idade: dados.idade,
                                                                                altura: dados.altura,
                                                                                        peso: dados.peso
                                                                                            });
                                                                                            }

                                                                                            formPessoa.addEventListener("submit", (e) => {
                                                                                                e.preventDefault();

                                                                                                    const dados = lerFormulario();
                                                                                                        const erro = validarDados(dados);

                                                                                                            if (erro !== "") {
                                                                                                                    mostrarErro(erro);
                                                                                                                            return;
                                                                                                                                }

                                                                                                                                    limparErro();
                                                                                                                                        adicionarPessoa(dados);
                                                                                                                                            salvarPessoas();

                                                                                                                                                formPessoa.reset();
                                                                                                                                                    inputNome.focus();

                                                                                                                                                        render();
                                                                                                                                                        });


                                                                                                                                                        function criarCelula(texto) {
                                                                                                                                                            const td = document.createElement("td");
                                                                                                                                                                td.textContent = texto;
                                                                                                                                                                    return td;
                                                                                                                                                                    }

                                                                                                                                                                    function criarLinha(pessoa) {
                                                                                                                                                                        const imc = calcularImc(pessoa.peso, pessoa.altura);
                                                                                                                                                                            const classificacao = classificarImc(imc);

                                                                                                                                                                                const tr = document.createElement("tr");