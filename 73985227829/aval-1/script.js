function calcular() {
        let salario = Number(document.getElementById("salario").value);
            let porcentagem = Number(document.getElementById("porcentagem").value);

                let economia = salario * (porcentagem / 100);

                    document.getElementById("resultado").innerHTML =
                            "Você poderá guardar R$ " + economia.toFixed(2) + " por mês.";
                            }<!DOCTYPE html><html lang="pt-BR">
                            <head>
                                <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Educação Financeira para Jovens</title><link rel="stylesheet" href="style.css">

                                        </head>
                                        <body><header>
                                            <h1>Educação Financeira para Jovens</h1>
                                                <p>Aprenda a administrar seu dinheiro e construir um futuro financeiro mais seguro.</p>
                                                </header><main><section>
                                                    <h2>O que é Educação Financeira?</h2>

                                                        <p>
                                                                Educação financeira é o conjunto de conhecimentos e habilidades que ajudam
                                                                        as pessoas a utilizar o dinheiro de forma consciente. Ela envolve planejamento,
                                                                                organização, controle de gastos, economia e investimentos.
                                                                                    </p>

                                                                                        <p>
                                                                                                Aprender sobre finanças desde cedo ajuda os jovens a tomar melhores decisões,
                                                                                                        evitar dívidas e alcançar objetivos pessoais e profissionais.
                                                                                                            </p>
                                                                                                            </section>

                                                                                                            <section>
                                                                                                                <h2>Por que a Educação Financeira é Importante?</h2>

                                                                                                                    <ul>
                                                                                                                            <li>Ajuda a controlar gastos desnecessários.</li>
                                                                                                                                    <li>Evita o endividamento.</li>
                                                                                                                                            <li>Estimula o hábito de poupar dinheiro.</li>
                                                                                                                                                    <li>Auxilia na realização de sonhos e metas.</li>
                                                                                                                                                            <li>Promove maior independência financeira.</li>
                                                                                                                                                                </ul>
                                                                                                                                                                </section>

                                                                                                                                                                <section>
                                                                                                                                                                    <h2>Dicas para Economizar Dinheiro</h2>

                                                                                                                                                                        <ul>
                                                                                                                                                                                <li>Anote todas as suas despesas.</li>
                                                                                                                                                                                        <li>Crie um orçamento mensal.</li>
                                                                                                                                                                                                <li>Evite compras por impulso.</li>
                                                                                                                                                                                                        <li>Compare preços antes de comprar.</li>
                                                                                                                                                                                                                <li>Reserve parte da sua renda para poupança.</li>
                                                                                                                                                                                                                        <li>Defina metas financeiras de curto e longo prazo.</li>
                                                                                                                                                                                                                            </ul>
                                                                                                                                                                                                                            </section>

                                                                                                                                                                                                                            <section>
                                                                                                                                                                                                                                <h2>Planejamento Financeiro</h2>

                                                                                                                                                                                                                                    <p>
                                                                                                                                                                                                                                            O planejamento financeiro consiste em organizar receitas e despesas para
                                                                                                                                                                                                                                                    alcançar objetivos específicos. Um bom planejamento permite saber exatamente
                                                                                                                                                                                                                                                            para onde o dinheiro está indo e como utilizá-lo de forma mais eficiente.
                                                                                                                                                                                                                                                                </p>

                                                                                                                                                                                                                                                                    <p>
                                                                                                                                                                                                                                                                            Mesmo pequenas economias realizadas mensalmente podem gerar resultados
                                                                                                                                                                                                                                                                                    significativos ao longo do tempo.
                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                        </section>

                                                                                                                                                                                                                                                                                        <section>
                                                                                                                                                                                                                                                                                            <h2>Calculadora de Economia</h2>

                                                                                                                                                                                                                                                                                                <p>
                                                                                                                                                                                                                                                                                                        Descubra quanto dinheiro você pode guardar por mês.
                                                                                                                                                                                                                                                                                                            </p>

                                                                                                                                                                                                                                                                                                                <label>Quanto você recebe por mês? (R$)</label>
                                                                                                                                                                                                                                                                                                                    <input type="number" id="salario">

                                                                                                                                                                                                                                                                                                                        <label>Qual porcentagem deseja economizar?</label>
                                                                                                                                                                                                                                                                                                                            <input type="number" id="porcentagem">

                                                                                                                                                                                                                                                                                                                                <button onclick="calcular()">Calcular</button>

                                                                                                                                                                                                                                                                                                                                    <p id="resultado"></p>
                                                                                                                                                                                                                                                                                                                                    </section>

                                                                                                                                                                                                                                                                                                                                    </main><footer>
                                                                                                                                                                                                                                                                                                                                        <p>Educação Financeira para Jovens</p>
                                                                                                                                                                                                                                                                                                                                        </footer><script src="script.js"></script></body>
                                                                                                                                                                                                                                                                                                                                        </html>
}