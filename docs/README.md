# Introdução

Informações básicas do projeto.

* **Projeto:** [PetMatch]
* **Repositório GitHub:** [https://github.com/ICEI-PUC-Minas-CC-TI/ti1-2025-1-t2-manha-petmatch]
* **Membros da equipe:**

  * [Artur Telles Martins da Costa](https://github.com/ScorpionCrush) 
  * [Bernardo Mendes Rocha​](https://github.com/bmrocha00)
  * [Bruno Mesquita Bicalho​](https://github.com/BrunoBicalho13)
  * [Maria Fernanda Oliveira Maro](https://github.com/mafemaro)
  * [Maria Luiza Gomes Beliene Vira​](https://github.com/cicrano)
  * [Pedro Italo Borges Cardoso​](https://github.com/cicrano)
  * [Sofia de Abreu Botelho Romualdo​](https://github.com/cicrano)

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

| EU COMO...                                    | QUERO/PRECISO ...                                            | PARA ...                                                   |
| --------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Ana Paula                                     | Uma descrição e foto do pet                                   | Encontrar um pet pra vida                                                |
| Ricardo                                       | Método seguro e confiável para garantir um dono responsável   | Garantir que os pets resgatados encontrem lares responsáveis             |
| Joana                                         | Apoio/dicas de como fazer a adaptação do pet pós adoção       | Facilitar a criação responsável do pet como um membro da família         |

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
 - Artur Telles Martins da Costa
 - Bernardo Mendes Rocha​
 - Bruno Mesquita Bicalho
 - Maria Fernanda Oliveira Maro​
 - Maria Luiza Gomes Beliene Vira
 - Pedro Italo Borges Cardoso​
 - Sofia de Abreu Botelho Romualdo​

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

Funcionalidade 1 - Cadastro de Contatos ⚠️ EXEMPLO ⚠️
Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

Estrutura de dados: Contatos
Instruções de acesso:
Abra o site e efetue o login
Acesse o menu principal e escolha a opção Cadastros
Em seguida, escolha a opção Contatos
Tela da funcionalidade:
Tela de Funcionalidade

⚠️ APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO

Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.

Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

# Estruturas de Dados
Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

Estrutura de Dados - Contatos ⚠️ EXEMPLO ⚠️
Contatos da aplicação

  {
    "id": 1,
    "nome": "Leanne Graham",
    "cidade": "Belo Horizonte",
    "categoria": "amigos",
    "email": "Sincere@april.biz",
    "telefone": "1-770-736-8031",
    "website": "hildegard.org"
  }
  
Estrutura de Dados - Usuários ⚠️ EXEMPLO ⚠️
Registro dos usuários do sistema utilizados para login e para o perfil do sistema

  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "admin@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "admin",
    nome: "Administrador do Sistema",
    senha: "123"
  }
⚠️ APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO

Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação quanto outras estruturas que foram criadas para algum tipo de configuração

Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.

Orientações:

JSON Introduction
Trabalhando com JSON - Aprendendo desenvolvimento web | MDN
Módulos e APIs
Esta seção apresenta os módulos e APIs utilizados na solução

Images:

Unsplash - https://unsplash.com/ ⚠️ EXEMPLO ⚠️
Fonts:

Icons Font Face - https://fontawesome.com/ ⚠️ EXEMPLO ⚠️
Scripts:

jQuery - http://www.jquery.com/ ⚠️ EXEMPLO ⚠️
Bootstrap 4 - http://getbootstrap.com/ ⚠️ EXEMPLO ⚠️
⚠️ APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO

# Módulos e APIs
Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.

# Referências

As referências utilizadas no trabalho foram:

CNN BRASIL. 80% dos pets nos lares brasileiros foram adotados, indica pesquisa. 27 mar. 2024. Disponível em: https://www.cnnbrasil.com.br/nacional/sudeste/sp/80-dos-pets-nos-lares-brasileiros-foram-adotados-indica-pesquisa/. Acesso em: 20 mar. 2025.

EXAME. Maior programa de adoção de pets do Brasil ajudou cães a encontrar um lar. Disponível em: https://exame.com/negocios/maior-programa-de-adocao-de-pets-do-brasil-ajudou-caes-a-encontrar-um-lar/. Acesso em: 20 mar. 2025.

GALILEU. Número de pets nos lares brasileiros cresce 30% durante pandemia. 18 ago. 2021. Disponível em: https://revistagalileu.globo.com/Sociedade/Comportamento/noticia/2021/08/numero-de-pets-nos-lares-brasileiros-cresce-30-durante-pandemia.html. Acesso em: 19 mar. 2025.

INSTITUTO PET BRASIL. Quase 185 mil animais estão sob cuidados de ONGs no Brasil. 2023. Disponível em: https://www.institutopetbrasil.com/noticias/ong-abrigam-quase-185-mil-animais/. Acesso em: 15 maio 2025.

G1. OMS estima que existam mais de 30 milhões de animais abandonados no Brasil. Disponível em: https://g1.globo.com/bemestar/noticia/2019/08/08/oms-estima-30-milhoes-de-animais-abandonados-no-brasil.ghtml. Acesso em: 15 maio 2025.

WORLD ANIMAL PROTECTION. Censo Pet Brasil 2024: mais de 50% dos pets em lares brasileiros são resgatados. Disponível em: https://www.worldanimalprotection.org.br/noticias/censo-pet-brasil-2024/. Acesso em: 15 maio 2025.
