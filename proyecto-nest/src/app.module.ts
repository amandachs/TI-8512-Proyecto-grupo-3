import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { RecetaModule } from './receta/receta.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Receta } from './receta/entities/receta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el nombre del contenedor si usás Docker
      port: 5432,
      username: 'postgres',
      password: 'tu_contraseña',
      database: 'meal_api',
      entities: [Categoria, Receta],
      synchronize: true, // Solo en desarrollo
      autoLoadEntities: true,
    }),
    CategoriaModule,
    RecetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}