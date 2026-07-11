## Arquitetura em camadas do projeto

Este projeto segue o padrão de **arquitetura em camadas (layered architecture)**, adaptado para uma API REST em Node.js/Express com TypeScript, usando o padrão MVC como base e uma camada de Service e Repository para separar melhor as responsabilidades.

O fluxo de uma requisição sempre segue a mesma direção:

```
Route → Controller → Service → Repository → Prisma → Database
```

Cada camada só se comunica com a camada imediatamente abaixo dela. Isso garante baixo acoplamento: mudanças em uma camada não devem afetar as demais, desde que o contrato entre elas seja mantido.

---

### 1. Controller (camada de entrada e saída)

O Controller é a camada mais externa da aplicação. Seu papel é lidar com a **entrada e saída das requisições HTTP**:

- Recebe a requisição (`req`), extraindo parâmetros, query strings e corpo (body).
- Direciona a chamada para o Service correto, sem aplicar nenhuma regra de negócio.
- Traduz o resultado (ou erro) devolvido pelo Service em uma resposta HTTP adequada, definindo o status code (200, 201, 400, 404, 500...) e o corpo da resposta.

O Controller **não sabe** como uma tarefa é validada, nem como ela é salva no banco — ele só sabe conversar com o mundo externo (o cliente) e repassar a responsabilidade para dentro da aplicação.

### 2. Service (camada de regra de negócio)

O Service concentra a **regra de negócio (RN)** da aplicação — tudo que faz sentido no domínio do problema, independente de tecnologia.

Aqui entram validações e decisões como:

- Verificar se todos os atributos obrigatórios de uma requisição foram enviados.
- Checar permissões e limites de negócio (ex: uma conta gratuita só pode criar até 10 artigos).
- Orquestrar múltiplas operações quando uma ação de negócio envolve mais de um passo (ex: criar um pedido, debitar estoque e notificar o usuário).

O teste para saber se algo pertence ao Service é simples: *se essa regra existisse mesmo sem informática, ela ainda faria sentido para o dono do negócio?* Se sim, é regra de negócio e vai para o Service.

O Service não sabe nada sobre HTTP (não vê `req` nem `res`) e não sabe como os dados são persistidos — ele apenas chama o Repository correto para buscar ou salvar o que precisa.

### 3. Repository (camada de abstração de dados)

O Repository é uma camada de **abstração** entre o Service e a forma real de acessar os dados. Ele expõe funções sob medida (`findAll`, `findById`, `create`, `update`, `delete`...) para que o Service consiga buscar e salvar dados sem precisar conhecer os detalhes de implementação.

Isso significa que:

- O Service nunca importa o Prisma diretamente — ele sempre passa pelo Repository.
- O Repository só se comunica com a camada imediatamente abaixo dele (Prisma/Database), nunca com outro Repository ou com um Service.
- Se um dia a forma de persistência mudar (trocar Prisma por outro ORM, por exemplo), só o Repository precisa ser alterado — Service e Controller permanecem intactos.

### 4. Prisma / Database (camada de persistência)

É a camada mais interna, responsável por **guardar as informações** de fato. Neste projeto, isso é feito com **Prisma** como ORM, conectado a um banco **PostgreSQL**.

Essa camada não tem conhecimento de regra de negócio nem de HTTP — ela apenas executa as operações de leitura e escrita que o Repository solicita, e devolve os dados brutos.

---

### Resumo

| Camada | Responsabilidade | Pergunta que responde |
|---|---|---|
| Controller | Entrada e saída HTTP | O que entrou e o que devo devolver? |
| Service | Regra de negócio | Isso é permitido? O que precisa acontecer? |
| Repository | Abstração de acesso a dados | Como eu busco/salvo esse dado? |
| Prisma/Database | Persistência | Onde o dado fica guardado? |

Manter essa separação clara facilita testes (cada camada pode ser testada isoladamente), manutenção (mudanças ficam contidas em uma única camada) e a evolução do projeto conforme novas regras de negócio surgirem.