import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class LoginDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
