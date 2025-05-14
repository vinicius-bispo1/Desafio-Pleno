import { DeleteAllTransactionsUseCase } from './delete-all-transactions.use-case';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

describe('DeleteAllTransactionsUseCase', () => {
  let useCase: DeleteAllTransactionsUseCase;
  let mockRepo: TransactionRepository;

  beforeEach(() => {
    mockRepo = {
      add: jest.fn(),
      deleteAll: jest.fn(),
      getAll: jest.fn(),
    };

    useCase = new DeleteAllTransactionsUseCase(mockRepo);
  });

  it('deve chamar o método deleteAll do repositório', () => {
    useCase.execute();
    expect(mockRepo.deleteAll).toHaveBeenCalled();
  });
});
