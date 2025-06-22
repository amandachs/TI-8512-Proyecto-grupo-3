import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    if (
      !createCategoriaDto.nombre ||
      createCategoriaDto.nombre.trim() === ''
    ) {
      throw new BadRequestException('El nombre de la categoría es obligatorio'); // 400 (Bad Request)
    }

    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`); // 404 (Not Found)
    }
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto): 
    Promise<Categoria> {
    const categoria = await this.findOne(id); // 404 (Not Found)

    if (
      updateCategoriaDto.nombre !== undefined &&
      updateCategoriaDto.nombre.trim() === ''
    ) {
      throw new BadRequestException(
        'El nombre de la categoría no puede estar vacío', // 400 (Bad Request)
      );
    }

    this.categoriaRepository.merge(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);

    // Verificar si tiene recetas asociadas antes de eliminar
    const recetasRelacionadas = await this.categoriaRepository
      .createQueryBuilder('categoria')
      .leftJoin('categoria.recetas', 'receta')
      .where('categoria.id = :id', { id })
      .andWhere('receta.id IS NOT NULL')
      .getCount();

    if (recetasRelacionadas > 0) {
      throw new ForbiddenException(
        'No se puede eliminar la categoría porque tiene recetas asociadas', // 403 (Forbidden)
      );
    }

    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`); // 404 (Not Found)
    }
  }
}