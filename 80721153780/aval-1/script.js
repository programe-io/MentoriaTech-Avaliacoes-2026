# Criando uma visualização com cores na tabela usando pandas styling
tabela_colorida = df_analise[['Produto', 'Código', 'Preço', 'Porcentagem (%)']].style.background_gradient(cmap='viridis', subset=['Porcentagem (%)'])

# Exibindo a tabela estilizada
display(tabela_colorida)