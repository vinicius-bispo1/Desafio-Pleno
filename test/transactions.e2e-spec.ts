import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Transactions E2E (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /transactions deve criar uma transação', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 100,
        timestamp: new Date().toISOString(),
      })
      .expect(201);

    expect(response.body).toEqual({ message: 'Transaction recorded successfully.' });
  });

  it('GET /statistics deve retornar estatísticas da transação criada', async () => {
    const response = await request(app.getHttpServer()).get('/statistics').expect(200);

    expect(response.body).toMatchObject({
      count: expect.any(Number),
      sum: expect.any(Number),
      avg: expect.any(Number),
      min: expect.any(Number),
      max: expect.any(Number),
    });
  });

  it('DELETE /transactions deve remover todas as transações', async () => {
    // cria uma transação antes
    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 50,
        timestamp: new Date().toISOString(),
      })
      .expect(201);

    // remove todas
    const response = await request(app.getHttpServer()).delete('/transactions').expect(200);

    expect(response.body).toEqual({ message: 'All transactions deleted successfully.' });

    // verifica se foram resetadas
    const stats = await request(app.getHttpServer()).get('/statistics').expect(200);

    expect(stats.body).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
