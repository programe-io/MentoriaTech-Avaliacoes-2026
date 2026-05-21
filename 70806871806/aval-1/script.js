/**
 * ==========================================================================
 * SISTEMA COMPLETO DE GERENCIAMENTO DE TAREFAS (TO-DO LIST)
 * ==========================================================================
 */

// Usando o modo estrito para garantir um código mais seguro e limpo
"use strict";

/**
 * 1. CLASSE MODELO (Representa uma única tarefa)
 */
class Tarefa {
    constructor(id, texto, concluida = false) {
        this.id = id;
        this.texto = texto;
        this.concluida = concluida;
    }

    alternarStatus() {
        this.concluida = !this.concluida;
    }
}

/**
 * 2. CLASSE GERENCIADORA DA APLICAÇÃO (Controla a lógica e a tela)
 */
class GerenciadorTarefas {
    constructor() {
        // Carrega as tarefas salvas ou inicia um array vazio
        this.tarefas = this.carregarDoLocalStorage();
        
        // Mapeamento de elementos do HTML (DOM)
        this.inputTarefa = document.querySelector("#input-tarefa");
        this.btnAdicionar = document.querySelector("#btn-adicionar");
        this.listaTarefasElement = document.querySelector("#lista-tarefas");
        this.contadorElement = document.querySelector("#contador-tarefas");

        // Inicializa os ouvintes de eventos (Cliques, Teclado, etc)
        this.registrarEventos();
        
        // Renderiza as tarefas na tela pela primeira vez
        this.renderizar();
    }

    /**
     * Registra todas as interações do usuário
     */
    registrarEventos() {
        // Clique no botão de adicionar
        this.btnAdicionar.addEventListener("click", () => this.criarNovaTarefa());

        // Apertar a tecla "Enter" dentro do campo de texto
        this.inputTarefa.addEventListener("keypress", (evento) => {
            if (evento.key === "Enter") {
                this.criarNovaTarefa();
            }
        });

        // Evento delegado: Captura cliques dentro da lista (para excluir ou concluir)
        this.listaTarefasElement.addEventListener("click", (evento) => {
            const elementoClicado = evento.target;
            const idTarefa = Number(elementoClicado.closest("li")?.dataset.id);

            if (!idTarefa) return;

            // Se clicou no botão de excluir (tag <button> ou ícone)
            if (elementoClicado.classList.contains("btn-deletar")) {
                this.deletarTarefa(idTarefa);
            } 
            // Se clicou na caixa de seleção ou no texto
            else {
                this.alternarTarefa(idTarefa);
            }
        });
    }

    /**
     * Lógica para criar e validar uma nova tarefa
     */
    criarNovaTarefa() {
        const texto = this.inputTarefa.value.trim();

        // Validação simples: não aceita texto vazio
        if (texto === "") {
            alert("Por favor, digite alguma tarefa antes de adicionar!");
            return;
        }

        // Cria o objeto da tarefa com um ID único baseado no tempo atual
        const novaTarefa = new Tarefa(Date.now(), texto);
        
        this.tarefas.push(novaTarefa);
        this.salvarNoLocalStorage();
        this.renderizar();

        // Limpa o campo de texto e volta o foco para ele
        this.inputTarefa.value = "";
        this.inputTarefa.focus();
    }

    /**
     * Alterna o estado de concluída/pendente
     */
    alternarTarefa(id) {
        const tarefa = this.tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.alternarStatus();
            this.salvarNoLocalStorage();
            this.renderizar();
        }
    }

    /**
     * Remove uma tarefa do array
     */
    deletarTarefa(id) {
        // Filtra o array mantendo apenas as tarefas com ID diferente do deletado
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        this.salvarNoLocalStorage();
        this.renderizar();
    }

    /**
     * Atualiza a interface (HTML) com os dados mais recentes
     */
    renderizar() {
        // Limpa a lista atual para não duplicar
        this.listaTarefasElement.innerHTML = "";

        // Constrói cada item de tarefa em HTML dinamicamente
        this.tarefas.forEach(tarefa => {
            const li = document.createElement("li");
            li.dataset.id = tarefa.id;
            li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

            li.innerHTML = `
                <div class="conteudo-tarefa">
                    <input type="checkbox" ${tarefa.concluida ? "checked" : ""}>
                    <span>${tarefa.texto}</span>
                </div>
                <button class="btn-deletar" title="Excluir tarefa">&times;</button>
            `;

            this.listaTarefasElement.appendChild(li);
        });

        // Atualiza o contador de tarefas pendentes
        const pendentes = this.tarefas.filter(t => !t.concluida).length;
        this.contadorElement.textContent = `Tarefas pendentes: ${pendentes}`;
    }

    /**
     * Banco de dados local: Salva os dados no navegador do usuário
     */
    salvarNoLocalStorage() {
        localStorage.setItem("minhas_tarefas", JSON.stringify(this.tarefas));
    }

    /**
     * Recupera os dados convertendo de volta para instâncias da classe Tarefa
     */
    carregarDoLocalStorage() {
        const dadosSalvos = localStorage.getItem("minhas_tarefas");
        if (!dadosSalvos) return [];

        const arrayDados = JSON.parse(dadosSalvos);
        // Transforma os objetos genéricos do JSON de volta em objetos da classe Tarefa
        return arrayDados.map(t => new Tarefa(t.id, t.texto, t.concluida));
    }
}

// Inicializa a aplicação assim que o navegador terminar de carregar os elementos básicos
document.addEventListener("DOMContentLoaded", () => {
    window.app = new GerenciadorTarefas();
});