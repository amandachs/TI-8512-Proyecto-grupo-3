import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateRecetaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  ingredientes: string;

  @IsNotEmpty()
  @IsInt()
  idCategoria: number;
}
