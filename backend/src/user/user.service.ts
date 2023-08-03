import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`user #${id} does not exist`);
    }
    return user;
  }
  async getNameFromId(id: string): Promise<string | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`user #${id} does not exist`);
    }
    return user.username;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      throw new NotFoundException(`no users found`);
    }
    return users;
  }

  async getUserByName(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`user #${username} does not exist`);
    }
    return user;
  }

  async findUserByAccessToken(accessToken: string): Promise<User | null> {
    try {
      const { id } = this.jwtService.verify<{ id: string }>(accessToken);
      const user = await this.getUserById(id);
      return user;
    } catch (error) {
      console.log('jwt error');
      return null;
    }
  }
}
