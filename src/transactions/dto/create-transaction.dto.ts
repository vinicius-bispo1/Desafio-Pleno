import { IsNumber, IsISO8601, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.5, description: 'Valor da transação (não negativo)' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2025-05-15T12:30:00.000Z',
    description: 'Data e hora da transação no formato ISO 8601 (UTC)',
  })
  @IsISO8601()
  timestamp: string;
}
