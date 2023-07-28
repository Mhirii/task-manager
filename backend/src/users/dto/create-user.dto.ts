import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  // constructor(username, email, password) {
  //   const saltOrRounds = 10;
  //   this.password = bcrypt.hash(password, saltOrRounds);
  //   this.username = username;
  //   this.email = email;
  // }
}
