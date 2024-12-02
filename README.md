## Teste Técnico Favoritos Github 

Primeiro vou listar as tecnologias que usei: NextJs, Material Tailwind, Tailwind, Axios, Json-Server, Jest, Concurrently, Typescript.
O Json-Server eu usei para simular um servidor para persistir os dados e adicionar/remover favoritos em um arquivo Json.
Concurrently utilizei para rodar mais de um script de uma vez só.

De início, baixe as dependências com:
```bash
npm install
```
Para iniciar o projeto, basta rodar:

```bash
npm run dev
```
Aqui ele vai rodar tanto o front-end quanto a aplicação do Json-Server.
Front-End: [http://localhost:3000](http://localhost:3000)
API:  [http://localhost:5000](http://localhost:5000)

Uma vez rodando você poderá buscar, adiconar/remover favoritos e listar todos os repositórios salvos.
Para adicionar um repositório aos favoritos é só clicar no coração quando estiver cinza. Para remover, clicar novamente(coração verde).
A persistência de dados se dá em um arquivo json(db.json).
Responsividade para mobile.

Para rodar os testes Jest basta colocar:
```bash
npm run test
```
Assim, todos irão executar testando algumas chamadas de api que fiz ao longo do projeto.
Não precisei fazer autentição para exibir esses dados de repositórios do Github.
