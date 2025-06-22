import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ingredientes: string;

  @Column({ nullable: true })
  imagen: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.recetas, { eager: true })
  categoria: Categoria;
}
