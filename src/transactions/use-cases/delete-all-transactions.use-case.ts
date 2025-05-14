import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(private readonly repo: TransactionRepository) {}

  execute() {
    this.repo.deleteAll();
  }
}
