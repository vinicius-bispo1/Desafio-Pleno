import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  add(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}
