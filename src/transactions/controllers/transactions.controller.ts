import { Body, Controller, Post, Delete, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from '../use-cases/get-statistics.use-case';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
@ApiTags('Transactions')
@Controller()
export class TransactionsController {
  constructor(
    private readonly createUC: CreateTransactionUseCase,
    private readonly deleteUC: DeleteAllTransactionsUseCase,
    private readonly statsUC: GetStatisticsUseCase,
  ) {}

  @Post('/transactions')
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiResponse({ status: 201, description: 'Transação registrada com sucesso.' })
  @ApiResponse({ status: 422, description: 'Dados inválidos ou timestamp no futuro.' })
  create(@Body() dto: CreateTransactionDto) {
    try {
      this.createUC.execute(dto.amount, new Date(dto.timestamp));
      return { message: 'Transaction recorded successfully.' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/transactions')
  @ApiOperation({ summary: 'Remove todas as transações' })
  @ApiResponse({ status: 200, description: 'Transações apagadas com sucesso.' })
  deleteAll() {
    this.deleteUC.execute();
    return { message: 'All transactions deleted successfully.' };
  }

  @Get('/statistics')
  @ApiOperation({ summary: 'Estatísticas das transações dos últimos 60 segundos' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso.',
    schema: {
      example: {
        count: 10,
        sum: 1234.56,
        avg: 123.45,
        min: 12.34,
        max: 456.78,
      },
    },
  })
  getStatistics() {
    const stats = this.statsUC.execute();

    return {
      count: stats.count,
      sum: Number(stats.sum.toFixed(2)),
      avg: Number(stats.avg.toFixed(2)),
      min: Number(stats.min.toFixed(2)),
      max: Number(stats.max.toFixed(2)),
    };
  }
}
