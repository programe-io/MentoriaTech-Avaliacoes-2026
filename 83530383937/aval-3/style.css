import plotly.express as px

# Criando um gráfico de pizza interativo com Plotly
fig = px.pie(
    df_v2,
    values='Preço (R$)',
    names='Produto',
    title='Distribuição Percentual dos Preços de Mercado',
    color_discrete_sequence=px.colors.sequential.RdBu
)

# Atualizando o layout para exibir as porcentagens nas fatias
fig.update_traces(textinfo='percent+label')
fig.show()