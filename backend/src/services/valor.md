# O que é "regra de negócio" (Service)
Regra de negócio é qualquer decisão que existiria mesmo sem informática — é a regra da empresa/domínio, não do banco de dados nem do HTTP. Um teste simples: "se eu explicasse isso pro dono do negócio, sem falar de código, ele entenderia como uma regra dele?"
## Exemplos pro seu To-do List:

1. "Uma tarefa não pode ter título vazio" → regra de negócio
1. "Uma tarefa concluída não pode ser editada" → regra de negócio
1. "Usuário grátis só pode ter 10 tarefas ativas" → regra de negócio

## O que não é regra de negócio:

1. "O campo title é VARCHAR(100) no banco" → isso é Persistence/Database
1. "Retornar status 404 se não achar" → isso é Presentation (Controller)