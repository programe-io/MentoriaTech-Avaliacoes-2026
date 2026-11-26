(() => {
  const STORAGE_KEY = "avaliacao_calculadora_imc_v1";

  const formImc = document.querySelector("#form-imc");
  const inputNome = document.querySelector("#input-nome-imc");
  const inputPeso = document.querySelector("#input-peso-imc");
  const inputAltura = document.querySelector("#input-altura-imc");
  const erroImc = document.querySelector("#erro-imc");

  const btnLimparCampos = document.querySelector("#btn-limpar-campos");
  const btnLimparHistorico = document.querySelector("#btn-limpar-historico");
  const corpoHistorico = document.querySelector("#corpo-historico-imc");

  const resultadoDestaque = document.querySelector("#resultado-destaque");
  const valorImcDestaque = document.querySelector("#valor-imc-destaque");
  const seloImcDestaque = document.querySelector("#selo-imc-destaque");

  let registros = carregarRegistros();

  function carregarRegistros() {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return [];
    try {
      const dados = JSON.parse(bruto);
      return Array.isArray(dados) ? dados : [];
    } catch {
      return [];
    }
  }

  function salvarRegistros() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
  }

  function proximoId() {
    if (registros.length === 0) return 1;
    const maiorId = registros.reduce((maior, item) => (item.id > maior ? item.id : maior), 0);
    return maiorId + 1;
  }

  function mostrarErro(mensagem) {
    erroImc.textContent = mensagem;
    erroImc.hidden = false;
  }

  function limparErro() {
    erroImc.textContent = "";
    erroImc.hidden = true;
  }

  function formatarNumero(valor, casas) {
    return Number(valor).toFixed(casas);
  }

  function classificarImc(imc) {
    if (imc < 18.5) {
      return { texto: "Abaixo do peso", classe: "selo-abaixo" };
    }
    if (imc < 25) {
      return { texto: "Peso normal", classe: "selo-normal" };
    }
    if (imc < 30) {
      return { texto: "Sobrepeso", classe: "selo-sobrepeso" };
    }
    return { texto: "Obesidade", classe: "selo-obesidade" };
  }

  function atualizarDestaque(imc, classificacao) {
    resultadoDestaque.hidden = false;
    valorImcDestaque.textContent = formatarNumero(imc, 2);
    seloImcDestaque.className = `selo-imc ${classificacao.classe}`;
    seloImcDestaque.textContent = classificacao.texto;
  }

  function render() {
    corpoHistorico.innerHTML = "";

    if (registros.length === 0) {
      const tr = document.createElement("tr");
      tr.className = "historico-vazio";

      const td = document.createElement("td");
      td.colSpan = 6;
      td.textContent = "Nenhuma avaliação salva ainda.";

      tr.appendChild(td);
      corpoHistorico.appendChild(tr);
      return;
    }

    registros.forEach((item) => {
      const tr = document.createElement("tr");
      tr.dataset.id = String(item.id);

      const tdNome = document.createElement("td");
      tdNome.textContent = item.nome;

      const tdPeso = document.createElement("td");
      tdPeso.textContent = `${formatarNumero(item.peso, 1)} kg`;

      const tdAltura = document.createElement("td");
      tdAltura.textContent = `${formatarNumero(item.altura, 2)} m`;

      const tdImc = document.createElement("td");
      tdImc.textContent = formatarNumero(item.imc, 2);

      const tdClass = document.createElement("td");
      const selo = document.createElement("span");
      selo.className = `selo-imc ${item.classe}`;
      selo.textContent = item.classificacao;
      tdClass.appendChild(selo);

      const tdAcao = document.createElement("td");
      const btnExcluir = document.createElement("button");
      btnExcluir.type = "button";
      btnExcluir.className = "btn-excluir-imc";
      btnExcluir.dataset.acao = "excluir";
      btnExcluir.textContent = "Excluir";
      tdAcao.appendChild(btnExcluir);

      tr.append(tdNome, tdPeso, tdAltura, tdImc, tdClass, tdAcao);
      corpoHistorico.appendChild(tr);
    });
  }

  formImc.addEventListener("submit", (event) => {
    event.preventDefault();
    limparErro();

    const nome = inputNome.value.trim();
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!nome) {
      mostrarErro("Preencha o nome antes de calcular.");
      inputNome.focus();
      return;
    }

    if (inputPeso.value === "" || Number.isNaN(peso) || peso <= 0) {
      mostrarErro("Informe um peso válido maior que zero.");
      inputPeso.focus();
      return;
    }

    if (inputAltura.value === "" || Number.isNaN(altura) || altura <= 0) {
      mostrarErro("Informe uma altura válida em metros (ex.: 1.75).");
      inputAltura.focus();
      return;
    }

    const imc = peso / (altura * altura);
    const info = classificarImc(imc);

    const novoRegistro = {
      id: proximoId(),
      nome,
      peso,
      altura,
      imc,
      classificacao: info.texto,
      classe: info.classe
    };

    registros.push(novoRegistro);
    salvarRegistros();
    atualizarDestaque(imc, info);
    render();
  });

  btnLimparCampos.addEventListener("click", () => {
    formImc.reset();
    limparErro();
    inputNome.focus();
  });

  corpoHistorico.addEventListener("click", (event) => {
    const botao = event.target.closest("button[data-acao='excluir']");
    if (!botao) return;

    const linha = botao.closest("tr");
    if (!linha) return;

    const id = Number(linha.dataset.id);
    registros = registros.filter((item) => item.id !== id);
    salvarRegistros();
    render();
  });

  btnLimparHistorico.addEventListener("click", () => {
    registros = [];
    resultadoDestaque.hidden = true;
    salvarRegistros();
    render();
  });

  render();
})();