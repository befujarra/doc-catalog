# Git e GitHub

## Controle de versão

Versionamento ajuda a reverter, alternar entre as versões e controlar todas as modificações feitas no projeto.

## Conceitos básicos

- **Repositório**: como nos referimos ao projeto como um todo; o diretório raiz a partir do qual serão monitoradas todas as alterações.
- **Commit**: é o ato de salvar uma ou mais alterações no código e também pode se referir ao conjunto dessas alterações.
- **Working tree**: é o espaço de trabalho onde você faz modificações nos arquivos do seu projeto. Quando você edita, cria ou deleta arquivos, essas mudanças acontecem na working tree.
- **Staging**: é a área de preparação onde as alterações são separadas para serem salvas em um commit, ou seja, ela permite escolher exatamente o que será salvo.
- **Branches**: são ramificações que podemos criar a partir de um ponto no histórico do projeto para trabalhar paralelamente, sendo assim possível trabalhar sem afetar a ramificação principal.

## Fluxo de trabalho básico

1. Para começar, precisamos inicializar um novo repositório a partir de um diretório.
2. Em seguida, podemos começar a modificar o conteúdo do repositório, ou seja, criar, modificar e excluir arquivos.
3. Para salvar essas modificações, primeiro precisamos adicioná-las à área de preparação (stage).
4. Depois de escolher os arquivos, damos commit nas alterações, gravando-as no repositório.
5. Pronto, temos a primeira versão.

### Status dos arquivos

- **U = untracked**: não rastreável (significa que é um arquivo novo que ainda não foi commitado).
- **A = adicionado**: arquivo já presente na área de stage.
- **M = modificado**: arquivo já rastreado que sofreu alterações.

## Comandos básicos

Você precisa estar dentro da pasta do projeto.
Se for a primeira vez usando, é necessário configurar e-mail e nome:

```bash
git config --global user.email "seu@email.com"
git config --global user.name "seu nome"
```

| Comando | Descrição |
| --- | --- |
| `git --version` | Verifica a versão do Git instalada. |
| `git init --help` | Mostra as descrições e comandos do `git init`. |
| `git init` | Inicia o repositório na pasta (cria a pasta oculta `.git`). |
| `git status` | Exibe a situação atual da working tree. |
| `git rm --cached nomeArquivo` | Faz com que o arquivo volte a não ser monitorado. |
| `git add .` | Adiciona todos os arquivos modificados ("M") e não rastreáveis ("U") à stage. |
| `git commit` | Registra as alterações preparadas no histórico do repositório de forma definitiva. |
| `git commit -m "mensagem"` | Faz o mesmo que `git commit`, porém com uma descrição do que foi feito. |
| `git restore` | Reverte as alterações em um arquivo, voltando-o para o último commit. |
| `git log` | Mostra o histórico de commits. |
| `git diff` | Mostra as alterações entre diferentes commits, entre o commit e a working tree, etc. |
| `git merge` | Integra mudanças entre branches. |

## Boas práticas de commits

- **Nomeie seus commits com cuidado**: use o `commit -m` com uma mensagem clara, explicando o que foi feito, para que quem olhar entenda facilmente o que você fez.
- Existe uma convenção de padrões de commits: <https://www.conventionalcommits.org/en/v1.0.0/>.
- Revise suas mudanças antes de commitá-las; teste localmente e execute também os testes automatizados.
- Faça commits pequenos e frequentes, para que a revisão seja melhor, a mensagem do commit seja mais explicativa e a reversão seja menos agressiva.
- Faça um commit após terminar uma pequena alteração.

## Tipos de versão (Semantic Versioning)

Formato: `MAJOR.MINOR.PATCH` (ex.: `0.0.0`).

Cada número tem o seu papel e significado:

- **MAJOR** (primeiro): indica uma nova funcionalidade ou mudanças grandes e significativas (geralmente quebra de compatibilidade).
- **MINOR** (segundo): melhorias e funcionalidades que não irão alterar o fluxo ou o comportamento geral da aplicação.
- **PATCH** (terceiro): correções de bugs e pequenas melhorias que não alteram funcionalidades.

## Branches

Branches são ramificações que permitem trabalhar em diferentes linhas de desenvolvimento dentro de um mesmo repositório.

Cada branch pode conter uma série de commits independentes, permitindo que os desenvolvedores trabalhem em funcionalidades ou correções sem interferir na branch principal.

- **Branch Main ou Master**: tronco da árvore.
- **Branches**: os galhos ligados ao tronco.

Elas ajudam a manter o histórico de desenvolvimento organizado e claro, além de facilitarem a colaboração entre devs, permitindo que cada um trabalhe em sua própria branch e depois integre (merge) as mudanças.

### Conceitos de branch

- **Branch principal** (Master ou Main): linha principal, onde fica o código limpo, sem erros, e que irá receber as mudanças das outras branches.
- **Branch de funcionalidade**: criada a partir da branch principal, ou seja, clona a branch principal, e nela você desenvolve uma funcionalidade. Depois, você faz um merge na branch principal, integrando suas mudanças após todos os testes e resultados positivos.
- **Branch de correção**: igual à de funcionalidade, mas voltada para correções.

### Exemplo real

Em projetos é comum ter mais de uma branch principal. Pode-se ter uma branch principal de qualidade e uma de desenvolvimento, além da main:

- **Main**: principal (produção).
- **Qualidade**: principal para testes.
- **Desenvolvimento**: com novas funcionalidades e correções antes de irem para testes.

### Trabalhando com branches — fluxo

1. Para criar uma nova branch, primeiro entre na branch que deseja clonar: `git checkout nome-da-branch`.
2. Depois, dentro da branch alvo, use `git checkout -b nome-da-branch-nova` para criar uma branch nova e já entrar nela, ou use `git branch nome-da-branch-nova` para apenas criar sem entrar nela.
   - **Dica**: use `git branch` para listar todas e ter o controle das que já existem.
3. Para integrar suas mudanças, entre na branch que irá receber as mudanças e use `git merge nome-da-branch-que-ira-enviar` para que a branch atual puxe todas as alterações.

Outros comandos úteis:

- `git branch --help`: mostra todos os comandos referentes a branch.
- `git branch -d nome-da-branch`: apaga branches que não serão mais usadas.
- `git branch -m novo-nome`: muda o nome da branch atual.


## Conflitos de merge

### O que são conflitos de merge

Conflitos de merge ocorrem quando o Git não consegue combinar automaticamente as mudanças de duas branches, geralmente por causa de alterações conflitantes no mesmo trecho de código.

### Como identificar conflitos

- O Git emite erro e informa os arquivos com conflito de merge.
- Os trechos conflitantes são marcados com os símbolos: `<<<<<<<`, `=======` e `>>>>>>>`.
- `git merge --abort`: cancela o merge em andamento.
- Após resolver os conflitos, use `git add` e `git commit` para finalizar — ou utilize as opções da própria IDE.

### Como evitar conflitos

- Comunicação regular com a equipe, para evitar trabalhar nos mesmos arquivos e trechos de código.
- Pulls frequentes para manter a branch sempre atualizada.
- Commits pequenos e frequentes.

## Repositórios remotos e GitHub

São versões do projeto hospedadas na internet. Elas permitem que você e os outros devs atuem no mesmo projeto a partir de diferentes locais.

- Facilitam o trabalho entre pessoas.
- Servem como backup do código, garantindo que ele não seja perdido caso algo aconteça com o projeto local.
- Possibilitam a integração contínua e outras práticas de DevOps.

O **GitHub** é uma plataforma de hospedagem de código-fonte para trabalhar com repositórios remotos. Oferece uma interface web amigável e várias ferramentas adicionais para colaboração, como pull requests, issues, wikis, kanban etc.

### Trabalhando com repositórios remotos

1. Clone do repositório: `git clone url-repo`.
2. Quando tiver commits que deseja integrar ao repositório, envie-os com `git push`: `git push nome-do-remote nome-da-branch`.
3. Quando quiser sincronizar com o repositório e manter o projeto local atualizado: `git pull nome-do-remote nome-da-branch`.

## SSH e setup inicial de repositório remoto

1. Crie a pasta do repositório local (projeto).
2. Entre na pasta pelo terminal.
3. Use `git init` para iniciar o repositório local.
4. Crie o `README.md` para usar como base de commit, pois o Git só começa após o primeiro commit.

```bash
git add README.md
git commit -m "commit inicial"
```

Em seguida, adicione o remoto e faça o push:

```bash
git remote add origin https://github.com/usuario/nomeDoRepositorio
git push origin master
```

### Configurando uma chave SSH

No GitHub, nas configurações de conta, há a opção **SSH and GPG keys**. Nessa opção você pode criar chaves para validar o uso do `git push`.

Para criar a chave no terminal:

```bash
ssh-keygen -C "email"
```

- Escolha o diretório.
- Crie uma senha.

Com isso, será salva uma chave SSH privada no diretório e também será gerada uma chave pública para ser registrada no GitHub.

Adicione a chave ao agente SSH:

```bash
ssh-add caminho-do-arquivo
```

Em seguida, digite a senha. A partir daí, ao clonar o repositório, utilize o modo SSH para o clone.

## Fork e contribuições em projetos

O **fork** funciona como um clone de um repositório para a sua conta. Você copia um repositório existente, porém mantendo a referência ao projeto raiz.

Dessa forma, é possível contribuir para o projeto original — prática muito usada em projetos de código aberto.

## Usando o `.gitignore`

Esse arquivo serve para indicar quais arquivos ou tipos de arquivos não devem ser considerados pelo Git — por exemplo, `node_modules` ou `.env`.

- Se ainda não existir no projeto, basta criar o arquivo na raiz com o nome `.gitignore` e indicar nele o que deve ser ignorado.
- Com isso, o próprio Git emite erro ao tentar adicionar esses arquivos à stage e commitá-los.
- Se quiser manter uma pasta vazia monitorada pelo Git, crie dentro dela um arquivo vazio chamado `.gitkeep`. Assim, a pasta com o conteúdo ignorado pode continuar sendo monitorada.

## Fluxo colaborativo

1. Clonar o repositório ou fazer o setup inicial.
2. Criar uma branch separada para trabalhar em alguma tarefa do projeto, a partir de uma branch inicial.
3. Mudar para a nova branch (`git checkout`) e fazer as alterações.
4. Preparar (`git add`) e, quando finalizar, guardar (`git commit`).
5. Após finalizar a tarefa, subir a branch para o repositório remoto e abrir um pull request (`git push origin branch`).
   - Para abrir o PR, depois de executar o push para a sua branch, vá ao GitHub, acesse a aba **Pull requests** e clique em **New pull request** — ou pule essas etapas clicando em **Compare & pull request**, que aparece em destaque nas páginas.
   - Em seguida, escolha qual branch irá receber (base) o código e qual branch irá enviar (compare): `base: master <- compare: sua-branch`.
   - O GitHub avisa se houver conflito.
   - Dê um nome ao PR.
   - Adicione uma descrição detalhada, normalmente seguindo um template adotado pelo time.
   - Se necessário, adicione um reviewer no lado direito.
   - Clique em **Create pull request**.
   - Se não houver automação nem aprovação obrigatória, no final da página estará disponível o botão **Merge pull request**.
   - Após o merge, delete a branch.
6. O líder do projeto aprova (ou não) o pull request e integra as alterações na branch principal (`git merge`).
7. Volte ao passo 2 e siga nesse loop.

> **Obs.:** se você ficar muito tempo em uma branch, volte à branch principal e dê `git pull`; depois retorne à sua branch e faça um `merge` para puxar as novas atualizações para ela.


