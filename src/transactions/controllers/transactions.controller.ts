import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';

@Controller()
export class TransactionsController {
  constructor(private readonly createUC: CreateTransactionUseCase) {}

  @Post('/transactions')
  create(@Body() dto: CreateTransactionDto) {
    try {
      this.createUC.execute(dto.amount, new Date(dto.timestamp));
      return { message: 'Transaction recorded successfully.' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
