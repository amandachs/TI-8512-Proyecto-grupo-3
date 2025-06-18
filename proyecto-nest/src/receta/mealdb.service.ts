import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class MealdbRecetaService {
  constructor(
    @InjectRepository(Receta)
    private recetaRepo: Repository<Receta>,
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async seedRecetasSiNoExisten() {
    const total = await this.recetaRepo.count();
    if (total > 0) {
      console.log('✔ Recetas ya existen, no se realiza seed.');
      return;
    }

    const categorias = await this.categoriaRepo.find();

    for (const categoria of categorias) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria.nombre}`;
      const lista = await axios.get(url);
      const recetasBasicas = lista.data.meals;

      for (const r of recetasBasicas) {
        const detalleUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${r.idMeal}`;
        const detalleResp = await axios.get(detalleUrl);
        const recetaData = detalleResp.data.meals[0];

        // ingredientes como texto plano
        const ingredientes: string[] = [];
        for (let i = 1; i <= 20; i++) {
          const ing = recetaData[`strIngredient${i}`];
          const med = recetaData[`strMeasure${i}`];
          if (ing && ing.trim()) {
            ingredientes.push(`${med} ${ing}`);
          }
        }

        const receta = this.recetaRepo.create({
          nombre: recetaData.strMeal,
          descripcion: recetaData.strArea || '',
          ingredientes: ingredientes.join(', '),
          categoria: categoria,
        });

        await this.recetaRepo.save(receta);
      }

      console.log(`🌿 Se importaron ${recetasBasicas.length} recetas para la categoría ${categoria.nombre}`);
    }

    console.log('✅ Se completó la siembra de recetas desde TheMealDB');
  }
}
