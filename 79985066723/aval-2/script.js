
const products = [
  {
      name: "Tênis Urban Premium",
          price: 189.90,
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                },
                  {
                      name: "Tênis Casual Branco",
                          price: 159.90,
                              image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
                                },
                                  {
                                      name: "Tênis Esportivo",
                                          price: 219.90,
                                              image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"
                                                },
                                                  {
                                                      name: "Tênis Streetwear",
                                                          price: 199.90,
                                                              image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"
                                                                }
                                                                ];

                                                                let cart = [];

                                                                const productList = document.getElementById("product-list");

                                                                products.forEach((product, index) => {
                                                                  productList.innerHTML += `
                                                                      <div class="product">
                                                                            <img src="${product.image}" alt="${product.name}">
                                                                                  <h3>${product.name}</h3>
                                                                                        <p>R$ ${product.price.toFixed(2).replace(".", ",")}</p>
                                                                                              <button onclick="addToCart(${index})">
                                                                                                      Comprar
                                                                                                            </button>
                                                                                                                </div>
                                                                                                                  `;
                                                                                                                  });

                                                                                                                  function addToCart(index) {
                                                                                                                    cart.push(products[index]);
                                                                                                                      updateCart();
                                                                                                                      }

                                                                                                                      function updateCart() {
                                                                                                                        document.getElementById("cart-count").textContent = cart.length;

                                                                                                                          document.getElementById("cart-items").innerHTML =
                                                                                                                              cart.map((item, index) => `
                                                                                                                                    <div class="cart-item">
                                                                                                                                            <strong>${item.name}</strong>
                                                                                                                                                    <p>R$ ${item.price.toFixed(2).replace(".", ",")}</p>
                                                                                                                                                            <button onclick="removeItem(${index})">Remover</button>
                                                                                                                                                                  </div>
                                                                                                                                                                      `).join("");

                                                                                                                                                                        const total = cart.reduce((sum, item) => sum + item.price, 0);

                                                                                                                                                                          document.getElementById("cart-total").textContent =
                                                                                                                                                                              total.toFixed(2).replace(".", ",");
                                                                                                                                                                              }

                                                                                                                                                                              function removeItem(index) {
                                                                                                                                                                                cart.splice(index, 1);
                                                                                                                                                                                  updateCart();
                                                                                                                                                                                  }

                                                                                                                                                                                  document.getElementById("cart-button").onclick = () => {
                                                                                                                                                                                    document.getElementById("cart-panel").classList.add("active");
                                                                                                                                                                                    };

                                                                                                                                                                                    document.getElementById("close-cart").onclick = () => {
                                                                                                                                                                                      document.getElementById("cart-panel").classList.remove("active");
                                                                                                                                                                                      };

                                                                                                                                                                                      document.getElementById("checkout").onclick = () => {
                                                                                                                                                                                        if (cart.length === 0) {
                                                                                                                                                                                            alert("Seu carrinho está vazio!");
                                                                                                                                                                                                return;
                                                                                                                                                                                                  }

                                                                                                                                                                                                    const telefone = "5589999999999";

                                                                                                                                                                                                      const lista = cart.map(item =>
                                                                                                                                                                                                          `${item.name} - R$ ${item.price.toFixed(2)}`
                                                                                                                                                                                                            ).join("\n");

                                                                                                                                                                                                              const total = cart.reduce((sum, item) => sum + item.price, 0);

                                                                                                                                                                                                                const mensagem = `Olá! Quero fazer um pedido:\n${lista}\nTotal: R$ ${total.toFixed(2)}`;

                                                                                                                                                                                                                  window.open(
                                                                                                                                                                                                                      `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
                                                                                                                                                                                                                          "_blank"
                                                                                                                                                                                                                            );
                                                                                                                                                                                                                            };
                                                                                                                                                                                                                            