let estoque = {};

function cadastrar(){

    const codigo=document.getElementById("codigo").value.trim();
    const descricao=document.getElementById("descricao").value.trim();
    const quantidade=Number(document.getElementById("quantidade").value);
    const valor=Number(document.getElementById("valor").value);

    if(!codigo || !descricao){
        alert("Preencha todos os campos.");
        return;
    }

    if(estoque[codigo]){
        alert("Código já cadastrado.");
        return;
    }

    estoque[codigo]={
        descricao,
        quantidade,
        valor
    };

    limparCampos();
    listar();
}

function listar(){

    const lista=document.getElementById("lista");

    if(Object.keys(estoque).length===0){
        lista.innerHTML="<p>Nenhum produto cadastrado.</p>";
        return;
    }

    let html=`
    <table>
        <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Ações</th>
        </tr>
    `;

    for(let codigo in estoque){

        html+=`
        <tr>
            <td>${codigo}</td>
            <td>${estoque[codigo].descricao}</td>
            <td>${estoque[codigo].quantidade}</td>
            <td>R$ ${estoque[codigo].valor.toFixed(2)}</td>
            <td>
                <button onclick="editarQuantidade('${codigo}')">Qtd</button>
                <button onclick="editarValor('${codigo}')">Valor</button>
                <button onclick="remover('${codigo}')">Excluir</button>
            </td>
        </tr>
        `;
    }

    html+="</table>";

    lista.innerHTML=html;
}

function editarQuantidade(codigo){

    let nova=prompt("Nova quantidade:",estoque[codigo].quantidade);

    if(nova===null)return;

    estoque[codigo].quantidade=Number(nova);

    listar();
}

function editarValor(codigo){

    let novo=prompt("Novo valor:",estoque[codigo].valor);

    if(novo===null)return;

    estoque[codigo].valor=Number(novo);

    listar();
}

function remover(codigo){

    if(confirm("Deseja excluir este produto?")){

        delete estoque[codigo];

        listar();

    }

}

function limparCampos(){

    document.getElementById("codigo").value="";
    document.getElementById("descricao").value="";
    document.getElementById("quantidade").value="";
    document.getElementById("valor").value="";

}