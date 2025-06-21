# Introdução

Informações básicas do projeto.

* **Projeto:** [PetMatch]
* **Repositório GitHub:** [https://github.com/ICEI-PUC-Minas-CC-TI/ti1-2025-1-t2-manha-petmatch]
* **Membros da equipe:**

  * [Artur Telles Martins da Costa](https://github.com/ScorpionCrush) 
  * [Bernardo Mendes Rocha​](https://github.com/bmrocha00)
  * [Bruno Mesquita Bicalho​](https://github.com/BrunoBicalho13)
  * [Maria Fernanda Oliveira Maro](https://github.com/mafemaro)
  * [Maria Luiza Gomes Beliene Vira​](https://github.com/marialuizabeliene)
  * [Pedro Italo Borges Cardoso​](https://github.com/Pedro-Italo-BC)
  * [Sofia de Abreu Botelho Romualdo​](https://github.com/sofiamasha)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

No Brasil, estima-se que existam mais de 30 milhões de animais abandonados, entre cães e gatos, segundo dados da Organização Mundial da Saúde (OMS). Apesar do aumento do interesse da população pela adoção, o processo ainda é burocrático, com etapas extensas e falta de padronização entre instituições. Esses obstáculos dificultam a adoção responsável, especialmente para pessoas que possuem menos tempo ou conhecimento sobre como adotar de forma segura e legal. 

Além disso, muitas ONGs relatam dificuldades em divulgar os animais resgatados e em manter uma comunicação eficaz com possíveis adotantes, agravando a situação de milhares de animais que permanecem sem lar.

## Objetivos

O PetMatch foi desenvolvido com o objetivo geral de facilitar, humanizar e tornar mais eficiente o processo de adoção de animais no Brasil. A plataforma conecta adotantes com ONGs e tutores de forma simples, intuitiva e acessível.

Objetivos específicos:

1. Reduzir a burocracia do processo de adoção, oferecendo uma experiência digital intuitiva e segura.
2. Fornecer informações completas sobre cada animal (saúde, comportamento e histórico), para auxiliar em uma decisão consciente.
3. Promover a educação sobre adoção responsável por meio de conteúdos informativos e dicas de cuidados com os animais.
4. Auxiliar ONGs na triagem de adotantes, por meio de um quiz interativo implementado, que analisa o perfil e estilo de vida do usuário, sugerindo o tipo de animal mais adequado ao seu contexto.
5. Planejar a futura implementação de recursos de comunicação direta, como chats e fóruns.


## Justificativa

Segundo o Instituto Pet Brasil (IPB), mais de 170 mil animais foram resgatados em apenas 2023 por ONGs e abrigos no país, com uma taxa de adoção abaixo da capacidade de acolhimento. Muitas dessas instituições enfrentam limitações estruturais e tecnológicas, o que dificulta a divulgação dos animais e a gestão dos adotantes.

Diante desse cenário, o PetMatch surge como uma solução prática e empática para a adoção de pets, conectando adotantes e responsáveis por meio de uma plataforma digital eficiente. A proposta é reduzir o tempo de adoção, aumentar a taxa de sucesso nas compatibilizações e oferecer suporte informativo para ambos os lados. 

Com recursos como filtros de busca, descrições detalhadas, e um quiz de compatibilidade disponível na plataforma, o PetMatch busca criar uma rede colaborativa que incentive a adoção consciente e proporcione melhor qualidade de vida aos animais resgatados. O sistema também prevê a implementação de funcionalidades futuras, como chats e fóruns comunitários.

Essa abordagem se baseia em dados de pesquisas de instituições como OMS, IPB e diversas ONGs nacionais que evidenciam a necessidade de inovação nos canais de adoção no Brasil.

## Público-Alvo

O PetMatch é voltado para diferentes perfis de usuários que participam do processo de adoção de animais de estimação, considerando níveis variados de experiência, necessidades e envolvimento com a causa animal. 

Entre os principais públicos estão os adotantes em potencial, que podem ser pessoas que nunca adotaram um animal antes ou aquelas com experiências prévias. Os adotantes iniciantes, em geral, buscam informações claras e apoio durante todo o processo. Esse grupo costuma valorizar recursos como dicas de cuidados, descrições detalhadas dos animais e fóruns de discussão com outras pessoas que passaram por experiências semelhantes. A plataforma é projetada para ser acessível, mesmo para quem tem pouca familiaridade com ferramentas digitais ou com o tema da adoção. 

Já os adotantes mais experientes demonstram maior domínio  dos desafios e responsabilidades da guarda responsável e costumam buscar eficiência e praticidade no processo. Para esse perfil, o PetMatch oferece funcionalidades que agilizam a busca e o contato com os responsáveis pelos animais, promovendo adoções mais rápidas e bem direcionadas.

Além dos adotantes, o público-alvo da plataforma inclui ONGs, protetores independentes e tutores temporários, que atuam no resgate e na oferta de animais para adoção. Essas instituições frequentemente enfrentam desafios como a escassez de recursos e dificuldades em encontrar adotantes comprometidos. Para contribuir nesse processo, o PetMatch oferece recursos como um quiz direcionado aos adotantes, que ajuda a identificar seu estilo de vida, preferências e ambiente domiciliar. Essas informações auxiliam as ONGs na análise de compatibilidade entre o perfil do adotante e as necessidades dos animais, visto que o adotante passa a ter uma base mais clara sobre qual tipo de animal melhor se adequa à sua rotina, promovendo, assim, adoções mais seguras e responsáveis.

# Product Discovery

## Etapa de Entendimento
![Matriz de Alinhamento-pets-1](https://github.com/user-attachments/assets/fb2b9e48-5481-4094-b91e-79714e04f36f)
![Stakeholders - pets_1-1](https://github.com/user-attachments/assets/9ee6c09b-c672-4b93-91dc-2f6b7f20b21a)

Entrevistas e Highlights de pesquisa:
[Entrevista Pets TI 11 (2).pdf](https://github.com/user-attachments/files/19658680/Entrevista.Pets.TI.11.2.pdf)
 

## Etapa de Definição

### Personas
Persona 1(Ana Paula):

![TI1-Pets (5)-1](https://github.com/user-attachments/assets/503cc8fa-9ad4-4b09-a1ad-1c108754d2d5)

Persona 2(Joana): 

![TI1-Pets (6)-1](https://github.com/user-attachments/assets/e97bece3-bf3c-49fb-a676-63cb350cb536)

Persona 3(Ricardo):

![TI1-Pets (7)-1](https://github.com/user-attachments/assets/e72ef470-d188-45c9-a401-ec5173bf5124)

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...            | QUERO/PRECISO ...                                              | PARA ...                                                         |
| --------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Ana Paula             | Uma descrição e foto do pet                                    | Encontrar um pet pra vida                                        |
| Ricardo               | Um método seguro e confiável para garantir um dono responsável | Garantir que os pets resgatados encontrem lares responsáveis     |
| Joana                 | Apoio/dicas de como fazer a adaptação do pet pós-adoção        | Facilitar a criação responsável do pet como um membro da família |
| Visitante do site     | Explorar os animais disponíveis para adoção                    | Encontrar um pet que combine com meu estilo de vida              |
| Adotante interessado  | Ver detalhes sobre saúde, comportamento e histórico do animal  | Fazer uma escolha consciente e segura                            |
| Novo usuário          | Responder um quiz com base no meu estilo de vida               | Receber sugestões de animais compatíveis comigo                  |
| Adotante frequente    | Favoritar animais                                              | Poder voltar e escolher com calma aquele que me interessar mais  |
| Representante de ONG  | Cadastrar novos animais com fotos e descrição                  | Aumentar as chances de adoção e agilizar o processo              |
| Usuário da plataforma | Visualizar onde o animal está localizado no mapa               | Avaliar se consigo ir até o local para buscar o pet pessoalmente |


## Proposta de Valor


##### Proposta para Persona 1(Ana Paula):

![TI1-Pets (5)-2](https://github.com/user-attachments/assets/31e5eb96-d06d-43fb-bffd-7a7d3d98c090)
##### Proposta para Persona 2(Joana):

![TI1-Pets (6)-1](https://github.com/user-attachments/assets/fa216fbb-e8a6-475d-bf3b-2585c0949dd5)
##### Proposta para Persona 3(Ricardo):

![TI1-Pets (7)-1](https://github.com/user-attachments/assets/3b5f2140-fd92-4569-9604-b3dc11e08527)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                 | Prioridade |
| ------ | ---------------------------------------------------------------------- | ---------- |
| RF-001 | Site precisa ter descrição e fotos dos pets                            | ALTA       |
| RF-002 | O site deve ter filtros para busca dos animais                         | ALTA       |
| RF-003 | Site deve permitir favoritar animais para fácil busca                  | ALTA       |
| RF-006 | Cadastro de pets para adoção                                           | ALTA       |
| RF-008 | Página de explorar animais                                             | ALTA       |
| RF-009 | Listagem de pets favoritados com botão para "ver pet" e "desfavoritar" | ALTA       |
| RF-010 | Página de gerenciamento dos pets (visualizar, contatar, adotar, etc.)  | ALTA       |
| RF-012 | Tela de gerenciamento e edição dos pets cadastrados                    | ALTA       |
| RF-007 | Página de dicas de cuidado para cada tipo de animal                    | MÉDIA      |
| RF-011 | Página de histórico do usuário (adoções, favoritos, ações, etc.)       | MÉDIA      |
| RF-013 | API de mapa com localização dos pets                                   | MÉDIA      |
| RF-014 | Wizard para recomendação de perfis de pets (quiz de compatibilidade)   | MÉDIA      |
| RF-015 | Página de notícias sobre adoção                                        | MÉDIA      |
| RF-016 | Página de eventos relacionados à adoção                                | MÉDIA      |
| RF-017 | Sistema de avaliações e comentários sobre a experiência na plataforma  | MÉDIA      |
| RF-018 | Funcionalidade de apadrinhamento de pets                               | MÉDIA      |
| RF-004 | Sistema de doações para auxílio dos adotantes (ração etc.)             | BAIXA      |



### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                                | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O site deve ser publicado em um ambiente acessível publicamente na Internet           | ALTA       |
| RNF-002 | Desenvolvimento em CSS/HTML/JS                                                        | ALTA       |
| RNF-003 | O sistema deve funcionar 24h por dia                                                  | ALTA       |
| RNF-005 | A interface deve utilizar linguagem clara, acessível e inclusiva para o público geral | ALTA       |
| RNF-007 | O sistema deve armazenar dados em formato estruturado e compatível com JSON Server    | ALTA       |
| RNF-004 | O site deverá ser responsivo, permitindo a visualização em celular de forma adequada  | MÉDIA      |



## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

![Favoritos](https://github.com/user-attachments/assets/ec5e630c-854d-4331-94c8-6aae97d709de)

Tela mostra a parte de favoritos de um usuário

![ExplorarPM1](https://github.com/user-attachments/assets/de3cce99-1642-4560-9c54-cef8fe3fd2d7)

Tela mostra o explorar de uma conta já logada

![FiltrosPM](https://github.com/user-attachments/assets/24a24de8-1482-43d5-a3b5-17b918355797)

Tela mostra os filtros de busca do site

![PaginaPrincipalPM1](https://github.com/user-attachments/assets/a32c153c-a0f9-4214-87e0-3341391c58b4)

Tela mostra a Página Principal do site quando não tem conta

![PrincipaLOGPM1](https://github.com/user-attachments/assets/043085fd-0e57-4f3a-8ebb-eca829e7d0a8)

Tela mostra a Página Principal do site quando tem conta

![LOGPM](https://github.com/user-attachments/assets/9cb5a785-7596-43e1-86bb-ed98377ce586)

Tela de Login/Sign up do site

![PetPM](https://github.com/user-attachments/assets/c4b4e1a2-31df-41fe-ab04-1d43d99640da)

Tela quando se clica no pet

![Cadastro](https://github.com/user-attachments/assets/aa26010c-ab4a-4c69-b7b2-1d0ffe9826b3)

Página de cadastro do usuario

![filtro](https://github.com/user-attachments/assets/29418fb1-9ba3-46be-bae3-bdfdfe58d4ec)

Página onde aparece os animais de acordo com o filtro do usuário

![Eventos](https://github.com/user-attachments/assets/899a1593-81f1-4ae1-9719-c58d0156e842)

Página de eventos 

![AvaSite](https://github.com/user-attachments/assets/e048bae4-9e61-43b4-9c16-2c42660f1ac8)

Página de avaliações do site

![CadastroPet](https://github.com/user-attachments/assets/38911751-9e7c-4e4d-94df-4139aeecc37f)

Página para cadastro de Pets

![Tutor](https://github.com/user-attachments/assets/58c5e2db-be3a-4dfa-8095-5b04d78eabd7)

Página de Tutor/ONGs

![Mapa](https://github.com/user-attachments/assets/0361bd6d-18a7-4b13-8d51-a0c3ce7c1d74)

Página dos mapas

![PetMapa](https://github.com/user-attachments/assets/629ccc4c-02e4-449c-b4f8-bcb6290a7be4)

Aba das descrições do Pet quando na página de mapa

![apadrinhar](https://github.com/user-attachments/assets/9df39ba7-847e-4a91-b305-6e729e44019a)

Página de apadrinhamento de pet

![Wizard](https://github.com/user-attachments/assets/b189833d-3223-4b69-a71a-9c49d8655a2d)

Página do wizard (quiz de compatibilidade)

![News](https://github.com/user-attachments/assets/8ff950b6-74f1-4dda-8f6c-9a83445d4504)

Página de notícias, com todas as notícias

![NewsDetail](https://github.com/user-attachments/assets/150da885-b7a0-431a-8a7a-58f2b92193c3)

Página de detalhes das notícias

### User Flow

![User Flow](https://github.com/user-attachments/assets/45220f02-83af-4c24-bfc7-6e521aa17507)

User Flow do site


### Protótipo Interativo

 * [Link do Figma](https://www.figma.com/file/A3Rsq52VzIq736pNw0g71G?node-id=0:1&locale=en&type=design)

# Metodologia

A equipe adotou uma metodologia ágil baseada no framework Scrum, estruturada em etapas que nos ajudaram a organizar o projeto com foco na experiência do usuário e na entrega contínua de valor.

Etapas da metodologia:
 * Levantamento de requisitos - Identificamos as necessidades dos usuários por meio de entrevistas, análise de problemas reais enfrentados no processo de adoção e definição das personas.

 *  Product Discovery - Validamos hipóteses e entendemos o valor que o produto deveria entregar, buscando evitar retrabalho e garantir foco no usuário da aplicação.

 * Planejamento - Definimos as funcionalidades do sistema, as tecnologias envolvidas e a distribuição de tarefas, utilizando ferramentas como o [Figma](https://www.figma.com/design/A3Rsq52VzIq736pNw0g71G/Pet-Match?node-id=0-1&p=f), [Miro](https://miro.com/app/board/uXjVIT5kwgQ=/) e o [Trello](https://trello.com/b/prnh2BZR/petmatch-kanban).

 * Design de interface - Desenvolvemos os protótipos de alta fidelidade no Figma, priorizando usabilidade, acessibilidade e identidade visual coerente com o público-alvo.
   
 * Validação - Os protótipos foram apresentados a professores e usuários-alvo, e os feedbacks foram incorporados antes do início da codificação, com ajustes em cores, logotipo e estrutura da interface.

### Acompanhamento das tarefas

Para o controle e acompanhamento das entregas, utilizamos o [quadro Kanban no Trello](https://trello.com/b/prnh2BZR/petmatch-kanban) e um grupo no Discord, ambos mantidos atualizados ao longo do projeto. As tarefas foram distribuídas entre os membros do grupo, seguindo o planejamento das sprints e permitindo o monitoramento contínuo do progresso.

### Papéis na equipe Scrum

- Product Owner: Maria Fernanda Oliveira Maro

- Scrum Master: Bruno Mesquita Bicalho

- Time de Desenvolvimento: 
  Artur Telles Martins da Costa
  Bernardo Mendes Rocha​
  Bruno Mesquita Bicalho
  Maria Fernanda Oliveira Maro​
  Maria Luiza Gomes Beliene Vira
  Pedro Italo Borges Cardoso​
  Sofia de Abreu Botelho Romualdo​

# Solução Implementada
Esta seção apresenta todos os detalhes da solução criada no projeto.

# Vídeo do Projeto
O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

# Vídeo do projeto

⚠️ APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO

O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem complicada e direta.

Inclua um link para o vídeo do projeto.

# Funcionalidades
Esta seção apresenta as funcionalidades da solução.Info

Funcionalidade 1 - Cadastro de Usuário
Permite que novos usuários se registrem para acessar as funcionalidades do sistema.

Estrutura de dados: user
Instruções de acesso:
Abrir o site sem conta.
Clicar em "Criar nova conta".
Escolher entre ser adotante ou doador.
Informar seu endereço.
Clicar em "Fazer cadastro". 
Utilizar o site.
Tela da funcionalidade:
![image](https://github.com/user-attachments/assets/471c5e7c-5bb8-45c4-89d4-be6767cb7c1f)
![image](https://github.com/user-attachments/assets/503bd703-8024-44ec-8335-5b863d464ab3)

Funcionalidade 2 - Login de Usuário
Permite que novos usuários se registrem para acessar as funcionalidades do sistema.

Estrutura de dados: user
Instruções de acesso:
Abrir o site sem estar logado em uma conta.
Preencher suas informações de usuário.
Clicar em "Fazer login". 
Utilizar o site.
Tela da funcionalidade:
![image](https://github.com/user-attachments/assets/03b66823-40d6-402f-b97a-3e44593d3e01)

Funcionalidade 3 - Cadastro de Pets
ONGs ou tutores podem registrar novos animais no sistema.

Estrutura de dados: pet
Instruções de acesso:

Efetue login como doador.
Clique no botão “Colocar para adoção”.
Preencha o formulário e clique em “Colocar para adoção”.
Clique em "Meus pets".
Os pets são listados com opções de editar ou excluir.

Tela da funcionalidade:
Tela de Funcionalidade

Funcionalidade 4 - Edição e remoção de Pets
Permite alterar ou excluir um pet previamente cadastrado.

Estrutura de dados: pet
Instruções de acesso:

Efetue login como doador.
Clique em "Meus pets".
Os pets são listados com opções de editar ou excluir.
Clique na opção desejada.
Caso tenha clicado em "editar":
Preencha todas as informações do Pet, até as que não irão sofrer alterações.
Clique em "Salvar".

Tela da funcionalidade:
Tela de Funcionalidade

Funcionalidade 5 – Exploração de Pets sem Filtros
Permite aos usuários navegar por todos os pets.
Estrutura de dados: pet
Instruções de acesso:

Clicar em home.
Ver todos os animais disponíveis no site.

Tela da funcionalidade:


Funcionalidade 6 – Exploração de Pets com Filtros
Permite aos usuários navegar por todos os pets utilizando filtros.
Estrutura de dados: pet
Instruções de acesso:

Clicar em categorias.
Selecionar os filtros desejados (Animal , Tamanho).
Ver todos os animais que se encaixam no filtro.

Tela da funcionalidade:

Funcionalidade 7 – Favoritar Pets
Usuários logados podem favoritar pets para consulta posterior.
Estrutura de dados: pet e favorite_pet
Instruções de acesso:

Clicar em explorar ou home.
Selecionar um pet.
Clicar no coração do pet selecionado.
Clicar em Favoritos para ver todos os pets favoritados.

Tela da funcionalidade:

Funcionalidade 8 – Quiz de Compatibilidade
Sugere pets com base em respostas sobre o perfil do usuário.
Estrutura de dados: wizard
Instruções de acesso:

Clicar em "pet ideal".
Responder o Quiz de acordo com seu estilo de vida.
Receber a recomendação do tipo de animal mais adequado.

Tela da funcionalidade:

Funcionalidade 9 – Visualização dos Pets no Mapa (Mapbox)
Mostra a localização dos pets em um mapa interativo
Estrutura de dados: address
Instruções de acesso:

Clicar em "Petmap".
Visualizar a localização dos pets presentes no site.
Clicar em um dos animais.
Ver informações dele.

Tela da funcionalidade:

Funcionalidade 10 – Avaliações do doador
Permite que o usuário deixe seu feedback sobre diferentes doadores.
Estrutura de dados: profile_rating
Instruções de acesso:

Ir para a homepage ou explorar.
Clicar no botão "Ver pet".
Clicar em "Contatar".
Definir quantas estrelas você quer dar para o doador.
Adicionar um comentário.
Clicar em "enviar".

Tela da funcionalidade:

Funcionalidade 11 – Seção de Notícias
Permite que o usuário acompanhe as notícias mais recentes relacionadas ao mundo animal
Estrutura de dados: noticias
Instruções de acesso:

Clicar em "Noticias".
Decidir qual notícia o usuário quer ler.
Clicar em "Ler mais".
Para voltar, vá ao final da notícia e clique em "Voltar".

Tela da funcionalidade:

Funcionalidade 12 – Dicas de Cuidados com os Pets
Permite que o usuário aprenda a como cuidar de seus animais.
Estrutura de dados: tips
Instruções de acesso:

Clicar em "Pet Tips".
Decidir sobre qual animal o usuário quer receber dicas sobre.
Clicar no nome do animal.

Tela da funcionalidade:

⚠️ APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO

Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.

Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

# Estruturas de Dados
Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

Estrutura de Dados - user 
Registro dos usuários do sistema utilizados para login e para o perfil do sistema

{
      "id": "1d0c5920-0f34-4aa8-ab8e-1383b90e14cb",
      "cpf": "00047683135",
      "phone_number": "3340028922",
      "name": "Pedro",
      "born_at": "2000-06-18",
      "img_url": null,
      "email": "a@gmail.com",
      "password": "Cala",
      "created_at": "2025-06-20T13:58:50.088Z",
      "updated_at": "2025-06-20T13:58:50.088Z"
}
  
Estrutura de Dados - pet 
Registro dos animais cadastrados para adoção na aplicação 

 {
  "id": "petTest3",
  "name": "Chitãozinho",
  "animal_type_id": "faccdc3f-00ea-4f6e-9b60-ebd09afb8891",
  "size": "Grande",
  "animal_sex": "male",
  "description": "Um cão amigável e brincalhão.",
  "img_urls": ["https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"],
  "born_at": "2022-03-15",
  "breed": ["Pastor Alemão"],
  "vaccinated": true,
  "castrated": true,
  "available_for_adoption": true,
  "personality": ["brincalhão", "carinhoso"],
  "donor_id": "donorTestId"
}

Estrutura de Dados - favorite_pet
Registro dos animais favoritados pelos usuários

{
      "id": "9c9d5e57-b33d-4888-8563-b552187f3d1d",
      "appraiser_id": "userTestId",
      "pet_id": "petTest3",
      "created_at": "2025-06-10T21:59:32.344Z"
},

Estrutura de Dados - wizard
Registro das perguntas do quiz de compatibilidade
{
      "id": 1,
      "question": "Qual dessas opções descreve melhor o lugar onde você mora?",
      "type": "single-choice",
      "options": [
      "Casa/apartamento grande",
        "Casa com quintal/fazenda",
        "Apartamento pequeno",
        "Studio/Kitnet"
      ]
}

Estrutura de Dados - address
Registro da localização dos pets cadastrados no site
{
      "id": "5490d532-02c5-471f-ba61-ca079469e641",
      "entity_type": "pet",
      "entity_id": "petTest2",
      "street": "Benedito Pereira da fonseca",
      "number": "258",
      "complement": "Curral ",
      "neighborhood": "Inga",
      "city": "Betim",
      "state": "MG",
      "zipCode": "32632-120",
      "country": "Brasil",
      "latitude": -19.945789,
      "longitude": -44.192577,
      "created_at": "2025-06-09T01:08:27.685Z",
      "updated_at": "2025-06-10T14:30:41.734Z"
}

Estrutura de Dados - profile_rating
Registro das avaliações de cada usuário.
{
      "id": "someId",
      "appraiserID": "someId",
      "ratedId": "someId",
      "content": "string",
      "rate": "5",
      "createdAt": "someDate"
}

Estrutura de Dados - noticias
Registro das noticias disponíveis no site.

{
      "id": 7,
      "titulo": "Cães farejadores ajudam a detectar doenças precocemente",
      "resumo": "Pesquisa comprova que cães treinados conseguem identificar câncer e outras doenças através do olfato com alta precisão.",
      "data": "2025-06-05",
      "categoria": "Saúde",
      "imagem": "/modulos/noticias/img/farejador.png",
      "conteudo": "Um estudo revolucionário conduzido pelo Instituto Nacional de Pesquisas Médicas demonstrou que...
}

Estrutura de Dados - tips
Registro das dicas disponíveis no site.

{
      "id": "c23a7de5-1093-45b9-951d-d3b9e9a62c7a",
      "animal_type_id": "Pássaro",
      "img_url": "someurl",
      "created_at": "2025-05-03T14:17:59.909Z",
      "tips": [
        {
          "title": "Qual o melhor tipo de gaiola?",
          "content": "Espaçosa o suficiente para abrir as asas, com poleiros variados e espaço para voar."
        },
      ]
}

## Plano de Testes de Software

| Caso  | Funcionalidade                   | Objetivo do Teste                              | Passos                                                                                       | Resultado Esperado                              |
|-------|----------------------------------|-------------------------------------------------|----------------------------------------------------------------------------------------------|-------------------------------------------------|
| CT-01 | Cadastro de Usuário              | Validar registro de novo usuário                | 1. Acessar página de cadastro<br>2. Preencher todos os campos válidos<br>3. Enviar formulário | Usuário criado e redirecionado à homepage         |
| CT-02 | Login de Usuário                 | Validar autenticação com credenciais válidas     | 1. Acessar página de login<br>2. Informar e-mail e senha válidos<br>3. Clicar em Entrar       | Usuário autenticado e direcionado à homepage  |
| CT-03 | Cadastro de Pets                 | Verificar inclusão de pet na lista de adoção     | 1. Fazer cadastro como doador<br>2. Acessar “Colocar para adoção”<br>3. Preencher dados do pet<br>4. Salvar | Pet listado em “Meus Pets”                   |
| CT-04 | Exploração de Pets com Filtros   | Garantir que o filtro retorna apenas pets válidos| 1. Acessar “Categorias”<br>2. Selecionar filtro “Pequeno”<br>3. Aplicar                         | Apenas pets de porte pequeno aparecem           |
| CT-05 | Favoritar Pets                   | Checar marcação de favorito                      | 1. Acessar lista de pets<br>2. Clicar no ícone de coração em um pet                           | Pet aparece na lista “Favoritos”                |
| CT-06 | Quiz de Compatibilidade          | Validar resultado do quiz                        | 1. Acessar “Pet Ideal”<br>2. Responder todas as perguntas<br>                        | Exibe caracteríscas do animal condizente com respostas     |
| CT-07 | Mapa (Mapbox)                    | Verificar exibição de marcadores                | 1. Acessar “PetMap”<br>2. Visualizar mapa                                                     | Todos os pets com localização aparecem          |
| CT-08 | Edição de Pets                   | Garantir atualização de dados de um pet          | 1. Acessar “Meus Pets”<br>2. Clicar em “Editar” em um pet<br>3. Alterar campo e salvar         | Alterações refletidas na lista                  |
| CT-09 | Exclusão de Pets                 | Validar remoção de pet                           | 1. Acessar “Meus Pets”<br>2. Clicar em “Excluir” em um pet<br>3. Confirmar                     | Pet não aparece mais em “Meus Pets”             |
| CT-10 | Disponibilidade 24h              | Verificar acesso contínuo ao site                | 1. Configurar monitor de uptime (UptimeRobot)<br>2. Aguardar 24 h de coleta de dados          | Uptime 100 % no período monitorado              |

---

## Registro de Testes de Software

- **CT-01 – Cadastro de Usuário:**  
- **CT-02 – Login de Usuário:**   
- **CT-03 – Cadastro de Pets:**   
- **CT-04 – Exploração com Filtros:**  
- **CT-05 – Favoritar Pets:**   
- **CT-06 – Quiz de Compatibilidade:**  
- **CT-07 – Mapa (Mapbox):**   
- **CT-08 – Edição de Pets:**   
- **CT-09 – Exclusão de Pets:**   
- **CT-10 – Disponibilidade 24h:**
  - Ferramenta: UptimeRobot  
  - Período: 21/06/2025 15:30 → 22/06/2025 15:30  
  - Disponibilidade registrada: 


# Módulos e APIs

## Frameworks e Bibliotecas

- **HTML, CSS e JavaScript (Vanilla):** Base da estrutura, estilo e lógica.  
- **jQuery (v3.x):** Manipulação de DOM, tratamento de eventos e chamadas AJAX ao JSON Server.  
- **JSON Server:** Simula API REST local para CRUD de usuários, pets, favoritos, avaliações e notícias.  
- **Mapbox GL JS:** Renderização de mapas interativos e geocoding para localização de pets.  
- **Font Awesome:** Ícones para botões e elementos visuais.

## APIs e Serviços Externos

- **Mapbox API:** Mapas e coordenadas de geolocalização.  
- **LocalStorage (Browser):** Armazenamento de token de sessão e preferências do usuário.

## Ferramentas de Design e Gestão

- **Figma:** Protótipos de alta fidelidade.  
- **Miro:** Design Thinking (personas, jornadas).  
- **Trello:** Planejamento ágil com Kanban.  


# Módulos e APIs
Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.
## Frameworks e Bibliotecas

- **HTML, CSS e JavaScript (Vanilla):** Base da estrutura, estilo e lógica de interação.  
- **jQuery (v3.x):** Facilita manipulação do DOM, tratamento de eventos e chamadas AJAX ao JSON Server.  
- **JSON Server:** Simula uma API REST local para CRUD de usuários, pets, favoritos, avaliações, notícias etc.  
- **Mapbox GL JS:** Renderização de mapas interativos e geocoding para exibir a localização dos pets.  
- **Font Awesome:** Conjunto de ícones utilizado em botões e elementos visuais.

## APIs e Serviços Externos

- **Mapbox API:** Obtenção de mapas, marcadores e coordenadas de geolocalização.  
- **LocalStorage (Browser):** Armazenamento local de token de sessão e preferências do usuário.

## Ferramentas de Design e Gestão

- **Figma:** Protótipos de alta fidelidade das interfaces.  
- **Miro:** Atividades de Design Thinking (personas, jornadas, alinhamento).  
- **Trello:** Planejamento ágil com quadro Kanban e acompanhamento de tarefas.
# Referências

As referências utilizadas no trabalho foram:

CNN BRASIL. 80% dos pets nos lares brasileiros foram adotados, indica pesquisa. 27 mar. 2024. Disponível em: https://www.cnnbrasil.com.br/nacional/sudeste/sp/80-dos-pets-nos-lares-brasileiros-foram-adotados-indica-pesquisa/. Acesso em: 20 mar. 2025.

EXAME. Maior programa de adoção de pets do Brasil ajudou cães a encontrar um lar. Disponível em: https://exame.com/negocios/maior-programa-de-adocao-de-pets-do-brasil-ajudou-caes-a-encontrar-um-lar/. Acesso em: 20 mar. 2025.

GALILEU. Número de pets nos lares brasileiros cresce 30% durante pandemia. 18 ago. 2021. Disponível em: https://revistagalileu.globo.com/Sociedade/Comportamento/noticia/2021/08/numero-de-pets-nos-lares-brasileiros-cresce-30-durante-pandemia.html. Acesso em: 19 mar. 2025.

INSTITUTO PET BRASIL. Quase 185 mil animais estão sob cuidados de ONGs no Brasil. 2023. Disponível em: https://www.institutopetbrasil.com/noticias/ong-abrigam-quase-185-mil-animais/. Acesso em: 15 maio 2025.

G1. OMS estima que existam mais de 30 milhões de animais abandonados no Brasil. Disponível em: https://g1.globo.com/bemestar/noticia/2019/08/08/oms-estima-30-milhoes-de-animais-abandonados-no-brasil.ghtml. Acesso em: 15 maio 2025.

WORLD ANIMAL PROTECTION. Censo Pet Brasil 2024: mais de 50% dos pets em lares brasileiros são resgatados. Disponível em: https://www.worldanimalprotection.org.br/noticias/censo-pet-brasil-2024/. Acesso em: 15 maio 2025.
