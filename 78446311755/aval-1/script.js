```javascript
let pizzaSelecionada = "";
let precoPizza = 0;
let carrinho = [];

function selecionar(el,nome,preco){

    el.classList.remove("animar");
    void el.offsetWidth;
    el.classList.add("animar");

    pizzaSelecionada = nome;
    precoPizza = preco;

    document.getElementById("pedido")
        .scrollIntoView({behavior:"smooth"});
}

function adicionar(){

    if(!pizzaSelecionada){
        alert("Escolha uma pizza!");
        return;
    }

    let tamanho = document.getElementById("tamanho");
    let adicional = Number(tamanho.value);

    carrinho.push({
        pizza:pizzaSelecionada,
        tamanho:tamanho.options[tamanho.selectedIndex].text,
        preco:precoPizza + adicional
    });

    mostrarCarrinho();
}

function mostrarCarrinho(){

    let html = "";
    let total = 0;

    carrinho.forEach((item,i)=>{
        html += `
        <p>
        🍕 ${item.pizza} - ${item.tamanho}
        R$ ${item.preco.toFixed(2)}
        <button onclick="remover(${i})">X</button>
        </p>`;

        total += item.preco;
    });

    document.getElementById("carrinho").innerHTML = html;

    document.getElementById("total").innerText =
        "Total: R$ " + total.toFixed(2);

    document.getElementById("qtdCart").innerText =
        carrinho.length;
}

function remover(i){

    carrinho.splice(i,1);
    mostrarCarrinho();
}

function verCarrinho(){

    document.getElementById("pedido")
        .scrollIntoView({behavior:"smooth"});
}

function finalizar(){

    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;

    if(!nome || !endereco){
        alert("Preencha nome e endereço!");
        return;
    }

    let total = carrinho.reduce(
        (soma,item)=>soma+item.preco,0
    );

    document.getElementById("comprovante").style.display="block";

    document.getElementById("comprovante").innerHTML = `
    <h2>🍕 COMPROVANTE</h2>

    <p><b>Cliente:</b> ${nome}</p>
    <p><b>Endereço:</b> ${endereco}</p>

    <hr>

    ${carrinho.map(item=>`
        <p>🍕 ${item.pizza} - ${item.tamanho}
        — R$ ${item.preco.toFixed(2)}</p>
    `).join("")}

    <h2>Total: R$ ${total.toFixed(2)}</h2>

    <p>✅ Pedido realizado com sucesso!</p>

    <button onclick="window.print()">
    🖨️ Imprimir comprovante
    </button>
    `;
}
```
