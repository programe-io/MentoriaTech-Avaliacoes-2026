
const formulario = document.getElementById("formIdentidade");
const lista = document.getElementById("listaIdentidades");

// Carrega os dados salvos no navegador
let identidades = JSON.parse(
  localStorage.getItem("identidades")
) || [];

function salvarDados() {
  localStorage.setItem(
    "identidades",
    JSON.stringify(identidades)
  );
}

// Cria elementos HTML com segurança
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;

  return elemento;
}

// Cadastra uma nova identidade fictícia
formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const nascimento = document.getElementById("nascimento").value;
  const nacionalidade = document
    .getElementById("nacionalidade").value.trim();

  const campoFoto = document.getElementById("foto");
  const foto = campoFoto ? campoFoto.value.trim() : "";

  if (!nome || !nascimento || !nacionalidade) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  if (nascimento > new Date().toISOString().slice(0, 10)) {
    alert("A data de nascimento não pode ser futura!");
    return;
  }

  const identidade = {
    id: crypto.randomUUID(),
    numero: gerarNumero(),
    nome,
    nascimento,
    nacionalidade,
    foto
  };

  identidades.push(identidade);

  salvarDados();
  mostrarIdentidades();
  formulario.reset();

  alert("Identidade criada com sucesso!");
});

// Gera um identificador único no conjunto de cadastros
function gerarNumero() {
  let numero;

  do {
    numero = "ID-" + Math.floor(
      100000 + Math.random() * 900000
    );
  } while (identidades.some(item => item.numero === numero));

  return numero;
}

// Exibe os cartões
function mostrarIdentidades(dados = identidades) {
  lista.replaceChildren();

  if (dados.length === 0) {
    lista.appendChild(
      criarElemento("p", "vazio", "Nenhuma identidade encontrada.")
    );
    return;
  }

  dados.forEach(function(pessoa) {
    const cartao = criarElemento("article", "cartao");
    const topo = criarElemento("div", "cartao-topo");

    const foto = criarElemento("img");
    foto.alt = "Foto ilustrativa de " + pessoa.nome;

    // Imagem opcional
    foto.src = pessoa.foto || "https://placehold.co/100x120?text=FOTO";

    foto.addEventListener("error", function() {
      foto.removeAttribute("src");
      foto.alt = "Foto indisponível";
    });

    const informacoes = criarElemento("div");
    informacoes.append(
      criarElemento("h3", "", pessoa.nome),
      criarElemento("p", "numero", pessoa.numero)
    );

    topo.append(foto, informacoes);

    const dataFormatada = pessoa.nascimento
      .split("-")
      .reverse()
      .join("/");

    cartao.append(
      topo,
      criarElemento("p", "", "Nascimento: " + dataFormatada),
      criarElemento("p", "", "Nacionalidade: " + pessoa.nacionalidade),
      criarElemento(
        "p",
        "aviso",
        "IDENTIDADE FICTÍCIA — SEM VALIDADE OFICIAL"
      )
    );

    const botaoExcluir = criarElemento(
      "button",
      "excluir",
      "Excluir identidade"
    );

    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", function() {
      if (confirm("Deseja excluir esta identidade?")) {
        identidades = identidades.filter(
          item => item.id !== pessoa.id
        );

        salvarDados();
        mostrarIdentidades();
      }
    });

    cartao.appendChild(botaoExcluir);
    lista.appendChild(cartao);
  });
}

// Pesquisa por nome ou número
function pesquisarIdentidade(termo) {
  const pesquisa = termo.trim().toLowerCase();

  const resultados = identidades.filter(pessoa =>
    pessoa.nome.toLowerCase().includes(pesquisa) ||
    pessoa.numero.toLowerCase().includes(pesquisa)
  );

  mostrarIdentidades(resultados);
}

// Mostra os dados salvos ao abrir a página
mostrarIdentidades();
