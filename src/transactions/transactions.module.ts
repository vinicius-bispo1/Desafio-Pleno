import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';
import { InMemoryTransactionRepository } from './repositories/in-memory.transaction.repository';

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
    {
      provide: DeleteAllTransactionsUseCase,
      useFactory: (repo) => new DeleteAllTransactionsUseCase(repo),
      inject: ['TransactionRepository'],
    },
    {
      provide: GetStatisticsUseCase,
      useFactory: (repo) => new GetStatisticsUseCase(repo),
      inject: ['TransactionRepository'],
    },
  ],
})
export class TransactionsModule {}
