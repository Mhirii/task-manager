import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from './types/token.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Token> {
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userModel
      .create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
        HashedRefreshToken: '',
      })
      .catch((error) => {
        if (error.code === 11000) {
          console.error('Username is already taken.');
        }
      });
    // @ts-ignore
    const tokens: Token = await this.getTokens(newUser._id, newUser.email);
    // @ts-ignore
    await this.updateRefreshTokenHash(newUser._id, tokens.refresh_token);
    return tokens;
  }

  async login(loginDto: LoginDto): Promise<Token> {
    const user = await this.userModel.findOne({
      username: loginDto.username,
    });
    if (!user) throw new ForbiddenException('not found');

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) throw new ForbiddenException('invalid password');

    const tokens: Token = await this.getTokens(user._id, user.email);
    await this.updateRefreshTokenHash(user._id, tokens.refresh_token);
    return tokens;
  }

  async logout(userID: string) {
    await this.userModel.findByIdAndUpdate(
      userID,
      { HashedRefreshToken: '' },
      { new: true },
    );
  }

  async refreshTokens(userID: string, refreshToken: string): Promise<Token> {
    try {
      const user = await this.userModel.findById(userID);
      if (!user || !refreshToken)
        throw new ForbiddenException(
          'User not found or missing HashedRefreshToken',
        );
      const refreshTokenMatches = await bcrypt.compare(
        refreshToken,
        user.HashedRefreshToken,
      );
      if (!refreshTokenMatches) {
        throw new ForbiddenException('access denied 2');
      }
      const tokens: Token = await this.getTokens(user._id, user.email);
      await this.updateRefreshTokenHash(user._id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      console.error('Error refreshing tokens:', err.message);
      throw err;
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshTokenHash(userID: string, refreshToken: string) {
    const hash: string = await this.hashData(refreshToken);
    await this.userModel.findByIdAndUpdate(userID, {
      HashedRefreshToken: hash,
    });
  }

  async getTokens(userID: string, email: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userID,
          email,
        },
        {
          secret: 'accessTokenSecret',
          expiresIn: 60 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userID,
          email,
        },
        {
          secret: 'refreshTokenSecret',
          expiresIn: 60 * 60 * 24 * 7, // one week
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
