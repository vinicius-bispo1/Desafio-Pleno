import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { InMemoryTransactionRepository } from './infra/in-memory.transaction.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (repo) => new CreateTransactionUseCase(repo),
      inject: ['TransactionRepository'],
    },
  ],
})
export class TransactionsModule {}
