import { CreationOptional, DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { User as UserInterface } from '@ab/shared';

import AuthSession from './AuthSession';

@Table({
  tableName: 'users',
})
export default class User extends Model<UserInterface> {
  @AutoIncrement
  @PrimaryKey
  @Unique(true)
  @Column({
    type: DataTypes.INTEGER,
  })
  override id: CreationOptional<number>;

  @Unique(true)
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => AuthSession)
  sessions: AuthSession[];

  @CreatedAt
  override createdAt: CreationOptional<Date>;

  @UpdatedAt
  override updatedAt: CreationOptional<Date>;
}
