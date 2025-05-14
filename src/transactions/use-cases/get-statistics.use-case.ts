import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class GetStatisticsUseCase {
  constructor(private readonly repo: TransactionRepository) {}

  execute() {
    const now = new Date();
    const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000);

    const recentTransactions = this.repo.getAll().filter((tx) => tx.timestamp >= sixtySecondsAgo);

    const count = recentTransactions.length;

    const amounts = recentTransactions.map((tx) => tx.amount);

    const sum = amounts.reduce((acc, curr) => acc + curr, 0);
    const avg = count === 0 ? 0 : sum / count;
    const min = count === 0 ? 0 : Math.min(...amounts);
    const max = count === 0 ? 0 : Math.max(...amounts);

    return { count, sum, avg, min, max };
  }
}
