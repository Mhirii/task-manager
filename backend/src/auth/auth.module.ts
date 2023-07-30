import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
