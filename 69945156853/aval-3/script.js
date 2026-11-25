let codigo = 0;
const chavePessoas = "pessoas";
const tabelaPessoas = document.getElementByld("tabelaPessoas");
const formPessoa = document.getElementByld("formPessoa");
const inputNome = document.getElemtByld("nome");
const inputIdade = document.getElementByld("idade");
const inputAltura = document.getElementByld("altura");
const inputPeso = document.getElementByld("peso");
const mensagemDeErro = document.getElementByld("erro");


function gerarCodigo(){
    return ++codigo;
}

// Função para criar uma célula da tabela

function criarCelula(conteudo) {

    const td = document.createElement("td");
    td.textContent =  conteudo;

    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificação = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.idade + "anos"));
    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + "m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + "kg")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );

    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");
    selo.classList.add("selo", Classificacao.classe);
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    const btnApagar = document.createElement("button");
    btnApagar.textContent = "Apagar";
    btnApagar.classList.add("btn-apagar");
    btnApagar.addEventListener("click", function(){
        apagarPessoal(pessoa.id);
    });

    tdAcoes.appendChild(btnApagar);
    tr.appendChild(tdAcoes);

    return tr;
}

function  render(){
    tabelaPessoas.innerHTML = "";

    if (chavePessoas.length === 0){
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada ainda";
        tr.appendChild(tr);
        
        return;
}
pessoas.forEach(function(pessoa){
    const linha = criarLinha(pessoa);

    tabelaPessoas.appendChild(linha);
});

}

function calcularIMC(peso, altura){
    return peso / (altura * altura);

}

function classificarIMC(imc){
    if(imc < 18.5){
        return {
            texto:"Abaixo do peso",
            classe:"abaixo"
        };
    }else if (imc < 25){
        return{
            texto:"Peso normal",
            classe:"normal"
        };
    }else if (imc < 30){
        return{
            texto: "Sobrepeso",
            classe:"sobrepeso"
        };
    }else if (imc < 35){
        return{
            texto:"Obesidade grau |",
            classe: "obesidade"
        };
    }else if (imc < 40){
        return{
            texto:"Obesidade grau ||",
            classe:"obesidade"
        };
    }else{
        return{
            texto:"Obesidade grau |||",
            classe:"obesidade"
        };
    }
}

function formatar(valor, caasasDecimais){
    return valor.toLocaleString("pt-BR",{
        minimumFractionDigits: caasasDecimais,
        maximumFractionDigits: caasasDecimais
    });

}

function lerFormulario(){
    return{
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura:Number(inputAltura.value),
        peso:Number(inputPeso.value)
    };
    
}

function adicionarPessoa(dados){
    const pessoa = {
        id:gerarCodigo(),
        nome:dados.nome,
        idade:dados.idade,
        altura:dados.altura,
        peso:dados.peso
    };

    pessoas.push(pessoa);
}

function validarDados(dados){
    if(dados.nome.length < 2){
        return "Informe o nome com no mínimo duas letras.";
    }

    if(
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ){
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if(
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ){
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }

    if(
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ){
        return"";
    }

    function mostrarErro(mensagem){
        mensagemDeErro.textContent = mensagem;
        mensagemDeErro.hidden = false;
    }

    function limparErro(){
        mensagemDeErro.hidden = true;
        mensagemDeErro.textContent = "";
    }

    function salvar(){
        try{
            localStorage.setItem(
                chavePessoas,
                JSON.stringify(pessoas)
            );
        }catch(erro){
            console.error("Erro ao salvar os dados:", erro);
            mostrarErro("Não foi possível salvar os dados no navegador.");
        }
    }

    function carregarPessoas(){
        const dadosSalvos = localStorage.getItem(chavePessoas);
        if(dadosSalvos === null){
            return [];
        }
        try{
            const dados = JSON.parse(dadosSalvos);
            if(Array.isArray(dados)){
                return dados;
            }
            console.error("Os dados armazenados não são uma lista.");
            return [];
        }catch (erro){
            console.error("Erro ao carregar os dados:", erro);
            return[];
        }
    }

    function ajustarContadorCodigp(){
        let maior = 0;
        pessoas.forEach(function (pessoa){
            if(Number.isInteger(pessoa.id) && pessoa.id > maior){
                maior = pessoa.id;
            }
        });
        codigo = maior;
    }

    function apagarPessoa(id){
        const confirmar = confirm(
            "Deseja realmente apagar este paciente?"
        );

        if(!confirmar){
            return;
        }

        pessoas = pessoas.filter(function (pessoa){
            return pessoa.id !== id;
        });

        salvar();

        render();
    }

    formPessoa.addEventListener("submit", function (e){
        e.preventDefault();

        const dados = lerFormulario();

        const erros = validarDados(dados);
        if(erro!==""){
            mostrarErro(erro);

            return;
        }

        limparErro();

        adicionarPessoa(dados);

        salvar();

        formPessoa.reset();

        inputNome.focus();

        render();

    });

    formPesssoa.addEventListener("reset",function (){
        limparErro();

    });

    let pessoas = carregarPessoas();

    ajustarContadorCodigo();

    render();