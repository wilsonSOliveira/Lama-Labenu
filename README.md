# `Projeto`
Projeto Lama


# `Descrição`
O Projeto Projeto Lama foi desenvolvido como uma atividade dentro do curso Full-Stack Web Developer da Labenu, o qual consiste na elaboração de uma API que retorna dados conforme as requisições enviadas. Trata-se de uma sistema para administração de um festival de música.

- ## User (usuário)

- id em formato string e gerado pela própria aplicação

- name em formato string

- email em formato string

- password: senha hasheada em formato string

- role: enum “NORMAL” ou “ADMIN”

## Show 

- id em formato string e gerado pela própria aplicação

- band em formato string representando o nome da banda 

- starts_at em formato string e representando a data do show

## Ticket

- id em formato string e gerado pela própria aplicação

- show_id formato string e representa o id de um show.

- user_id formato string e representa o id de um usuário.



A documentação da API pode ser acessada [aqui](https://documenter.getpostman.com/view/21555870/2s83tDqYHU).


# `Modo de usar`
As requisições que podem ser feitas são: 

- Cadastrar usuário, o usuário  precisa informar: o e-mail, nome a sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres.

- Login: basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar um token.

- Criar show, a partir do token de autenticação fornecido no login como ADMIN, pode criar um novo show fornecendo o nome da banda e a data do show.

- Mostrar todos os shows, a partir do token de autenticação fornecido no login, o usuário pode ver todos os shows e seus numeros de ingressos disponiveis .

- reservar ingresso , a partir do token de autenticação fornecido no login, o usuario pode comprar ingresso de um show, cada usuario só pode comprar um ingresso por show

- Cancelar reserva, a partir do token de autenticação fornecido no login, o usuario pode cancelar a reserva que tenha feito em um show


# `Instalando e rodando o projeto via clone`
Fazer o clone do projeto:
- git clone link-do-repositório

Instalar as dependências:
- npm install

Rodar o projeto:
- npm run start

# `Tecnologias utilizadas`
<div>
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white">
<img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white">
</div>

# `Criação de tabelas :`

``` sql 
CREATE TABLE Lama_Users (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );
```

``` sql 
CREATE TABLE Lama_Shows (
            id VARCHAR(255) PRIMARY KEY,
            band VARCHAR(255) NOT NULL,
            starts_at DATE NOT NULL
        );
```

``` sql 
CREATE TABLE Lama_Tickets (
            id VARCHAR(255) PRIMARY KEY,
            show_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Lama_Users(id),
            FOREIGN KEY (show_id) REFERENCES Lama_Shows(id)
        );
```

# `Autor`

Wilson Santos De Oliveira </br>
<a href="https://www.linkedin.com/in/wilson-santos-de-oliveira-5b1919116/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> <a href="https://github.com/wilsonsantos1992"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
