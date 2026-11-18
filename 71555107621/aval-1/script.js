document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('anamneseForm');
    const resumoContainer = document.getElementById('resumoContainer');
    const resumoConteudo = document.getElementById('resumoConteudo');

    // Inputs de cálculo
    const nascimentoInput = document.getElementById('nascimento');
    const sexoInput = document.getElementById('sexo');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const pasInput = document.getElementById('pas');
    const padInput = document.getElementById('pad');

    // Saídas dos cálculos em tempo real
    const resImc = document.getElementById('resImc');
    const resImcClass = document.getElementById('resImcClass');
    const resTmb = document.getElementById('resTmb');
    const resPam = document.getElementById('resPam');
    const resPaClass = document.getElementById('resPaClass');

    // 1. Máscaras de CPF e Telefone
    document.getElementById('cpf').addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });

    document.getElementById('telefone').addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = v;
    });

    // 2. Campos condicionais
    function toggleConditionalInput(radioName, inputId) {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const target = document.getElementById(inputId);
        radios.forEach(r => r.addEventListener('change', (e) => {
            target.style.display = e.target.value === 'Sim' ? 'block' : 'none';
            target.required = e.target.value === 'Sim';
            if (e.target.value !== 'Sim') target.value = '';
        }));
    }
    toggleConditionalInput('temAlergia', 'qualAlergia');
    toggleConditionalInput('usaMedicamento', 'qualMedicamento');

    // 3. Funções Matemáticas Clínicas
    function calcularIdade(dataNasc) {
        if (!dataNasc) return null;
        const hoje = new Date();
        const nasc = new Date(dataNasc);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const mes = hoje.getMonth() - nasc.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade >= 0 ? idade : null;
    }

    function calcularMetricas() {
        const peso = parseFloat(pesoInput.value);
        const alturaCm = parseFloat(alturaInput.value);
        const idade = calcularIdade(nascimentoInput.value);
        const sexo = sexoInput.value;
        const pas = parseFloat(pasInput.value);
        const pad = parseFloat(padInput.value);

        let dadosCalculados = {
            imc: '--',
            imcClassificacao: 'Não calculado',
            tmb: '--',
            pam: '--',
            paClassificacao: 'Não aferida'
        };

        // Cálculo de IMC
        if (peso > 0 && alturaCm > 0) {
            const alturaM = alturaCm / 100;
            const imc = peso / (alturaM * alturaM);
            dadosCalculados.imc = imc.toFixed(1) + ' kg/m²';

            resImcClass.className = '';
            if (imc < 18.5) {
                dadosCalculados.imcClassificacao = 'Abaixo do peso';
                resImcClass.classList.add('status-alerta');
            } else if (imc < 25) {
                dadosCalculados.imcClassificacao = 'Peso normal (Eutrófico)';
                resImcClass.classList.add('status-ok');
            } else if (imc < 30) {
                dadosCalculados.imcClassificacao = 'Sobrepeso';
                resImcClass.classList.add('status-alerta');
            } else if (imc < 35) {
                dadosCalculados.imcClassificacao = 'Obesidade Grau I';
                resImcClass.classList.add('status-perigo');
            } else if (imc < 40) {
                dadosCalculados.imcClassificacao = 'Obesidade Grau II';
                resImcClass.classList.add('status-perigo');
            } else {
                dadosCalculados.imcClassificacao = 'Obesidade Grau III';
                resImcClass.classList.add('status-perigo');
            }

            resImc.textContent = dadosCalculados.imc;
            resImcClass.textContent = dadosCalculados.imcClassificacao;
        } else {
            resImc.textContent = '--';
            resImcClass.textContent = 'Aguardando peso/altura';
            resImcClass.className = '';
        }

        // Cálculo de Taxa Metabólica Basal (Fórmula de Mifflin-St Jeor)
        if (peso > 0 && alturaCm > 0 && idade !== null) {
            let tmb = (10 * peso) + (6.25 * alturaCm) - (5 * idade);
            tmb += (sexo === 'Masculino') ? 5 : -161;
            dadosCalculados.tmb = Math.round(tmb) + ' kcal/dia';
            resTmb.textContent = dadosCalculados.tmb;
        } else {
            resTmb.textContent = '--';
        }

        // Cálculo de Pressão Arterial Média (PAM) e Classificação
        if (pas > 0 && pad > 0) {
            const pam = (pas + (2 * pad)) / 3;
            dadosCalculados.pam = Math.round(pam) + ' mmHg';
            resPam.textContent = dadosCalculados.pam;

            resPaClass.className = '';
            if (pas < 90 || pad < 60) {
                dadosCalculados.paClassificacao = 'Hipotensão';
                resPaClass.classList.add('status-alerta');
            } else if (pas < 120 && pad < 80) {
                dadosCalculados.paClassificacao = 'Pressão Normal';
                resPaClass.classList.add('status-ok');
            } else if (pas < 140 || pad < 90) {
                dadosCalculados.paClassificacao = 'Pré-hipertensão / Limítrofe';
                resPaClass.classList.add('status-alerta');
            } else {
                dadosCalculados.paClassificacao = 'Hipertensão Arterial';
                resPaClass.classList.add('status-perigo');
            }
            resPaClass.textContent = `${pas}x${pad} (${dadosCalculados.paClassificacao})`;
        } else {
            resPam.textContent = '--';
            resPaClass.textContent = 'Aguardando PA';
            resPaClass.className = '';
        }

        return dadosCalculados;
    }

    // Dispara cálculo em tempo real ao digitar ou alterar campos
    [pesoInput, alturaInput, nascimentoInput, sexoInput, pasInput, padInput].forEach(el => {
        el.addEventListener('input', calcularMetricas);
        el.addEventListener('change', calcularMetricas);
    });

    // 4. Gerar Ficha Completa
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const metricas = calcularMetricas();
        const idade = calcularIdade(nascimentoInput.value);
        const doencas = Array.from(document.querySelectorAll('input[name="doencas"]:checked'))
            .map(cb => cb.value);

        const dados = {
            data: new Date().toLocaleDateString('pt-BR'),
            nome: document.getElementById('nome').value,
            nascimento: nascimentoInput.value.split('-').reverse().join('/'),
            idade: idade,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            sexo: sexoInput.value,
            peso: pesoInput.value,
            altura: alturaInput.value,
            pa: (pasInput.value && padInput.value) ? `${pasInput.value}x${padInput.value} mmHg` : 'Não informada',
            metricas: metricas,
            queixa: document.getElementById('queixa').value,
            doencas: doencas.length ? doencas.join(', ') : 'Nenhuma relatada',
            alergia: document.querySelector('input[name="temAlergia"]:checked').value === 'Sim'
                ? document.getElementById('qualAlergia').value : 'Não possui',
            medicamento: document.querySelector('input[name="usaMedicamento"]:checked').value === 'Sim'
                ? document.getElementById('qualMedicamento').value : 'Não utiliza'
        };

        resumoConteudo.innerHTML = `
            <div class="resumo-item"><strong>Data:</strong> ${dados.data} | <strong>Paciente:</strong> ${dados.nome} (${dados.idade} anos - ${dados.sexo})</div>
            <div class="resumo-item"><strong>Nascimento:</strong> ${dados.nascimento} | <strong>CPF:</strong> ${dados.cpf} | <strong>Tel:</strong> ${dados.telefone}</div>
           
            <div class="resumo-grid">
                <div><strong>Peso / Altura:</strong><br>${dados.peso} kg / ${dados.altura} cm</div>
                <div><strong>IMC Calculado:</strong><br>${dados.metricas.imc} (${dados.metricas.imcClassificacao})</div>
                <div><strong>Taxa Metabólica Basal:</strong><br>${dados.metricas.tmb}</div>
                <div><strong>Pressão Arterial:</strong><br>${dados.pa}</div>
                <div><strong>PAM Calculada:</strong><br>${dados.metricas.pam}</div>
                <div><strong>Status Pressórico:</strong><br>${dados.metricas.paClassificacao}</div>
            </div>

            <div class="resumo-item"><strong>Queixa Principal:</strong> ${dados.queixa}</div>
            <div class="resumo-item"><strong>Histórico de Doenças:</strong> ${dados.doencas}</div>
            <div class="resumo-item"><strong>Alergias:</strong> ${dados.alergia}</div>
            <div class="resumo-item"><strong>Medicamentos:</strong> ${dados.medicamento}</div>

            <div style="margin-top: 40px; text-align: center;">
                <p>____________________________________________________</p>
                <p><small>Assinatura do Paciente / Responsável</small></p>
            </div>
        `;

        resumoContainer.classList.remove('hidden');
        resumoContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // 5. Botões Limpar e Imprimir
    document.getElementById('btnLimpar').addEventListener('click', () => {
        if (confirm('Limpar todos os campos?')) {
            form.reset();
            calcularMetricas();
            document.getElementById('qualAlergia').style.display = 'none';
            document.getElementById('qualMedicamento').style.display = 'none';
            resumoContainer.classList.add('hidden');
        }
    });

    document.getElementById('btnImprimir').addEventListener('click', () => window.print());
});
