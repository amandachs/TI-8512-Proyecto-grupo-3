import { IsNotEmpty, IsString, IsInt, IsUrl } from 'class-validator';

export class CreateRecetaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  ingredientes: string;

  @IsNotEmpty()
  @IsUrl()
  imagen: string;

  @IsNotEmpty()
  @IsInt()
  idCategoria: number;
}
