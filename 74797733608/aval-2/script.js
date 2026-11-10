class Tarefa {
    constructor(codigo, titulo, prioridade) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.prioridade = Number(prioridade);
        this.concluida = false;
    }
}

class SistemaTarefasUI {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1;

        this.inputTitulo = document.getElementById("titulo");
        this.selectPrioridade = document.getElementById("prioridade");
        this.btnCadastrar = document.getElementById("btnCadastrar");
        this.corpoTabela = document.getElementById("corpoTabela");
        this.tabela = document.getElementById("tabelaTarefas");
        this.feedbackVazio = document.getElementById("listaVazia");

        if (this.btnCadastrar) {
            this.btnCadastrar.addEventListener("click", () => this.lidarComCadastro());
        }
    }

    validarDados(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) {
            alert("⚠️ Erro: O título deve ter no mínimo 5 caracteres.");
            return false;
        }
        if (prioridade < 1 || prioridade > 3) {
            alert("⚠️ Erro: Prioridade inválida.");
            return false;
        }
        return true;
    }

    lidarComCadastro() {
        const titulo = this.inputTitulo.value;
        const prioridade = Number(this.selectPrioridade.value);

        if (!this.validarDados(titulo, prioridade)) return;

        const novaTarefa = new Tarefa(this.proximoCodigo++, titulo, prioridade);
        this.tarefas.push(novaTarefa);

        this.inputTitulo.value = "";
        this.renderizarPainel();
    }

    marcarComoConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.concluida = true;
            this.renderizarPainel();
        }
    }

    alterarPrioridade(codigo, novaPrioridade) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (tarefa) {
            tarefa.prioridade = Number(novaPrioridade);
            this.renderizarPainel();
        }
    }

    renderizarPainel() {
        this.corpoTabela.innerHTML = "";

        if (this.tarefas.length === 0) {
            this.feedbackVazio.classList.remove("hidden");
            this.tabela.classList.add("hidden");
            return;
        }

        this.feedbackVazio.classList.add("hidden");
        this.tabela.classList.remove("hidden");

        this.tarefas.forEach(tarefa => {
            const tr = document.createElement("tr");
            if (tarefa.concluida) {
                tr.classList.add("linha-concluida");
            }

            tr.innerHTML = `
                <td><strong>#${tarefa.codigo}</strong></td>
                <td>${tarefa.titulo}</td>
                <td>
                    <select class="select-tabela" ${tarefa.concluida ? 'disabled' : ''} onchange="sistemaUI.alterarPrioridade(${tarefa.codigo}, this.value)">
                        <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>1 - Alta</option>
                        <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>2 - Média</option>
                        <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>3 - Baixa</option>
                    </select>
                </td>
                <td>
                    <span class="${tarefa.concluida ? 'status-concluida' : 'status-pendente'}">
                        ${tarefa.concluida ? 'Concluída ✓' : 'Pendente ⏳'}
                    </span>
                </td>
                <td>
                    <button class="btn-concluir" ${tarefa.concluida ? 'disabled' : ''} onclick="sistemaUI.marcarComoConcluida(${tarefa.codigo})">
                        ${tarefa.concluida ? 'Feito' : 'Concluir'}
                    </button>
                </td>
            `;
            this.corpoTabela.appendChild(tr);
        });
    }
}

const sistemaUI = new SistemaTarefasUI();
