import { CreateTransactionUseCase } from './create-transaction.use-case';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';
import { Transaction } from '../entities/transaction.entity';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let mockRepo: TransactionRepository;

  beforeEach(() => {
    mockRepo = {
      add: jest.fn(),
      deleteAll: jest.fn(),
    };

    useCase = new CreateTransactionUseCase(mockRepo);
  });

  it('deve criar uma transação válida e salvá-la no repositório', () => {
    const amount = 100;
    const timestamp = new Date();

    useCase.execute(amount, timestamp);

    expect(mockRepo.add).toHaveBeenCalledTimes(1); // Verifica se foi chamada 1 vez

    const savedTransaction = (mockRepo.add as jest.Mock).mock.calls[0][0];

    expect(savedTransaction).toBeInstanceOf(Transaction);
    expect(savedTransaction.amount).toBe(amount);
    expect(savedTransaction.timestamp).toBe(timestamp);
  });

  it('deve lançar erro se o amount for negativo', () => {
    const amount = -50;
    const timestamp = new Date();

    expect(() => useCase.execute(amount, timestamp)).toThrow('Amount cannot be negative');
  });

  it('não deve permitir timestamp até mesmo 1ms no futuro', () => {
    const amount = 100;
    const timestamp = new Date(Date.now() + 1);

    expect(() => useCase.execute(amount, timestamp)).toThrow('Timestamp is in the future');
  });
});
