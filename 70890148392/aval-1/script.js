(function () {
  function iniciarEstoque() {
    "use strict";

    const CHAVE = "estoque_facil_produtos_v1";

    const form = document.getElementById("productForm");
    const codigoInput = document.getElementById("codigo");
    const descricaoInput = document.getElementById("descricao");
    const quantidadeInput = document.getElementById("quantidade");
    const valorInput = document.getElementById("valor");
    const feedback = document.getElementById("feedback");
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa");
    const totalProdutos = document.getElementById("totalProdutos");
    const totalUnidades = document.getElementById("totalUnidades");
    const valorEstoque = document.getElementById("valorEstoque");
    const contadorLista = document.getElementById("contadorLista");
    const statusText = document.getElementById("statusText");
    const modal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const editLabel = document.getElementById("editLabel");
    const editValue = document.getElementById("editValue");
    const editFeedback = document.getElementById("editFeedback");
    const closeButton = document.getElementById("closeEditButton");
    const cancelButton = document.getElementById("cancelEditButton");

    let produtos = [];
    let codigoEditando = null;
    let campoEditando = null;

    function moeda(valor) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(valor);
    }

    function mostrarMensagem(texto, tipo) {
      feedback.textContent = texto;
      feedback.className = "feedback " + tipo;
    }

    function salvar() {
      try {
        localStorage.setItem(CHAVE, JSON.stringify(produtos));
        statusText.textContent = "Sistema ativo · dados salvos";
      } catch (erro) {
        statusText.textContent = "Sistema ativo · sessão atual";
      }
    }

    function carregar() {
      try {
        const dados = JSON.parse(localStorage.getItem(CHAVE) || "[]");
        if (Array.isArray(dados)) {
          produtos = dados.filter(p =>
            p &&
            typeof p.codigo === "string" &&
            typeof p.descricao === "string" &&
            Number.isInteger(p.quantidade) &&
            p.quantidade >= 0 &&
            Number.isFinite(p.valor) &&
            p.valor >= 0
          );
        }
      } catch (erro) {
        produtos = [];
      }
    }

    function encontrar(codigo) {
      return produtos.find(p =>
        p.codigo.toLowerCase() === codigo.toLowerCase()
      );
    }

    function celula(texto, classe) {
      const td = document.createElement("td");
      td.textContent = texto;
      if (classe) td.className = classe;
      return td;
    }

    function atualizarTela() {
      totalProdutos.textContent = produtos.length.toLocaleString("pt-BR");

      const unidades = produtos.reduce((soma, p) => soma + p.quantidade, 0);
      const total = produtos.reduce((soma, p) => soma + p.quantidade * p.valor, 0);

      totalUnidades.textContent = unidades.toLocaleString("pt-BR");
      valorEstoque.textContent = moeda(total);

      const termo = pesquisa.value.trim().toLowerCase();
      const filtrados = produtos.filter(p =>
        p.codigo.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
      );

      contadorLista.textContent =
        filtrados.length + (filtrados.length === 1 ? " produto" : " produtos");

      lista.replaceChildren();

      if (filtrados.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.className = "empty-row";
        td.textContent = produtos.length === 0
          ? "Nenhum produto cadastrado. Utilize o formulário para começar."
          : "Nenhum produto encontrado para essa pesquisa.";
        tr.appendChild(td);
        lista.appendChild(tr);
        return;
      }

      filtrados.forEach(produto => {
        const tr = document.createElement("tr");
        const nomeTd = document.createElement("td");

        const nome = document.createElement("span");
        nome.className = "product-name";
        nome.textContent = produto.descricao;

        const codigo = document.createElement("span");
        codigo.className = "product-code";
        codigo.textContent = "Cód. " + produto.codigo;

        nomeTd.append(nome, codigo);

        const qtdTd = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = produto.quantidade === 0
          ? "quantity-badge out-of-stock"
          : "quantity-badge";
        badge.textContent = produto.quantidade.toLocaleString("pt-BR");
        qtdTd.appendChild(badge);

        const precoTd = celula(moeda(produto.valor), "money-cell");
        const totalTd = celula(moeda(produto.quantidade * produto.valor));
        const acoesTd = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "row-actions";

        [["valor", "Preço"], ["quantidade", "Qtd."]].forEach(item => {
          const botao = document.createElement("button");
          botao.type = "button";
          botao.className = "action-button";
          botao.textContent = item[1];
          botao.dataset.action = item[0];
          botao.dataset.code = produto.codigo;
          acoes.appendChild(botao);
        });

        acoesTd.appendChild(acoes);
        tr.append(nomeTd, qtdTd, precoTd, totalTd, acoesTd);
        lista.appendChild(tr);
      });
    }

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const codigo = codigoInput.value.trim();
      const descricao = descricaoInput.value.trim();
      const qtdTexto = quantidadeInput.value.trim();
      const valorTexto = valorInput.value.trim();
      const quantidade = Number(qtdTexto);
      const valor = Number(valorTexto);

      if (!codigo || !descricao) {
        mostrarMensagem("Preencha o código e a descrição.", "error");
        return;
      }

      if (encontrar(codigo)) {
        mostrarMensagem("Esse código já existe. Escolha outro.", "error");
        codigoInput.focus();
        return;
      }

      if (qtdTexto === "" || !Number.isInteger(quantidade) || quantidade < 0) {
        mostrarMensagem("Digite uma quantidade inteira igual ou maior que zero.", "error");
        quantidadeInput.focus();
        return;
      }

      if (valorTexto === "" || !Number.isFinite(valor) || valor < 0) {
        mostrarMensagem("Digite um preço válido, igual ou maior que zero.", "error");
        valorInput.focus();
        return;
      }

      produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: Math.round(valor * 100) / 100
      });

      salvar();
      form.reset();
      atualizarTela();
      mostrarMensagem("Produto " + codigo + " cadastrado com sucesso!", "success");
      codigoInput.focus();
    });

    pesquisa.addEventListener("input", atualizarTela);

    function abrirEdicao(produto, campo) {
      codigoEditando = produto.codigo;
      campoEditando = campo;

      editTitle.textContent = campo === "valor" ? "Alterar preço" : "Alterar quantidade";
      editDescription.textContent = produto.descricao + " · Código: " + produto.codigo;
      editLabel.textContent = campo === "valor" ? "Novo valor unitário (R$)" : "Nova quantidade";
      editValue.step = campo === "valor" ? "0.01" : "1";
      editValue.value = produto[campo];
      editFeedback.textContent = "";
      editFeedback.className = "feedback";
      modal.hidden = false;
      editValue.focus();
    }

    function fecharEdicao() {
      modal.hidden = true;
      codigoEditando = null;
      campoEditando = null;
    }

    lista.addEventListener("click", function (evento) {
      const botao = evento.target.closest("button[data-action]");
      if (!botao) return;

      const produto = encontrar(botao.dataset.code);
      if (produto) abrirEdicao(produto, botao.dataset.action);
    });

    editForm.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const produto = encontrar(codigoEditando);
      const texto = editValue.value.trim();
      const novoValor = Number(texto);

      if (!produto || texto === "" || !Number.isFinite(novoValor) || novoValor < 0) {
        editFeedback.textContent = "Digite um número válido igual ou maior que zero.";
        editFeedback.className = "feedback error";
        return;
      }

      if (campoEditando === "quantidade" && !Number.isInteger(novoValor)) {
        editFeedback.textContent = "A quantidade deve ser um número inteiro.";
        editFeedback.className = "feedback error";
        return;
      }

      produto[campoEditando] = campoEditando === "valor"
        ? Math.round(novoValor * 100) / 100
        : novoValor;

      salvar();
      fecharEdicao();
      atualizarTela();
      mostrarMensagem("Alteração salva com sucesso!", "success");
    });

    closeButton.addEventListener("click", fecharEdicao);
    cancelButton.addEventListener("click", fecharEdicao);

    modal.addEventListener("click", function (evento) {
      if (evento.target === modal) fecharEdicao();
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && !modal.hidden) fecharEdicao();
    });

    carregar();
    atualizarTela();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarEstoque);
  } else {
    iniciarEstoque();
  }
})();