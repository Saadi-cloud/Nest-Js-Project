import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratePngDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class GeneratePostDto {
  @IsString()
  @IsNotEmpty()
  htmlTemplate: string;

  @IsString()
  @IsNotEmpty()
  quote: string;
}
