"use strict";

(() => {
  /* ============================================================
   * 1. CONFIGURAÇÃO E REGRAS DE NEGÓCIO (dados, não ifs soltos)
   * ============================================================ */
  const CHAVE_PESSOAS = "pessoas";

  // Faixas do IMC: a primeira cujo limite superior for maior que o IMC vence.
  const FAIXAS = Object.freeze([
    { ate: 18.5,     texto: "Abaixo do peso", classe: "azul" },
    { ate: 25,       texto: "Peso normal",    classe: "verde" },
    { ate: 30,       texto: "Sobrepeso",      classe: "amarelo" },
    { ate: Infinity, texto: "Obesidade",      classe: "vermelho" },
  ]);

  const calcularImc = (peso, altura) => peso / (altura * altura);
  const classificarImc = (imc) => FAIXAS.find((faixa) => imc < faixa.ate);

  // Formatadores criados uma única vez (Intl é caro de instanciar).
  const FORMATADORES = Object.fromEntries(
    [0, 1, 2].map((casas) => [
      casas,
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
      }),
    ])
  );
  const formatar = (valor, casas) => FORMATADORES[casas].format(valor);

  // Cada regra sabe qual campo valida, como testar e qual mensagem mostrar.
  const REGRAS = Object.freeze([
    {
      campo: "nome",
      testa: (d) => typeof d.nome === "string" && d.nome.length >= 2,
      msg: "Informe o nome com no mínimo duas letras.",
    },
    {
      campo: "idade",
      testa: (d) => Number.isInteger(d.idade) && d.idade >= 1 && d.idade <= 120,
      msg: "A idade deve ser um número inteiro entre 1 e 120.",
    },
    {
      campo: "altura",
      testa: (d) => Number.isFinite(d.altura) && d.altura >= 0.5 && d.altura <= 2.5,
      msg: "A altura deve estar entre 0,50 m e 2,50 m.",
    },
    {
      campo: "peso",
      testa: (d) => Number.isFinite(d.peso) && d.peso >= 2 && d.peso <= 500,
      msg: "O peso deve estar entre 2 kg e 500 kg.",
    },
  ]);

  // Retorna a primeira regra violada, ou null se estiver tudo certo.
  const validar = (dados) => REGRAS.find((regra) => !regra.testa(dados)) ?? null;

  const ehPessoaSalvaValida = (p) =>
    p !== null && typeof p === "object" && Number.isInteger(p.id) && validar(p) === null;

  // Remove acentos e caixa para a busca ser tolerante.
  const normalizar = (texto) =>
    texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

  /* ============================================================
   * 2. REPOSITÓRIO (estado + persistência + observadores)
   * ============================================================ */
  class Repositorio {
    #chave;
    #itens = [];
    #proximoId = 1;
    #ouvintes = new Set();

    constructor(chave) {
      this.#chave = chave;
      this.#carregarEmMemoria();
    }

    get todos() {
      return [...this.#itens];
    }

    adicionar(dados) {
      const pessoa = Object.freeze({ id: this.#proximoId++, ...dados });
      this.#itens.push(pessoa);
      this.#notificar(true);
      return pessoa;
    }

    remover(id) {
      const tamanhoAntes = this.#itens.length;
      this.#itens = this.#itens.filter((p) => p.id !== id);
      if (this.#itens.length !== tamanhoAntes) this.#notificar(true);
    }

    // Usado quando outra aba altera o localStorage.
    sincronizar() {
      this.#carregarEmMemoria();
      this.#notificar(false);
    }

    assinar(ouvinte) {
      this.#ouvintes.add(ouvinte);
      return () => this.#ouvintes.delete(ouvinte);
    }

    #carregarEmMemoria() {
      this.#itens = this.#lerDoStorage();
      // Garante que o próximo id seja sempre maior que qualquer id existente.
      this.#proximoId = this.#itens.reduce((maior, p) => Math.max(maior, p.id), 0) + 1;
    }

    #lerDoStorage() {
      try {
        const bruto = localStorage.getItem(this.#chave);
        if (bruto === null) return [];
        const dados = JSON.parse(bruto);
        if (!Array.isArray(dados)) throw new TypeError("O conteúdo salvo não é uma lista.");
        // Descarta registros corrompidos em vez de quebrar a aplicação.
        return dados.filter(ehPessoaSalvaValida).map((p) => Object.freeze({ ...p }));
      } catch (erro) {
        console.error("Não foi possível carregar as pessoas salvas:", erro);
        return [];
      }
    }

    #persistir() {
      try {
        localStorage.setItem(this.#chave, JSON.stringify(this.#itens));
      } catch (erro)