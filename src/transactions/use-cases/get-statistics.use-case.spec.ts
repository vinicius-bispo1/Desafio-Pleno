import { GetStatisticsUseCase } from './get-statistics.use-case';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
  let mockRepo: TransactionRepository;

  beforeEach(() => {
    mockRepo = {
      add: jest.fn(),
      deleteAll: jest.fn(),
      getAll: jest.fn(),
    };

    useCase = new GetStatisticsUseCase(mockRepo);
  });

  it('deve retornar estatísticas válidas para transações dos últimos 60 segundos', () => {
    const now = new Date();
    const transactions = [
      { amount: 10, timestamp: new Date(now.getTime() - 10_000) }, // 10s atrás
      { amount: 20, timestamp: new Date(now.getTime() - 20_000) }, // 20s atrás
      { amount: 30, timestamp: new Date(now.getTime() - 30_000) }, // 30s atrás
    ];

    mockRepo.getAll = jest.fn().mockReturnValue(transactions);

    const stats = useCase.execute();

    expect(stats).toEqual({
      count: 3,
      sum: 60,
      avg: 20,
      min: 10,
      max: 30,
    });
  });

  it('deve ignorar transações com mais de 60 segundos', () => {
    const now = new Date();
    const oldTransaction = {
      amount: 99,
      timestamp: new Date(now.getTime() - 70_000),
    };

    mockRepo.getAll = jest.fn().mockReturnValue([oldTransaction]);

    const stats = useCase.execute();

    expect(stats).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
