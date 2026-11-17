
const motos = [
  {
    id: 1,
    nome: "Honda CG 160 Fan",
    categoria: "street",
    descricao: "Econômica e confortável.",
    preco: 18990,
    imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    nome: "Yamaha MT-03",
    categoria: "esportiva",
    descricao: "Design moderno e esportivo.",
    preco: 32990,
    imagem: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    nome: "BMW G 310 GS",
    categoria: "trail",
    descricao: "Ideal para novas aventuras.",
    preco: 37900,
    imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    nome: "Kawasaki Ninja 400",
    categoria: "esportiva",
    descricao: "Potência e personalidade.",
    preco: 35990,
    imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    nome: "Honda XRE 300",
    categoria: "trail",
    descricao: "Conforto em diferentes caminhos.",
    preco: 29890,
    imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    nome: "Yamaha Fazer 250",
    categoria: "street",
    descricao: "Versátil para trabalho e lazer.",
    preco: 21990,
    imagem: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80"
  }
];

let carrinho = 0;

const grid = document.getElementById("productGrid");
const busca = document.getElementById("searchInput");
const filtro = document.getElementById("categoryFilter");
const contador = document.getElementById("cartCount");
const toast = document.getElementById("toast");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarMotos() {
  const termo = busca.value.toLowerCase();
  const categoria = filtro.value;

  const resultado = motos.filter(moto => {
    return (
      (categoria === "todas" || moto.categoria === categoria) &&
      moto.nome.toLowerCase().includes(termo)
    );
  });

  if (resultado.length === 0) {
    grid.innerHTML = "<p>Nenhuma moto encontrada.</p>";
    return;
  }

  grid.innerHTML = resultado.map(moto => `
    <div class="produto">
      <img src="${moto.imagem}" alt="${moto.nome}">
      <div class="produto-info">
        <h3>${moto.nome}</h3>
        <p class="descricao">${moto.descricao}</p>
        <p class="preco">${formatarPreco(moto.preco)}</p>
        <button class="adicionar" data-id="${moto.id}">
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  `).join("");
}

function mensagem(texto) {
  toast.textContent = texto;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

grid.addEventListener("click", function(evento) {
  const botao = evento.target.closest(".adicionar");

  if (!botao) return;

  const moto = motos.find(
    item => item.id === Number(botao.dataset.id)
  );

  carrinho++;
  contador.textContent = carrinho;

  mensagem(moto.nome + " adicionada ao carrinho!");
});

busca.addEventListener("input", mostrarMotos);
filtro.addEventListener("change", mostrarMotos);

document.getElementById("cartButton")
  .addEventListener("click", function() {
    mensagem(
      carrinho === 0
        ? "Seu carrinho está vazio."
        : "Você adicionou " + carrinho + " item(ns) ao carrinho."
    );
  });

document.getElementById("menuToggle")
  .addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("aberto");
  });

mostrarMotos();
