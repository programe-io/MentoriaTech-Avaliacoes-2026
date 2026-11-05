// Função assíncrona para buscar dados de um CEP usando a API pública ViaCEP
async function buscarEndereco(cep) {
    // Remove qualquer caractere que não seja número
        const cepLimpo = cep.replace(/\D/g, '');

            // Validação básica do tamanho do CEP
                if (cepLimpo.length !== 8) {
                        console.error("❌ Erro: O CEP deve conter exatamente 8 números.");
                                return;
                                    }

                                        const url = `https://viacep.com.br{cepLimpo}/json/`;

                                            console.log(`🔍 Buscando informações para o CEP: ${cepLimpo}...`);

                                                try {
                                                        // Envia a requisição para a API externa e aguarda a resposta
                                                                const resposta = await fetch(url);
                                                                        
                                                                                // Verifica se a comunicação com o servidor deu certo
                                                                                        if (!resposta.ok) {
                                                                                                    throw new Error(`Erro na requisição: Status ${resposta.status}`);
                                                                                                            }

                                                                                                                    // Converte a resposta recebida para o formato JSON (objeto JavaScript)
                                                                                                                            const dados = await resposta.json();

                                                                                                                                    // A API do ViaCEP retorna { erro: "true" } se o CEP não existir
                                                                                                                                            if (dados.erro) {
                                                                                                                                                        console.warn("⚠️ Atenção: CEP não encontrado na base de dados.");
                                                                                                                                                                    return;
                                                                                                                                                                            }

                                                                                                                                                                                    // Desestrutura os dados recebidos para extrair apenas o que precisamos
                                                                                                                                                                                            const { logradouro, bairro, localidade, uf } = dados;

                                                                                                                                                                                                    // Exibe o resultado formatado de forma limpa
                                                                                                                                                                                                            console.log("\n✅ Endereço Encontrado com Sucesso!");
                                                                                                                                                                                                                    console.log(`📍 Rua: ${logradouro || "Não preenchido"}`);
                                                                                                                                                                                                                            console.log(`🏡 Bairro: ${bairro || "Não preenchido"}`);
                                                                                                                                                                                                                                    console.log(`🏙️ Cidade: ${localidade} - ${uf}`);

                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                // Captura qualquer erro de rede ou falha na execução
                                                                                                                                                                                                                                                        console.error("❌ Falha de conexão ao buscar o CEP:", erro.message);
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                            // ==========================================================================
                                                                                                                                                                                                                                                            // Executando a função (Você pode testar com qualquer CEP real)
                                                                                                                                                                                                                                                            // ==========================================================================
                                                                                                                                                                                                                                                            buscarEndereco("01001-000"); // Exemplo: Praça da Sé, São Paulo
                                                                                                                                                                                                                                                            