bootstrap é um framework de css

por que usar?
 - Aumenta a produtividade, permitindo desenvolver ou prototipar intefaces rapidamente
 - Possui um poderoso e intuitivo sistema de grade, um dos fatores que ajudou a ser popular
 - requer pouco conhecimento aprofuncadado de css, sendo muito popular para o pessoal que nao gostam muito de css
 - pode ser usado de forma eficiente, customizada e modular atraves do SASS, garantindo flexibilidade e poder aos devs
 - é flexivel e pode ser usado em praticamente qualquer cenario de desenvolvimento front, mesmo usando react ou vue.js
 - é estavel e mantido pela comunidade

Sera que ainda vale a pena usar?
 - depende muito do projeto, pode nao ser a melhor opção
 - se nao for usado corretamente pode ser ineficiente e resultar em uma UI generica e derivada
 - o TaillWindCSS tem crescido muito em uso e caminha para se tornar o framework de css mais usado, mas, mesmo apos 10 anos o bootstrap ainda é uma escolha solida
 - frameworks de JS como react e vue, possuem seus proprios recursos e bibliotecas de UI que acabam se integrando melhor
 - Dito isso, o conhecimento adquirido ao aprender o boostrap pode ser facilmente transferido para outros frameworks, como o proprio tailwind

 Site: https://getbootstrap.com/

 modo 1 link no html-------------------------------------------------------------------------------
 pode ser instalado no projeto de diversas formas, a mais facil é por link no html

apos sua instalação, pode ser chamado por classes com propriedades especificas dentro das tags do html

<body class="bg-dark"></body> = deixa o backgorund em uma cor dark sem precisar criar isso no arquivo de css
ou <li class="m-4">teste</li> cria uma margin de 4

pode ser instalado para uso com webpack e vite
modo 2 webpack-------------------------------------------------------------------------------------
ao instalar com o webpack, precisa criar a pasta scss e dentro da pasta o styles.css
nesse arquivo colocar o @use "bootsrap/scss/boostrap" para informar que que ira usar todos os imports desse arquivo referenciado que esta em node_modules depois da instalação dos pacotes
depois ir no arquivo de JS, mais.js por exemplo, e atribuir import '../scss/styles.scss

depois ir no arquivo de configuração do webpack, e colar a parte que fala na documentação de module,rules,use,loader etc nesse arquivo

Link da DOC: https://getbootstrap.com/docs/5.3/getting-started/webpack/

modo 3 Vite --------------------------------------------------------------------------------------
no vite precisa ser instalado tambem
instalação do vite npm i --save-dev- vite

instalar o bootstrap
npm install bootstrap @popperjs/core

instalar sass
npm install --save-dev sass

com isso ele pula toda a configuração que precisa ser feita no webpack, pois o vite é bem mais facil de ser usado com o bootstrap.


pra começar usar o boostrap dessa forma
criar a pasta src, com o index na raiz
precisa criar o html, passar a tag script com type module e o arquivo JS
a pasta scss e pasta JS dentro da src
no style.scss dentro da pasta scss precisa fazer o import
no arquivo main.js import caminho/style.scss e import * as bootstrap from 'bootstrap'

com isso precisa criar ou editar o vite.config.js para que ele entenda esse padrao e rode normalmente

link da doc: https://getbootstrap.com/docs/5.3/getting-started/vite/



classess auxiliares e utilitarias ------------------------------------------------------------------
é a forma como se usa o bootstrap

no site https://getbootstrap.com/docs/5.3/getting-started/introduction/,
temos diversos exemplos e como usar cada classe pra atribuir a customização no html
por exemplo:
<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
aqui a div ganha a classe de alert, com cor de alert primaria

é possivel todas as customizações dessa forma incluindo flex e grid atraves do elemento pai como container e elementos filhos

é possivel usar tags de media queries tambem para setar breakpoint e ter o comportamento de responsividade

componentes do bootstrap---------------------------------------------------------------------------
https://getbootstrap.com/docs/5.3/components

Mesma regra das classes auxiliares e utilitarias, porem os elementos do html recebem uma estilização mais completa de componente

por exemplo eu crio uma ancora e atribuo a classe btn para ganhar o estilo de componente botao, com btn-primary para ganhar a cor primaria
<a class="btn btn-primary" href="#" role="button">Link</a>

no site informa sobre todos os estilos de componentes para ver o exemplo e copiar o codigo base