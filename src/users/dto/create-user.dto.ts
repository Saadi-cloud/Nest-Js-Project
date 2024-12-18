import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'intern', 'engineer'], {
    message: 'Valid role required',
  })
  role: 'admin' | 'intern' | 'engineer';
}
