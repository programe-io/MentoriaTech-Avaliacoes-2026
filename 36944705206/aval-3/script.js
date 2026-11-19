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
      } catch (erro) {
        console.error("Não foi possível salvar as pessoas:", erro);
      }
    }

    #notificar(persistir) {
      if (persistir) this.#persistir();
      const copia = this.todos;
      this.#ouvintes.forEach((ouvinte) => ouvinte(copia));
    }
  }

  /* ============================================================
   * 3. UTILITÁRIOS DE DOM
   * ============================================================ */
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);

  // Criador de elementos: evita innerHTML (e, com isso, injeção de HTML).
  const el = (tag, props = {}, ...filhos) => {
    const no = document.createElement(tag);
    for (const [chave, valor] of Object.entries(props)) {
      if (chave === "class") no.className = valor;
      else if (chave === "dataset") Object.assign(no.dataset, valor);
      else if (chave in no) no[chave] = valor;
      else no.setAttribute(chave, valor);
    }
    no.append(...filhos);
    return no;
  };

  /* ============================================================
   * 4. REFERÊNCIAS DO DOM
   * ============================================================ */
  const dom = {
    form: $("#formPessoa"),
    nome: $("#nome"),
    idade: $("#idade"),
    altura: $("#altura"),
    peso: $("#peso"),
    erro: $("#erro"),
    corpo: $("#corpoTabela"),
    cabecalho: $("#tabela thead tr"),
    topo: $(".principal-topo"),
    areaTabela: $(".tabela-area"),
  };

  /* ============================================================
   * 5. LEITURA DO FORMULÁRIO E MENSAGENS DE ERRO
   * ============================================================ */
  const lerNumero = (campo) =>
    campo.value.trim() === "" ? NaN : Number(campo.value.replace(",", "."));

  const lerFormulario = () => ({
    nome: dom.nome.value.trim().replace(/\s+/g, " "),
    idade: lerNumero(dom.idade),
    altura: lerNumero(dom.altura),
    peso: lerNumero(dom.peso),
  });

  const mostrarErro = (mensagem) => {
    dom.erro.textContent = mensagem;
    dom.erro.hidden = false;
  };

  const limparErro = () => {
    dom.erro.textContent = "";
    dom.erro.hidden = true;
  };

  /* ============================================================
   * 6. VISÃO: ordenação, busca, resumo e tabela
   * ============================================================ */
  const COLUNAS = Object.freeze([
    { chave: "nome",          valor: (p) => normalizar(p.nome) },
    { chave: "idade",         valor: (p) => p.idade },
    { chave: "altura",        valor: (p) => p.altura },
    { chave: "peso",          valor: (p) => p.peso },
    { chave: "imc",           valor: (p) => p.imc },
    { chave: "classificacao", valor: (p) => p.imc },
  ]);

  const estadoDaVisao = { busca: "", ordem: null }; // ordem: { chave, direcao }

  // Acrescenta IMC e classificação sem alterar o objeto salvo.
  const enriquecer = (p) => {
    const imc = calcularImc(p.peso, p.altura);
    return { ...p, imc, classificacao: classificarImc(imc) };
  };

  const prepararLista = (pessoas) => {
    const termo = normalizar(estadoDaVisao.busca.trim());
    let lista = pessoas.map(enriquecer);

    if (termo) {
      lista = lista.filter(
        (p) => normalizar(p.nome).includes(termo) || normalizar(p.classificacao.texto).includes(termo)
      );
    }

    if (estadoDaVisao.ordem) {
      const { chave, direcao } = estadoDaVisao.ordem;
      const { valor } = COLUNAS.find((c) => c.chave === chave);
      lista.sort((a, b) => {
        const va = valor(a);
        const vb = valor(b);
        return (va < vb ? -1 : va > vb ? 1 : a.id - b.id) * direcao;
      });
    }
    return lista;
  };

  const criarSelo = ({ texto, classe }) => el("span", { class: `selo ${classe}` }, texto);

  const criarLinha = (p) =>
    el(
      "tr",
      { dataset: { id: p.id } },
      el("td", {}, p.nome),
      el("td", {}, String(p.idade)),
      el("td", {}, `${formatar(p.altura, 2)} m`),
      el("td", {}, `${formatar(p.peso, 1)} KG`),
      el("td", {}, formatar(p.imc, 1)),
      el("td", {}, criarSelo(p.classificacao)),
      el("td", {}, el("button", { type: "button", class: "btn-apagar", dataset: { acao: "apagar" } }, "Apagar"))
    );

  const criarLinhaVazia = (temBusca) =>
    el(
      "tr",
      {},
      el(
        "td",
        { class: "vazio", colSpan: COLUNAS.length + 1 },
        temBusca ? "Nenhum paciente encontrado para essa busca." : "Nenhum paciente cadastrado ainda. Preencha a ficha ao lado."
      )
    );

  /* ---- Elementos criados por JS (busca e resumo) ---- */
  const campoBusca = el("input", {
    id: "busca",
    class: "busca",
    type: "search",
    placeholder: "Buscar por nome ou classificação",
    autocomplete: "off",
    "aria-label": "Buscar pacientes",
  });
  dom.topo.append(campoBusca);

  const resumo = el("section", { class: "resumo", "aria-label": "Resumo dos pacientes" });
  dom.areaTabela.before(resumo);

  const criarCartao = (rotulo, valor, classe = "") =>
    el("div", { class: `cartao ${classe}`.trim() }, el("strong", {}, valor), el("span", {}, rotulo));

  const atualizarResumo = (pessoas) => {
    const enriquecidas = pessoas.map(enriquecer);
    const media = enriquecidas.length
      ? enriquecidas.reduce((soma, p) => soma + p.imc, 0) / enriquecidas.length
      : null;

    const cartoes = [
      criarCartao("pacientes", String(enriquecidas.length)),
      criarCartao("IMC médio", media === null ? "–" : formatar(media, 1)),
      ...FAIXAS.map((faixa) =>
        criarCartao(faixa.texto, String(enriquecidas.filter((p) => p.classificacao === faixa).length), faixa.classe)
      ),
    ];
    resumo.replaceChildren(...cartoes);
  };

  /* ---- Cabeçalho: colunas ordenáveis e coluna de ações ---- */
  const prepararCabecalho = () => {
    [...dom.cabecalho.children].forEach((th, i) => {
      const coluna = COLUNAS[i];
      if (!coluna) return;
      th.classList.add("ordenavel");
      th.dataset.chave = coluna.chave;
      th.setAttribute("tabindex", "0");
      th.setAttribute("aria-sort", "none");
    });
    dom.cabecalho.append(el("th", { scope: "col" }, "Ações"));
  };

  const atualizarIndicadoresDeOrdem = () => {
    dom.cabecalho.querySelectorAll("th.ordenavel").forEach((th) => {
      const ativa = estadoDaVisao.ordem?.chave === th.dataset.chave;
      th.setAttribute("aria-sort", !ativa ? "none" : estadoDaVisao.ordem.direcao === 1 ? "ascending" : "descending");
    });
  };

  const alternarOrdem = (chave) => {
    const atual = estadoDaVisao.ordem;
    if (!atual || atual.chave !== chave) estadoDaVisao.ordem = { chave, direcao: 1 };
    else if (atual.direcao === 1) estadoDaVisao.ordem = { chave, direcao: -1 };
    else estadoDaVisao.ordem = null; // terceiro clique volta à ordem de cadastro
  };

  /* ---- Renderização ---- */
  const renderizar = (pessoas) => {
    const lista = prepararLista(pessoas);
    const fragmento = document.createDocumentFragment();

    if (lista.length === 0) fragmento.append(criarLinhaVazia(estadoDaVisao.busca.trim() !== ""));
    else lista.forEach((p) => fragmento.append(criarLinha(p)));

    dom.corpo.replaceChildren(fragmento);
    atualizarResumo(pessoas);
    atualizarIndicadoresDeOrdem();
  };

  /* ============================================================
   * 7. CONTROLADOR: liga tudo
   * ============================================================ */
  const repositorio = new Repositorio(CHAVE_PESSOAS);
  const redesenhar = () => renderizar(repositorio.todos);

  repositorio.assinar(renderizar);

  // Envio do formulário: ler -> validar -> adicionar.
  dom.form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dados = lerFormulario();
    const regraViolada = validar(dados);

    if (regraViolada) {
      mostrarErro(regraViolada.msg);
      dom[regraViolada.campo].focus();
      return;
    }

    limparErro();
    repositorio.adicionar(dados);
    dom.form.reset();
    dom.nome.focus();
  });

  // Some com o erro assim que a pessoa volta a digitar.
  dom.form.addEventListener("input", limparErro);

  // Delegação de eventos: um único ouvinte para todos os botões "Apagar".
  dom.corpo.addEventListener("click", (evento) => {
    const botao = evento.target.closest('[data-acao="apagar"]');
    if (!botao) return;

    // Confirmação em dois cliques: evita apagar sem querer.
    if (botao.dataset.armado === "sim") {
      repositorio.remover(Number(botao.closest("tr").dataset.id));
      return;
    }

    botao.dataset.armado = "sim";
    botao.textContent = "Confirmar?";
    setTimeout(() => {
      if (!botao.isConnected) return;
      delete botao.dataset.armado;
      botao.textContent = "Apagar";
    }, 3000);
  });

  // Ordenação por clique ou teclado (Enter/Espaço) no cabeçalho.
  const aoOrdenar = (evento) => {
    const th = evento.target.closest("th.ordenavel");
    if (!th) return;
    if (evento.type === "keydown" && evento.key !== "Enter" && evento.key !== " ") return;
    evento.preventDefault();
    alternarOrdem(th.dataset.chave);
    redesenhar();
  };
  dom.cabecalho.addEventListener("click", aoOrdenar);
  dom.cabecalho.addEventListener("keydown", aoOrdenar);

  // Busca em tempo real.
  campoBusca.addEventListener("input", () => {
    estadoDaVisao.busca = campoBusca.value;
    redesenhar();
  });

  // Mantém várias abas abertas sincronizadas.
  window.addEventListener("storage", (evento) => {
    if (evento.key === CHAVE_PESSOAS || evento.key === null) repositorio.sincronizar();
  });

  /* ============================================================
   * 8. INICIALIZAÇÃO
   * ============================================================ */
  prepararCabecalho();
  redesenhar();
})();