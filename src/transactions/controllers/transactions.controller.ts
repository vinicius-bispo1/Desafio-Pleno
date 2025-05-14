import { Body, Controller, Post, Delete, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from '../use-cases/get-statistics.use-case';

@Controller()
export class TransactionsController {
  constructor(
    private readonly createUC: CreateTransactionUseCase,
    private readonly deleteUC: DeleteAllTransactionsUseCase,
    private readonly statsUC: GetStatisticsUseCase,
  ) {}

  @Post('/transactions')
  create(@Body() dto: CreateTransactionDto) {
    try {
      this.createUC.execute(dto.amount, new Date(dto.timestamp));
      return { message: 'Transaction recorded successfully.' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/transactions')
  deleteAll() {
    this.deleteUC.execute();
    return { message: 'All transactions deleted successfully.' };
  }

  @Get('/statistics')
  getStatistics() {
    return this.statsUC.execute();
  }
}
