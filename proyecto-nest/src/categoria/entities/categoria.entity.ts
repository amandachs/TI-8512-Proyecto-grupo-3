import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receta } from '../../receta/entities/receta.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  urlImagen: string;

  @OneToMany(() => Receta, receta => receta.categoria)
  recetas: Receta[];
}