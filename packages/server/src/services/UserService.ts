import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import type { ChangePasswordData, SerializedUser, UserUpdate } from '@ab/shared';
import { passwordRegex, User as UserInterface } from '@ab/shared';

import User from '~/db/models/User';
import { HttpError } from '~/lib/errors';
import AuthService from './AuthService';

export default class UserService {
  private readonly saltRounds = 12;

  constructor(
    public user?: UserInterface
  ) {}

  async init(id: number): Promise<void> {
    this.user = await User.findByPk(id);
  }

  async register(registrationData: User): Promise<UserInterface> {
    const userExists = await this.checkIfUserExists(registrationData.email);

    if (userExists) {
      throw new HttpError('A user with this email address already exists!', 409);
    }

    if (!registrationData.password.match(passwordRegex)) {
      throw new HttpError('The password does not match the schema!', 400);
    }

    const hash = await bcrypt.hash(registrationData.password, this.saltRounds);
    this.user = await User.create({
      ...registrationData,
      password: hash,
    });

    return this.user;
  }

  async update(userId: number, updateData: UserUpdate): Promise<User> {
    let user = await User.findByPk(userId);

    if (user.email !== updateData.email) {
      const userExists = await this.checkIfUserExists(updateData.email);

      if (userExists) {
        throw new HttpError('A user with this email address already exists!', 409);
      }
    }

    user = await user.update(updateData);
    this.user = user;

    return user;
  }

  async changePassword(userId: number, passwordData: ChangePasswordData): Promise<void> {
    const user = await User.findByPk(userId);
    const userService = new AuthService(this);
    const currentPasswordIsValid = await userService.validatePassword(passwordData.currentPassword);

    if (!currentPasswordIsValid) {
      throw new HttpError('The current password you entered is incorrect!', 403);
    }

    const hash = await bcrypt.hash(passwordData.password, this.saltRounds);
    await user.update({ password: hash });
    this.user = user;
  }

  private async checkIfUserExists(email: string): Promise<boolean> {
    const existingUser = await User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('User.email')),
        email.toLowerCase()
      ),
    });

    return !!existingUser;
  }

  serializeUser(): SerializedUser {
    return {
      id: this.user.id,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    };
  }
}
