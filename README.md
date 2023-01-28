# Ibet
Sistema de apostas em jogos de futebol.

# Setup
## VSCode
Versão de 2022 (`1.72` ou mais). [Link pra download](https://code.visualstudio.com/).
### Extensões para o VSCode
- GitLens versão `v13.0` ou mais.
- node-snipeets `v1.3` ou mais.
- Vue Language Features (Volar) `v1.0.9` ou mais.

## MySQL Workbench
- Versão `8.0` ou mais. [Link pra download](https://dev.mysql.com/downloads/workbench/).

## Node
Versão `18.12`é mais recomendada pelos usuários de acordo com o site de download. [Link pra download](https://nodejs.org/en/)

# Inicializando o projeto Node.Js

## Instalando as dependências

Para instalar as dependências, na raíz do projeto dê o seguinte comando `npm install`. 

Ao fazer a instalação do `npm` dentro do contexto do nosso projeto, será realizado o download dos pacotes e das dependências do projeto na pasta `node_modules` de acordo com o `package.json`, atualizando a versão do `package`.
## Rodando o projeto Node.Js
Abra o terminal na raíz do projeto e dê o seguinte comando: `node server.js`. Isso inicializará o servidor, que poderá ser acessado através da porta `3307` (`http://localhost:3307/` no navegador). 

### Testar cadastro
Para testar o cadastro numa tela já conectada, basta rodar o projeto seguindo os comandos acima e acessar: `http://localhost:3307/apostador`.
## Vue
Para instalar o a última versão do Vue abra o terminal no VScode e digite o comando `npm install -g @vue/cli` ou o comando `npm init vue@latest`, no entanto, caso escolha a segunda opção o Vue não só será instalado como irá iniciar a criação de um novo projeto, se o seu objetivo for só rodar o projeto já existente cancele a criação do novo projeto com `Ctrl+C`.
Você pode acessar a página da documentação Vue através do [Link](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).
### Inicialização do Projeto Vue
Para iniciar o Vue deste repositório no VScode abra o projeto no VScode, depois no terminal do próprio VScode modifique a pasta atual para a pasta do projeto Vue, no caso deste projeto a pasta se chama `view`, portanto dentro da pastra do Ibet use o comando `cd .\view\`, depois `npm run build` e inicie o servidor com o comando `npm run dev`. No terminal irá aparecer as mensagens: 
` ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose`
Com  esse endereço já é possível visualizar o projeto Vue, lembrando que o número da porta pode ser diferente, por isso use a porta disponibilizada.   
 

