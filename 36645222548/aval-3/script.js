et registros = JSON.parse(localStorage.getItem('anamneses_v2')) || [];

const formFicha = document.getElementById('form-ficha');
const pesoEl = document.getElementById('pac-peso');
const altEl = document.getElementById('pac-alt');
const imcEl = document.getElementById('pac-imc');
const alergiaEl = document.getElementById('pac-alergia');
const remediosEl = document.getElementById('pac-remedios');
const painelAlertas = document.getElementById('painel-alertas');
const listaRegistros = document.getElementById('lista-registros');
const buscarFicha = document.getElementById('buscar-ficha');

const canvas = document.getElementById('canvas-assinatura');
const ctx = canvas.getContext('2d');
let desenhando = false;

function atualizarIMC() {
    const p = parseFloat(pesoEl.value);
    const a = parseFloat(altEl.value);
    if (p > 0 && a > 0) {
        imcEl.value = (p / (a * a)).toFixed(1);
    } else {
        imcEl.value = '';
    }
}

function atualizarAlertas() {
    const alertas = [];
    if (alergiaEl.value.trim()) alertas.push(Alergia: ${alergiaEl.value.trim()});
    if (remediosEl.value.trim()) alertas.push(Uso contínuo: ${remediosEl.value.trim()});

    if (alertas.length > 0) {
        painelAlertas.textContent = '⚠️ Atenção clínica — ' + alertas.join(' | ');
        painelAlertas.classList.remove('oculto');
    } else {
        painelAlertas.classList.add('oculto');
        painelAlertas.textContent = '';
    }
}

pesoEl.addEventListener('input', atualizarIMC);
altEl.addEventListener('input', atualizarIMC);
alergiaEl.addEventListener('input', atualizarAlertas);
remediosEl.addEventListener('input', atualizarAlertas);

// Controle do desenho da assinatura
function posCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

function iniciarTraco(e) {
    e.preventDefault();
    desenhando = true;
    const { x, y } = posCanvas(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function moverTraco(e) {
    if (!desenhando) return;
    e.preventDefault();
    const { x, y } = posCanvas(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function pararTraco() {
    desenhando = false;
}

canvas.addEventListener('mousedown', iniciarTraco);
canvas.addEventListener('mousemove', moverTraco);
window.addEventListener('mouseup', pararTraco);
canvas.addEventListener('touchstart', iniciarTraco, { passive: false });
canvas.addEventListener('touchmove', moverTraco, { passive: false });
window.addEventListener('touchend', pararTraco);

document.getElementById('btn-limpar-assinatura').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function limparFicha() {
    formFicha.reset();
    imcEl.value = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    atualizarAlertas();
}

formFicha.addEventListener('submit', (e) => {
    e.preventDefault();
    const novo = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        nome: document.getElementById('pac-nome').value.trim(),
        doc: document.getElementById('pac-doc').value.trim(),
        nasc: document.getElementById('pac-nasc').value,
        fone: document.getElementById('pac-fone').value.trim(),
        imc: imcEl.value,
        motivo: document.getElementById('pac-motivo').value.trim(),
        alergia: alergiaEl.value.trim(),
        remedios: remediosEl.value.trim(),
        assinatura: canvas.toDataURL()
    };

    registros.unshift(novo);
    localStorage.setItem('anamneses_v2', JSON.stringify(registros));
    limparFicha();
    renderRegistros();
});

function abrirRegistro(id) {
    const r = registros.find(item => item.id === id);
    if (!r) return;

    document.getElementById('pac-nome').value = r.nome;
    document.getElementById('pac-doc').value = r.doc;
    document.getElementById('pac-nasc').value = r.nasc;
    document.getElementById('pac-fone').value = r.fone;
    imcEl.value = r.imc;
    document.getElementById('pac-motivo').value = r.motivo;
    alergiaEl.value = r.alergia;
    remediosEl.value = r.remedios;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (r.assinatura) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = r.assinatura;
    }

    atualizarAlertas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function apagarRegistro(id) {
    registros = registros.filter(item => item.id !== id);
    localStorage.setItem('anamneses_v2', JSON.stringify(registros));
    renderRegistros();
}

function renderRegistros() {
    const termo = buscarFicha.value.trim().toLowerCase();
    const filtrados = registros.filter(r => r.nome.toLowerCase().includes(termo));

    document.getElementById('qtd-registros').textContent = registros.length;
    listaRegistros.innerHTML = '';

    filtrados.forEach(r => {
        const div = document.createElement('div');
        div.className = 'item-reg';
        div.innerHTML = `
            <div>
                <strong>${r.nome}</strong>
                <div style="font-size:0.82rem; color:#64748b;">${r.fone} • ${r.data}</div>
            </div>
            <div style="display:flex; gap:6px;">
                <button type="button" class="btn-pequeno btn-azul" onclick="abrirRegistro(${r.id})">Carregar</button>
                <button type="button" class="btn-pequeno" style="background:#fee2e2; color:#b91c1c;" onclick="apagarRegistro(${r.id})">Excluir</button>
            </div>
        `;
        listaRegistros.appendChild(div);
    });
}

document.getElementById('btn-limpar-ficha').addEventListener('click', limparFicha);
document.getElementById('btn-imprimir-ficha').addEventListener('click', () => window.print());
buscarFicha.addEventListener('input', renderRegistros);

renderRegistros();