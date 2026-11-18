
'use strict';

/* =====================================
   NAVEGAÇÃO ENTRE AS TELAS
===================================== */

const abas = document.querySelectorAll('.aba');

function mostrarSecao(nome) {

    document.querySelectorAll('.painel').forEach(secao => {
        secao.hidden = secao.id !== nome;
    });

    abas.forEach(aba => {
        aba.classList.toggle(
            'ativa',
            aba.dataset.secao === nome
        );
    });
}

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        mostrarSecao(aba.dataset.secao);
    });
});


/* =====================================
   ARMAZENAMENTO
===================================== */

function carregarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave) || '[]');
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch {
        alert('Não foi possível salvar os dados.');
        return false;
    }
}


/* =====================================
   CONTROLE DE IMC
===================================== */

let pessoas = carregarDados('controle_imc_pessoas');

let codigoPessoa = pessoas.reduce(
    (maior, pessoa) => Math.max(maior, pessoa.id || 0),
    0
);

let pessoaEditando = null;

const formPessoa = document.getElementById('form-pessoa');
const tabelaPessoas = document.getElementById('tabela-pessoas');

const inputNome = document.getElementById('input-nome');
const inputIdade = document.getElementById('input-idade');
const inputAltura = document.getElementById('input-altura');
const inputPeso = document.getElementById('input-peso');

const erroPessoa = document.getElementById('erro-pessoa');


/* Calcular IMC */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}


/* Classificar IMC adulto */

function classificarImc(imc) {

    if (imc < 18.5) {
        return {
            texto: 'Abaixo do peso',
            classe: 'abaixo'
        };
    }

    if (imc < 25) {
        return {
            texto: 'Peso normal',
            classe: 'normal'
        };
    }

    if (imc < 30) {
        return {
            texto: 'Sobrepeso',
            classe: 'sobrepeso'
        };
    }

    if (imc < 35) {
        return {
            texto: 'Obesidade grau I',
            classe: 'obesidade'
        };
    }

    if (imc < 40) {
        return {
            texto: 'Obesidade grau II',
            classe: 'obesidade'
        };
    }

    return {
        texto: 'Obesidade grau III',
        classe: 'obesidade'
    };
}


/* Validar cadastro */

function validarPessoa(dados) {

    if (dados.nome.length < 2) {
        throw new Error('Digite um nome válido.');
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        throw new Error('Informe uma idade entre 1 e 120 anos.');
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        throw new Error('Informe uma altura entre 0,50 e 2,50 metros.');
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        throw new Error('Informe um peso válido.');
    }
}


/* Criar célula */

function criarCelula(texto) {
    const td = document.createElement('td');
    td.textContent = texto;
    return td;
}


/* Criar botão */

function criarBotao(texto, classe, acao) {

    const botao = document.createElement('button');

    botao.type = 'button';
    botao.textContent = texto;
    botao.className = 'acao ' + classe;

    botao.addEventListener('click', acao);

    return botao;
}


/* Atualizar tabela */

function atualizarTabela() {

    tabelaPessoas.innerHTML = '';

    if (pessoas.length === 0) {

        const linha = document.createElement('tr');
        const celula = criarCelula('Nenhum paciente cadastrado.');

        celula.colSpan = 7;

        linha.appendChild(celula);
        tabelaPessoas.appendChild(linha);

        return;
    }

    pessoas.forEach(pessoa => {

        const linha = document.createElement('tr');

        const imc = calcularImc(
            pessoa.peso,
            pessoa.altura
        );

        linha.appendChild(criarCelula(pessoa.nome));
        linha.appendChild(criarCelula(pessoa.idade));
        linha.appendChild(criarCelula(pessoa.altura.toFixed(2) + ' m'));
        linha.appendChild(criarCelula(pessoa.peso.toFixed(1) + ' kg'));
        linha.appendChild(criarCelula(imc.toFixed(1)));

        const celulaClassificacao = document.createElement('td');

        if (pessoa.idade < 18) {

            const selo = document.createElement('span');
            selo.className = 'selo nao-classificado';
            selo.textContent = 'Avaliação por idade e sexo';

            celulaClassificacao.appendChild(selo);

        } else {

            const resultado = classificarImc(imc);

            const selo = document.createElement('span');

            selo.className = 'selo ' + resultado.classe;
            selo.textContent = resultado.texto;

            celulaClassificacao.appendChild(selo);
        }

        linha.appendChild(celulaClassificacao);

        const acoes = document.createElement('td');

        acoes.appendChild(
            criarBotao('Editar', 'editar', () => {
                editarPessoa(pessoa.id);
            })
        );

        acoes.appendChild(
            criarBotao('Excluir', 'excluir', () => {
                excluirPessoa(pessoa.id);
            })
        );

        linha.appendChild(acoes);

        tabelaPessoas.appendChild(linha);
    });
}


/* Cadastrar ou atualizar paciente */

formPessoa.addEventListener('submit', function(evento) {

    evento.preventDefault();

    try {

        const dados = {
            nome: inputNome.value.trim(),
            idade: Number(inputIdade.value),
            altura: Number(inputAltura.value),
            peso: Number(inputPeso.value)
        };

        validarPessoa(dados);

        let novasPessoas;

        if (pessoaEditando !== null) {

            novasPessoas = pessoas.map(pessoa => {

                if (pessoa.id === pessoaEditando) {
                    return {
                        ...pessoa,
                        ...dados
                    };
                }

                return pessoa;
            });

        } else {

            novasPessoas = [
                ...pessoas,
                {
                    id: ++codigoPessoa,
                    ...dados
                }
            ];
        }

        if (!salvarDados('controle_imc_pessoas', novasPessoas)) {
            return;
        }

        pessoas = novasPessoas;

        atualizarTabela();
        limparFormulario();

    } catch (erro) {

        erroPessoa.textContent = erro.message;
        erroPessoa.hidden = false;
    }
});


/* Editar paciente */

function editarPessoa(id) {

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    pessoaEditando = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    document.getElementById('btn-salvar').textContent =
        'Salvar alterações';

    document.getElementById('btn-cancelar').hidden = false;

    erroPessoa.hidden = true;

    formPessoa.scrollIntoView({
        behavior: 'smooth'
    });
}


/* Excluir paciente */

function excluirPessoa(id) {

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    if (!confirm('Deseja excluir ' + pessoa.nome + '?')) {
        return;
    }

    const novasPessoas = pessoas.filter(p => p.id !== id);

    if (!salvarDados('controle_imc_pessoas', novasPessoas)) {
        return;
    }

    pessoas = novasPessoas;

    if (pessoaEditando === id) {
        limparFormulario();
    }

    atualizarTabela();
}


/* Limpar formulário */

function limparFormulario() {

    formPessoa.reset();

    pessoaEditando = null;

    document.getElementById('btn-salvar').textContent =
        'Cadastrar paciente';

    document.getElementById('btn-cancelar').hidden = true;

    erroPessoa.hidden = true;
}


/* Cancelar edição */

document.getElementById('btn-cancelar')
    .addEventListener('click', limparFormulario);


/* =====================================
   GERENCIADOR DE TAREFAS
===================================== */

let tarefas = carregarDados('gerenciador_tarefas');

let geradorCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo || 0),
    0
);

const formTarefa = document.getElementById('form-tarefa');

const inputTitulo = document.getElementById('titulo-tarefa');

const inputPrioridade =
    document.getElementById('prioridade-tarefa');

const listaTarefas =
    document.getElementById('lista-tarefas');

const erroTarefa =
    document.getElementById('erro-tarefa');


/* Validar tarefa */

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            'O título deve ter no mínimo 5 caracteres.'
        );
    }

    if (![1, 2, 3].includes(prioridade)) {
        throw new Error(
            'Informe uma prioridade válida.'
        );
    }
}


/* Buscar tarefa */

function buscarTarefa(codigoTarefa) {

    const tarefa = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefa) {
        throw new Error('Código de tarefa não encontrado.');
    }

    return tarefa;
}


/* Cadastrar tarefa */

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: geradorCodigo + 1,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    const novasTarefas = [...tarefas, novaTarefa];

    if (!salvarDados('gerenciador_tarefas', novasTarefas)) {
        return false;
    }

    tarefas = novasTarefas;
    geradorCodigo++;

    return true;
}


/* Listar tarefas */

function listarTarefas() {
    return tarefas;
}


/* Concluir tarefa */

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error('Esta tarefa já foi concluída.');
    }

    const novasTarefas = tarefas.map(t => {

        if (t.codigo === codigo) {
            return {
                ...t,
                status: false
            };
        }

        return t;
    });

    if (!salvarDados('gerenciador_tarefas', novasTarefas)) {
        return;
    }

    tarefas = novasTarefas;
}


/* Excluir tarefa */

function excluirTarefa(codigo) {

    buscarTarefa(codigo);

    if (!confirm('Deseja excluir esta tarefa?')) {
        return;
    }

    const novasTarefas = tarefas.filter(
        t => t.codigo !== codigo
    );

    if (!salvarDados('gerenciador_tarefas', novasTarefas)) {
        return;
    }

    tarefas = novasTarefas;
}


/* Mostrar tarefas */

function mostrarTarefas() {

    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {

        const mensagem = document.createElement('p');

        mensagem.textContent = 'Nenhuma tarefa cadastrada.';

        listaTarefas.appendChild(mensagem);

        return;
    }

    listarTarefas().forEach(tarefa => {

        const div = document.createElement('div');

        div.className = 'tarefa';

        if (!tarefa.status) {
            div.classList.add('concluida');
        }

        const titulo = document.createElement('h4');

        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement('p');

        codigo.textContent = 'Código: ' + tarefa.codigo;

        const prioridade = document.createElement('p');

        const nomesPrioridade = {
            1: 'Alta',
            2: 'Média',
            3: 'Baixa'
        };

        prioridade.textContent =
            'Prioridade: ' + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement('p');

        status.textContent = tarefa.status
            ? 'Status: Pendente'
            : 'Status: Concluída';

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(prioridade);
        div.appendChild(status);

        if (tarefa.status) {

            div.appendChild(
                criarBotao('Concluir', '', () => {

                    try {

                        concluirTarefa(tarefa.codigo);
                        mostrarTarefas();

                    } catch (erro) {

                        erroTarefa.textContent = erro.message;
                        erroTarefa.hidden = false;
                    }
                })
            );
        }

        div.appendChild(
            criarBotao('Excluir', 'excluir', () => {

                try {

                    excluirTarefa(tarefa.codigo);
                    mostrarTarefas();

                } catch (erro) {

                    erroTarefa.textContent = erro.message;
                    erroTarefa.hidden = false;
                }
            })
        );

        listaTarefas.appendChild(div);
    });
}


/* Cadastrar tarefa pela página */

formTarefa.addEventListener('submit', function(evento) {

    evento.preventDefault();

    erroTarefa.hidden = true;

    try {

        const titulo = inputTitulo.value.trim();

        const prioridade = Number(inputPrioridade.value);

        const cadastrou = cadastrarTarefa(
            titulo,
            prioridade
        );

        if (cadastrou) {

            formTarefa.reset();

            inputPrioridade.value = '2';

            mostrarTarefas();
        }

    } catch (erro) {

        erroTarefa.textContent = erro.message;
        erroTarefa.hidden = false;
    }
});


/* =====================================
   INICIALIZAÇÃO
===================================== */

atualizarTabela();

mostrarTarefas();

mostrarSecao('imc');
