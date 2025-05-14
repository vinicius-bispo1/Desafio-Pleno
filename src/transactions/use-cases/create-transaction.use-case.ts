import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly repo: TransactionRepository) {}

  execute(amount: number, timestamp: Date) {
    const transaction = new Transaction(amount, timestamp);
    this.repo.add(transaction);
  }
}
