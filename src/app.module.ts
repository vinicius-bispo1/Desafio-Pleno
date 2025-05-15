import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TransactionsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
  ],
})
export class AppModule {}
