import {
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { CreateUser } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }
  async findOneToken(token: string) {
    return this.userModel.findOne({ refreshToken: token });
  }
  async getUserByUserName(username: string) {
    console.log(username);

    return await this.userModel
      .findOne({
        where: {
          username: username,
        },
      })
      .exec();
  }
  async getUserById(username: string): Promise<User | undefined> {
    return await this.userModel
      .findOne({ username: username })
      // .select('-password -refreshToken')
      .exec();
  }
  async getAll(): Promise<User[] | undefined> {
    return this.userModel.find().select('-password -refreshToken').exec();
  }
  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }
  async update(userUpdate: CreateUser, id: string) {
    try {
      const hashPassword = await bcrypt.hash(userUpdate.password, 10);
      return this.userModel.updateOne(
        { _id: id },
        { hashPassword, ...userUpdate },
      ).exec()
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async createUser(@Body() crateUserDto: CreateUser) {
    const user = await this.findOne(crateUserDto.username);
    if (user) {
      throw new UnauthorizedException();
    }
    const createdUser = new this.userModel(crateUserDto);
    await createdUser.save();
    const { password, ...userResponse } = createdUser.toObject();

    return userResponse;
  }
  async deleteUser(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
