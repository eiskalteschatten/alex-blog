import { v4 as uuidv4 } from 'uuid';
import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserLoginReply } from '@ab/shared';
import { Op } from 'sequelize';

import logger from '~/lib/logger';
import { JwtPayload, UserWithSessionId } from '~/auth/interfaces';
import AuthSession, { TokenType } from '~/db/models/AuthSession';
import User from '~/db/models/User';
import { HttpError } from '~/lib/errors';
import UserService from './UserService';

export default class AuthService {
  constructor(
    private userService?: UserService,
    private sessionId?: string
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

  static async logout(id: number, sessionId: string): Promise<void> {
    await AuthSession.destroy({
      where: {
        sessionId,
        fkUser: id,
      },
    });
  }

  async generateToken(ttl: number, secret: string): Promise<string> {
    this.sessionId = this.sessionId || uuidv4();

    return jwt.sign({
      id: this.userService.user.id,
      uuid: uuidv4(),
      sessionId: this.sessionId,
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
    await this.saveJwtToDb('access', token, secret);
    return token;
  }

  async generateRefreshToken(): Promise<string> {
    const ttl = config.get<number>('jwt.refreshToken.ttl');
    const secret = config.get<string>('jwt.refreshToken.secret');
    const token = await this.generateToken(ttl, secret);
    await this.saveJwtToDb('refresh', token, secret);
    return token;
  }

  async generateTempJwt(): Promise<string> {
    const ttl = config.get<number>('jwt.tempToken.ttl');
    const secret = config.get<string>('jwt.tempToken.secret');
    const token = await this.generateToken(ttl, secret);
    await this.saveJwtToDb('temp', token, secret);
    return token;
  }

  async saveJwtToDb(type: TokenType, token: string, secret: string): Promise<void> {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const expirationDate = new Date(decoded.exp * 1000);

    const session = await AuthSession.findOne({
      where: {
        fkUser: this.userService.user.id,
        sessionId: decoded.sessionId,
        tokenType: type,
      },
    });

    const toSave = {
      sessionId: decoded.sessionId,
      token,
      tokenType: type,
      tokenUUID: decoded.uuid,
      expirationDate,
      fkUser: this.userService.user.id,
    };

    if (session) {
      await session.update(toSave);
    }
    else {
      await AuthSession.create(toSave);
    }
  }

  static async userTokenIsValid(payload: JwtPayload, type: TokenType = 'access'): Promise<UserWithSessionId | undefined> {
    try {
      const session = await AuthSession.findOne({
        where: {
          fkUser: payload.id,
          tokenUUID: payload.uuid,
          tokenType: type,
          sessionId: payload.sessionId,
          expirationDate: {
            [Op.gte]: new Date(),
          },
        },
        include: [{
          model: User,
          as: 'user',
        }],
      });

      if (session && session.user) {
        const user = await User.findByPk(payload.id, { raw: true });

        return {
          ...user,
          sessionId: payload.sessionId,
        };
      }
    }
    catch (error) {
      logger.error(error);
    }
  }
}
