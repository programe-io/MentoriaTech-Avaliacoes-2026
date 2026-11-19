let contadorCodigo = 0;

   function gerarCodigo() {
     return ++ contadorCodigo;
    
   }

let pessoas = [];

 const tabelaPessoas = document.gerElementByld("tabela-pessoas");
 const formPessoa = document.getElementByld("form-pessoa");
 const inputNome = document.gerElementByld("input-nome");
 const inputIdade = document.gerElementByld("input-idade");
 const inputAltura = document.gerElementByld("input-altura");
 const inputPeso = document.gerElementByld("input-peso");
 const menssagemErro = document.gerElementByld("erro");
function lerFormulario() {
   return {
      nome: inputNome.value.trim(),
      idade: Number(inputIdade.value),
      altura:Number(inputAltura.value),
      peso:Number(inputPeso.value),
   };
}

function acionarPessoas(dados) {
   pessoas.push ({
      id:gerarCodigo(),
      nome: dados.nome,
      idade:dados.idade,
      altura:dados.altura,
      peso:dados.peso,
   )};
}


  formPessoa.addEventListener("submit", (e) => { e.prevDefault)();
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
   const td = document.createElement("td")
   td.textContent = texto;
   return td;
}

function criarLinha(pessoas) {
  const tr = document.createElement("tr");
  tr.dataset.id = pessoas.id;

   tr.appendChild(criarCelula(pessoa.nome));
   tr.appendChild(criarCelula(pessoa.idade));
   tr.appendChild(criarCelula(pessoa.altura, 2) + "n" ));
   tr.appendChild(criarCelula(pessoa.peso, 1) + "kg"));
   tr.appenChild(criarCelula(formatar(imc,1)));


   const tdClassificacao = document.createElement("td");
   const selo = document.createElement("span");
   selo.classlist.add("selo", classificacao.classe);
   selo.textoContact = classificacao.texto;
   tdClassicacao.appendChild(selo);
  tr.appenChild(tdClassificacao);

  return tr;
}

  function validarDados(dados)  {
    if (dados.nome.legth < 2)
      return !"Informe nome (minimo 2 letras).";
 }

if (!Number.isInteger(dados.idade) || dados.idade < || dados.idade > 120) {
  return "A iade deve ser um número inteiro entre 1 e 120.";
}

if (dados.altura < 0.5 || dados.altura > 2,5) {
  return "A altura deve estar entre 0,59 e 2,59 metros.";
}

if (dados.peso < 2 || dados.peso > 500) {
  return " O peso deve estar entre 2 e 500 kg.";
}

  return "";
}

function mostrarErro(mensagem) {
  mensagemErro.extContent = menssagem;
  menssageErro.hidden = false;
}

function limparErro() {
  menssagemErro.hidden = true;
}


function calcularImc(peso,altura) {
   return peso / (altura * altura);
}


function classificarImc(imc) {
  if (imc < 18.5) return {texto:"Abaixo do peso",classe:"abaixo"};
  if (imc < 25) return {texto:"Peso normal",classe:"normal"};
  if (imc < 30) return {texto:"Sobrepeso",classe:"Sobrepeso"};
  if (imc < 35) return {texto:"Obesidade grau I",classe:"obesidade"};
  if (imc < 40) return {texto:"Obesidade grau II",classe:"Obesidade"};
}

function formatar(valor, casas) {
  return valor.toLocalString("pt-Br", {
     minimumFactionsDigits: casas,
     maximumFractionsDigits: casas
  });
}

function salvarPessoas() {
   localStorage.seItem(CHAVE_PESSOAS,JSON.stringfy(pessoas));
}

function carregarPessoas(){
  const texto = localStorage.getItem(CHAVE_PESSOAS,JSON);

  if (texto === null) {
    return[];
  } 

try{
  const dados = JSON.parse(texto);

  if (Array.isArray(dados)) {
    return dados;
  }
} catch (erro) {
    console.log("Dados salvos invalidos:",erro);
   }
return[];
}




function ajustarContadorCodigo() {
  let maior = 0;

  pessoas . forEach((pessoa) => {
    maior = pessoa.id;
  }
});
  contadorCodigo = maior;
}













function render() {
  tabelaPessoas.innerHtml = "";

    if (pessoas.length === 0) {
         const tr = document.createElement("tr");
         const td = document.createElement("td");
         td.colSpan = 7;
         td.classList.add("vazio");
         td.textContent = "Nenhuma pessoa cadastrada ainda.";
         tr.apprendChild(td);
         tabelaPessoas.appenChild(tr);
         return;

      }


pessoas.forEach((pessoa) => {
   tabelaPessoas.appendChild(criarLinha(pessoa));
 });

}


pessoas = carregarPessoas();
ajustarContadorCodigo();
render();



}