// ==========================================================================
// 1. CLASSE DO SISTEMA DE EVIDÊNCIAS (ESTOQUE)
// ==========================================================================
class SistemaCBI {
  constructor() {
    this.arquivos = [];
  }

  // Cadastrar um novo item/evidência
  arquivarItem(codigo, descricao, quantidade, valor) {
    const itemExiste = this.arquivos.find(item => item.codigo.toLowerCase() === codigo.toLowerCase());
    
    if (itemExiste) {
      alert(`⚠️ INVESTIGAÇÃO INTERROMPIDA:\nO Código/ID "${codigo}" já foi registrado em outra ficha de evidência.`);
      return false;
    }

    this.arquivos.push({
      codigo: codigo.toUpperCase(),
      descricao,
      quantidade: Number(quantidade),
      valor: Number(valor)
    });
    
    return true;
  }

  // Alterar a quantidade do material
  atualizarQuantidade(codigo, novaQuantidade) {
    const item = this.arquivos.find(item => item.codigo === codigo);
    if (item) {
      item.quantidade = Number(novaQuantidade);
    }
  }

  // Alterar o valor estimado
  atualizarValor(codigo, novoValor) {
    const item = this.arquivos.find(item => item.codigo === codigo);
    if (item) {
      item.valor = Number(novoValor);
    }
  }
}

// Inicializa a agência de controle CBI
const agenciaCBI = new SistemaCBI();

// ==========================================================================
// 2. CAPTURA DE ELEMENTOS DA INTERFACE (DOM)
// ==========================================================================
const formEstoque = document.getElementById('form-estoque');
const listaEstoque = document.getElementById('lista-estoque');
const quadroVazio = document.getElementById('quadro-vazio');

// ==========================================================================
// 3. FUNÇÃO DE RENDERIZAÇÃO (ATUALIZAÇÃO DO QUADRO DE PISTAS)
// ==========================================================================
function atualizarQuadroDePistas() {
  // Limpa o quadro para redesenhar
  listaEstoque.innerHTML = '';
  
  // Se não houver itens, mostra o aviso clássico
  if (agenciaCBI.arquivos.length === 0) {
    quadroVazio.style.display = 'block';
    return;
  }
  
  // Oculta o aviso de quadro vazio
  quadroVazio.style.display = 'none';

  // Monta as linhas das evidências dinamicamente
  agenciaCBI.arquivos.forEach(item => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><span style="color: var(--cbi-gold); font-weight: bold;">🔍 ${item.codigo}</span></td>
      <td>${item.descricao}</td>
      <td>
        <input type="number" class="input-inline" min="0" value="${item.quantidade}" 
          onchange="modificarQuantidadeEvidencia('${item.codigo}', this.value)">
      </td>
      <td>
        <input type="number" class="input-inline" step="0.01" min="0" value="${item.valor.toFixed(2)}" 
          onchange="modificarValorEvidencia('${item.codigo}', this.value)">
      </td>
    `;

    listaEstoque.appendChild(tr);
  });
}

// ==========================================================================
// 4. EVENTOS E INTERAÇÕES DO USUÁRIO
// ==========================================================================

// Ouvinte para o formulário de arquivamento (Cadastro)
formEstoque.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que a página dê recarga

  // Coleta dados dos inputs
  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = document.getElementById('quantidade').value;
  const valor = document.getElementById('valor').value;

  // Tenta processar no sistema
  const sucesso = agenciaCBI.arquivarItem(codigo, descricao, quantidade, valor);

  if (sucesso) {
    atualizarQuadroDePistas(); // Atualiza a tabela na tela
    formEstoque.reset();       // Limpa a ficha em branco
    document.getElementById('codigo').focus(); // Foca de volta no ID
  }
});

// Funções globais disparadas quando os valores da tabela são alterados inline
function modificarQuantidadeEvidencia(codigo, novaQuantidade) {
  agenciaCBI.atualizarQuantidade(codigo, novaQuantidade);
  console.log(`[CBI Audit] Qtd da evidência ${codigo} alterada para ${novaQuantidade}`);
}

function modificarValorEvidencia(codigo, novoValor) {
  agenciaCBI.atualizarValor(codigo, novoValor);
  console.log(`[CBI Audit] Valor da evidência ${codigo} alterado para R$ ${novoValor}`);
}
