import { IsNumber, IsISO8601, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsISO8601()
  timestamp: string;
}
