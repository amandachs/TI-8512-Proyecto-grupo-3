import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private recetaRepo: Repository<Receta>,
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateRecetaDto): Promise<Receta> {
    if (!dto.nombre || dto.nombre.trim() === '') {
      throw new BadRequestException('El nombre de la receta es obligatorio'); // 400 (Bad Request)
    }
    
    const categoria = await this.categoriaRepo.findOne({ 
      where: { id: dto.idCategoria } 
    });
    
    if (!categoria) {
      throw new BadRequestException('La categoría especificada no existe'); // 400 (Bad Request)
    }

    const receta = this.recetaRepo.create({ ...dto, categoria });
    return await this.recetaRepo.save(receta);
  }

  findAll(): Promise<Receta[]> {
    return this.recetaRepo.find();
  }

  async findOne(id: number): Promise<Receta> {
    const receta = await this.recetaRepo.findOne({ where: { id } });

    if (!receta) {
      throw new NotFoundException('Receta no encontrada'); // 404 (Not Found)
    }

    return receta;
  }

  async update(id: number, dto: UpdateRecetaDto): Promise<Receta> {
    const receta = await this.findOne(id); // 404 (Not Found)

    if (dto.nombre !== undefined && dto.nombre.trim() === '') {
      throw new BadRequestException('El nombre de la receta no puede estar vacío'); // 400 (Bad Request)
    }

    if (dto.idCategoria) {
      const categoria = await this.categoriaRepo.findOne({
        where: { id: dto.idCategoria },
      });

      if (!categoria) {
        throw new BadRequestException('La categoría especificada no existe'); // 400 (Bad Request)
      }

      receta.categoria = categoria;
    }

    Object.assign(receta, dto);
    return await this.recetaRepo.save(receta);
  }

  async remove(id: number): Promise<void> {
    const result = await this.recetaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Receta no encontrada'); // 404 (Not Found)
  }

  async findByCategoria(idCategoria: number): Promise<Receta[]> {
    return this.recetaRepo.find({
      where: { categoria: { id: idCategoria } },
    });
  }
}
