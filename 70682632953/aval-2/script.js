// Número atualizado do proprietário do estúdio
const NUMERO_PROPRIETARIO = "5589994616348"; 

let cacheAgendamento = {};

// Configuração inicial quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
    const campoData = document.getElementById('data');
        const hoje = new Date().toISOString().split('T')[0];
            // Define a data mínima do calendário como o dia de hoje
                campoData.min = hoje;
                });

                // Atualiza o select de procedimento e rola a tela até o formulário
                function selecionarProcedimento(id) {
                    const select = document.getElementById('procedimento');
                        select.value = id;
                            
                                document.getElementById('painel-ancora').scrollIntoView({ 
                                        behavior: 'smooth' 
                                            });
                                            }

                                            // Processa as informações inseridas no formulário e abre a janela de revisão (Modal)
                                            function processarFormulario(event) {
                                                event.preventDefault();

                                                    const nome = document.getElementById('nome').value;
                                                        const tel = document.getElementById('telefone').value;
                                                            const selectElement = document.getElementById('procedimento');
                                                                const estiloTexto = selectElement.options[selectElement.selectedIndex].text;
                                                                    const dataBruta = document.getElementById('data').value;
                                                                        const hora = document.getElementById('hora').value;

                                                                            // Transforma a data do formato AAAA-MM-DD para DD/MM/AAAA
                                                                                const dataInvertida = dataBruta.split('-').reverse().join('/');

                                                                                    // Salva temporariamente os dados digitados
                                                                                        cacheAgendamento = { nome, tel, estiloTexto, dataInvertida, hora };

                                                                                            // Insere os dados dentro do modal de confirmação
                                                                                                document.getElementById('recibo-nome').innerText = nome;
                                                                                                    document.getElementById('recibo-tel').innerText = tel;
                                                                                                        document.getElementById('recibo-estilo').innerText = estiloTexto;
                                                                                                            document.getElementById('recibo-data').innerText = dataInvertida;
                                                                                                                document.getElementById('recibo-hora').innerText = hora;

                                                                                                                    // Torna o modal visível na tela
                                                                                                                        document.getElementById('modalCheckout').classList.add('active');
                                                                                                                        }

                                                                                                                        // Oculta a tela de confirmação (Modal)
                                                                                                                        function fecharModal() {
                                                                                                                            document.getElementById('modalCheckout').classList.remove('active');
                                                                                                                            }

                                                                                                                            // Formata o texto final e redireciona o usuário para o WhatsApp da Lara Hair
                                                                                                                            function enviarParaWhatsApp() {
                                                                                                                                const mensagemFinal = 
                                                                                                                                        `Olá, Lara Hair! Quero confirmar meu agendamento:%0A%0A` +
                                                                                                                                                `• *Cliente:* ${encodeURIComponent(cacheAgendamento.nome)}%0A` +
                                                                                                                                                        `• *Contato:* ${encodeURIComponent(cacheAgendamento.tel)}%0A` +
                                                                                                                                                                `• *Serviço:* ${encodeURIComponent(cacheAgendamento.estiloTexto)}%0A` +
                                                                                                                                                                        `• *Data:* ${encodeURIComponent(cacheAgendamento.dataInvertida)}%0A` +
                                                                                                                                                                                `• *Horário:* ${encodeURIComponent(cacheAgendamento.hora)}`;

                                                                                                                                                                                    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_PROPRIETARIO}&text=${mensagemFinal}`;
                                                                                                                                                                                        
                                                                                                                                                                                            // Abre a conversa em uma nova aba do navegador
                                                                                                                                                                                                window.open(linkWhatsApp, '_blank');
                                                                                                                                                                                                    fecharModal();
                                                                                                                                                                                                    }