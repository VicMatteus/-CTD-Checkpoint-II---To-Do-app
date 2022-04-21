# Projeto 'To Do' - Checkpoint II ✔
## Projeto final da disciplina de front-end 2. Site com aplicativo To Do.
### Decidi pegar o projeto que foi apresentado e melhorá-lo para práticar. O primeiro upload do projeto aqui no git foi realizado quando ele estava pronto para ser apresentado, mas ainda haviam falhas, então, a fim de praticar e ter o projeto como um troféu, estou trabalhando nele. 👨🏽‍💻
MVP Checklist:

- Login (index.html)

  - [x] Campos devem ser obrigatórios
  - [x] Obter os dados preenchidos e realizar a chamada (fetch) de login
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Signup (signup.html)

  - [x] Campos devem ser obrigatórios
  - [x] Necessário validar igualdade dos campos senha e confirmar senha
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Tarefas (tarefas.html)

  - [x] Header: Obter dados do usuário para apresentar seu nome completo
  - [x] Header: Botão Finalizar Sessão remove o JWT do storage e redireciona para index.html (quando for clicado)
  - [x] Ao carregar a página, buscar as tarefas (get para /tasks) e exibir na lista
  - [x] Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
  - [x] Quando uma tarefa for adicionada, a lista de tarefas deve ser atualizada
  - [x] Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true

Melhorias:

- Identificar campos invalidos com CSS (ex. borda vermelha).
- Implementar minha validação de dados como login e senha no lado do cliente que fora removida.

---

Estrutura do projeto

Nosso projeto é baseado em HTML, sem utilização de modulos ou bundlers.

Pastas:

- assets: Contem os arquivos do projeto como imagens, fontes e vetores.
- scripts: Contem os arquivos javascript do projeto. Separados por tela.
