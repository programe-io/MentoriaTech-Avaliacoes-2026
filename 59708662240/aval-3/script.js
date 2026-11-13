
"use strict";

const CHAVE = "biblioteca_escolar";

function carregarDados() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE));
        return {
            livros: Array.isArray(dados?.livros) ? dados.livros : [],
            alunos: Array.isArray(dados?.alunos) ? dados.alunos : [],
            emprestimos: Array.isArray(dados?.emprestimos) ? dados.emprestimos : []
        };
    } catch {
        return { livros: [], alunos: [], emprestimos: [] };
    }
}

let dados = carregarDados();
let editandoLivro = null;
let editandoAluno = null;

const el = id => document.getElementById(id);

function salvar() {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
}

function idNovo() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function criar(tag, texto) {
    const elemento = document.createElement(tag);
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

function criarBotao(texto, classe, acao) {
    const botao = criar("button", texto);
    botao.type = "button";
    botao.className = classe;
    botao.addEventListener("click", acao);
    return botao;
}

function vazio(container, mensagem) {
    container.appendChild(criar("p", mensagem)).className = "vazio";
}

function dataHoje() {
    const d = new Date();
    return d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");
}

function formatarData(data) {
    if (!data) return "";
    return data.split("-").reverse().join("/");
}

// NAVEGAÇÃO
document.querySelectorAll("[data-tela]").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".tela").forEach(tela => {
            tela.classList.toggle("ativa", tela.id === botao.dataset.tela);
        });
        atualizar();
    });
});

// LIVROS
el("formLivro").addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = el("titulo").value.trim();
    const autor = el("autor").value.trim();
    const categoria = el("categoria").value;
    const isbn = el("isbn").value.trim();
    const quantidade = Number(el("quantidade").value);

    if (titulo.length < 2 || !autor || !categoria ||
        !Number.isInteger(quantidade) || quantidade < 1) {
        alert("Preencha todos os dados corretamente.");
        return;
    }

    if (editandoLivro) {
        const livro = dados.livros.find(l => l.id === editandoLivro);
        const emprestados = dados.emprestimos.filter(
            e => e.livroId === editandoLivro && !e.devolvido
        ).length;

        if (!livro || quantidade < emprestados) {
            alert("A quantidade não pode ser menor que os exemplares emprestados.");
            return;
        }

        Object.assign(livro, { titulo, autor, categoria, isbn, quantidade });
        editandoLivro = null;
        el("btnLivro").textContent = "Cadastrar livro";
        el("cancelarLivro").hidden = true;
    } else {
        dados.livros.push({
            id: idNovo(), titulo, autor, categoria, isbn, quantidade
        });
    }

    salvar();
    el("formLivro").reset();
    el("quantidade").value = 1;
    atualizar();
    alert("Livro cadastrado com sucesso!");
});

function editarLivro(id) {
    const livro = dados.livros.find(l => l.id === id);
    if (!livro) return;

    editandoLivro = id;
    el("titulo").value = livro.titulo;
    el("autor").value = livro.autor;
    el("categoria").value = livro.categoria;
    el("isbn").value = livro.isbn;
    el("quantidade").value = livro.quantidade;
    el("btnLivro").textContent = "Salvar alterações";
    el("cancelarLivro").hidden = false;
}

el("cancelarLivro").addEventListener("click", () => {
    editandoLivro = null;
    el("formLivro").reset();
    el("quantidade").value = 1;
    el("btnLivro").textContent = "Cadastrar livro";
    el("cancelarLivro").hidden = true;
});

function excluirLivro(id) {
    const ativo = dados.emprestimos.some(
        e => e.livroId === id && !e.devolvido
    );

    if (ativo) {
        alert("Este livro possui empréstimo ativo.");
        return;
    }

    if (!confirm("Deseja excluir este livro?")) return;

    dados.livros = dados.livros.filter(l => l.id !== id);
    salvar();
    atualizar();
}

function renderLivros() {
    const lista = el("listaLivros");
    const busca = el("buscaLivro").value.toLowerCase().trim();
    lista.innerHTML = "";

    const encontrados = dados.livros.filter(l =>
        l.titulo.toLowerCase().includes(busca) ||
        l.autor.toLowerCase().includes(busca)
    );

    if (!encontrados.length) vazio(lista, "Nenhum livro encontrado.");

    encontrados.forEach(livro => {
        const emprestados = dados.emprestimos.filter(
            e => e.livroId === livro.id && !e.devolvido
        ).length;

        const item = criar("div");
        item.className = "item";
        item.append(
            criar("h3", livro.titulo),
            criar("p", "Autor: " + livro.autor),
            criar("p", "Categoria: " + livro.categoria),
            criar("p", "ISBN: " + (livro.isbn || "Não informado")),
            criar("p", "Quantidade: " + livro.quantidade),
            criar("p", "Disponíveis: " + (livro.quantidade - emprestados))
        );

        const acoes = criar("div");
        acoes.className = "acoes";
        acoes.append(
            criarBotao("Editar", "editar", () => editarLivro(livro.id)),
            criarBotao("Excluir", "excluir", () => excluirLivro(livro.id))
        );

        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

// ALUNOS
el("formAluno").addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = el("nomeAluno").value.trim();
    const matricula = el("matricula").value.trim();
    const turma = el("turma").value.trim();

    if (nome.length < 3 || !matricula || !turma) {
        alert("Preencha todos os dados do aluno.");
        return;
    }

    const existe = dados.alunos.some(a =>
        a.matricula.toLowerCase() === matricula.toLowerCase() &&
        a.id !== editandoAluno
    );

    if (existe) {
        alert("Esta matrícula já está cadastrada.");
        return;
    }

    if (editandoAluno) {
        const aluno = dados.alunos.find(a => a.id === editandoAluno);
        if (!aluno) return;

        Object.assign(aluno, { nome, matricula, turma });
        editandoAluno = null;
        el("btnAluno").textContent = "Cadastrar aluno";
        el("cancelarAluno").hidden = true;
    } else {
        dados.alunos.push({ id: idNovo(), nome, matricula, turma });
    }

    salvar();
    el("formAluno").reset();
    atualizar();
    alert("Aluno cadastrado com sucesso!");
});

function editarAluno(id) {
    const aluno = dados.alunos.find(a => a.id === id);
    if (!aluno) return;

    editandoAluno = id;
    el("nomeAluno").value = aluno.nome;
    el("matricula").value = aluno.matricula;
    el("turma").value = aluno.turma;
    el("btnAluno").textContent = "Salvar alterações";
    el("cancelarAluno").hidden = false;
}

el("cancelarAluno").addEventListener("click", () => {
    editandoAluno = null;
    el("formAluno").reset();
    el("btnAluno").textContent = "Cadastrar aluno";
    el("cancelarAluno").hidden = true;
});

function excluirAluno(id) {
    const ativo = dados.emprestimos.some(
        e => e.alunoId === id && !e.devolvido
    );

    if (ativo) {
        alert("Este aluno possui empréstimo ativo.");
        return;
    }

    if (!confirm("Deseja excluir este aluno?")) return;

    dados.alunos = dados.alunos.filter(a => a.id !== id);
    salvar();
    atualizar();
}

function renderAlunos() {
    const lista = el("listaAlunos");
    const busca = el("buscaAluno").value.toLowerCase().trim();
    lista.innerHTML = "";

    const encontrados = dados.alunos.filter(a =>
        a.nome.toLowerCase().includes(busca) ||
        a.matricula.toLowerCase().includes(busca) ||
        a.turma.toLowerCase().includes(busca)
    );

    if (!encontrados.length) vazio(lista, "Nenhum aluno encontrado.");

    encontrados.forEach(aluno => {
        const item = criar("div");
        item.className = "item";
        item.append(
            criar("h3", aluno.nome),
            criar("p", "Matrícula: " + aluno.matricula),
            criar("p", "Turma: " + aluno.turma)
        );

        const acoes = criar("div");
        acoes.className = "acoes";
        acoes.append(
            criarBotao("Editar", "editar", () => editarAluno(aluno.id)),
            criarBotao("Excluir", "excluir", () => excluirAluno(aluno.id))
        );

        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

// SELETORES
function atualizarSeletores() {
    const alunoSelect = el("alunoSelect");
    const livroSelect = el("livroSelect");

    const alunoAnterior = alunoSelect.value;
    const livroAnterior = livroSelect.value;

    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
    livroSelect.innerHTML = '<option value="">Selecione um livro</option>';

    dados.alunos.forEach(aluno => {
        const op = criar("option", aluno.nome + " - " + aluno.turma);
        op.value = aluno.id;
        alunoSelect.appendChild(op);
    });

    dados.livros.forEach(livro => {
        const emprestados = dados.emprestimos.filter(
            e => e.livroId === livro.id && !e.devolvido
        ).length;

        const disponiveis = livro.quantidade - emprestados;

        if (disponiveis > 0) {
            const op = criar("option",
                livro.titulo + " - " + disponiveis + " disponível(is)"
            );
            op.value = livro.id;
            livroSelect.appendChild(op);
        }
    });

    alunoSelect.value = alunoAnterior;
    livroSelect.value = livroAnterior;
}

// EMPRÉSTIMOS
el("dataEmprestimo").value = dataHoje();
el("dataDevolucao").value = dataHoje();

el("formEmprestimo").addEventListener("submit", evento => {
    evento.preventDefault();

    const alunoId = el("alunoSelect").value;
    const livroId = el("livroSelect").value;
    const data = el("dataEmprestimo").value;
    const prazo = el("dataDevolucao").value;

    const aluno = dados.alunos.find(a => a.id === alunoId);
    const livro = dados.livros.find(l => l.id === livroId);

    if (!aluno || !livro) {
        alert("Cadastre um aluno e um livro primeiro.");
        return;
    }

    if (!data || !prazo || prazo < data) {
        alert("Confira as datas do empréstimo.");
        return;
    }

    const emprestados = dados.emprestimos.filter(
        e => e.livroId === livroId && !e.devolvido
    ).length;

    if (emprestados >= livro.quantidade) {
        alert("Não há exemplares disponíveis.");
        return;
    }

    dados.emprestimos.push({
        id: idNovo(),
        alunoId,
        livroId,
        data,
        prazo,
        devolvido: false,
        dataDevolucao: ""
    });

    salvar();
    el("formEmprestimo").reset();
    el("dataEmprestimo").value = dataHoje();
    el("dataDevolucao").value = dataHoje();

    atualizar();
    alert("Empréstimo registrado com sucesso!");
});

// DEVOLUÇÃO
function devolver(id) {
    const emprestimo = dados.emprestimos.find(e => e.id === id);

    if (!emprestimo || emprestimo.devolvido) return;

    if (!confirm("Confirmar a devolução do livro?")) return;

    emprestimo.devolvido = true;
    emprestimo.dataDevolucao = dataHoje();

    salvar();
    atualizar();
    alert("Devolução registrada com sucesso!");
}

// HISTÓRICO
function renderEmprestimos() {
    const lista = el("listaEmprestimos");
    const busca = el("buscaEmprestimo").value.toLowerCase().trim();
    lista.innerHTML = "";

    const encontrados = [...dados.emprestimos].reverse().filter(e => {
        const aluno = dados.alunos.find(a => a.id === e.alunoId);
        const livro = dados.livros.find(l => l.id === e.livroId);

        return (aluno?.nome || "").toLowerCase().includes(busca) ||
               (livro?.titulo || "").toLowerCase().includes(busca);
    });

    if (!encontrados.length) vazio(lista, "Nenhum empréstimo registrado.");

    encontrados.forEach(e => {
        const aluno = dados.alunos.find(a => a.id === e.alunoId);
        const livro = dados.livros.find(l => l.id === e.livroId);

        const item = criar("div");
        item.className = "item";
        item.append(
            criar("h3", livro?.titulo || "Livro não encontrado"),
            criar("p", "Aluno: " + (aluno?.nome || "Não encontrado")),
            criar("p", "Empréstimo: " + formatarData(e.data)),
            criar("p", "Prazo: " + formatarData(e.prazo))
        );

        if (e.devolvido) {
            item.appendChild(criar("p",
                "Devolvido em: " + formatarData(e.dataDevolucao)
            ));
        } else {
            item.appendChild(criar("p", "Status: Em andamento"));

            const acoes = criar("div");
            acoes.className = "acoes";
            acoes.appendChild(
                criarBotao("Registrar devolução", "devolver", () => devolver(e.id))
            );
            item.appendChild(acoes);
        }

        lista.appendChild(item);
    });
}

// PAINEL
function atualizarPainel() {
    el("totalLivros").textContent = dados.livros.reduce(
        (total, livro) => total + livro.quantidade, 0
    );

    el("totalAlunos").textContent = dados.alunos.length;

    el("totalAtivos").textContent = dados.emprestimos.filter(
        e => !e.devolvido
    ).length;

    el("totalDevolvidos").textContent = dados.emprestimos.filter(
        e => e.devolvido
    ).length;

    const ultimos = el("ultimos");
    ultimos.innerHTML = "";

    const recentes = [...dados.emprestimos].reverse().slice(0, 5);

    if (!recentes.length) vazio(ultimos, "Nenhum empréstimo realizado.");

    recentes.forEach(e => {
        const aluno = dados.alunos.find(a => a.id === e.alunoId);
        const livro = dados.livros.find(l => l.id === e.livroId);

        const item = criar("div");
        item.className = "item";
        item.append(
            criar("h3", livro?.titulo || "Livro não encontrado"),
            criar("p", "Aluno: " + (aluno?.nome || "Não encontrado")),
            criar("p", e.devolvido ? "Devolvido" : "Em andamento")
        );
        ultimos.appendChild(item);
    });
}

// ATUALIZAÇÃO GERAL
function atualizar() {
    atualizarPainel();
    atualizarSeletores();
    renderLivros();
    renderAlunos();
    renderEmprestimos();
}

// PESQUISAS
el("buscaLivro").addEventListener("input", renderLivros);
el("buscaAluno").addEventListener("input", renderAlunos);
el("buscaEmprestimo").addEventListener("input", renderEmprestimos);

// INICIAR
atualizar();

console.log("Biblioteca Escolar iniciada!");
