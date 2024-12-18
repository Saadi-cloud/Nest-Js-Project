import { IsEmail, IsEmpty, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'intern', 'engineer'], {
    message: 'Valid role required',
  })
  role: 'admin' | 'intern' | 'engineer';
}
