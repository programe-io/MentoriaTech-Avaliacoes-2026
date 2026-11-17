
let livros = JSON.parse(localStorage.getItem("bibliotecaLivros")) || [];
let emprestimos = JSON.parse(localStorage.getItem("bibliotecaEmprestimos")) || [];

let indiceEdicao = null;

const formLivro = document.getElementById("formLivro");
const formEmprestimo = document.getElementById("formEmprestimo");

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("bibliotecaLivros", JSON.stringify(livros));
    localStorage.setItem("bibliotecaEmprestimos", JSON.stringify(emprestimos));
}

// TROCAR DE TELA
function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(elemento => {
        elemento.classList.remove("ativa");
    });

    document.getElementById(tela).classList.add("ativa");

    atualizarSistema();
}

// CADASTRAR LIVRO
formLivro.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!codigo || titulo.length < 2 || !autor || !categoria ||
        !Number.isInteger(quantidade) || quantidade < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const codigoExiste = livros.some((livro, index) =>
        livro.codigo.toLowerCase() === codigo.toLowerCase() &&
        index !== indiceEdicao
    );

    if (codigoExiste) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (indiceEdicao !== null) {
        const livro = livros[indiceEdicao];

        const emprestados = livro.quantidade - livro.disponiveis;

        if (quantidade < emprestados) {
            alert("A quantidade não pode ser menor que os livros emprestados!");
            return;
        }

        livro.codigo = codigo;
        livro.titulo = titulo;
        livro.autor = autor;
        livro.categoria = categoria;
        livro.quantidade = quantidade;
        livro.disponiveis = quantidade - emprestados;

        indiceEdicao = null;
        document.getElementById("btnCadastrar").textContent = "Cadastrar Livro";

        alert("Livro atualizado com sucesso!");

    } else {
        livros.push({
            codigo,
            titulo,
            autor,
            categoria,
            quantidade,
            disponiveis: quantidade
        });

        alert("Livro cadastrado com sucesso!");
    }

    salvarDados();
    formLivro.reset();
    atualizarSistema();
});

// LISTAR LIVROS
function listarLivros() {
    const lista = document.getElementById("listaLivros");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    const filtrados = livros
        .map((livro, index) => ({ ...livro, index }))
        .filter(livro =>
            livro.titulo.toLowerCase().includes(pesquisa) ||
            livro.autor.toLowerCase().includes(pesquisa) ||
            livro.codigo.toLowerCase().includes(pesquisa)
        );

    document.getElementById("semLivros").style.display =
        filtrados.length === 0 ? "block" : "none";

    filtrados.forEach(livro => {
        const linha = document.createElement("tr");

        const dados = [
            livro.codigo,
            livro.titulo,
            livro.autor,
            livro.categoria,
            livro.quantidade,
            livro.disponiveis
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarLivro(livro.index);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirLivro(livro.index);

        acoes.append(editar, excluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

// EDITAR LIVRO
function editarLivro(index) {
    const livro = livros[index];

    document.getElementById("codigo").value = livro.codigo;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("categoria").value = livro.categoria;
    document.getElementById("quantidade").value = livro.quantidade;

    indiceEdicao = index;

    document.getElementById("btnCadastrar").textContent = "Salvar Alterações";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// EXCLUIR LIVRO
function excluirLivro(index) {
    const livro = livros[index];

    if (livro.disponiveis !== livro.quantidade) {
        alert("Não é possível excluir um livro que possui empréstimos ativos!");
        return;
    }

    if (confirm("Deseja realmente excluir este livro?")) {
        livros.splice(index, 1);

        salvarDados();
        atualizarSistema();
    }
}

// PESQUISAR LIVROS
document.getElementById("pesquisa").addEventListener("input", listarLivros);

// ATUALIZAR OPÇÕES DE LIVROS PARA EMPRÉSTIMO
function atualizarOpcoesLivros() {
    const select = document.getElementById("livroEmprestimo");

    select.innerHTML = '<option value="">Selecione um livro</option>';

    livros.forEach(livro => {
        if (livro.disponiveis > 0) {
            const opcao = document.createElement("option");
            opcao.value = livro.codigo;
            opcao.textContent = `${livro.titulo} (${livro.disponiveis} disponíveis)`;
            select.appendChild(opcao);
        }
    });
}

// REGISTRAR EMPRÉSTIMO
formEmprestimo.addEventListener("submit", function(event) {
    event.preventDefault();

    const aluno = document.getElementById("aluno").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const codigoLivro = document.getElementById("livroEmprestimo").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    const livro = livros.find(l => l.codigo === codigoLivro);

    if (!aluno || !matricula || !livro || !dataDevolucao) {
        alert("Preencha todos os campos!");
        return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const data = new Date(dataDevolucao + "T00:00:00");

    if (isNaN(data.getTime()) || data <= hoje) {
        alert("A data de devolução deve ser futura!");
        return;
    }

    if (livro.disponiveis <= 0) {
        alert("Este livro não está disponível!");
        return;
    }

    emprestimos.push({
        id: Date.now(),
        aluno,
        matricula,
        codigoLivro,
        tituloLivro: livro.titulo,
        dataDevolucao,
        devolvido: false
    });

    livro.disponiveis--;

    salvarDados();
    formEmprestimo.reset();
    atualizarSistema();

    alert("Empréstimo registrado com sucesso!");
});

// LISTAR EMPRÉSTIMOS
function listarEmprestimos() {
    const lista = document.getElementById("listaEmprestimos");

    lista.innerHTML = "";

    document.getElementById("semEmprestimos").style.display =
        emprestimos.length === 0 ? "block" : "none";

    emprestimos.forEach((emprestimo, index) => {
        const linha = document.createElement("tr");

        const dados = [
            emprestimo.aluno,
            emprestimo.matricula,
            emprestimo.tituloLivro,
            emprestimo.dataDevolucao
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const status = document.createElement("td");
        status.textContent = emprestimo.devolvido ? "Devolvido" : "Em aberto";
        status.className = emprestimo.devolvido ?
            "status-devolvido" : "status-ativo";

        linha.appendChild(status);

        const acao = document.createElement("td");
        acao.className = "acoes";

        if (!emprestimo.devolvido) {
            const botao = document.createElement("button");

            botao.textContent = "Devolver";
            botao.className = "devolver";
            botao.onclick = () => devolverLivro(index);

            acao.appendChild(botao);
        } else {
            acao.textContent = "Finalizado";
        }

        linha.appendChild(acao);
        lista.appendChild(linha);
    });
}

// DEVOLVER LIVRO
function devolverLivro(index) {
    const emprestimo = emprestimos[index];

    if (emprestimo.devolvido) return;

    const livro = livros.find(l => l.codigo === emprestimo.codigoLivro);

    if (!livro) {
        alert("Livro não encontrado!");
        return;
    }

    if (confirm("Confirmar a devolução deste livro?")) {
        emprestimo.devolvido = true;
        livro.disponiveis++;

        salvarDados();
        atualizarSistema();

        alert("Devolução registrada com sucesso!");
    }
}

// ATUALIZAR PAINEL
function atualizarDashboard() {
    const total = livros.reduce((soma, livro) => soma + livro.quantidade, 0);

    const disponiveis = livros.reduce(
        (soma, livro) => soma + livro.disponiveis, 0
    );

    const emprestados = total - disponiveis;

    const ativos = emprestimos.filter(e => !e.devolvido).length;

    document.getElementById("totalLivros").textContent = total;
    document.getElementById("disponiveis").textContent = disponiveis;
    document.getElementById("emprestados").textContent = emprestados;
    document.getElementById("totalEmprestimos").textContent = ativos;
}

// ATUALIZAR TODO O SISTEMA
function atualizarSistema() {
    listarLivros();
    listarEmprestimos();
    atualizarOpcoesLivros();
    atualizarDashboard();
}

// INICIAR SISTEMA
atualizarSistema();
