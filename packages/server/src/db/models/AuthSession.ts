import { CreationOptional, DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

import User from './User';

export type TokenType = 'access' | 'refresh' | 'temp';

@Table({
  tableName: 'auth_sessions',
})
export default class AuthSession extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique(true)
  @Column({
    type: DataTypes.INTEGER,
  })
  override id: CreationOptional<number>;

  @AllowNull(false)
  @Column({
    field: 'session_id',
  })
  sessionId: string;

  @Unique(true)
  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @Column({
    field: 'token_type',
  })
  tokenType: TokenType;

  @Unique(true)
  @AllowNull(false)
  @Column({
    field: 'token_uuid',
  })
  tokenUUID: string;

  @AllowNull(false)
  @Column({
    field: 'expiration_date',
  })
  expirationDate: Date;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    field: 'fk_user',
  })
  fkUser: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  override createdAt: CreationOptional<Date>;

  @UpdatedAt
  override updatedAt: CreationOptional<Date>;
}
