// 1. Seleciona os elementos do HTML que queremos manipular
const botaoSeguir = document.querySelector('.btn-follow');
const nomeUsuario = document.querySelector('.name').innerText;

// 2. Cria e adiciona um contador de seguidores dinamicamente via JS
const cardBody = document.querySelector('.card-body');
const contadorSeguidores = document.createElement('p');

let numeroSeguidores = 1420; // Quantidade inicial de seguidores
contadorSeguidores.innerText = `${numeroSeguidores} seguidores`;
contadorSeguidores.style.color = '#718096';
contadorSeguidores.style.fontSize = '14px';
contadorSeguidores.style.marginTop = '10px';

// Insere o contador logo antes do botão
cardBody.insertBefore(contadorSeguidores, botaoSeguir);

// 3. Estado inicial do botão (se o usuário já segue ou não)
let jaEstaSeguindo = false;

// 4. Função que será executada quando o botão for clicado
botaoSeguir.addEventListener('click', () => {
    
    if (!jaEstaSeguindo) {
        // Se NÃO está seguindo: muda para "Seguindo"
        botaoSeguir.innerText = 'Seguindo';
        botaoSeguir.style.backgroundColor = '#48bb78'; // Muda para verde
        numeroSeguidores++; // Soma 1 seguidor
        
        // Alerta opcional no navegador
        console.log(`Você começou a seguir ${nomeUsuario}!`);
    } else {
        // Se JÁ está seguindo: desfaz a ação (volta para "Seguir")
        botaoSeguir.innerText = 'Seguir';
        botaoSeguir.style.backgroundColor = '#667eea'; // Volta para o roxo original
        numeroSeguidores--; // Subtrai 1 seguidor
    }
    
    // Atualiza o texto do contador na tela
    contadorSeguidores.innerText = `${numeroSeguidores} seguidores`;
    
    // Inverte o estado (se era true vira false, se era false vira true)
    jaEstaSeguindo = !jaEstaSeguindo;
});