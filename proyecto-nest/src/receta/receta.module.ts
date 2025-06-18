import { Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';
import { Receta } from './entities/receta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Receta])],
  controllers: [RecetaController],
  providers: [RecetaService]
})
export class RecetaModule {}
