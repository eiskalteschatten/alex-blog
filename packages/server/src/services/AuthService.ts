import { v4 as uuidv4 } from 'uuid';
import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserLoginReply } from '@ab/shared';

import { JwtPayload } from '~/auth/interfaces';
import User from '~/db/models/User';
import { HttpError } from '~/lib/errors';
import UserService from './UserService';

export default class AuthService {
  constructor(
    private userService?: UserService
  ) {}

  async login(email: string, password: string): Promise<UserLoginReply | undefined> {
    const user = await User.findOne({ where: { email } });
    this.userService = new UserService(user);

    const passwordIsValid = await this.validatePassword(password);

    if (!user || !passwordIsValid) {
      throw new HttpError('Invalid email or password!', 401);
    }

    const accessToken = await this.generateJwt();
    const refreshToken = await this.generateRefreshToken();

    return {
      user: this.userService.serializeUser(),
      accessToken,
      refreshToken,
    };
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.userService.user) {
      return false;
    }

    const isValid = await bcrypt.compare(password, this.userService.user.password);
    return isValid;
  }

  async generateToken(ttl: number, secret: string): Promise<string> {
    return jwt.sign({
      id: this.userService.user.id,
      uuid: uuidv4(),
    } as JwtPayload,
    secret,
    {
      expiresIn: `${ttl}s`,
    });
  }

  async generateJwt(): Promise<string> {
    const ttl = config.get<number>('jwt.ttl');
    const secret = config.get<string>('jwt.secret');
    const token = await this.generateToken(ttl, secret);
    return token;
  }

  async generateRefreshToken(): Promise<string> {
    const ttl = config.get<number>('jwt.refreshToken.ttl');
    const secret = config.get<string>('jwt.refreshToken.secret');
    const token = await this.generateToken(ttl, secret);
    return token;
  }

  async generateTempJwt(): Promise<string> {
    const ttl = config.get<number>('jwt.tempToken.ttl');
    const secret = config.get<string>('jwt.tempToken.secret');
    const token = await this.generateToken(ttl, secret);
    return token;
  }
}
