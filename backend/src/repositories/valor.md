# Repository — o que ele realmente é
Repository é só uma interface entre o Service e a forma de acessar dados. Ele existe pra o Service não precisar saber se você usa Prisma, um array em memória, ou outra API. O Service chama repository.findById(1) e não sabe (nem precisa saber) que por trás disso tem um prisma.task.findUnique(...).

Ou seja: Repository = "os métodos disponíveis pra mexer nos dados", e a implementação de fato (Prisma) fica escondida dentro dele.