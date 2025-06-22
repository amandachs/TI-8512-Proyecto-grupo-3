import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class MealdbService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async seedCategoriasSiNoExisten() {
    const total = await this.categoriaRepo.count();
    if (total > 0) {
      console.log('✔ Categorías ya existen, no se realiza seed.');
      return;
    }

    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const response = await axios.get(url);
    const categoriasApi = response.data.categories;

    const nuevas = categoriasApi.map((cat) =>
      this.categoriaRepo.create({
        id: cat.idCategory,
        nombre: cat.strCategory,
        descripcion: cat.strCategoryDescription,
        urlImagen: cat.strCategoryThumb,
      }),
    );

    await this.categoriaRepo.save(nuevas);
    console.log(`Se crearon ${nuevas.length} categorías desde TheMealDB`);
  }
}
