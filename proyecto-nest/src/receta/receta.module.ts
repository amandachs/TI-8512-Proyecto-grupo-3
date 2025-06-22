import { Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';
import { Receta } from './entities/receta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { MealdbRecetaService } from './mealdb.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([Receta, Categoria])], 
  controllers: [RecetaController],
  providers: [RecetaService, MealdbRecetaService], 
  exports: [MealdbRecetaService], 
})
export class RecetaModule {}
