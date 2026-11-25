const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");
const mensagemErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
let contador = 0;
let pessoas = [];
let idEmEdicao = null;
const CHAVE_PESSOAS = "pessoas_imc";
function gerarCodigo() { return ++contador; }
function ajustarContador() {
 let maior = 0;
  pessoas.forEach((p) => { if (p.id > maior) maior = p.id; });
   contador = maior;
   }
   function calcularIMC(peso, altura) { return peso / (altura * altura); }
   function classificarIMC(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso",  if (imc < 25)  if (imc < 30)  if (imc < 35)  if (imc < 40)  return classe: "abaixo" };
    return { texto: "Peso normal", classe: "normal" };
    return { texto: "Sobrepeso", classe: "sobrepeso" };
    return { texto: "Obesidade grau I", classe: "obesidade" };
    return { texto: "Obesidade grau II", classe: "obesidade" };
    { texto: "Obesidade grau III", classe: "obesidade" };}
    function formatar(valor, casas) {
     return valor.toLocaleString("pt-BR", { minimumFractionDigits: casas,
     maximumFractionDigits: casas });
     }
     function criarCelula(texto) {
      const td = document.createElement("td");
       td.textContent = texto;
        return td;
        }
        function criarLinha(pessoa) {
         const tr = document.createElement("tr");
          tr.dataset.id = pessoa.id;
           if (pessoa.id === idEmEdicao) tr.classList.add("em-edicao");
            const imc = calcularIMC(pessoa.peso, pessoa.altura);
             const classificacao = classificarIMC(imc);
              tr.appendChild(criarCelula(pessoa.nome));
               tr.appendChild(criarCelula(pessoa.idade));
                tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
                 tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
                  tr.appendChild(criarCelula(formatar(imc, 1)));
                   const tdClassificacao = document.createElement("td");
                    const selo = document.createElement("span");
                     selo.classList.add("selo", classificacao.classe);
                      selo.textContent = classificacao.texto;
                       tdClassificacao.appendChild(selo);
                        tr.appendChild(tdClassificacao);
                         const tdAcoes = document.createElement("td");
                          tdAcoes.classList.add("acoes");
                           const btnEditar = document.createElement("button");
                            btnEditar.type = "button"; btnEditar.textContent = "Editar";
                             btnEditar.dataset.acao = "editar"; btnEditar.dataset.id = pessoa.id;
                              const btnRemover = document.createElement("button");
                               btnRemover.type = "button"; btnRemover.textContent = "Remover";
                                btnRemover.classList.add("remover"); btnRemover.dataset.acao = "remover";
                                btnRemover.dataset.id = pessoa.id;
                                 tdAcoes.appendChild(btnEditar);
                                  tdAcoes.appendChild(btnRemover);
                                   tr.appendChild(tdAcoes);
                                    return tr;
                                    }
                                    function render() { tabelaPessoas.innerHTML = "";
                                     if (pessoas.length === 0) {
                                        const tr = document.createElement("tr");
                                        const td = document.createElement("td");
                                        td.colSpan = 7; td.classList.add("vazio"); td.textContent = "Nenhuma pessoa
                                        cadastrada ainda";
                                          }
                                          tr.appendChild(td); tabelaPessoas.appendChild(tr); return;
                                           pessoas.forEach((p) => { tabelaPessoas.appendChild(criarLinha(p)); });
                                           }
                                           function lerFormulario() {
                                            return {
                                             nome: inputNome.value.trim(),
                                              idade: Number(inputIdade.value),
                                               altura: Number(inputAltura.value),
                                                peso: Number(inputPeso.value)
                                                 };
                                                 }
                                                 function validarDados(dados) {
                                                  if (dados.nome.length < 2) return "Informe o nome com no mínimo duas letras";
                                                   if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120)
                                                   return "A idade deve ser um número inteiro entre 1 e 120";
                                                    if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5)
                                                    return "A altura deve estar entre 0,5 m e 2,5 m";
                                                     if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) return "O
                                                     peso deve estar entre 2 kg e 500 kg";
                                                      return "";
                                                      }
                                                      function mostrarErro(mensagem) { mensagemErro.textContent = mensagem;
                                                      mensagemErro.hidden = false; }
                                                      function limparErro() { mensagemErro.hidden = true; }
                                                      function marcarInvalidos(dados) {
                                                       inputNome.classList.toggle("invalido", dados.nome.length < 2);
                                                        inputIdade.classList.toggle("invalido", !Number.isInteger(dados.idade) ||
                                                        dados.idade < 1 || dados.idade > 120);
                                                         inputAltura.classList.toggle("invalido", Number.isNaN(dados.altura) ||
                                                         dados.altura < 0.5 || dados.altura > 2.5);
                                                          inputPeso.classList.toggle("invalido", Number.isNaN(dados.peso) || dados.peso <
                                                          2 || dados.peso > 500);
                                                          }
                                                          function limparInvalidos() {
                                                           inputNome.classList.remove("invalido"); inputIdade.classList.remove("invalido");
                                                            inputAltura.classList.remove("invalido");
                                                            inputPeso.classList.remove("invalido");
                                                            }
                                                            function adicionarPessoa(dados) {
                                                             pessoas.push({ id: gerarCodigo(), nome: dados.nome, idade: dados.idade, altura:
                                                             dados.altura, peso: dados.peso });}
                                                             function atualizarPessoa(id, dados) {
                                                              const pessoa = pessoas.find((p) => p.id === id);
                                                               if (!pessoa) return;
                                                                pessoa.nome = dados.nome; pessoa.idade = dados.idade; pessoa.altura =
                                                                dados.altura; pessoa.peso = dados.peso;
                                                                }
                                                                function entrarModoEdicao(id) {
                                                                 const pessoa = pessoas.find((p) => p.id === id);
                                                                  if (!pessoa) return;
                                                                   idEmEdicao = id;
                                                                    inputNome.value = pessoa.nome; inputIdade.value = pessoa.idade;
                                                                    inputAltura.value = pessoa.altura; inputPeso.value = pessoa.peso;
                                                                     tituloForm.textContent = "Editar pessoa"; btnSalvar.textContent = "Atualizar";
                                                                     btnCancelar.hidden = false;
                                                                      limparErro(); limparInvalidos(); render(); inputNome.focus();
                                                                      }
                                                                      function sairModoEdicao() {
                                                                       idEmEdicao = null; formPessoa.reset();
                                                                        tituloForm.textContent = "Nova pessoa"; btnSalvar.textContent = "Salvar";
                                                                        btnCancelar.hidden = true;
                                                                         limparErro(); limparInvalidos(); render();
                                                                         }
                                                                         function removerPessoa(id) {
                                                                          if (!confirm("Deseja remover esta pessoa?")) return;
                                                                           pessoas = pessoas.filter((p) => p.id !== id);
                                                                            if (idEmEdicao === id) {
                                                                             idEmEdicao = null; formPessoa.reset();
                                                                              tituloForm.textContent = "Nova pessoa"; btnSalvar.textContent = "Salvar";
                                                                              btnCancelar.hidden = true;
                                                                               limparErro(); limparInvalidos();
                                                                                }
                                                                                 salvar(); render();
                                                                                 }
                                                                                 function salvar() { localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
                                                                                 }
                                                                                 function carregarPessoas() {
                                                                                  const dados = localStorage.getItem(CHAVE_PESSOAS);
                                                                                   if (dados === null) return [];
                                                                                    try {
                                                                                     const lista = JSON.parse(dados);
                                                                                      return Array.isArray(lista) ? lista : [];
                                                                                       } catch (erro) { console.error("Erro ao carregar:", erro); return []; }
                                                                                       }
                                                                                       formPessoa.addEventListener("submit", (evento) => {
                                                                                        evento.preventDefault();
                                                                                         const dados = lerFormulario(); const erro = validarDados(dados);
                                                                                          if (erro) { mostrarErro(erro); marcarInvalidos(dados); return; }
                                                                                           limparErro(); limparInvalidos();
                                                                                            if (idEmEdicao !== null) {
                                                                                               atualizarPessoa(idEmEdicao, dados);
                                                                                               idEmEdicao = null; tituloForm.textContent = "Nova pessoa";
                                                                                               btnSalvar.textContent = "Salvar"; btnCancelar.hidden = true;
                                                                                                } else {
                                                                                                  }
                                                                                                  adicionarPessoa(dados);
                                                                                                   salvar(); formPessoa.reset(); inputNome.focus(); render();
                                                                                                   });
                                                                                                   btnCancelar.addEventListener("click", () => sairModoEdicao());
                                                                                                   tabelaPessoas.addEventListener("click", (evento) => {
                                                                                                    const botao = evento.target.closest("button");
                                                                                                     if (!botao) return;
                                                                                                      const id = Number(botao.dataset.id);
                                                                                                       const acao = botao.dataset.acao;
                                                                                                        if (acao === "editar") entrarModoEdicao(id);
                                                                                                         if (acao === "remover") removerPessoa(id);
                                                                                                         });
                                                                                                         pessoas = carregarPessoas();
                                                                                                         ajustarContador();
                                                                                                         render()