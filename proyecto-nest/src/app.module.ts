import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { RecetaModule } from './receta/receta.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Receta } from './receta/entities/receta.entity';
import { MealdbService } from './categoria/mealdb.service';
import { MealdbRecetaService } from './receta/mealdb.service'; // 👈 nuevo import

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'meal_api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    RecetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly mealdbService: MealdbService,
    private readonly mealdbRecetaService: MealdbRecetaService, 
  ) {}

  async onModuleInit() {
    await this.mealdbService.seedCategoriasSiNoExisten();
    await this.mealdbRecetaService.seedRecetasSiNoExisten(); 
  }
}
