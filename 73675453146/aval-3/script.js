let orderCount = 0;
let orderTotal = 0;

function addItem(name, price) {
  orderCount++;
  orderTotal += price;
  
  document.getElementById('item-count').innerText = orderCount;
  document.getElementById('total-val').innerText = orderTotal.toFixed(2);
}

function finishOrder() {
  if (orderCount === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert(`Pedido confirmado! Total: R$ ${orderTotal.toFixed(2)}`);
}