Revisão de HTML e CSS
Sumário
1. Introdução
2. Ambiente de desenvolvimento e VS Code
3. Estrutura inicial do projeto
4. Estrutura básica de uma página HTML
5. Tags HTML e organização semântica
6. Textos, links e listas
7. Ligação entre HTML e CSS
8. Seletores e propriedades básicas do CSS
9. Box Model
10. Conclusão
1. Introdução
Nesta aula é realizada uma revisão prática dos principais conceitos de HTML e CSS apresentados
nas aulas anteriores.
A proposta é reunir os fundamentos necessários para criar uma página web simples, passando
pela preparação do ambiente de desenvolvimento, estruturação do HTML e aplicação dos primeiros
estilos com CSS.
A revisão é feita diretamente no código, permitindo relembrar como as duas tecnologias trabalham
em conjunto na construção de uma página web.
2. Ambiente de desenvolvimento e VS Code
Para começar a desenvolver páginas com HTML e CSS, é necessário utilizar um editor de texto ou
uma IDE.
IDE
IDE significa ambiente de desenvolvimento integrado. É um ambiente preparado para escrever
código e oferecer recursos que facilitam o trabalho durante o desenvolvimento.
Embora arquivos HTML e CSS possam ser escritos em editores de texto simples, uma IDE oferece
ferramentas específicas que tornam a criação e organização do código mais prática.
VS Code Online
A ferramenta utilizada na aula é o Visual Studio Code, ou VS Code. A versão online pode ser
acessada diretamente pelo navegador por meio do endereço vscode.dev, sem necessidade de
instalação.
No VS Code Online é possível abrir uma pasta do computador e trabalhar com os arquivos do
projeto diretamente pelo navegador.
Para organizar o projeto, a aula utiliza uma pasta chamada “revisão”, que é aberta dentro do VS
Code para concentrar todos os arquivos utilizados.

3. Estrutura inicial do projeto
O projeto apresentado na aula utiliza dois arquivos principais:
• index.html: arquivo principal da página e responsável pela estrutura do conteúdo.
• style.css: arquivo utilizado para definir os estilos e a aparência visual da página.
O nome index.html é utilizado como convenção para indicar o arquivo HTML principal de um
projeto. Já style.css ou styles.css são nomes comuns para o arquivo principal de estilos.
Domínio e hospedagem
Durante a revisão, também é apresentada a diferença entre trabalhar com arquivos localmente e
disponibilizar uma página na internet.
Para que outras pessoas consigam acessar um projeto pela internet, são apresentados dois
conceitos:
• Domínio: endereço utilizado pelas pessoas para localizar e acessar a página web.
• Hospedagem: local na internet onde os arquivos do projeto ficam armazenados.
O domínio funciona como o endereço de acesso, enquanto a hospedagem representa o local onde
os arquivos da página são disponibilizados.
4. Estrutura básica de uma página HTML
O HTML é apresentado como uma linguagem de marcação utilizada para estruturar e identificar o
papel de cada conteúdo de uma página.
No VS Code, a estrutura inicial de um documento HTML pode ser criada utilizando o atalho de
exclamação seguido de Tab.
Entre os principais elementos dessa estrutura estão:
• DOCTYPE: declaração inicial do documento HTML.
• html: elemento que envolve a estrutura da página.
• head: área destinada a informações e configurações utilizadas pelo navegador.
• body: área que contém o conteúdo que será exibido para o usuário.
Configurações no head
Dentro do head ficam informações como metadados, idioma da página, configurações de viewport
e o title.
O atributo de idioma pode ser configurado como pt-BR para indicar que o conteúdo da página está
em português do Brasil.
A tag title define o título exibido na aba do navegador.
Conteúdo no body
Tudo que deve aparecer visualmente para o usuário é colocado dentro do body. Após salvar o
arquivo, a página pode ser aberta no navegador para visualizar o resultado das alterações.
5. Tags HTML e organização semântica
As tags HTML são utilizadas para marcar e organizar os diferentes elementos da página.

Divisão genérica
A tag div representa uma divisão genérica. Ela pode ser utilizada para agrupar conteúdos, mas não
informa por si só qual é a função daquele agrupamento.
Tags semânticas
Sempre que possível, podem ser utilizadas tags que possuem um significado mais específico. Isso
facilita a leitura e a compreensão da estrutura do código.
• header: representa o cabeçalho da página.
• main: representa o conteúdo principal.
• footer: representa o rodapé.
• section: representa uma seção ou divisão de conteúdo dentro da página.
A utilização dessas tags torna a estrutura mais clara, pois o próprio nome do elemento ajuda a
identificar a função de cada parte da página.
6. Textos, links e listas
Os conteúdos textuais também devem ser organizados por meio de tags apropriadas, em vez de
serem inseridos de forma solta no documento.
Títulos
As tags de título vão de h1 até h6 e representam diferentes níveis de hierarquia.
O h1 representa o título principal, enquanto os demais níveis podem ser utilizados para organizar
subtítulos e conteúdos subordinados.
Parágrafos
A tag p é utilizada para textos comuns e parágrafos que não representam títulos.
Links
A tag a é utilizada para criar links. Ela pode receber atributos que controlam seu comportamento.
• href: define o endereço que será acessado pelo link.
• target: pode determinar como o endereço será aberto. Na aula é utilizado o valor _blank para
abrir o destino em outra aba.
Ao utilizar um endereço da internet no href, a aula também demonstra a inclusão do protocolo
https://.
Listas
O HTML permite criar listas ordenadas e não ordenadas.
• ul: cria uma lista não ordenada.
• ol: cria uma lista ordenada.
• li: representa cada item da lista.
Listas não ordenadas são exibidas com marcadores, enquanto listas ordenadas utilizam
numeração.

7. Ligação entre HTML e CSS
O HTML é responsável pela estrutura e marcação dos elementos, enquanto o CSS é utilizado para
controlar a aparência visual desses elementos.
Como os códigos ficam em arquivos separados, é necessário criar uma ligação entre o arquivo
HTML e o arquivo CSS.
Na aula, essa ligação é feita dentro do head por meio da tag link, indicando o arquivo style.css.
Depois que essa ligação é criada, as regras escritas no CSS passam a alterar a apresentação dos
elementos do HTML.
8. Seletores e propriedades básicas do CSS
Para aplicar um estilo no CSS, primeiro é necessário selecionar o elemento que será alterado.
Essa identificação é feita por meio de seletores.
Seletor por nome da tag
Uma das formas apresentadas é utilizar diretamente o nome de uma tag HTML como seletor. Ao
selecionar body, por exemplo, é possível aplicar estilos ao corpo da página.
Estrutura de uma regra CSS
Após o seletor, são utilizadas chaves para definir as propriedades e os valores que serão aplicados
ao elemento.
Entre as propriedades demonstradas estão:
• background-color: define a cor de fundo do elemento.
• color: define a cor do texto.
• text-align: controla o alinhamento do texto, podendo ser usado para centralizar ou alterar sua
posição.
Seletor universal e reset
O asterisco é apresentado como seletor universal, utilizado para selecionar todos os elementos da
página.
Na aula, ele é utilizado para zerar margin e padding que podem existir por padrão nos elementos,
além da configuração box-sizing: border-box.
Esse reset permite começar a estilização com maior controle sobre os espaçamentos dos
elementos.
9. Box Model
O Box Model representa propriedades relacionadas ao tamanho, bordas e espaçamentos dos
elementos HTML.
Na aula, o header é utilizado como exemplo para demonstrar visualmente essas propriedades.
Largura e altura
• width: controla a largura do elemento.
• height: controla a altura do elemento.
Os exemplos utilizam pixels como unidade de medida para definir esses valores.

Borda
A propriedade border permite configurar a borda do elemento. No exemplo da aula são definidos
largura, tipo e cor da borda.
Padding
Padding representa o espaço interno do elemento, ou seja, a distância entre sua borda e o
conteúdo que está dentro dele.
Margin
Margin representa o espaço externo do elemento, criando distância entre ele e os elementos que
estão ao seu redor.
Também é possível controlar o espaçamento de apenas um lado específico do elemento, utilizando
propriedades como margin-top, margin-bottom, margin-left e margin-right.
A diferença fundamental apresentada na aula é:
• padding: espaço interno, entre a borda e o conteúdo.
• margin: espaço externo, entre a borda e o que está fora do elemento.
10. Conclusão
A aula revisa os principais fundamentos necessários para estruturar e estilizar uma página web
utilizando HTML e CSS.
Os principais conceitos retomados foram:
• uso de uma IDE e do VS Code Online.
• criação dos arquivos index.html e style.css.
• estrutura básica de um documento HTML.
• diferença entre head e body.
• utilização de tags HTML semânticas.
• organização de títulos, parágrafos, links e listas.
• ligação entre HTML e CSS.
• seletores e propriedades básicas de estilização.
• funcionamento do Box Model, incluindo width, height, border, padding e margin.
Essa revisão consolida os conceitos apresentados anteriormente e prepara o aluno para aplicar
esses fundamentos em projetos práticos.